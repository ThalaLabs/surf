import { COIN_ABI } from '../../abi/coin';
import { createViewPayload } from '../createViewPayload';

// TODO: add struct, vector of vector
describe('createViewPayload', () => {
  // Act before assertions
  beforeAll(async () => { });

  // Teardown (cleanup) after assertions
  afterAll(() => { });

  it('basic type checking', async () => {
    // no need to run, type check only.
    () => {
      createViewPayload(COIN_ABI, {
        // @ts-expect-error abc is not a function
        function: 'abc',
        functionArguments: ['0x1'],
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
      });

      createViewPayload(COIN_ABI, {
        // @ts-expect-error transfer is not a view function
        function: 'transfer',
        functionArguments: ['0x1'],
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
      });

      createViewPayload(COIN_ABI, {
        function: 'balance',
        // @ts-expect-error require a address type
        functionArguments: [''],
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
      });

      createViewPayload(COIN_ABI, {
        function: 'balance',
        // @ts-expect-error require 1 args
        functionArguments: ['0x1', 1],
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
      });

      createViewPayload(COIN_ABI, {
        function: 'balance',
        functionArguments: ['0x1'],
        // @ts-expect-error require a type_argument
        typeArguments: [],
      });
    };
  });

  it('basic', async () => {
    const payload = createViewPayload(COIN_ABI, {
      function: 'balance',
      functionArguments: ['0x1'],
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
    });

    expect(payload).toMatchInlineSnapshot(`
{
  "abi": {
    "parameters": [
      n {},
    ],
    "returnTypes": [
      n {},
    ],
    "typeParameters": [
      {
        "constraints": [],
      },
    ],
  },
  "function": "0x1::coin::balance",
  "functionArguments": [
    "0x1",
  ],
  "typeArguments": [
    "0x1::aptos_coin::AptosCoin",
  ],
}
`);
  });

  it('bool', async () => {
    // no need to run, type check only.
    () => {
      createViewPayload(TEST_ABI, {
        function: 'bool_as_input',
        functionArguments: [
          // @ts-expect-error not a boolean type
          1,
          // @ts-expect-error not a boolean type
          'false',
        ],
        typeArguments: [],
      });
    };

    const payload = createViewPayload(TEST_ABI, {
      function: 'bool_as_input',
      functionArguments: [true, false],
      typeArguments: [],
    });

    expect(payload).toMatchInlineSnapshot(`
{
  "abi": {
    "parameters": [
      n {},
      n {},
    ],
    "returnTypes": [],
    "typeParameters": [],
  },
  "function": "0x123::test::bool_as_input",
  "functionArguments": [
    true,
    false,
  ],
  "typeArguments": [],
}
`);
  });

  it('address', async () => {
    // no need to run, type check only.
    () => {
      createViewPayload(TEST_ABI, {
        function: 'address_as_input',
        functionArguments: [
          // @ts-expect-error not a address type
          1,
          // @ts-expect-error not a address type
          '1',
        ],
        typeArguments: [],
      });
    };

    const payload = createViewPayload(TEST_ABI, {
      function: 'address_as_input',
      functionArguments: ['0x1', '0x2'],
      typeArguments: [],
    });

    expect(payload).toMatchInlineSnapshot(`
{
  "abi": {
    "parameters": [
      n {},
      n {},
    ],
    "returnTypes": [],
    "typeParameters": [],
  },
  "function": "0x123::test::address_as_input",
  "functionArguments": [
    "0x1",
    "0x2",
  ],
  "typeArguments": [],
}
`);
  });

  it('number', async () => {
    // no need to run, type check only.
    () => {
      createViewPayload(TEST_ABI, {
        function: 'number_as_input',
        functionArguments: [
          // @ts-expect-error not a number type
          '1',
          // @ts-expect-error not a number type
          true,
        ],
        typeArguments: [],
      });
    };

    const payload = createViewPayload(TEST_ABI, {
      function: 'number_as_input',
      functionArguments: [1, 2, 3, BigInt(5), BigInt(6), BigInt(7)],
      typeArguments: [],
    });

    expect(payload).toMatchInlineSnapshot(`
{
  "abi": {
    "parameters": [
      n {},
      n {},
      n {},
      n {},
      n {},
      n {},
    ],
    "returnTypes": [],
    "typeParameters": [],
  },
  "function": "0x123::test::number_as_input",
  "functionArguments": [
    1,
    2,
    3,
    "5",
    "6",
    "7",
  ],
  "typeArguments": [],
}
`);
  });

  it('vector', async () => {
    const payload = createViewPayload(TEST_ABI, {
      function: 'vector_as_input',
      functionArguments: [
        [1, 2, 3],
        [4, 5, 6],
        [BigInt(10000000000000000000001), BigInt(10000000000000000000001)],
        [true, false],
        ['0x1', '0x2'],
      ],
      typeArguments: [],
    });

    expect(payload).toMatchInlineSnapshot(`
{
  "abi": {
    "parameters": [
      n {
        "value": n {},
      },
      n {
        "value": n {},
      },
      n {
        "value": n {},
      },
      n {
        "value": n {},
      },
      n {
        "value": n {},
      },
    ],
    "returnTypes": [],
    "typeParameters": [],
  },
  "function": "0x123::test::vector_as_input",
  "functionArguments": [
    [
      1,
      2,
      3,
    ],
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
  "typeArguments": [],
}
`);
  });
});

const TEST_ABI = {
  address: '0x123',
  name: 'test',
  friends: [],
  exposed_functions: [
    {
      name: 'bool_as_input',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['bool', 'bool'],
      return: [],
    },
    {
      name: 'number_as_input',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['u8', 'u16', 'u32', 'u64', 'u128', 'u256'],
      return: [],
    },
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
      name: 'vector_as_input',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: [
        'vector<u8>',
        'vector<u16>',
        'vector<u64>',
        'vector<bool>',
        'vector<address>',
      ],
      return: [],
    },
  ],
  structs: [],
} as const;
