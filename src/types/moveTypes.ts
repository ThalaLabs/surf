/**
 * Types from Move language
 */

import { AnyNumber } from './common.js';

export type MoveNonStructTypes =
  | MovePrimitive
  | MoveVector
  | MoveObject
  | MoveOption;

export type MovePrimitivesMap = {
  '0x1::string::String': string;
  address: `0x${string}`;

  // Numeric types
  u8: number;
  u16: number;
  u32: number;
  u64: AnyNumber;
  u128: AnyNumber;
  u256: AnyNumber;

  // Vector types
  'vector<u8>': string | number[] | Uint8Array;
  'vector<u16>': number[];
  'vector<u64>': AnyNumber[];
  'vector<u128>': AnyNumber[];
  'vector<u256>': AnyNumber[];
  'vector<bool>': boolean[];
  'vector<address>': `0x${string}`[];
  'vector<0x1::string::String>': MoveNonStructTypes[];

  bool: boolean;
};
export type MovePrimitive = keyof MovePrimitivesMap;

export type MoveVector = `vector<${string}>`;

export type MoveObject = `0x1::object::Object<${string}>`;

export type MoveOption = `0x1::option::Option<${string}>`;
