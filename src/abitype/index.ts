import { AptosClient } from "aptos";


export interface ABIRoot {
    address: string;
    name: string;
    friends: string[];
    exposed_functions: ABIFunction[];
    structs: ABIStruct[];
}

export interface ABIFunction {
    name: string;
    visibility: "friend" | "public";
    is_entry: boolean;
    is_view: boolean;
    generic_type_params: ABIFunctionGenericTypeParam[];
    params: string[];
    return: string[];
}

export interface ABIFunctionGenericTypeParam {
    constraints: any[];
}

export interface ABIStruct {
    name: string;
    is_native: boolean;
    abilities: string[];
    generic_type_params: ABIFunctionGenericTypeParam[];
    fields: ABIStructField[];
}

export interface ABIStructField {
    name: string;
    type: string;
}

// TODO: remove this
type DeepReadonly<T> =
    T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
    T extends object ? DeepReadonlyObject<T> :
    T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> { }

type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Primitives = 'bool' | 'u8' | 'u16' | 'u32' | 'u64' | 'u128' | 'u256' | 'address' | '0x1::string::String';
export type ConvertArgsType<T extends Primitives> =
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

type AnyNumber = number | bigint;

export type ConvertReturnType<T extends Primitives> =
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

type Functions<T extends DeepReadonly<ABIRoot>> = T['exposed_functions'];
type MoveFunction<T extends DeepReadonly<ABIRoot>> = Functions<T>[number];
type FunctionName<T extends DeepReadonly<ABIRoot>> = MoveFunction<T>['name'];
type FunctionMap<T extends DeepReadonly<ABIRoot>> = {
    [P in FunctionName<T>]: Extract<MoveFunction<T>, { name: P }>
};

type MoveViewFunction<T extends DeepReadonly<ABIRoot>> = Extract<Functions<T>[number], { is_view: true }>;
type ViewFunctionName<T extends DeepReadonly<ABIRoot>> = MoveViewFunction<T>['name'];
type ViewFunctionMap<T extends DeepReadonly<ABIRoot>> = {
    [P in ViewFunctionName<T>]: Extract<MoveViewFunction<T>, { name: P }>
};

type ConvertParams<T extends readonly string[]> = {
    [P in keyof T]: T[P] extends Primitives ? ConvertArgsType<T[P]> : T[P];
}

type ConvertTypeParams<T extends readonly any[]> = {
    [P in keyof T]: string;
}

type ViewRequestPayload<
    T extends DeepReadonly<ABIRoot>,
    TFuncName extends ViewFunctionName<T>,
    TFunc extends ViewFunctionMap<T>[TFuncName]> = {
        function: TFuncName,
        arguments: ConvertParams<TFunc['params']>,
        type_arguments: ConvertTypeParams<TFunc['generic_type_params']>
    }

//@ts-ignore TODO: remove this ignore
type RequestPayload<
    T extends DeepReadonly<ABIRoot>,
    TFuncName extends FunctionName<T>,
    TFunc extends FunctionMap<T>[TFuncName]> = {
        function: TFuncName,
        arguments: ConvertParams<TFunc['params']>,
        type_arguments: ConvertTypeParams<TFunc['generic_type_params']>
    }

//@ts-ignore TODO: remove this ignore
type EntryPayloads = {
    readonly function: any,
    readonly arguments: any,
    readonly type_arguments: any,
    // readonly abi: any,
};

//@ts-ignore TODO: remove this ignore
export type ViewPayloads<TReturn> = {
    readonly function: any,
    readonly arguments: any,
    readonly type_arguments: any,
    decoders: (((value: any) => any) | null)[],
    // readonly abi: any,
    // readonly return: TReturn,
};

function decodeBigint(value: string): bigint {
    return BigInt(value);
}

export function createViewPayload<
    T extends DeepReadonly<ABIRoot>,
    TFuncName extends ViewFunctionName<T>,
    TFunc extends ViewFunctionMap<T>[TFuncName]>
    (
        abi: T,
        payload: ViewRequestPayload<T, TFuncName, TFunc>
    ):
    ViewPayloads<ConvertParams<TFunc['return']>> {
    const fnAbi = abi.exposed_functions.filter(f => f.name === payload.function)[0];

    // Validations
    if (fnAbi === undefined) throw new Error(`Function ${payload.function} not found in ABI`);
    if (fnAbi.params.length !== payload.arguments.length) throw new Error(`Function ${payload.function} expects ${fnAbi.params.length} arguments, but ${payload.arguments.length} were provided`);

    // TODO: fix this
    // if (fnAbi.generic_type_params.length !== payload.type_arguments.length) throw new Error(`Function ${payload.function} expects ${fnAbi.generic_type_params.length} type arguments, but ${payload.type_arguments.length} were provided`);

    // TODO: do serialization here
    const args = fnAbi.params.map((type, i) => {
        if (['u8', 'u16', 'u32', 'u64', 'u128', 'u256'].includes(type)) {
            return payload.arguments[i].toString();
        }
        else {
            return payload.arguments[i];
        }
    });

    // used to decode the return value in response
    const decoders = fnAbi.params.map((type) => {
        if (['u64', 'u128', 'u256'].includes(type)) {
            return decodeBigint;
        }
        else {
            return null;
        }
    });

    return {
        ...payload,
        function: `${abi.address}::${abi.name}::${payload.function}`,
        arguments: args,
        decoders,
    };
}

// export function createViewPayload<
//     T extends DeepReadonly<ABIRoot>,
//     TFuncName extends FunctionName<T>,
//     TFunc extends FunctionMap<T>[TFuncName]>
//     (
//         abi: T,
//         p: RequestPayload<T, TFuncName, TFunc>
//     ):
//     ViewPayloads<ConvertParams<TFunc['return']>> {
//     // TODO: do serialization here
//     return p;
// }

export async function readContract<TReturn>(
    client: AptosClient,
    payload: ViewPayloads<TReturn>): Promise<TReturn> {
    // Currently only works for primitives
    // TODO: do deserialization here
    // for bigints
    // for vectors
    const result = await client.view({
        function: payload.function,
        arguments: payload.arguments,
        type_arguments: payload.type_arguments,
    });
    return result.map((value, i) =>
        payload.decoders[i] ?
            payload.decoders[i]!(value) :
            value
    ) as TReturn;
}

// function createEntryPayload<
//     T extends DeepReadonly<ABIRoot>,
//     TFuncName extends FunctionName<T>,
//     TFunc extends FunctionMap<T>[TFuncName]>
//     (
//         abi: T,
//         p: RequestPayload<T, TFuncName, TFunc>
//     ):
//     EntryPayloads {
//     return {} as any;
// }


// function writeContract(
//     client: AptosClient,
//     payload: EntryPayloads) {
// }
