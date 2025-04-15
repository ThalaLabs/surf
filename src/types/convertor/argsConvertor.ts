/**
 * Convert Move type to TypeScript type,
 * for input arguments of view function or entry function.
 */

import { ABIRoot } from '../abi.js';
import { UnknownStruct } from '../common.js';
import {
  ConvertedStruct,
  ExtractStruct,
  ExtractStructName,
} from '../extractor/struct.js';
import {
  MoveNonStructTypes,
  MovePrimitive,
  MovePrimitivesMap,
  MoveVector,
} from '../moveTypes.js';

/**
 * Convert an array of input arguments type.
 */
export type ConvertArgs<
  Abi extends ABIRoot,
  T extends readonly string[],
> = T extends readonly [
  infer TArg extends string,
  ...infer TRest extends string[],
]
  ? [ConvertArgType<Abi, TArg>, ...ConvertArgs<Abi, TRest>]
  : [];

/**
 * Internal
 */
type ConvertArgType<
  ABI extends ABIRoot,
  TMoveType extends string,
> = TMoveType extends MoveNonStructTypes
  ? // it's a non-struct type
    ConvertNonStructArgType<ABI, TMoveType>
  : TMoveType extends MoveVector<infer TInner>
    ? ConvertArgType<ABI, TInner>[] // If it is a NON primitive vector, convert the inner type to argType[]
    : // Verify if struct is a valid string, example 0x1::object_name::StructName and infer only StructName to a new type for validation
      TMoveType extends ExtractStructName<ABI, infer StructName>
      ? ConvertedStruct<ABI, ExtractStruct<ABI, StructName>>
      : UnknownStruct<TMoveType>;

type ConvertPrimitiveArgType<TMoveType extends MovePrimitive> =
  MovePrimitivesMap[TMoveType];

type ConvertNonStructArgType<
  Abi extends ABIRoot,
  TMoveType extends MoveNonStructTypes,
> = TMoveType extends MovePrimitive
  ? ConvertPrimitiveArgType<TMoveType>
  : TMoveType extends `vector<u8>`
    ? string | number[] | Uint8Array
    : TMoveType extends `vector<${infer TInner}>`
      ? ConvertArgType<Abi, TInner>[]
      : TMoveType extends `0x1::object::Object<${string}>`
        ? `0x${string}`
        : TMoveType extends `0x1::option::Option<${infer TInner}>`
          ? ConvertArgType<Abi, TInner> | undefined
          : UnknownStruct<TMoveType>;
