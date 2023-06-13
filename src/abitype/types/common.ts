import { AptosAccount, TxnBuilderTypes } from "aptos";
import { ABIRoot } from "./abi";

// TODO: rename this variable, not only primitive, but also struct and vector
export type Primitive =
    'bool' | 'u8' | 'u16' | 'u32' |
    'u64' | 'u128' | 'u256' | 'address' |
    '0x1::string::String';

type Vector = `vector<${Primitive}>`;
type VectorOfVector = `vector<vector<${Primitive}>>`;

// TODO: support struct, vector<struct>, and vector<vector<vector>>
export type AllTypes = Primitive | Vector | VectorOfVector;
type ConvertPrimitiveArgsType<T extends Primitive> =
    T extends 'bool' ? boolean :
    T extends 'u8' ? number :
    T extends 'u16' ? number :
    T extends 'u32' ? number :
    T extends 'u64' ? AnyNumber :
    T extends 'u128' ? AnyNumber :
    T extends 'u256' ? AnyNumber :
    T extends 'address' ? `0x${string}` :
    T extends '0x1::string::String' ? string :
    never;

type ConvertVectorArgsType<TInner> = TInner extends Primitive ? ConvertPrimitiveArgsType<TInner>[] :
    (
        TInner extends `vector<${infer TInnerInner}>` ? (
            TInnerInner extends Primitive ? ConvertPrimitiveArgsType<TInnerInner>[][] :
            any[][]) : (
            object[]
        )
    );

export type ConvertArgsType<T extends AllTypes> =
    T extends Primitive ? ConvertPrimitiveArgsType<T> :
    T extends `vector<${infer TInner}>` ? ConvertVectorArgsType<TInner> :
    Struct<T>;

//@ts-ignore TODO: remove this ignore
type Struct<T extends string> = object;

type AnyNumber = number | bigint | string;

export type ConvertPrimitiveReturnType<T extends Primitive> =
    T extends 'bool' ? boolean :
    T extends 'u8' ? number :
    T extends 'u16' ? number :
    T extends 'u32' ? number :
    T extends 'u64' ? bigint :
    T extends 'u128' ? bigint :
    T extends 'u256' ? bigint :
    T extends 'address' ? `0x${string}` :
    T extends '0x1::string::String' ? string :
    never;

type ConvertVectorReturnType<TInner> = TInner extends Primitive ? ConvertPrimitiveReturnType<TInner>[] :
    (
        TInner extends `vector<${infer TInnerInner}>` ? (
            TInnerInner extends Primitive ? ConvertPrimitiveReturnType<TInnerInner>[][] :
            any[][]) : (
            object[]
        )
    );

export type ConvertReturnType<T extends AllTypes> =
    T extends Primitive ? ConvertPrimitiveReturnType<T> :
    T extends `vector<${infer TInner}>` ? ConvertVectorReturnType<TInner> :
    Struct<T>;

type Functions<T extends ABIRoot> = T['exposed_functions'];
type MoveFunction<T extends ABIRoot> = Functions<T>[number];
type FunctionName<T extends ABIRoot> = MoveFunction<T>['name'];
export type FunctionMap<T extends ABIRoot> = {
    [P in FunctionName<T>]: Extract<MoveFunction<T>, { name: P }>
};

// TODO: replace FunctionMap with this:
export type ExtractFunction<T extends ABIRoot, TFuncName extends FunctionName<T>> =
    Extract<MoveFunction<T>, { name: TFuncName }>;

export type MoveViewFunction<T extends ABIRoot> = Extract<Functions<T>[number], { is_view: true }>;
export type ViewFunctionName<T extends ABIRoot> = MoveViewFunction<T>['name'];
export type MoveEntryFunction<T extends ABIRoot> = Extract<Functions<T>[number], { is_entry: true }>;
export type EntryFunctionName<T extends ABIRoot> = MoveEntryFunction<T>['name'];

// TODO: Figure out how to return the correct array type
type ConvertParams<T extends readonly string[]> = {
    [P in keyof T]: T[P] extends AllTypes ? ConvertArgsType<T[P]> : Struct<T[P]>;
};

export type ConvertEntryParams<T extends readonly string[]> = ConvertParams<RemoveSigner<T>>;

// TODO: Figure out how to return the correct array type
export type ConvertReturns<T extends readonly string[]> = {
    [P in keyof T]: T[P] extends AllTypes ? ConvertReturnType<T[P]> : Struct<T[P]>;
};

// TODO: Figure out how to return the correct array type
export type ConvertTypeParams<T extends readonly any[]> = {
    [P in keyof T]: string;
};

export type ViewRequestPayload<
    T extends ABIRoot,
    TFuncName extends ViewFunctionName<T>,
    TFunc extends FunctionMap<T>[TFuncName]> = {
        function: TFuncName,
        arguments: ConvertParams<TFunc['params']>,
        type_arguments: ConvertTypeParams<TFunc['generic_type_params']>
    }

// Remove all `signer` and `&signer` from argument list because the Move VM injects those arguments. Clients do not
// need to care about those args. `signer` and `&signer` are required be in the front of the argument list.
type RemoveSigner<T extends readonly string[]> = T extends readonly ['&signer' | 'signer', ...infer Rest]
    ? Rest
    : T;

export type EntryRequestPayload<
    T extends ABIRoot,
    TFuncName extends EntryFunctionName<T>,
    TFunc extends FunctionMap<T>[TFuncName]> = {
        function: TFuncName,
        arguments: ConvertEntryParams<TFunc['params']>,
        type_arguments: ConvertTypeParams<TFunc['generic_type_params']>
    }

export type EntryOptions = {
    account: AptosAccount,
}

export type ViewOptions = {
    ledger_version?: string;
}

export type EntryPayload = {
    rawPayload: {
        function: string;
        type_arguments: string[];
        arguments: any[];
    },
    entryRequest: TxnBuilderTypes.EntryFunction,
    // readonly abi: any,
};

//@ts-ignore TODO: remove this ignore
export type ViewPayload<TReturn> = {
    viewRequest: {
        function: string;
        type_arguments: string[];
        arguments: any[];
    };
    decoders: (((value: any) => any) | null)[],
    // readonly abi: any,
    // readonly return: TReturn,
};


