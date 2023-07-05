import { ABIRoot } from "./abi.js";
import { AllTypes, ConvertTypeParams, Primitive } from "./common.js";

type Struct<_T extends string> = object;

export type ConvertPrimitiveStructField<T extends Primitive> =
    T extends 'bool' ? boolean :
    T extends 'u8' ? number :
    T extends 'u16' ? number :
    T extends 'u32' ? number :
    T extends 'u64' ? string :
    T extends 'u128' ? string :
    T extends 'u256' ? string :
    T extends 'address' ? `0x${string}` :
    T extends '0x1::string::String' ? string :
    never;

type MoveStruct<T extends ABIRoot> = T['structs'][number];

export type ResourceStructName<T extends ABIRoot> = MoveStruct<T>['name'];

type ExtractStructFieldsName<
    T extends ABIRoot,
    TStructName extends ResourceStructName<T>> = ExtractStruct<T, TStructName>['fields'][number]['name'];

type ExtractStruct<T extends ABIRoot, TResourceName extends ResourceStructName<T>> =
    Extract<MoveStruct<T>, { name: TResourceName }>;

type ExtractStructFieldMoveType<
    T extends ABIRoot,
    TStructName extends ResourceStructName<T>,
    TFieldName extends string> = Extract<ExtractStruct<T, TStructName>['fields'][number], { name: TFieldName }>['type'];

// Convert a struct field Move type to a TypeScript type
type ConvertStructFieldType<TABITable extends ABITable, TMoveType extends string> =
    TMoveType extends AllTypes ?
    // it's a non-struct type
    ConvertStructFieldNonStructType<TABITable, TMoveType> :
    // it's a struct type
    ConvertStructFieldStructType<TABITable, TMoveType>;

// Convert a struct field non-struct Move type to a TypeScript type
export type ConvertStructFieldNonStructType<TABITable extends ABITable, TMoveType extends AllTypes> =
    TMoveType extends Primitive ? ConvertPrimitiveStructField<TMoveType> :
    TMoveType extends `vector<${infer TInner}>` ? ConvertStructFieldType<TABITable, TInner>[] :
    Struct<TMoveType>;

// Convert a struct field struct Move type to a TypeScript type
type ConvertStructFieldStructType<TABITable extends ABITable, TMoveType extends string> =
    TMoveType extends `${infer TAccountAddress}::${infer TModuleName}::${infer TStructName}${'' | `<${infer _TInnerType}>`}`
    ? `${TAccountAddress}::${TModuleName}` extends keyof TABITable ?
    OmitInner<TStructName> extends ResourceStructName<TABITable[`${TAccountAddress}::${TModuleName}`]> ?
    ExtractStructType<TABITable, TABITable[`${TAccountAddress}::${TModuleName}`], OmitInner<TStructName>>
    // Unknown struct, use the default struct type
    : Struct<TMoveType> : Struct<TMoveType> : Struct<TMoveType>;

// Get the struct type with the name of `TStructName` in `TABI`, with the help of `TABITable`
export type ExtractStructType<
    TABITable extends ABITable,
    TABI extends ABIRoot,
    TStructName extends ResourceStructName<TABI>> = {
        [TField in ExtractStructFieldsName<TABI, TStructName>]:
        ConvertStructFieldType<TABITable, ExtractStructFieldMoveType<TABI, TStructName, TField>>
    };

export type ExtractStructRawGenericParamsType<
    T extends ABIRoot,
    TStructName extends ResourceStructName<T>> =
    ExtractStruct<T, TStructName>['generic_type_params'];

export type ExtractStructGenericParamsType<
    T extends ABIRoot,
    TStructName extends ResourceStructName<T>> =
    ConvertTypeParams<ExtractStructRawGenericParamsType<T, TStructName>>;

type OmitInner<T extends string> = T extends `${infer TOuter}<${infer _TInner}>` ? `${TOuter}` : T;

export type ABITable = {
    [TAddress in string]: ABIRoot;
};
