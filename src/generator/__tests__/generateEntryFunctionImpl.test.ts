import { generateEntryFunctionImpl } from '../generateEntryFunctionImpl.js';

describe('generate entry function impl', () => {
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('generate', () => {
    const result = generateEntryFunctionImpl(
      {
        name: 'transfer',
        visibility: 'public',
        is_entry: true,
        is_view: false,
        generic_type_params: [
          {
            constraints: [],
          },
        ],
        params: ['&signer', 'address', 'u64'],
        return: [],
      },
      {
        address: '0x1',
        name: 'coin',
      } as ABIRoot,
    );

    expect(result).toMatchInlineSnapshot(`
      "
          export async function submitCoinTransfer(
              client: AptosClient,
              account: AptosAccount,
              request: {
                  type_arguments: [MoveStruct],
                  arguments: [MovePrimitiveAddress, MovePrimitiveU64],
              }
          ): Promise<string> {
              const entryFunction = TxnBuilderTypes.EntryFunction.natural(
                  "0x1::coin",
                  "transfer",
                  request.type_arguments.map(type => new TxnBuilderTypes.TypeTagStruct(
                      TxnBuilderTypes.StructTag.fromString(type)
                  )),
                  [
                      BCS.bcsToBytes(
                      TxnBuilderTypes.AccountAddress.fromHex(request.arguments[0])
                  ),
      BCS.bcsSerializeUint64(request.arguments[1])
                  ]
              );
              return submitEntryFunctionImpl(client, account, entryFunction);
          }    
          "
    `);
  });
});
