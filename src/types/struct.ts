import { ABIRoot } from "./abi.js";
import { AllTypes, ConvertTypeParams, Primitive } from "./common.js";
import { GlobalABITable } from "./globalABI.js";

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

type ConvertVectorStructField<TInner> = TInner extends Primitive ? ConvertPrimitiveStructField<TInner>[] :
    (
        TInner extends `vector<${infer TInnerInner}>` ? (
            TInnerInner extends Primitive ? ConvertPrimitiveStructField<TInnerInner>[][] :
            any[][]) : (
            object[]
        )
    );

type MoveStruct<T extends ABIRoot> = T['structs'][number];

export type ResourceStructName<T extends ABIRoot> = MoveStruct<T>['name'];

type ExtractStructFieldsName<
    T extends ABIRoot,
    TStructName extends ResourceStructName<T>> = ExtractStruct<T, TStructName>['fields'][number]['name'];

type ExtractStruct<T extends ABIRoot, TResourceName extends ResourceStructName<T>> =
    Extract<MoveStruct<T>, { name: TResourceName }>;

type ExtractStructFieldType<
    T extends ABIRoot,
    TStructName extends ResourceStructName<T>,
    TFieldName extends string> = Extract<ExtractStruct<T, TStructName>['fields'][number], { name: TFieldName }>['type'];

export type ConvertStructField<T extends AllTypes> =
    T extends Primitive ? ConvertPrimitiveStructField<T> :
    T extends `vector<${infer TInner}>` ? ConvertVectorStructField<TInner> :
    Struct<T>;

export type ExtractStructType<
    T extends ABIRoot,
    TStructName extends ResourceStructName<T>> = {
        [TField in ExtractStructFieldsName<T, TStructName>]:
        ExtractStructFieldType<T, TStructName, TField> extends AllTypes ?
        // it's a non-struct type
        ConvertStructField<ExtractStructFieldType<T, TStructName, TField>> :
        // it's a struct type
        ExtractStructTypeGlobal<ExtractStructFieldType<T, TStructName, TField>>;
    };

export type ExtractStructRawGenericParamsType<
    T extends ABIRoot,
    TStructName extends ResourceStructName<T>> =
    ExtractStruct<T, TStructName>['generic_type_params'];

export type ExtractStructGenericParamsType<
    T extends ABIRoot,
    TStructName extends ResourceStructName<T>> =
    ConvertTypeParams<ExtractStructRawGenericParamsType<T, TStructName>>;

type ExtractStructTypeGlobal<TAddress extends string> =
    TAddress extends `${infer TAccountAddress}::${infer TModuleName}::${infer TStructName}${'' | `<${infer _TInnerType}>`}`
    ? `${TAccountAddress}::${TModuleName}` extends keyof GlobalABITable ?
    OmitInner<TStructName> extends ResourceStructName<GlobalABITable[`${TAccountAddress}::${TModuleName}`]> ?
    ExtractStructType<GlobalABITable[`${TAccountAddress}::${TModuleName}`], OmitInner<TStructName>>
    // Unknown struct, use the default struct type
    : Struct<TAddress> : Struct<TAddress> : Struct<TAddress>;

type OmitInner<T extends string> = T extends `${infer TOuter}<${infer _TInner}>` ? `${TOuter}` : T;
