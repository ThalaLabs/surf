/**
 * These test cases depends on network, it call the real contract.
 */

import { COIN_ABI } from '../../abi/coin';
import { createClient } from '../Client';

describe('get account resource', () => {
  const client = createClient({
    nodeUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
  });

  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

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
    expect(result.data.deposit_events.guid.id.creation_num).toBeDefined();

    // @ts-expect-error field not exist
    expect(result.data.deposit_events.guid.id.abc).toBeUndefined();

    // @ts-expect-error field not exist
    expect(result.abc).toBeUndefined();
  }, 60000);
});
