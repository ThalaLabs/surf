import { AptosClient, TxnBuilderTypes } from 'aptos';
import { createViewPayload } from './createViewPayload.js';
import { createEntryPayload } from './createEntryPayload.js';
import {
  ABIEntryClient,
  ABIViewClient,
  ABIRoot,
  EntryOptions,
  EntryPayload,
  ViewOptions,
  ViewPayload,
  DefaultABITable,
  ABIResourceClient,
  TransactionResponse,
} from '../types/index.js';
import { ABITable } from '../types/defaultABITable.js';

/**
 * Create a client to interact with Aptos smart contract.
 *
 * @param options.nodeUrl URL of the Aptos Node API endpoint.
 * @returns The client object.
 */
export function createClient<
  TABITable extends ABITable = DefaultABITable,
>(options: { nodeUrl: string }): Client<TABITable> {
  return new Client<TABITable>(new AptosClient(options.nodeUrl));
}

export class Client<TABITable extends ABITable> {
  private client: AptosClient;

  constructor(client: AptosClient) {
    this.client = client;
  }

  /**
   * Call a view function.
   *
   * @param payload The payload object created by `createViewPayload`.
   * @param options.ledger_version The ledger version.
   * @returns The return value of view function.
   * @example
   * const viewPayload = createViewPayload(COIN_ABI, {
   *   function: 'balance',
   *   arguments: ['0x1'],
   *   type_arguments: ['0x1::aptos_coin::AptosCoin'],
   * });
   * const [balance] = await client.view(viewPayload);
   */
  public async view<TReturn>(
    payload: ViewPayload<TReturn>,
    options?: ViewOptions,
  ): Promise<TReturn> {
    const result = await this.client.view(
      payload.viewRequest,
      options?.ledger_version,
    );

    // Decode the return value
    // TODO: for struct
    return result.map((value, i) =>
      payload.decoders[i] ? payload.decoders[i]!(value) : value,
    ) as TReturn;
  }

  /**
   * Submit a transaction.
   *
   * @param payload The payload object created by `createEntryPayload`.
   * @param options.account AptosAccount to submit the transaction.
   * @returns The transaction response.
   * @example
   * const entryPayload = createEntryPayload(COIN_ABI, {
   *     function: 'transfer',
   *     arguments: ['0x1', 1],
   *     type_arguments: ['0x1::aptos_coin::AptosCoin'],
   * });
   *
   * const { hash } = await client.submitTransaction(
   *     entryPayload,
   *     { account },
   * );
   */
  public async submitTransaction(
    payload: EntryPayload,
    options: EntryOptions,
  ): Promise<TransactionResponse> {
    const rawTxn = await this.generateRawTxn(payload, options);

    // Sign the raw transaction with account's private key
    const bcsTxn = AptosClient.generateBCSTransaction(options.account, rawTxn);

    // Submit the transaction
    const transactionRes = await this.client.submitSignedBCSTransaction(bcsTxn);

    // Wait for the transaction to finish
    // throws an error if the tx fails or not confirmed after timeout
    await this.client.waitForTransaction(transactionRes.hash, {
      timeoutSecs: 120,
      checkSuccess: true,
    });
    return transactionRes;
  }

  /**
   * Simulate a transaction.
   *
   * @param payload The payload object created by `createEntryPayload`.
   * @param options.account AptosAccount to simulate the transaction.
   * @returns The transaction response.
   * @example
   * const entryPayload = createEntryPayload(COIN_ABI, {
   *     function: 'transfer',
   *     arguments: ['0x1', 1],
   *     type_arguments: ['0x1::aptos_coin::AptosCoin'],
   * });
   *
   * const { hash } = await client.simulateTransaction(
   *     entryPayload,
   *     { account },
   * );
   */
  public async simulateTransaction(
    payload: EntryPayload,
    options: EntryOptions,
  ): Promise<TransactionResponse> {
    const rawTxn = await this.generateRawTxn(payload, options);

    const transactionRes = (
      await this.client.simulateTransaction(options.account, rawTxn)
    )[0];
    if (!transactionRes) {
      throw new Error('Failed to simulate transaction');
    }

    return transactionRes;
  }

  /**
   * Create a client associated with a specific ABI.
   *
   * @param abi The ABI JSON.
   * @returns A client can call view/entry functions or get account resource.
   * @example
   * const [balance] = await client.useABI(COIN_ABI).view.balance({
   *    arguments: ['0x1'],
   *    type_arguments: ['0x1::aptos_coin::AptosCoin'],
   * });
   */
  public useABI<T extends ABIRoot>(abi: T) {
    return {
      /**
       * Call an view function.
       *
       * @example
       * const [balance] = await client.useABI(COIN_ABI).view.balance({
       *     arguments: ['0x1'],
       *     type_arguments: ['0x1::aptos_coin::AptosCoin'],
       * });
       */
      view: new Proxy({} as ABIViewClient<T>, {
        get: (_, prop) => {
          const functionName = prop.toString();
          return (...args) => {
            const payload = createViewPayload(abi, {
              function: functionName,
              type_arguments: args[0].type_arguments,
              arguments: args[0].arguments,
            });
            return this.view(payload, { ledger_version: args[0].ledger_version });
          };
        },
      }),

      /**
       * Call an entry function.
       *
       * @example
       * const { hash } = await client.useABI(COIN_ABI).entry.transfer({
       *     arguments: ['0x1', 1],
       *     type_arguments: ['0x1::aptos_coin::AptosCoin'],
       *     account,
       * });
       */
      entry: new Proxy({} as ABIEntryClient<T>, {
        get: (_, prop) => {
          const functionName = prop.toString();
          return (...args) => {
            const payload = createEntryPayload(abi, {
              function: functionName,
              type_arguments: args[0].type_arguments,
              arguments: args[0].arguments,
            });
            return args[0].isSimulation
              ? this.simulateTransaction(payload, { account: args[0].account })
              : this.submitTransaction(payload, { account: args[0].account });
          };
        },
      }),

      /**
       * Get account resource.
       *
       * @example
       * const { data } = await client.useABI(COIN_ABI).resource.CoinStore({
       *     type_arguments: ['0x1::aptos_coin::AptosCoin'],
       *     account: '0x1',
       * });
       */
      resource: new Proxy({} as ABIResourceClient<TABITable, T>, {
        get: (_, prop) => {
          let structName = prop.toString();
          return (...args) => {
            if (args[0].type_arguments.length !== 0) {
              structName += `<${args[0].type_arguments.join(',')}>`;
            }
            return this.client.getAccountResource(
              args[0].account,
              `${abi.address}::${abi.name}::${structName}`,
              {
                ledgerVersion: args[0].ledger_version,
              }
            );

            // TODO: decode the u64, u128, u256 to bigint
          };
        },
      }),
    };
  }

  private async generateRawTxn(payload: EntryPayload, options: EntryOptions) {
    const { account } = options;
    const entryFunctionPayload =
      new TxnBuilderTypes.TransactionPayloadEntryFunction(payload.entryRequest);

    // Create a raw transaction out of the transaction payload
    const rawTxn = await this.client.generateRawTransaction(
      account.address(),
      entryFunctionPayload,
    );
    return rawTxn;
  }
}
