/**
 * These test cases depends on network, it call the real contract.
 */

import { AptosAccount } from 'aptos';
import { COIN_ABI } from '../../abi/coin';
import { createSurfClient } from '../Client';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

describe('useABI', () => {
  const client = createSurfClient(
    new Aptos(
      new AptosConfig({ network: Network.TESTNET })
    )
  );

  const account = new AptosAccount(
    undefined,
    '0xac914efd2367c7aa42c95d100592c099e487d2270bf0e0761e5fe93ff4016593',
  );

  // Act before assertions
  beforeAll(async () => { });

  // Teardown (cleanup) after assertions
  afterAll(() => { });

  it('basic type checking', async () => {
    // no need to run, type check only
    () => {
      // @ts-expect-error cannot call a function not exist
      client.useABI(COIN_ABI).view.not_exist_func({
        arguments: ['0x1'],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      });

      // @ts-expect-error cannot call a entry function from view
      client.useABI(COIN_ABI).view.transfer({
        arguments: ['0x1'],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      });

      // @ts-expect-error cannot call a view function from entry
      client.useABI(COIN_ABI).entry.balance({
        arguments: ['0x1'],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      });

      client.useABI(TEST_ABI).view.address_as_input({
        // @ts-expect-error require two args
        arguments: ['0x1'],
        type_arguments: [],
      });

      client.useABI(TEST_ABI).view.address_as_input({
        // @ts-expect-error require address
        arguments: ['0x1', 1],
        type_arguments: [],
      });

      client.useABI(COIN_ABI).entry.transfer({
        arguments: ['0x1', 1],
        // @ts-expect-error require a type argument
        type_arguments: [],
        account,
      });

      // @ts-expect-error account is required for entry function
      client.useABI(COIN_ABI).entry.transfer({
        arguments: ['0x1', 1],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      });
    };
  });

  it('view', async () => {
    const result = await client.useABI(COIN_ABI).view.name({
      arguments: [],
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "Aptos Coin",
      ]
    `);

    const result2 = await client.useABI(COIN_ABI).view.decimals({
      arguments: [],
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
    });
    expect(result2).toMatchInlineSnapshot(`
      [
        8,
      ]
    `);
  }, 60000);

  it('view with ledger version', async () => {
    const result = await client.useABI(COIN_ABI).view.balance({
      arguments: ['0x1'],
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
      ledger_version: '562606728',
    });
    expect(result).toMatchInlineSnapshot(`
      [
        50000358n,
      ]
    `);
  }, 60000);

  it('entry', async () => {
    const result = await client.useABI(COIN_ABI).entry.transfer({
      arguments: ['0x1', 1],
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
      account,
      isSimulation: true,
    });
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
});

const TEST_ABI = {
  address: '0x123',
  name: 'test',
  friends: [],
  exposed_functions: [
    {
      name: 'address_as_input',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address', 'address'],
      return: [],
    },
  ],
  structs: [],
} as const;
