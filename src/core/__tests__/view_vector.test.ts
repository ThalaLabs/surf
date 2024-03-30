/**
 * These test cases depends on network, it call the real contract.
 */

import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { createSurfClient } from '../Client.js';
import { createViewPayload } from '../createViewPayload.js';

// TODO: add vector<address>, vector<vector>
describe('call view functions for vector type', () => {
  const client = createSurfClient(
    new Aptos(
      new AptosConfig({ network: Network.TESTNET })
    )
  );
  // Act before assertions
  beforeAll(async () => { });

  // Teardown (cleanup) after assertions
  afterAll(() => { });

  it('vector_bool', async () => {
    const viewPayload = createViewPayload(TEST_ABI, {
      function: 'test_view_function_bool',
      functionArguments: [[true, false, false, true, true]],
      typeArguments: [],
    });
    const result = await client.view({ payload: viewPayload });
    expect(result).toMatchInlineSnapshot(`
      [
        3,
      ]
    `);
  }, 60000);

  it('vector_u8 array', async () => {
    const viewPayload = createViewPayload(TEST_ABI, {
      function: 'test_view_function_u8',
      functionArguments: [[1, 2, 3, 10, 50]],
      typeArguments: [],
    });
    const result = await client.view({ payload: viewPayload });
    expect(result).toMatchInlineSnapshot(`
      [
        66,
      ]
    `);
  }, 60000);

  it('vector_u8 string', async () => {
    const viewPayload = createViewPayload(TEST_ABI, {
      function: 'test_view_function_u8',
      functionArguments: ["00"],
      typeArguments: [],
    });
    const result = await client.view({ payload: viewPayload });
    expect(result).toMatchInlineSnapshot(`
    [
      96,
    ]
  `);
  }, 60000);

  it('vector_u16', async () => {
    const viewPayload = createViewPayload(TEST_ABI, {
      function: 'test_view_function_u16',
      functionArguments: [[256, 100]],
      typeArguments: [],
    });
    const result = await client.view({ payload: viewPayload });
    expect(result).toMatchInlineSnapshot(`
      [
        356,
      ]
    `);
  }, 60000);

  it('vector_u32', async () => {
    const viewPayload = createViewPayload(TEST_ABI, {
      function: 'test_view_function_u32',
      functionArguments: [[70000, 100]],
      typeArguments: [],
    });
    const result = await client.view({ payload: viewPayload });
    expect(result).toMatchInlineSnapshot(`
      [
        70100,
      ]
    `);
  }, 60000);

  it('vector_u64', async () => {
    const viewPayload = createViewPayload(TEST_ABI, {
      function: 'test_view_function_u64',
      functionArguments: [[BigInt('4294967296'), 100]],
      typeArguments: [],
    });
    const result = await client.view({ payload: viewPayload });
    expect(result).toMatchInlineSnapshot(`
[
  "4294967396",
]
`);
  }, 60000);

  it('vector_u256', async () => {
    const viewPayload = createViewPayload(TEST_ABI, {
      function: 'test_view_function_u256',
      functionArguments: [[BigInt('4294967296'), 100]],
      typeArguments: [],
    });
    const result = await client.view({ payload: viewPayload });
    expect(result).toMatchInlineSnapshot(`
[
  "4294967396",
]
`);
  }, 60000);

  it('return vector', async () => {
    const viewPayload = createViewPayload(TEST_ABI, {
      function: 'test_view_function_u64_return_vector',
      functionArguments: [[BigInt('4294967296'), 100]],
      typeArguments: [],
    });
    const result = await client.view({ payload: viewPayload });
    expect(result).toMatchInlineSnapshot(`
[
  [
    "4294967296",
    "100",
  ],
]
`);
  }, 60000);
});

const TEST_ABI = {
  address: '0xf1ab5cd814ef1480b8c36466310d9c21d7758b54f6121872d1fb43887a40e7d8',
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
      name: 'test_view_function_bool',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['vector<bool>'],
      return: ['u32'],
    },
    {
      name: 'test_view_function_u128',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['vector<u128>'],
      return: ['u128'],
    },
    {
      name: 'test_view_function_u16',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['vector<u16>'],
      return: ['u16'],
    },
    {
      name: 'test_view_function_u256',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['vector<u256>'],
      return: ['u256'],
    },
    {
      name: 'test_view_function_u32',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['vector<u32>'],
      return: ['u32'],
    },
    {
      name: 'test_view_function_u64',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['vector<u64>'],
      return: ['u64'],
    },
    {
      name: 'test_view_function_u64_return_vector',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['vector<u64>'],
      return: ['vector<u64>'],
    },
    {
      name: 'test_view_function_u8',
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
