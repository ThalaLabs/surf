/**
 * These test cases depends on network, it call the real contract.
 */

import { COIN_ABI } from '../../abi/coin';
import { createSurfClient } from '../Client';
import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from '@aptos-labs/ts-sdk';

describe('useABI', () => {
  const client = createSurfClient(
    new Aptos(
      new AptosConfig({ network: Network.TESTNET })
    )
  );

  const account = Account.fromPrivateKey({ privateKey: new Ed25519PrivateKey("0x4b0a52d0b047b6868d9650fdb9b61720e361ba74f40571635fec0694a838eb98") });

  // Act before assertions
  beforeAll(async () => { });

  // Teardown (cleanup) after assertions
  afterAll(() => { });

  it('basic type checking', async () => {
    // no need to run, type check only
    () => {
      // @ts-expect-error cannot call a function not exist
      client.useABI(COIN_ABI).view.not_exist_func({
        functionArguments: ['0x1'],
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
      });

      // @ts-expect-error cannot call a entry function from view
      client.useABI(COIN_ABI).view.transfer({
        functionArguments: ['0x1'],
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
      });

      // @ts-expect-error cannot call a view function from entry
      client.useABI(COIN_ABI).entry.balance({
        arguments: ['0x1'],
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
      });

      client.useABI(TEST_ABI).view.address_as_input({
        // @ts-expect-error require two args
        functionArguments: ['0x1'],
        typeArguments: [],
      });

      client.useABI(TEST_ABI).view.address_as_input({
        // @ts-expect-error require address
        functionArguments: ['0x1', 1],
        typeArguments: [],
      });

      client.useABI(COIN_ABI).entry.transfer({
        functionArguments: ['0x1', 1],
        // @ts-expect-error require a type argument
        typeArguments: [],
        account,
      });

      // @ts-expect-error account is required for entry function
      client.useABI(COIN_ABI).entry.transfer({
        functionArguments: ['0x1', 1],
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
      });
    };
  });

  it('view', async () => {
    const result = await client.useABI(COIN_ABI).view.name({
      functionArguments: [],
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "Aptos Coin",
      ]
    `);

    const result2 = await client.useABI(COIN_ABI).view.decimals({
      functionArguments: [],
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
    });
    expect(result2).toMatchInlineSnapshot(`
      [
        8,
      ]
    `);
  }, 60000);

  it('view with ledger version', async () => {
    const result = await client.useABI(COIN_ABI).view.balance({
      functionArguments: ['0x1'],
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
      ledgerVersion: '562606728',
    });
    expect(result).toMatchInlineSnapshot(`
[
  "50000358",
]
`);
  }, 60000);

  it('entry', async () => {
    const result = await client.useABI(COIN_ABI).entry.transfer({
      functionArguments: ['0x1', 1],
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
      account,
      isSimulation: true,
    });

    expect(result?.hash).toBeDefined();
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
    {
      name: 'pick_a_random_number',
      visibility: 'private',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: [],
      return: [],
    }
  ],
  structs: [],
} as const;
