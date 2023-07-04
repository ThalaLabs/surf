/**
 * These test cases depends on network, it call the real contract.
 */

import { COIN_ABI } from '../../abi/coin';
import { FIXED_POINT64_ABI } from '../../abi/fixed_point64';
import { DefaultABITable } from '../../types';
import { createClient } from '../Client';

describe('get account resource', () => {
  const client = createClient({
    nodeUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
  });

  // Act before assertions
  beforeAll(async () => { });

  // Teardown (cleanup) after assertions
  afterAll(() => { });

  it('get CoinStore', async () => {
    const result = await client.useABI(COIN_ABI).resource.CoinStore({
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
      account: '0x1',
    });

    expect(result.data.frozen).toBeFalsy();
    expect(result.data.coin).toBeDefined();
    expect(result.data.deposit_events).toBeDefined();
    expect(result.data.withdraw_events).toBeDefined();

    // can inference nested struct
    expect(result.data.deposit_events.guid.id.creation_num.startsWith).toBeDefined();

    // @ts-expect-error field not exist
    expect(result.data.deposit_events.guid.id.abc).toBeUndefined();

    // @ts-expect-error field not exist
    expect(result.abc).toBeUndefined();
  }, 60000);

  it('use customized ABITable', async () => {
    async () => {
      type ABITAble = DefaultABITable & {
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64': typeof FIXED_POINT64_ABI,
      };

      const client = createClient<ABITAble>({
        nodeUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
      });

      const result = await client.useABI(TEST_ABI).resource.TestStruct({
        type_arguments: [],
        account: '0x1',
      });

      result.data.coin.value.startsWith;
      result.data.ratio.v;

      // @ts-expect-error field not exist
      result.data.ratio.abc;
    }
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
          "name": "ratio",
          "type": "0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64"
        },
        {
          "name": "coin",
          "type": "0x1::coin::Coin<T0>"
        },
      ],
    },
  ],
} as const;
