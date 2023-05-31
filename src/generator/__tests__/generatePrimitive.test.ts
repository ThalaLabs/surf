import { generateArgumentType } from '../generatePrimitive.js';

describe('generate primitive', () => {
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('generate primitive vector', () => {
    const result = generateArgumentType('vector<u8>');
    expect(result).toMatchInlineSnapshot(`"MoveType.Vector<MoveType.U8>"`);
  });

  it('generate primitive vector of vector', () => {
    const result = generateArgumentType('vector<vector<u8>>');
    expect(result).toMatchInlineSnapshot(
      `"MoveType.Vector<MoveType.Vector<MoveType.U8>>"`,
    );
  });

  it('generate primitive vector of vector', () => {
    const result = generateArgumentType('vector<vector<u8>>');
    expect(result).toMatchInlineSnapshot(
      `"MoveType.Vector<MoveType.Vector<MoveType.U8>>"`,
    );
  });

  it('generate primitive vector error', () => {
    const result = generateArgumentType('vector<u8');
    expect(result).toMatchInlineSnapshot(`"any"`);
  });
});
