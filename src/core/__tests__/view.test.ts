/**
 * These test cases depends on network, it call the real contract.
 */

import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { COIN_ABI } from '../../abi/coin.js';
import { createSurfClient } from '../Client.js';
import { createViewPayload } from '../createViewPayload.js';

describe('call view functions', () => {
  const client = createSurfClient(
    new Aptos(new AptosConfig({ network: Network.TESTNET })),
  );

  const clientMain = createSurfClient(
    new Aptos(new AptosConfig({ network: Network.MAINNET })),
  );
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('basic', async () => {
    const viewPayload = createViewPayload(COIN_ABI, {
      function: 'name',
      functionArguments: [],
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
    });
    const result = await client.view({ payload: viewPayload });
    expect(result).toMatchInlineSnapshot(`
      [
        "Aptos Coin",
      ]
    `);

    const viewPayload2 = createViewPayload(COIN_ABI, {
      function: 'decimals',
      functionArguments: [],
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
    });
    const result2 = await client.view({ payload: viewPayload2 });
    expect(result2).toMatchInlineSnapshot(`
      [
        8,
      ]
    `);
  }, 60000);

  it('ledger version', async () => {
    const viewPayload = createViewPayload(COIN_ABI, {
      function: 'balance',
      functionArguments: ['0x1'],
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
    });
    const result = await client.view({
      payload: viewPayload,
      options: {
        ledgerVersion: 562606728,
      },
    });
    expect(result).toMatchInlineSnapshot(`
[
  "50000358",
]
`);
  }, 60000);

  it('return struct', async () => {
    const viewPayload = createViewPayload(TIERED_ORACLE_ABI, {
      function: 'get_last_price',
      functionArguments: [],
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
    });

    // The declaration in Move:
    // struct FixedPoint64 has copy, drop, store { value: u128 }
    const result = await clientMain.view({ payload: viewPayload });
    expect(result.length).toBe(1);
    expect((result[0] as any).v).toBeDefined();
    expect(typeof (result[0] as any).v).toEqual('string');
  }, 60000);

  it('return objects', async () => {
    // no need to run, type check only.
    async () => {
      const viewPayload = createViewPayload(TIERED_ORACLE_ABI, {
        function: 'get_objects',
        functionArguments: [],
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
      });

      // The declaration in Move:
      // struct FixedPoint64 has copy, drop, store { value: u128 }
      const result = await clientMain.view({ payload: viewPayload });

      result[0][0]!.inner;

      // @ts-expect-error
      result[0][0].abc;
    };
  }, 60000);

  it('return options', async () => {
    // no need to run, type check only.
    async () => {
      const viewPayload = createViewPayload(TIERED_ORACLE_ABI, {
        function: 'get_options',
        functionArguments: [],
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
      });

      // The declaration in Move:
      // struct FixedPoint64 has copy, drop, store { value: u128 }
      const result = await clientMain.view({ payload: viewPayload });

      result[0][0]!.vec[0];

      // @ts-expect-error out of range, option only has 0 or 1 item
      result[0][0]!.vec[1];

      // @ts-expect-error
      result[0][0].abc;
    };
  }, 60000);
});

const TIERED_ORACLE_ABI = {
  address: '0x92e95ed77b5ac815d3fbc2227e76db238339e9ca43ace45031ec2589bea5b8c',
  name: 'tiered_oracle',
  friends: [
    '0x92e95ed77b5ac815d3fbc2227e76db238339e9ca43ace45031ec2589bea5b8c::oracle',
  ],
  exposed_functions: [
    {
      name: 'get_last_price',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: [],
        },
      ],
      params: [],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'get_objects',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: [],
        },
      ],
      params: [],
      return: ['vector<0x1::object::Object<0x123::abc::Abc>>'],
    },
    {
      name: 'get_options',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: [],
        },
      ],
      params: [],
      return: ['vector<0x1::option::Option<0x123::abc::Abc>>'],
    },
  ],
  structs: [],
} as const;
