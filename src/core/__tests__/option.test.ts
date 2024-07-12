/**
 * These test cases depends on network, it call the real contract.
 */

import { createSurfClient } from '../Client';
import { createEntryPayload } from '../createEntryPayload';
import {
  Account,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
  Network,
} from '@aptos-labs/ts-sdk';

describe('option type', () => {
  const client = createSurfClient(
    new Aptos(new AptosConfig({ network: Network.TESTNET })),
  );

  const account = Account.fromPrivateKey({
    privateKey: new Ed25519PrivateKey(
      '0x4b0a52d0b047b6868d9650fdb9b61720e361ba74f40571635fec0694a838eb98',
    ),
  });

  // TODO: correctly encode option type for view function
  //   it('view function some value', async () => {
  //     const payload = createViewPayload(OPTION_ABI, {
  //       function: 'test_option_view',
  //       functionArguments: [{ vec: ['50'] } as any],
  //       typeArguments: [],
  //     });
  //     const result = await client.view({ payload });
  //     expect(result).toMatchInlineSnapshot(`
  // [
  //   "50",
  // ]
  // `);
  //   }, 60000);

  //   it('view function none value', async () => {
  //     const payload = createViewPayload(OPTION_ABI, {
  //       function: 'test_option_view',
  //       functionArguments: [{ vec: [] } as any],
  //       typeArguments: [],
  //     });
  //     const result = await client.view({ payload });
  //     expect(result).toMatchInlineSnapshot(`
  // [
  //   "0",
  // ]
  // `);
  //   }, 60000);

  it('entry function none value', async () => {
    const payload = createEntryPayload(OPTION_ABI, {
      function: 'test_option_entry',
      functionArguments: [undefined],
      typeArguments: [],
    });

    const result = await client.simulateTransaction({
      publicKey: account.publicKey,
      sender: account.accountAddress.toString(),
      payload,
    });

    expect(result?.hash).toBeDefined();
    expect((result as any).payload).toMatchInlineSnapshot(`
      {
        "arguments": [
          {
            "vec": [],
          },
        ],
        "function": "0xf1ab5cd814ef1480b8c36466310d9c21d7758b54f6121872d1fb43887a40e7d8::test_option::test_option_entry",
        "type": "entry_function_payload",
        "type_arguments": [],
      }
    `);
  }, 60000);

  it('entry function some value', async () => {
    const payload = createEntryPayload(OPTION_ABI, {
      function: 'test_option_entry',
      functionArguments: [50],
      typeArguments: [],
    });

    const result = await client.simulateTransaction({
      publicKey: account.publicKey,
      sender: account.accountAddress.toString(),
      payload,
    });

    expect(result?.hash).toBeDefined();
    expect((result as any).payload).toMatchInlineSnapshot(`
      {
        "arguments": [
          {
            "vec": [
              "50",
            ],
          },
        ],
        "function": "0xf1ab5cd814ef1480b8c36466310d9c21d7758b54f6121872d1fb43887a40e7d8::test_option::test_option_entry",
        "type": "entry_function_payload",
        "type_arguments": [],
      }
    `);
  }, 60000);

  it('entry function incorrect type', async () => {
    // no need to run, only for type check
    () => {
      createEntryPayload(OPTION_ABI, {
        function: 'test_option_entry',
        // @ts-expect-error should be a vector
        arguments: [{}],
        type_arguments: [],
      });

      createEntryPayload(OPTION_ABI, {
        function: 'test_option_entry',
        // @ts-expect-error should be a vector with length 0 or 1
        arguments: [[1, 2]],
        type_arguments: [],
      });
    };
  }, 60000);
});

const OPTION_ABI = {
  address: '0xf1ab5cd814ef1480b8c36466310d9c21d7758b54f6121872d1fb43887a40e7d8',
  name: 'test_option',
  friends: [],
  exposed_functions: [
    {
      name: 'test_option_entry',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ['0x1::option::Option<u64>'],
      return: [],
    },
    {
      name: 'test_option_view',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['0x1::option::Option<u64>'],
      return: ['u64'],
    },
  ],
  structs: [],
} as const;
