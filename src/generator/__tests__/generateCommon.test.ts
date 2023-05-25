import { generateCommon } from '../generateCommon.js';

describe('generate function', () => {
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('generate function basic', () => {
    const result = generateCommon();
    expect(result).toMatchInlineSnapshot(`
      "
          import { AptosClient as Client } from 'aptos';
          
          type ViewRequest<T0 extends MoveViewFunction,
              T1 extends AllViewFunctions[T0]['types'],
              T2 extends AllViewFunctions[T0]['args'],
          > = {
              function: T0;
              /**
               * Type arguments of the function
               */
              type_arguments: T1;
              /**
               * Arguments of the function
               */
              arguments: T2;
          }
          
          export class AptosClient {
              // TODO: make this configurable
              client: Client = new Client('https://fullnode.testnet.aptoslabs.com/v1');
              serverClient = new Client(
                  "https://aptos-mainnet.nodereal.io/v1/742235cb25ef46c3aee41db5681af358"
              );

              constructor() {
                  this.client
              }

              async view<T0 extends MoveViewFunction,
                  T1 extends AllViewFunctions[T0]['types'],
                  T2 extends AllViewFunctions[T0]['args'],
                  T3 extends AllViewFunctions[T0]['return'],
              >(request: ViewRequest<T0, T1, T2>): Promise<T3> {
                  // TODO: serialization for input, and deserialization for output
                  return this.client.view(request) as Promise<T3>;
              }

              // TODO: the submit function hasn't tested
              // TODO: Move the account argument to constructor
              // TODO: add types
              // TODO: We may need to generate some metadata, otherwise how could we correctly serialize args?
              // Another way is fetch the ABI on the fly.
              // async submit(
              //     account: AptosAccount,
              //     entryFunction: TxnBuilderTypes.EntryFunction
              // ): Promise<string> {
              //     const entryFunctionPayload =
              //         new TxnBuilderTypes.TransactionPayloadEntryFunction(entryFunction);

              //     // Create a raw transaction out of the transaction payload
              //     const rawTxn = await this.serverClient.generateRawTransaction(
              //         account.address(),
              //         entryFunctionPayload
              //     );

              //     // Sign the raw transaction with account's private key
              //     const bcsTxn = Client.generateBCSTransaction(account, rawTxn);

              //     // Submit the transaction
              //     const transactionRes = await this.serverClient.submitSignedBCSTransaction(
              //         bcsTxn
              //     );

              //     // Wait for the transaction to finish
              //     // throws an error if the tx fails or not confirmed after timeout
              //     await this.serverClient.waitForTransaction(transactionRes.hash, {
              //         timeoutSecs: 120,
              //         checkSuccess: true,
              //     });
              //     return transactionRes.hash;
              // }
          }
          
          type MovePrimitiveU8 = number;
          type MovePrimitiveU16 = number;
          type MovePrimitiveU32 = number;
          type MovePrimitiveU64 = bigint;
          type MovePrimitiveU128 = bigint;
          type MovePrimitiveU256 = bigint;
          type MovePrimitiveAddress = \`0x\${string}\`;
          type MovePrimitiveBool = boolean;
          type MoveString = string;
          "
    `);
  });
});
