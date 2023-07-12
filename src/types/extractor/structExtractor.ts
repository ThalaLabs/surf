/**
 * Extract struct information from ABI JSON
 */

import { ABIRoot } from '../abi.js';
import { ConvertGenerics } from '../convertor/genericConvertor.js';
import { ConvertStructFieldType } from '../convertor/structConvertor.js';
import { ABITable } from '../defaultABITable.js';

/**
 * All resource struct names in the ABI.
 */
export type ResourceStructName<T extends ABIRoot> = Struct<T>['name'];

/**
 * Extract a Move Struct type, and convert to TypeScript type.
 */
export type ExtractStructType<
  TABITable extends ABITable,
  TABI extends ABIRoot,
  TStructName extends ResourceStructName<TABI>,
> = {
  [TField in ExtractStructFieldsName<
    TABI,
    TStructName
  >]: ConvertStructFieldType<
    TABITable,
    ExtractStructFieldMoveType<TABI, TStructName, TField>
  >;
};

/**
 * Extract the generics of a Move Struct.
 */
export type ExtractStructGenericArgsType<
  T extends ABIRoot,
  TStructName extends ResourceStructName<T>,
> = ConvertGenerics<ExtractStructMoveGenericArgsType<T, TStructName>>;

/**
 * Internal
 */
type Struct<T extends ABIRoot> = T['structs'][number];

type ExtractStructFieldsName<
  T extends ABIRoot,
  TStructName extends ResourceStructName<T>,
> = ExtractStruct<T, TStructName>['fields'][number]['name'];

type ExtractStruct<
  T extends ABIRoot,
  TResourceName extends ResourceStructName<T>,
> = Extract<Struct<T>, { name: TResourceName }>;

type ExtractStructFieldMoveType<
  T extends ABIRoot,
  TStructName extends ResourceStructName<T>,
  TFieldName extends string,
> = Extract<
  ExtractStruct<T, TStructName>['fields'][number],
  { name: TFieldName }
>['type'];

type ExtractStructMoveGenericArgsType<
  T extends ABIRoot,
  TStructName extends ResourceStructName<T>,
> = ExtractStruct<T, TStructName>['generic_type_params'];
