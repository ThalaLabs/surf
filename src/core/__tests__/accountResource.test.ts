/**
 * These test cases depends on network, it call the real contract.
 */

import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { COIN_ABI } from '../../abi/coin';
import { FIXED_POINT64_ABI } from '../../abi/fixed_point64';
import { DefaultABITable } from '../../types';
import { createSurfClient } from '../Client.js';

describe('get account resource', () => {
  const client = createSurfClient(
    new Aptos(new AptosConfig({ network: Network.TESTNET })),
  );

  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('get CoinInfo', async () => {
    const result = await client.useABI(COIN_ABI).resource.CoinInfo({
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
      account: '0x1',
    });

    expect(result).toMatchInlineSnapshot(`
{
  "decimals": 8,
  "name": "Aptos Coin",
  "supply": {
    "vec": [
      {
        "aggregator": {
          "vec": [
            {
              "handle": "0x1b854694ae746cdbd8d44186ca4929b2b337df21d1c74633be19b2710552fdca",
              "key": "0x619dc29a0aac8fa146714058e8dd6d2d0f3bdf5f6331907bf91f3acd81e6935",
              "limit": "340282366920938463463374607431768211455",
            },
          ],
        },
        "integer": {
          "vec": [],
        },
      },
    ],
  },
  "symbol": "APT",
}
`);
  }, 60000);

  it('get CoinInfo with ledger version', async () => {
    const result = await client.useABI(COIN_ABI).resource.CoinInfo({
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
      account: '0x1',
      ledgerVersion: '562606728',
    });

    expect(result).toMatchInlineSnapshot(`
{
  "decimals": 8,
  "name": "Aptos Coin",
  "supply": {
    "vec": [
      {
        "aggregator": {
          "vec": [
            {
              "handle": "0x1b854694ae746cdbd8d44186ca4929b2b337df21d1c74633be19b2710552fdca",
              "key": "0x619dc29a0aac8fa146714058e8dd6d2d0f3bdf5f6331907bf91f3acd81e6935",
              "limit": "340282366920938463463374607431768211455",
            },
          ],
        },
        "integer": {
          "vec": [],
        },
      },
    ],
  },
  "symbol": "APT",
}
`);
  }, 60000);

  it('use customized ABITable', async () => {
    async () => {
      type ABITAble = [...DefaultABITable, ...[typeof FIXED_POINT64_ABI]];

      const client = createSurfClient<ABITAble>(
        new Aptos(new AptosConfig({ network: Network.TESTNET })),
      );

      const result = await client.useABI(TEST_ABI).resource.TestStruct({
        typeArguments: [],
        account: '0x1',
      });

      // `value` and `v` are string type
      result.coin.value.startsWith;
      result.ratio.v.startsWith;

      // @ts-expect-error field not exist
      result.ratio.abc;
    };
  }, 60000);

  it('vector struct type', async () => {
    async () => {
      const result = await client.useABI(TEST_ABI).resource.TestVectorStruct({
        typeArguments: [],
        account: '0x1',
      });

      result.coins[0]?.value.startsWith;
    };
  }, 60000);

  it('option type', async () => {
    const data = await client.useABI(COIN_ABI).resource.CoinInfo({
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
      account: '0x1',
    });

    expect(data.supply.vec[0]?.aggregator.vec).toBeDefined();
    expect(data.supply.vec[0]?.integer.vec).toBeDefined();

    // @ts-expect-error out of index, option only has 0 or 1 item
    expect(data.supply.vec[1]).toBeUndefined();
  }, 60000);

  it('object type', async () => {
    async () => {
      const data = await client.useABI(TEST_ABI).resource.TestObjectStruct({
        typeArguments: [],
        account: '0x1',
      });

      expect(data.objects[0]!.inner).toBeDefined();
    };
  }, 60000);
});

const TEST_ABI = {
  address: '0xf1ab5cd814ef1480b8c36466310d9c21d7758b54f6121872d1fb43887a40e7d8',
  name: 'test',
  friends: [],
  exposed_functions: [],
  structs: [
    {
      name: 'TestStruct',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'ratio',
          type: '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        },
        {
          name: 'coin',
          type: '0x1::coin::Coin<T0>',
        },
      ],
    },
    {
      name: 'TestVectorStruct',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'coins',
          type: 'vector<0x1::coin::Coin<T0>>',
        },
      ],
    },
    {
      name: 'TestObjectStruct',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'objects',
          type: 'vector<0x1::object::Object<0x123::abc::Abc>>',
        },
      ],
    },
  ],
} as const;
