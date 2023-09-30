/**
 * Convert Move type to TypeScript type for struct.
 */
import { OmitInner, UnknownStruct } from '../common.js';
import { ABITable } from '../defaultABITable.js';
import {
  ExtractStructType,
  ResourceStructName,
} from '../extractor/structExtractor.js';
import { MoveNonStructTypes, MovePrimitive } from '../moveTypes.js';

// Convert a struct field Move type to a TypeScript type
export type ConvertStructFieldType<
  TABITable extends ABITable,
  TMoveType extends string,
> = TMoveType extends MoveNonStructTypes
  ? // it's a non-struct type
    ConvertStructFieldNonStructType<TABITable, TMoveType>
  : // it's a struct type
    ConvertStructFieldStructType<TABITable, TMoveType>;

/**
 * Internal
 */
type ConvertPrimitiveStructField<T extends MovePrimitive> = T extends 'bool'
  ? boolean
  : T extends 'u8'
  ? number
  : T extends 'u16'
  ? number
  : T extends 'u32'
  ? number
  : T extends 'u64'
  ? string
  : T extends 'u128'
  ? string
  : T extends 'u256'
  ? string
  : T extends 'address'
  ? `0x${string}`
  : T extends '0x1::string::String'
  ? string
  : never;

// Convert a struct field non-struct Move type to a TypeScript type
type ConvertStructFieldNonStructType<
  TABITable extends ABITable,
  TMoveType extends MoveNonStructTypes,
> = TMoveType extends MovePrimitive
  ? ConvertPrimitiveStructField<TMoveType>
  : TMoveType extends `vector<${infer TInner}>`
  ? ConvertStructFieldType<TABITable, TInner>[]
  : TMoveType extends `0x1::option::Option<${infer TInner}>`
  ? ConvertStructFieldOptionType<TABITable, TInner>
  : UnknownStruct<TMoveType>;

type ConvertStructFieldOptionType<
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
  ? `${TAccountAddress}::${TModuleName}` extends keyof TABITable
    ? OmitInner<TStructName> extends ResourceStructName<
        TABITable[`${TAccountAddress}::${TModuleName}`]
      >
      ? ExtractStructType<
          TABITable,
          TABITable[`${TAccountAddress}::${TModuleName}`],
          OmitInner<TStructName>
        >
      : // Unknown struct, use the default struct type
        UnknownStruct<TMoveType>
    : UnknownStruct<TMoveType>
  : UnknownStruct<TMoveType>;
