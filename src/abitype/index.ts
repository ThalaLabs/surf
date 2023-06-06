import { AptosAccount, AptosClient, BCS, TxnBuilderTypes } from "aptos";
import { ensureBigInt, ensureBoolean, ensureNumber } from "./ensureTypes";
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

type AnyNumber = number | bigint;

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

type Functions<T extends DeepReadonly<ABIRoot>> = T['exposed_functions'];
type MoveFunction<T extends DeepReadonly<ABIRoot>> = Functions<T>[number];
type FunctionName<T extends DeepReadonly<ABIRoot>> = MoveFunction<T>['name'];
type FunctionMap<T extends DeepReadonly<ABIRoot>> = {
    [P in FunctionName<T>]: Extract<MoveFunction<T>, { name: P }>
};

type MoveViewFunction<T extends DeepReadonly<ABIRoot>> = Extract<Functions<T>[number], { is_view: true }>;
type ViewFunctionName<T extends DeepReadonly<ABIRoot>> = MoveViewFunction<T>['name'];
type MoveEntryFunction<T extends DeepReadonly<ABIRoot>> = Extract<Functions<T>[number], { is_entry: true }>;
type EntryFunctionName<T extends DeepReadonly<ABIRoot>> = MoveEntryFunction<T>['name'];

// TODO: Figure out how to return the correct array type
type ConvertParams<T extends readonly string[]> = {
    [P in keyof T]: T[P] extends AllTypes ? ConvertArgsType<T[P]> : Struct<T[P]>;
};

// TODO: Figure out how to return the correct array type
type ConvertReturns<T extends readonly string[]> = {
    [P in keyof T]: T[P] extends AllTypes ? ConvertReturnType<T[P]> : Struct<T[P]>;
};

// TODO: Figure out how to return the correct array type
type ConvertTypeParams<T extends readonly any[]> = {
    [P in keyof T]: string;
};

type ViewRequestPayload<
    T extends DeepReadonly<ABIRoot>,
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

type EntryRequestPayload<
    T extends DeepReadonly<ABIRoot>,
    TFuncName extends EntryFunctionName<T>,
    TFunc extends FunctionMap<T>[TFuncName]> = {
        function: TFuncName,
        arguments: ConvertParams<RemoveSigner<TFunc['params']>>,
        type_arguments: ConvertTypeParams<TFunc['generic_type_params']>
    }

type SubmitTransactionOptions = {
    account: AptosAccount,
}

// type ViewOptions<TReturn> = {
// }

export type EntryPayload = {
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

function decodeBigint(value: string): bigint {
    return BigInt(value);
}

export function createViewPayload<
    T extends DeepReadonly<ABIRoot>,
    TFuncName extends ViewFunctionName<T>,
    TFunc extends FunctionMap<T>[TFuncName],
    TReturn extends ConvertReturns<TFunc['return']>
>(
    abi: T,
    payload: ViewRequestPayload<T, TFuncName, TFunc>
):
    ViewPayload<TReturn> {
    const fnAbi = abi.exposed_functions.filter(f => f.name === payload.function)[0];
    const type_arguments: string[] = payload.type_arguments as any[];
    const val_arguments: any[] = payload.arguments as any[];

    // Validations
    if (fnAbi === undefined) throw new Error(`Function ${payload.function} not found in ABI`);
    if (fnAbi.params.length !== val_arguments.length) throw new Error(`Function ${payload.function} expects ${fnAbi.params.length} arguments, but ${payload.arguments.length} were provided`);
    if (fnAbi.generic_type_params.length !== type_arguments.length) throw new Error(`Function ${payload.function} expects ${fnAbi.generic_type_params.length} type arguments, but ${payload.type_arguments.length} were provided`);

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
        viewRequest: {
            function: `${abi.address}::${abi.name}::${payload.function}`,
            arguments: args,
            type_arguments: payload.type_arguments as string[],
        },
        decoders,
    };
}

export function createEntryPayload<
    T extends DeepReadonly<ABIRoot>,
    TFuncName extends EntryFunctionName<T>,
    TFunc extends FunctionMap<T>[TFuncName]
>(
    abi: T,
    payload: EntryRequestPayload<T, TFuncName, TFunc>
): EntryPayload {
    // TODO: remove unused variables
    const fnAbi = abi.exposed_functions.filter(f => f.name === payload.function)[0];
    const typeArguments: string[] = payload.type_arguments as any[];
    const valArguments: any[] = payload.arguments as any[];
    const abiArgs = fnAbi.params[0] === '&signer'
        ? (fnAbi.params as string[]).slice(1)
        : fnAbi.params as string[];

    // Validations
    if (fnAbi === undefined) throw new Error(`Function ${payload.function} not found in ABI`);
    if (abiArgs.length !== valArguments.length) throw new Error(`Function ${payload.function} expects ${fnAbi.params.length} arguments, but ${payload.arguments.length} were provided`);
    if (fnAbi.generic_type_params.length !== typeArguments.length) throw new Error(`Function ${payload.function} expects ${fnAbi.generic_type_params.length} type arguments, but ${payload.type_arguments.length} were provided`);

    return {
        entryRequest: TxnBuilderTypes.EntryFunction.natural(
            `${abi.address}::${abi.name}`, // module id
            payload.function, // function name
            typeArguments // type arguments
                .map((arg) => new TxnBuilderTypes.TypeTagStruct(TxnBuilderTypes.StructTag.fromString(arg))),
            valArguments.map( // arguments
                (arg, i) => {
                    const type = abiArgs[i];
                    const serializer = new BCS.Serializer();
                    argToBCS(type, arg, serializer);
                    return serializer.getBytes();
                }
            )
        )
    };
}

function argToBCS(type: string, arg: any, serializer: BCS.Serializer) {

    const regex = /vector<([^]+)>/;
    const match = type.match(regex);
    if (match) { // It's vector
        const innerType = match[1];
        if (innerType === 'u8') {
            if (arg instanceof Uint8Array) { // TODO: add type support for Uint8Array
                serializer.serializeBytes(arg);
                return;
            }

            if (typeof arg === "string") { // TODO: add type support for string
                serializer.serializeStr(arg);
                return;
            }
        }

        if (!Array.isArray(arg)) {
            throw new Error("Invalid vector args.");
        }

        serializer.serializeU32AsUleb128(arg.length);

        arg.forEach((arg) => argToBCS(innerType, arg, serializer));
        return;
    }

    // TODO: it's struct

    switch (type) { // It's primitive
        case 'bool':
            serializer.serializeBool(ensureBoolean(arg));
            break;
        case 'address':
            TxnBuilderTypes.AccountAddress.fromHex(arg as string).serialize(serializer);
            break;
        case 'u8':
            serializer.serializeU8(ensureNumber(arg));
            break;
        case 'u16':
            serializer.serializeU16(ensureNumber(arg));
            break;
        case 'u32':
            serializer.serializeU32(ensureNumber(arg));
            break;
        case 'u64':
            serializer.serializeU64(ensureBigInt(arg));
            break;
        case 'u128':
            serializer.serializeU128(ensureBigInt(arg));
            break;
        case 'u256':
            serializer.serializeU256(ensureBigInt(arg));
            break;
        case '0x1::string::String':
            serializer.serializeStr(arg as string);
            break;
        default:
            throw new Error(`type "${type}" not supported`);
    }
}

export function createClient(options: { nodeUrl: string }): MoveTsClient {
    return new MoveTsClient(
        new AptosClient(options.nodeUrl)
    );
}

class MoveTsClient {
    private client: AptosClient;

    constructor(client: AptosClient) {
        this.client = client;
    }

    public async view<TReturn>(
        payload: ViewPayload<TReturn>
    ): Promise<TReturn> {
        const result = await this.client.view(payload.viewRequest);

        // Decode the return value
        // TODO: for vectors, struct
        return result.map((value, i) =>
            payload.decoders[i] ?
                payload.decoders[i]!(value) :
                value
        ) as TReturn;
    }

    public async submitTransaction(
        payload: EntryPayload,
        { account }: SubmitTransactionOptions
    ): Promise<string> {

        const entryFunctionPayload =
            new TxnBuilderTypes.TransactionPayloadEntryFunction(payload.entryRequest);

        // Create a raw transaction out of the transaction payload
        const rawTxn = await this.client.generateRawTransaction(
            account.address(),
            entryFunctionPayload
        );

        // Sign the raw transaction with account's private key
        const bcsTxn = AptosClient.generateBCSTransaction(account, rawTxn);

        // Submit the transaction
        const transactionRes = await this.client.submitSignedBCSTransaction(
            bcsTxn
        );

        // Wait for the transaction to finish
        // throws an error if the tx fails or not confirmed after timeout
        await this.client.waitForTransaction(transactionRes.hash, {
            timeoutSecs: 120,
            checkSuccess: true,
        });
        return transactionRes.hash;
    }
}
