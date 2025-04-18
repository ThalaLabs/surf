/**
 * Convert Move type to TypeScript type for struct.
 */
import { OmitInner, UnknownStruct } from '../common.js';
import { ABITable } from '../defaultABITable.js';
import {
  ExtractStructType,
  ResourceStructName,
} from '../extractor/structExtractor.js';
import {
  MoveNonStructTypes,
  MoveObject,
  MovePrimitive,
  MovePrimitiveMap,
  MoveVector,
} from '../moveTypes.js';

// Convert a struct field Move type to a TypeScript type
export type ConvertStructFieldType<
  TABITable extends ABITable,
  TMoveType extends string,
> = TMoveType extends MoveNonStructTypes
  ? // it's a non-struct type
    ConvertStructFieldNonStructType<TABITable, TMoveType>
  : // it's a struct type
    ConvertStructFieldStructType<TABITable, TMoveType>;

// Convert a struct field non-struct Move type to a TypeScript type
type ConvertStructFieldNonStructType<
  TABITable extends ABITable,
  TMoveType extends MoveNonStructTypes,
> = TMoveType extends MovePrimitive
  ? MovePrimitiveMap<string>[TMoveType]
  : TMoveType extends MoveVector<infer TInner> // Custom Vector type
    ? ConvertStructFieldType<TABITable, TInner>[]
    : TMoveType extends MoveObject
      ? { inner: `0x${string}` }
      : TMoveType extends `0x1::option::Option<${infer TInner}>`
        ? ConvertStructFieldOptionType<TABITable, TInner>
        : UnknownStruct<TMoveType>;

export type ConvertStructFieldOptionType<
  TABITable extends ABITable,
  TMoveType extends string,
> = {
  vec: [ConvertStructFieldType<TABITable, TMoveType>] | [];
};

// Convert a struct field struct Move type to a TypeScript type
type ConvertStructFieldStructType<
  TABITable extends ABITable,
  TMoveType extends string,
> = TMoveType extends `${infer TAccountAddress}::${infer TModuleName}::${infer TStructName}${
  | ''
  | `<${infer _TInnerType}>`}`
  ? OmitInner<TStructName> extends ResourceStructName<
      Extract<
        TABITable[number],
        { address: TAccountAddress; name: TModuleName }
      >
    >
    ? ExtractStructType<
        TABITable,
        Extract<
          TABITable[number],
          { address: TAccountAddress; name: TModuleName }
        >,
        OmitInner<TStructName>
      >
    : // Unknown struct, use the default struct type
      UnknownStruct<TMoveType>
  : UnknownStruct<TMoveType>;
