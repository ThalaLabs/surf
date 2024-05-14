/**
 * These test cases depends on network, it call the real contract.
 */

import { COIN_ABI } from '../../abi/coin';
import { createSurfClient } from '../Client.js';
import { createEntryPayload } from '../createEntryPayload.js';
import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from '@aptos-labs/ts-sdk';

describe('call entry functions', () => {
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

  it('basic', async () => {
    const entryPayload = createEntryPayload(COIN_ABI, {
      function: 'transfer',
      functionArguments: ['0x1', 1],
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
    });

    const result = await client.simulateTransaction({
      payload: entryPayload,
      sender: account.accountAddress,
      publicKey: account.publicKey,
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

  it('vector', async () => {
    const entryPayload = createEntryPayload(TEST_ABI, {
      function: 'test_run_function',
      functionArguments: [[1, 2, 3, 10, 20, 30]],
      typeArguments: [],
    });

    const result = await client.simulateTransaction({
      payload: entryPayload,
      sender: account.accountAddress,
      publicKey: account.publicKey,
    });

    expect(result?.hash).toBeDefined();
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
    const inputString = [1,2,34];
    const entryPayload = createEntryPayload(TEST_ABI, {
      function: 'test_run_function',
      functionArguments: [inputString],
      typeArguments: [],
    });

    const result = await client.simulateTransaction({
      payload: entryPayload,
      sender: account.accountAddress,
      publicKey: account.publicKey,
    });

    expect(result?.hash).toBeDefined();
    expect((result as any).payload.arguments[0]).toEqual("0x010222");
  }, 60000);


  it('vector<u8> hex string', async () => {
    const inputString = "1234ab";
    const entryPayload = createEntryPayload(TEST_ABI, {
      function: 'test_run_function',
      functionArguments: [inputString],
      typeArguments: [],
    });

    const result = await client.simulateTransaction({
      payload: entryPayload,
      sender: account.accountAddress,
      publicKey: account.publicKey,
    });

    expect(result?.hash).toBeDefined();
    expect((result as any).payload.arguments[0]).toEqual("0x313233346162");
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
