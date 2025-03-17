import { bcs } from '@initia/initia.js';

/**
 * Helper function to encode arguments using BCS based on their type
 *
 * @param arg The argument to encode
 * @param typeStr The type of the argument as a string
 * @returns Base64 encoded BCS serialized value
 */
export function bcsEncoding(
  arg: any,
  typeStr: string,
  target: 'base64' | 'bytes' = 'base64',
): string {
  const serializer = target === 'base64' ? 'toBase64' : 'toBytes';
  if (typeStr === 'address' || typeStr.startsWith('0x1::object::Object')) {
    return bcs
      .address()
      .serialize(arg as string)
      [serializer]();
  } else if (typeStr === 'bool') {
    return bcs
      .bool()
      .serialize(arg as boolean)
      [serializer]();
  } else if (typeStr === 'u8') {
    return bcs
      .u8()
      .serialize(arg as number)
      [serializer]();
  } else if (typeStr === 'u16') {
    return bcs
      .u16()
      .serialize(arg as number)
      [serializer]();
  } else if (typeStr === 'u32') {
    return bcs
      .u32()
      .serialize(arg as number)
      [serializer]();
  } else if (typeStr === 'u64') {
    return bcs
      .u64()
      .serialize(arg as string | number | bigint)
      [serializer]();
  } else if (typeStr === 'u128') {
    return bcs
      .u128()
      .serialize(arg as string | number | bigint)
      [serializer]();
  } else if (typeStr === 'u256') {
    return bcs
      .u256()
      .serialize(arg as string | number | bigint)
      [serializer]();
  } else if (typeStr.startsWith('vector<u8>')) {
    return bcs
      .vector(bcs.u8())
      .serialize(arg as number[])
      [serializer]();
  } else if (typeStr.startsWith('vector<')) {
    const innerTypeMatch = typeStr.match(/vector<([^>]+)>/);
    if (!innerTypeMatch) {
      throw new Error(`Unsupported vector type: ${typeStr}`);
    }

    const innerType = innerTypeMatch[1];
    if (innerType === 'address') {
      return bcs
        .vector(bcs.address())
        .serialize(arg as string[])
        [serializer]();
    } else if (innerType === 'bool') {
      return bcs
        .vector(bcs.bool())
        .serialize(arg as boolean[])
        [serializer]();
    } else if (innerType === 'u8') {
      return bcs
        .vector(bcs.u8())
        .serialize(arg as number[])
        [serializer]();
    } else if (innerType === 'u64') {
      return bcs
        .vector(bcs.u64())
        .serialize(arg as (string | number | bigint)[])
        [serializer]();
    } else if (innerType === 'u128') {
      return bcs
        .vector(bcs.u128())
        .serialize(arg as (string | number | bigint)[])
        [serializer]();
    } else if (innerType === 'u256') {
      return bcs
        .vector(bcs.u256())
        .serialize(arg as (string | number | bigint)[])
        [serializer]();
    } else {
      throw new Error(`Unsupported vector inner type: ${innerType}`);
    }
  } else {
    throw new Error(`Unsupported type: ${typeStr}`);
  }
}
