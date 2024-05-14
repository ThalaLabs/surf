import { createViewPayload } from './createViewPayload.js';
import { createEntryPayload } from './createEntryPayload.js';
import {
  ABIEntryClient,
  ABIViewClient,
  ABIRoot,
  EntryPayload,
  ViewPayload,
  DefaultABITable,
  ABIResourceClient
} from '../types/index.js';
import { ABITable } from '../types/defaultABITable.js';
import { Aptos, LedgerVersionArg, MoveValue, Account, CommittedTransactionResponse, PublicKey, AccountAddressInput, UserTransactionResponse, WaitForTransactionOptions } from "@aptos-labs/ts-sdk";
import { PassThrough } from 'stream';

/**
 * Create a client to interact with Aptos smart contract.
 *
 * @param aptosClient The Aptos ts-sdk client.
 * @returns The Surf client object.
 * @example
 * const client = createSurfClient(new Aptos());
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
   * const payload = createViewPayload(COIN_ABI, {
   *   function: 'balance',
   *   functionArguments: ['0x1'],
   *   typeArguments: ['0x1::aptos_coin::AptosCoin'],
   * });
   * const [balance] = await client.view({ payload });
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
   * @param args.options Option properties to pass for waitForTransaction() function
   * @returns The transaction response.
   * @example
   * const payload = createEntryPayload(COIN_ABI, {
   *   function: 'transfer',
   *   functionArguments: ['0x1', 1],
   *   typeArguments: ['0x1::aptos_coin::AptosCoin'],
   * });
   *
   * const result = await client.submitTransaction({
   *   payload,
   *   signer: account,
   * });
   */
  public async submitTransaction(args: {
    signer: Account,
    payload: EntryPayload,
    options?: WaitForTransactionOptions
  }): Promise<CommittedTransactionResponse> {
    const transaction = await this.client.transaction.build.simple({
      sender: args.signer.accountAddress.toString(),
      data: args.payload,
    });

    // Submit the transaction
    const transactionRes = await this.client.transaction.signAndSubmitTransaction({
      signer: args.signer,
      transaction,
    });

    // Wait for the transaction to finish
    // throws an error if the tx fails or not confirmed after timeout
    return await this.client.waitForTransaction({
      transactionHash: transactionRes.hash,
      options: args.options ?? {},
    });
  }

  /**
   * Simulate a transaction.
   *
   * @param args.publicKey The sender public key
   * @param args.sender The sender address
   * @param args.payload The payload object created by `createEntryPayload`.
   * @returns The transaction response.
   * @example
   * const payload = createEntryPayload(COIN_ABI, {
   *   function: 'transfer',
   *   functionArguments: ['0x1', 1],
   *   typeArguments: ['0x1::aptos_coin::AptosCoin'],
   * });
   *
   * const result = await client.simulateTransaction({
   *   payload,
   *   sender: account.accountAddress,
   *   publicKey: account.publicKey,
   * });
   */
  public async simulateTransaction(args: {
    publicKey: PublicKey,
    sender: AccountAddressInput,
    payload: EntryPayload,
  }): Promise<UserTransactionResponse> {
    const transaction = await this.client.transaction.build.simple({
      sender: args.sender,
      data: args.payload,
    });

    return (await this.client.transaction.simulate.simple({
      signerPublicKey: args.publicKey,
      transaction,
    }))[0]!;
  }

  /**
   * Builds ABI from a provided address and module name for given client. ABI name can be taken from abi.name
   * 
   * @param address The module address
   * @param moduleName The module name
   * @returns The constructed ABI
   * @example
   * const abi = await client.fetchABI(address = '0x1', moduleName = 'AptosCoin');
   */
  public async fetchABI<T extends ABIRoot>(address: string, moduleName: string): Promise<T> {
      // Fetches ABI fom address and module name for given client
      // throws if inexistent module name in address for given client
      return (await this.client.getAccountModule({ accountAddress: address, moduleName: moduleName })).abi as unknown as T;
  }

  /**
   * Create a client associated with a specific ABI.
   *
   * @param abi The ABI JSON.
   * @param address The address of the module. If not provided, ABI address will be used.
   * @returns A client can call view/entry functions or get account resource.
   * @example
   * const [balance] = await client.useABI(COIN_ABI).view.balance({
   *    functionArguments: ['0x1'],
   *    typeArguments: ['0x1::aptos_coin::AptosCoin'],
   * });
   */
  public useABI<T extends ABIRoot>(abi: T, address?: string) {
    if (address) abi.address = address;
    return {
      /**
       * Queries for a Move view function
       *
       * @example
       * const [balance] = await client.useABI(COIN_ABI).view.balance({
       *     functionArguments: ['0x1'],
       *     typeArguments: ['0x1::aptos_coin::AptosCoin'],
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
       *     functionArguments: ['0x1', 1],
       *     typeArguments: ['0x1::aptos_coin::AptosCoin'],
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
              })
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
       *     typeArguments: ['0x1::aptos_coin::AptosCoin'],
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
