import type { ABIRoot } from '../abi.d.ts';
const fs = require('fs/promises');

describe('main', () => {
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('load json successfully', async () => {
    const result: ABIRoot = JSON.parse(await fs.readFile('./abi/coin.json', 'utf-8'));
    expect(result.name === 'coin').toBeTruthy();
    expect(result.address === '0x1').toBeTruthy();
    expect(result.structs != undefined).toBeTruthy();

    // @ts-expect-error
    result.namee;
  });
});
