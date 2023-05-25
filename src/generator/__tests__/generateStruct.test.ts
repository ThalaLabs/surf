import { generateStruct } from '../generateStruct.js';

describe('generate struct', () => {
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('bool type fields', () => {
    const result = generateStruct({
      name: 'BurnCapability',
      is_native: false,
      abilities: ['copy', 'store'],
      generic_type_params: [
        {
          constraints: [],
        },
      ],
      fields: [
        {
          name: 'dummy_field',
          type: 'bool',
        },
      ],
    });

    expect(result).toMatchInlineSnapshot(`
      "export interface BurnCapability {
              dummy_field: MovePrimitiveBool;
          }"
    `);
  });

  it('complex type as any', () => {
    const result = generateStruct({
      name: 'AggregatableCoin',
      is_native: false,
      abilities: ['store'],
      generic_type_params: [
        {
          constraints: [],
        },
      ],
      fields: [
        {
          name: 'value',
          type: '0x1::aggregator::Aggregator',
        },
      ],
    });

    expect(result).toMatchInlineSnapshot(`
      "export interface AggregatableCoin {
              value: any;
          }"
    `);
  });
});
