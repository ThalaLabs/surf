import { bcs } from '@initia/initia.js';

import { bcsEncoding } from '../bcs.js';

describe('bcsEncoding', () => {
  it('encodes Move string arguments', () => {
    expect(bcsEncoding('Initia USD', '0x1::string::String')).toEqual(
      bcs.string().serialize('Initia USD').toBase64(),
    );
  });

  it('encodes vector<0x1::string::String> arguments', () => {
    const farmingIds = [
      '@0x83a760b720dfe9008015ed2c9cf664f353f441a3fe7b20141876721115faf934201',
    ];

    expect(bcsEncoding(farmingIds, 'vector<0x1::string::String>')).toEqual(
      bcs.vector(bcs.string()).serialize(farmingIds).toBase64(),
    );
  });
});
