import { createViewPayload } from './createViewPayload.js';
import { createEntryPayload } from './createEntryPayload.js';
import {
  ABIEntryClient,
  ABIViewClient,
  ABIRoot,
  EntryPayload,
  ViewPayload,
  DefaultABITable,
  ABIResourceClient,
} from '../types/index.js';
import { ABITable } from '../types/defaultABITable.js';
import { Aptos, LedgerVersionArg, MoveValue, Account, CommittedTransactionResponse, PublicKey, AccountAddressInput, UserTransactionResponse } from "@aptos-labs/ts-sdk";

/**
 * Create a client to interact with Aptos smart contract.
 *
 * @param aptosClient The Aptos ts-sdk client.
 * @returns The Surf client object.
 */
export function createSurfClient<
  TABITable extends ABITable = DefaultABITable,
>(aptosClient: Aptos): Client<TABITable> {
  return new Client<TABITable>(aptosClient);
}
export class Client<TABITable extends ABITable> {
  private client: Aptos;

  constructor(client: Aptos) {
    this.client = client;
  }

  /**
   * Queries for a Move view function
   *
   * @param args.payload The payload object created by `createViewPayload`.
   * @param options.ledgerVersion Specifies ledger version of transactions. By default latest version will be used.
   * @returns an array of Move values
   * @example
   * const viewPayload = createViewPayload(COIN_ABI, {
   *   function: 'balance',
   *   arguments: ['0x1'],
   *   type_arguments: ['0x1::aptos_coin::AptosCoin'],
   * });
   * const [balance] = await client.view(viewPayload);
   */
  public async view<TReturn extends MoveValue[]>(args: {
    payload: ViewPayload<TReturn>,
    options?: LedgerVersionArg;
  }): Promise<TReturn> {
    return await this.client.view(args);
  }

  /**
   * Submit a transaction.
   *
   * @param args.signer The signer account to sign the transaction
   * @param args.payload The payload object created by `createEntryPayload`.
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
  public async submitTransaction(args: {
    signer: Account,
    payload: EntryPayload,
  }): Promise<CommittedTransactionResponse> {
    const transaction = await this.client.build.transaction({
      sender: args.signer.accountAddress.toString(),
      data: args.payload,
    });

    // Submit the transaction
    const transactionRes = await this.client.signAndSubmitTransaction({
      signer: args.signer,
      transaction,
    });

    // Wait for the transaction to finish
    // throws an error if the tx fails or not confirmed after timeout
    return await this.client.waitForTransaction({
      transactionHash: transactionRes.hash,
      options: {
        timeoutSecs: 120,
        checkSuccess: true,
      }
    });
  }

  /**
   * Simulate a transaction.
   *
   * @param args.signer The signer account to sign the transaction
   * @param args.payload The payload object created by `createEntryPayload`.
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
  public async simulateTransaction(args: {
    publicKey: PublicKey,
    sender: AccountAddressInput,
    payload: EntryPayload,
  }): Promise<Array<UserTransactionResponse>> {
    const transaction = await this.client.build.transaction({
      sender: args.sender,
      data: args.payload,
    });

    return await this.client.simulate.transaction({
      signerPublicKey: args.publicKey,
      transaction,
    });
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
       * Queries for a Move view function
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
              typeArguments: args[0].typeArguments,
              functionArguments: args[0].functionArguments,
            });
            return this.view({
              payload,
              options: {
                ledgerVersion: args[0].ledgerVersion,
              }
            });
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
              typeArguments: args[0].typeArguments,
              functionArguments: args[0].functionArguments,
            });

            const account: Account = args[0].account;
            return args[0].isSimulation
              ? this.simulateTransaction({
                publicKey: account.publicKey,
                sender: account.accountAddress.toString(),
                payload,
              }).then(result => result[0])
              : this.submitTransaction({
                signer: args[0].account,
                payload,
              });
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
            if (args[0].typeArguments.length !== 0) {
              structName += `<${args[0].typeArguments.join(',')}>`;
            }

            const account: AccountAddressInput = args[0].account;
            return this.client.getAccountResource(
              {
                accountAddress: account,
                resourceType: `${abi.address}::${abi.name}::${structName}`,
                options: {
                  ledgerVersion: args[0].ledgerVersion,
                }
              }
            );
          };
        },
      }),
    };
  }
}
