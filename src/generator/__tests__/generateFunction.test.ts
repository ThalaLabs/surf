import { generateFunction } from '../generateFunction.js';

describe('generate function', () => {
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('generate function basic', () => {
    const result = generateFunction({
      name: 'transfer',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [
        {
          constraints: [],
        },
      ],
      params: ['&signer', 'address', 'u64'],
      return: [],
    });

    expect(result).toMatchInlineSnapshot(`
      "
          type Transfer = {
              types: [MoveStruct];
              args: [MovePrimitiveAddress,MovePrimitiveU64];
              return: [];
          };"
    `);
  });

  it('generate function with return type', () => {
    const result = generateFunction({
      name: 'decimals',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: [],
        },
      ],
      params: [],
      return: ['u8'],
    });

    expect(result).toMatchInlineSnapshot(`
      "
          type Decimals = {
              types: [MoveStruct];
              args: [];
              return: [MovePrimitiveU8];
          };"
    `);
  });
});
