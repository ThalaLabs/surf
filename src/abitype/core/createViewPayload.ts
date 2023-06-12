import { HexString } from "aptos";
import { ABIRoot, DeepReadonly } from "../types";
import { ConvertReturns, FunctionMap, ViewFunctionName, ViewPayload, ViewRequestPayload } from "../types/common";
import { ensureNumber } from "../ensureTypes";

// TODO: support vector<u8> input with Uint8Array
// TODO: support vector<u8> input with string
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
        if (['u8', 'u16', 'u32'].includes(type)) {
            return ensureNumber(payload.arguments[i] as number);
        }
        else if (['u64', 'u128', 'u256'].includes(type)) {
            return payload.arguments[i].toString();
        }
        else if (type.includes("vector")) {
            return encodeVector(type, payload.arguments[i] as any[]);
        }
        else {
            return payload.arguments[i];
        }
    });

    // used to decode the return value in response
    const decoders = fnAbi.return.map((type) => {
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

function decodeBigint(value: string): bigint {
    return BigInt(value);
}

function encodeVector(type: string, value: any[]) {
    const regex = /vector<([^]+)>/;
    const match = type.match(regex);
    if (!match) {
        // Should never happen
        throw new Error(`Unsupported type: ${type}`);
    }

    if (match[1] === "u8") {
        return (
            HexString.fromUint8Array(
                new Uint8Array(
                    value.map((v: number) => {
                        const result = ensureNumber(v);
                        if (result < 0 || result > 255)
                            throw new Error(`Invalid u8 value: ${result}`);
                        return result;
                    }),
                ),
            ) as any
        ).hexString;
    } else if (["u16", "u32"].includes(match[1])) {
        // TODO: Figure out how to encode
        return value;
    } else if (["u64", "u128", "u256"].includes(match[1])) {
        // TODO: Figure out how to encode
        return value.map((v: bigint) => v.toString());
    } else if (match[1] === "bool") {
        // TODO: Figure out how to encode
        return value;
    } else {
        // 1. Address type no need to encode
        // 2. TODO: Figure out how to encode Struct type
        return value;
    }
}