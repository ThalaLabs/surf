import { COIN_ABI } from '../../abi/coin';
import { createViewPayload } from '../createViewPayload';

// TODO: add struct, vector of vector
describe('createViewPayload', () => {
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('basic type checking', async () => {
    try {
      createViewPayload(COIN_ABI, {
        // @ts-expect-error abc is not a function
        function: 'abc',
        arguments: ['0x1'],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      });

      createViewPayload(COIN_ABI, {
        function: 'balance',
        // @ts-expect-error require a address type
        arguments: [''],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      });

      createViewPayload(COIN_ABI, {
        function: 'balance',
        // @ts-expect-error require 1 args
        arguments: ['0x1', 1],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      });

      createViewPayload(COIN_ABI, {
        function: 'balance',
        arguments: ['0x1'],
        // @ts-expect-error require a type_argument
        type_arguments: [],
      });
    } catch (e) {
      // no runtime check for this test.
      // only for static type checking
    }
  });

  it('basic', async () => {
    const payload = createViewPayload(COIN_ABI, {
      function: 'balance',
      arguments: ['0x1'],
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
    });

    expect(payload).toMatchInlineSnapshot(`
      {
        "decoders": [
          [Function],
        ],
        "viewRequest": {
          "arguments": [
            "0x1",
          ],
          "function": "0x1::coin::balance",
          "type_arguments": [
            "0x1::aptos_coin::AptosCoin",
          ],
        },
      }
    `);
  });

  it('bool', async () => {
    try {
      createViewPayload(TEST_ABI, {
        function: 'bool_as_input',
        arguments: [
          // @ts-expect-error not a boolean type
          1,
          // @ts-expect-error not a boolean type
          'false',
        ],
        type_arguments: [],
      });
    } catch {
      // no runtime check for this.
      // only for static type checking
    }

    const payload = createViewPayload(TEST_ABI, {
      function: 'bool_as_input',
      arguments: [true, false],
      type_arguments: [],
    });

    expect(payload).toMatchInlineSnapshot(`
      {
        "decoders": [],
        "viewRequest": {
          "arguments": [
            true,
            false,
          ],
          "function": "0x123::test::bool_as_input",
          "type_arguments": [],
        },
      }
    `);
  });

  it('address', async () => {
    try {
      createViewPayload(TEST_ABI, {
        function: 'address_as_input',
        arguments: [
          // @ts-expect-error not a address type
          1,
          // @ts-expect-error not a address type
          '1',
        ],
        type_arguments: [],
      });
    } catch {
      // no runtime check for this.
      // only for static type checking
    }

    const payload = createViewPayload(TEST_ABI, {
      function: 'address_as_input',
      arguments: ['0x1', '0x2'],
      type_arguments: [],
    });

    expect(payload).toMatchInlineSnapshot(`
      {
        "decoders": [],
        "viewRequest": {
          "arguments": [
            "0x1",
            "0x2",
          ],
          "function": "0x123::test::address_as_input",
          "type_arguments": [],
        },
      }
    `);
  });

  it('number', async () => {
    try {
      createViewPayload(TEST_ABI, {
        function: 'number_as_input',
        arguments: [
          // @ts-expect-error not a number type
          '1',
          // @ts-expect-error not a number type
          true,
        ],
        type_arguments: [],
      });
    } catch {
      // no runtime check for this.
      // only for static type checking
    }

    const payload = createViewPayload(TEST_ABI, {
      function: 'number_as_input',
      arguments: [1, 2, 3, BigInt(5), BigInt(6), BigInt(7)],
      type_arguments: [],
    });

    expect(payload).toMatchInlineSnapshot(`
      {
        "decoders": [],
        "viewRequest": {
          "arguments": [
            1,
            2,
            3,
            "5",
            "6",
            "7",
          ],
          "function": "0x123::test::number_as_input",
          "type_arguments": [],
        },
      }
    `);
  });

  it('vector', async () => {
    const payload = createViewPayload(TEST_ABI, {
      function: 'vector_as_input',
      arguments: [
        [1, 2, 3],
        [4, 5, 6],
        [BigInt(10000000000000000000001), BigInt(10000000000000000000001)],
        [true, false],
        ['0x1', '0x2'],
      ],
      type_arguments: [],
    });

    expect(payload).toMatchInlineSnapshot(`
      {
        "decoders": [],
        "viewRequest": {
          "arguments": [
            "0x010203",
            [
              4,
              5,
              6,
            ],
            [
              "10000000000000000000000",
              "10000000000000000000000",
            ],
            [
              true,
              false,
            ],
            [
              "0x1",
              "0x2",
            ],
          ],
          "function": "0x123::test::vector_as_input",
          "type_arguments": [],
        },
      }
    `);
  });
});

const TEST_ABI = {
  "address": "0x123",
  "name": "test",
  "friends": [],
  "exposed_functions": [
      {
          "name": "bool_as_input",
          "visibility": "public",
          "is_entry": false,
          "is_view": true,
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
          "is_entry": false,
          "is_view": true,
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
          "name": "address_as_input",
          "visibility": "public",
          "is_entry": false,
          "is_view": true,
          "generic_type_params": [],
          "params": [
              "address",
              "address",
          ],
          "return": []
      },
      {
          "name": "vector_as_input",
          "visibility": "public",
          "is_entry": false,
          "is_view": true,
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

  ],
  "structs": []
} as const;
