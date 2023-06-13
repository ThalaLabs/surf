/**
 * These test cases depends on network, it call the real contract.
 */

import { COIN_ABI } from '../../abi/coin';
import { createClient } from '../Client';
import { createViewPayload } from '../createViewPayload';

describe('call view functions', () => {
    const client = createClient({
        nodeUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
    });

    const clientMain = createClient({
        nodeUrl: 'https://fullnode.mainnet.aptoslabs.com/v1',
    });

    // Act before assertions
    beforeAll(async () => { });

    // Teardown (cleanup) after assertions
    afterAll(() => { });

    it('basic', async () => {
        const viewPayload = createViewPayload(COIN_ABI, {
            function: 'name',
            arguments: [],
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
        });
        const result = await client.view(viewPayload);
        expect(result).toMatchInlineSnapshot(`
      [
        "Aptos Coin",
      ]
    `);

        const viewPayload2 = createViewPayload(COIN_ABI, {
            function: 'decimals',
            arguments: [],
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
        });
        const result2 = await client.view(viewPayload2);
        expect(result2).toMatchInlineSnapshot(`
      [
        8,
      ]
    `);
    });

    it('vector', async () => {
        const viewPayload = createViewPayload(TEST_ABI, {
            function: 'test_view_function',
            arguments: [[1, 2, 3, 10, 50]],
            type_arguments: [],
        });
        const result = await client.view(viewPayload);
        expect(result).toMatchInlineSnapshot(`
      [
        66,
      ]
    `);
    });

    it('struct', async () => {
        const viewPayload = createViewPayload(TIERED_ORACLE_ABI, {
            function: 'get_last_price',
            arguments: [],
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
        });

        // The declaration in Move:
        // struct FixedPoint64 has copy, drop, store { value: u128 }
        const result = await clientMain.view(viewPayload);
        expect(result.length).toBe(1);
        expect((result[0] as any).v).toBeDefined();
        expect(typeof (result[0] as any).v).toEqual("string");
    });
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

const TIERED_ORACLE_ABI = {
    "address": "0x92e95ed77b5ac815d3fbc2227e76db238339e9ca43ace45031ec2589bea5b8c",
    "name": "tiered_oracle",
    "friends": [
        "0x92e95ed77b5ac815d3fbc2227e76db238339e9ca43ace45031ec2589bea5b8c::oracle"
    ],
    "exposed_functions": [
        {
            "name": "get_last_price",
            "visibility": "public",
            "is_entry": false,
            "is_view": true,
            "generic_type_params": [
                {
                    "constraints": []
                }
            ],
            "params": [],
            "return": [
                "0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64"
            ]
        },

    ],
    "structs": []
} as const;