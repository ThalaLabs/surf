/**
 * Types from Move language
 */

import { AnyNumber } from './common.js';

export type MoveNonStructTypes =
  | MovePrimitive
  | MoveVector
  | MoveObject
  | MoveOption;

/**
 * All primitive simple types that are not complex, such as vector, object or struct
 *
 * @type {HighValue} - The type of high value number, in some cases can return just as string, or as AnyNumber, default as string
 * @returns - A map of Move primitive types to their corresponding TypeScript types
 */
export type MovePrimitiveMap<HighValue extends AnyNumber | string = string> = {
  bool: boolean;

  address: `0x${string}`;
  '0x1::string::String': string;

  // Number
  u8: number;
  u16: number;
  u32: number;
  u64: HighValue;
  u128: HighValue;
  u256: HighValue;

  'vector<bool>': boolean[];
  'vector<u8>': string | number[] | Uint8Array;
  'vector<u16>': number[];
  'vector<u32>': number[];

  'vector<u64>': HighValue[];
  'vector<u128>': HighValue[];
  'vector<u256>': HighValue[];
  'vector<address>': `0x${string}`[];
  'vector<string>': string[];
  'vector<0x1::string::String>': string[];
};

export type MovePrimitive = keyof MovePrimitiveMap<AnyNumber | string>;

export type MoveVector<I extends string = string> = `vector<${I}>`;

export type MoveObject<I extends string = string> = `0x1::object::Object<${I}>`;

export type MoveOption<I extends string = string> = `0x1::option::Option<${I}>`;
