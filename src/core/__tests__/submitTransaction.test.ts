/**
 * These test cases depends on network, it call the real contract.
 */

import { AptosAccount } from 'aptos';
import { COIN_ABI } from '../../abi/coin';
import { createClient } from '../Client';
import { createEntryPayload } from '../createEntryPayload';

describe('call entry functions', () => {
  const client = createClient({
    nodeUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
  });

  const account = new AptosAccount(
    undefined,
    '0xac914efd2367c7aa42c95d100592c099e487d2270bf0e0761e5fe93ff4016593',
  );

  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('basic', async () => {
    const entryPayload = createEntryPayload(COIN_ABI, {
      function: 'transfer',
      arguments: ['0x1', 1],
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
    });

    const result = await client.simulateTransaction(entryPayload, { account });

    expect(result.hash).toBeDefined();
    expect((result as any).payload).toMatchInlineSnapshot(`
      {
        "arguments": [
          "0x1",
          "1",
        ],
        "function": "0x1::coin::transfer",
        "type": "entry_function_payload",
        "type_arguments": [
          "0x1::aptos_coin::AptosCoin",
        ],
      }
    `);
  }, 60000);

  it('vector', async () => {
    const entryPayload = createEntryPayload(TEST_ABI, {
      function: 'test_run_function',
      arguments: [[1, 2, 3, 10, 20, 30]],
      type_arguments: [],
    });

    const result = await client.simulateTransaction(entryPayload, { account });

    expect(result.hash).toBeDefined();
    expect((result as any).payload).toMatchInlineSnapshot(`
      {
        "arguments": [
          "0x0102030a141e",
        ],
        "function": "0x3d097bb505c9e5d8a96e367f371168240025877f6be8d4a88eacaafb709fe5c9::test::test_run_function",
        "type": "entry_function_payload",
        "type_arguments": [],
      }
    `);
  }, 60000);

  it('vector<u8>', async () => {
    const inputString = "a test string";
    const entryPayload = createEntryPayload(TEST_ABI, {
      function: 'test_run_function',
      arguments: [inputString],
      type_arguments: [],
    });

    const result = await client.simulateTransaction(entryPayload, { account });

    expect(result.hash).toBeDefined();
    expect((result as any).payload.arguments[0]).toEqual("0x61207465737420737472696e67");
  }, 60000);
});

const TEST_ABI = {
  address: '0x3d097bb505c9e5d8a96e367f371168240025877f6be8d4a88eacaafb709fe5c9',
  name: 'test',
  friends: [],
  exposed_functions: [
    {
      name: 'test_run_function',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ['&signer', 'vector<u8>'],
      return: [],
    },
    {
      name: 'test_view_function',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['vector<u8>'],
      return: ['u8'],
    },
  ],
  structs: [
    {
      name: 'RunFunctionStruct',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'sum',
          type: 'u8',
        },
      ],
    },
  ],
} as const;
