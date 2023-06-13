import { COIN_ABI } from "../../abi/coin";
import { createEntryPayload } from "../createEntryPayload";

// TODO: add struct, vector of vector, vector
describe('createEntryPayload', () => {
    // Act before assertions
    beforeAll(async () => { });

    // Teardown (cleanup) after assertions
    afterAll(() => { });

    it('basic type checking', async () => {
        try {
            createEntryPayload(COIN_ABI, {
                // @ts-expect-error abc is not a function
                function: 'abc',
                arguments: ['0x1', 1],
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
            });

            createEntryPayload(COIN_ABI, {
                // @ts-expect-error balance is not a view function
                function: 'balance',
                arguments: ['0x1', 1],
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
            });

            createEntryPayload(COIN_ABI, {
                function: 'transfer',
                // @ts-expect-error require a address type
                arguments: [1, 1],
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
            });

            createEntryPayload(COIN_ABI, {
                function: 'transfer',
                // @ts-expect-error require 2 args
                arguments: ['0x1', 1, 1],
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
            });

            createEntryPayload(COIN_ABI, {
                function: 'transfer',
                arguments: ['0x1', 1],
                // @ts-expect-error require a type_argument
                type_arguments: [],
            });

            createEntryPayload(COIN_ABI, {
                function: 'transfer',
                arguments: ['0x1', 1],
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
            });
        } catch (e) {
            // no runtime check for this test.
            // only for static type checking
        }
    });

    it('number', async () => {
        try {
            createEntryPayload(TEST_ABI, {
                function: 'number_as_input',
                arguments: [1, 2, 3, BigInt(4), BigInt(5), BigInt(6)],
                type_arguments: [],
            });

            createEntryPayload(TEST_ABI, {
                function: 'number_as_input',
                arguments: [
                    // @ts-expect-error the input type for u8 should be number, not bigint
                    BigInt(1),
                    // @ts-expect-error the input type for u16 should be number, not bigint
                    BigInt(2),
                    // @ts-expect-error the input type for u32 should be number, not bigint
                    BigInt(2),
                    BigInt(4), BigInt(5), BigInt(6)],
                type_arguments: [],
            });

        } catch (e) {
            // no runtime check for this test.
            // only for static type checking
        }
    });

    it('bool', async () => {
        try {
            createEntryPayload(TEST_ABI, {
                function: 'bool_as_input',
                arguments: [true, false],
                type_arguments: [],
            });

            createEntryPayload(TEST_ABI, {
                function: 'bool_as_input',
                arguments: [
                    // @ts-expect-error invalid bool
                    1,
                    // @ts-expect-error invalid bool
                    'true',
                ],
                type_arguments: [],
            });

        } catch (e) {
            // no runtime check for this test.
            // only for static type checking
        }
    });

    it('address', async () => {
        try {
            createEntryPayload(TEST_ABI, {
                function: 'address_as_input',
                arguments: ['0x1', '0x2'],
                type_arguments: [],
            });

            createEntryPayload(TEST_ABI, {
                function: 'address_as_input',
                arguments: [
                    // @ts-expect-error invalid address
                    1,
                    // @ts-expect-error invalid address
                    '1',
                ],
                type_arguments: [],
            });

        } catch (e) {
            // no runtime check for this test.
            // only for static type checking
        }
    });

    it('vector', async () => {
        try {
            createEntryPayload(TEST_ABI, {
                function: 'vector_as_input',
                arguments: [
                    [],
                    [1, 2, 3],
                    [BigInt(1), BigInt(2), BigInt(3)],
                    [true, false, true],
                    ['0x1', '0x2', '0x3']
                ],
                type_arguments: [],
            });

            createEntryPayload(TEST_ABI, {
                function: 'vector_as_input',
                arguments: [
                    // @ts-expect-error invalid vector<u8>
                    [1, 2, '3'],
                    // @ts-expect-error invalid vector<u16>
                    [1, 2, '3'],
                    // @ts-expect-error invalid vector<u64>
                    true,
                    // @ts-expect-error invalid vector<bool>
                    [true, false, 1],
                    // @ts-expect-error invalid vector<address>
                    ['0x1', '0x2', 1],
                ],
                type_arguments: [],
            });

        } catch (e) {
            // no runtime check for this test.
            // only for static type checking
        }
    });

    it('vector of vector', async () => {
        try {
            createEntryPayload(TEST_ABI, {
                function: 'vector_of_vector_as_input',
                arguments: [
                    [[1,2], [3,4], [5,6]],
                    [['0x1', '0x2'], ['0x3', '0x4'], ['0x5', '0x6']]
                ],
                type_arguments: [],
            });

            createEntryPayload(TEST_ABI, {
                function: 'vector_of_vector_as_input',
                arguments: [
                    // @ts-expect-error invalid vector<vector<u8>>
                    [[], 1, 2, '3'],
                    // @ts-expect-error invalid vector<vector<address>>
                    [[], 1, 2, '3'],
                ],
                type_arguments: [],
            });

        } catch (e) {
            // no runtime check for this test.
            // only for static type checking
        }
    });
});

const TEST_ABI = {
    "address": "0x123",
    "name": "test",
    "friends": [],
    "exposed_functions": [
        {
            "name": "address_as_input",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
                "address",
                "address",
            ],
            "return": []
        },
        {
            "name": "bool_as_input",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
                "bool",
                "bool",
            ],
            "return": []
        },
        {
            "name": "number_as_input",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
                "u8",
                "u16",
                "u32",
                "u64",
                "u128",
                "u256",
            ],
            "return": []
        },
        {
            "name": "vector_as_input",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
                "vector<u8>",
                "vector<u16>",
                "vector<u64>",
                "vector<bool>",
                "vector<address>",
            ],
            "return": []
        },
        {
            "name": "vector_of_vector_as_input",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
                "vector<vector<u8>>",
                "vector<vector<address>>",
            ],
            "return": []
        },
    ],

    "structs": []
} as const;
