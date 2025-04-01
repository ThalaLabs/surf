/**
 * Convert Move type to TypeScript type,
 * for return value of view functions.
 */

import { ABIRoot } from '../abi.js';
import { UnknownStruct } from '../common.js';
import { DefaultABITable } from '../defaultABITable.js';
import {
  ConvertedStruct,
  ExtractStruct,
  ExtractStructName,
} from '../extractor/struct.js';
import {
  MoveNonStructTypes,
  MovePrimitive,
  MovePrimitivesMap,
} from '../moveTypes.js';
import { ConvertStructFieldOptionType } from './structConvertor.js';

/**
 * Convert an array of return types.
 */
export type ConvertReturns<
  ABI extends ABIRoot,
  T extends readonly string[],
> = T extends readonly [
  infer TArg extends string,
  ...infer TRest extends string[],
]
  ? [ConvertReturnType<ABI, TArg>, ...ConvertReturns<ABIRoot, TRest>]
  : [];

/**
 * Internal
 */
type ConvertReturnType<
  ABI extends ABIRoot,
  TMoveType extends string,
> = TMoveType extends MoveNonStructTypes
  ? // it's a non-struct type
    ConvertNonStructReturnType<ABI, TMoveType>
  : // Verify if struct is a valid string, example 0x1::object_name::StructName and infer only StructName to a new type for validation
    TMoveType extends ExtractStructName<ABI, infer StructName>
    ? ConvertedStruct<ABI, ExtractStruct<ABI, StructName>>
    : UnknownStruct<TMoveType>;

type ConvertNonStructReturnType<
  ABI extends ABIRoot,
  TMoveType extends MoveNonStructTypes,
> = TMoveType extends MovePrimitive
  ? MovePrimitivesMap[TMoveType]
  : TMoveType extends `vector<${infer TInner}>`
    ? ConvertReturnType<ABI, TInner>[]
    : TMoveType extends `0x1::object::Object<${string}>`
      ? { inner: `0x${string}` }
      : TMoveType extends `0x1::option::Option<${infer TInner}>`
        ? ConvertStructFieldOptionType<DefaultABITable, TInner>
        : UnknownStruct<TMoveType>;
