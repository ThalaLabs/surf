// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assertType(val: any, types: string[] | string, message?: string) {
  if (!types?.includes(typeof val)) {
    throw new Error(
      message ||
        `Invalid arg: ${val} type should be ${
          types instanceof Array ? types.join(' or ') : types
        }`,
    );
  }
}

export function ensureBoolean(val: boolean | string): boolean {
  assertType(val, ['boolean', 'string']);
  if (typeof val === 'boolean') {
    return val;
  }

  if (val === 'true') {
    return true;
  }
  if (val === 'false') {
    return false;
  }

  throw new Error('Invalid boolean string.');
}

export function ensureNumber(val: number | string): number {
  assertType(val, ['number', 'string']);
  if (typeof val === 'number') {
    return val;
  }

  const res = Number.parseInt(val, 10);
  if (Number.isNaN(res)) {
    throw new Error('Invalid number string.');
  }

  return res;
}

export function ensureBigInt(val: number | bigint | string): bigint {
  assertType(val, ['number', 'bigint', 'string']);
  return BigInt(val);
}
