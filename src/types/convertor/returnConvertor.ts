/**
 * Convert Move type to TypeScript type,
 * for return value of view functions.
 */

import { UnknownStruct } from '../common.js';
import { DefaultABITable } from '../defaultABITable.js';
import {
  MoveObject,
  MoveOption,
  MovePrimitive,
  MovePrimitiveMap,
  MoveVector,
} from '../moveTypes.js';
import { ConvertStructFieldOptionType } from './structConvertor.js';

/**
 * Convert an array of return types.
 */
export type ConvertReturns<T extends readonly string[]> = T extends readonly [
  infer TArg extends string,
  ...infer TRest extends string[],
]
  ? [ConvertReturnType<TArg>, ...ConvertReturns<TRest>]
  : [];

/**
 * Internal
 */
type ConvertReturnType<TMoveType extends string> =
  TMoveType extends MovePrimitive
    ? MovePrimitiveMap<string>[TMoveType]
    : TMoveType extends MoveVector<infer TInner>
      ? ConvertReturnType<TInner>[]
      : TMoveType extends MoveObject
        ? { inner: `0x${string}` }
        : TMoveType extends MoveOption<infer TInner>
          ? ConvertStructFieldOptionType<DefaultABITable, TInner>
          : UnknownStruct<TMoveType>;
