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

  bool: boolean;
};
export type MovePrimitive = keyof MovePrimitivesMap;

export type MoveVector = `vector<${string}>`;

export type MoveObject = `0x1::object::Object<${string}>`;

export type MoveOption = `0x1::option::Option<${string}>`;
