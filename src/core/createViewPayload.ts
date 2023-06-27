import { HexString } from "aptos";
import type { ABIRoot, ViewPayload } from "../types/index.js";
import type { ExtractReturnType, ViewFunctionName, ViewRequestPayload } from "../types/common.js";
import { ensureNumber } from "../ensureTypes.js";

// TODO: support vector<u8> input with Uint8Array
// TODO: support vector<u8> input with string
export function createViewPayload<
    T extends ABIRoot,
    TFuncName extends ViewFunctionName<T>
>(
    abi: T,
    payload: ViewRequestPayload<T, TFuncName>
):
    ViewPayload<ExtractReturnType<T, TFuncName>> {
    const fnAbi = abi.exposed_functions.filter(f => f.name === payload.function)[0];
    const type_arguments: string[] = payload.type_arguments as any[];
    const val_arguments: any[] = payload.arguments as any[];

    // Validations
    if (fnAbi === undefined) throw new Error(`Function ${payload.function} not found in ABI`);
    if (fnAbi.params.length !== val_arguments.length) throw new Error(`Function ${payload.function} expects ${fnAbi.params.length} arguments, but ${payload.arguments.length} were provided`);
    if (fnAbi.generic_type_params.length !== type_arguments.length) throw new Error(`Function ${payload.function} expects ${fnAbi.generic_type_params.length} type arguments, but ${payload.type_arguments.length} were provided`);

    // TODO: do serialization here
    const args = fnAbi.params.map((type, i) => {
        const arg = payload.arguments[i]!;
        if (['u8', 'u16', 'u32'].includes(type)) {
            return ensureNumber(arg as number);
        }
        else if (['u64', 'u128', 'u256'].includes(type)) {
            return arg.toString();
        }
        else if (type.includes("vector")) {
            return encodeVector(type, arg as any[]);
        }
        else { // string or address
            return arg;
        }
    });

    // used to decode the return value in response
    const decoders = fnAbi.return.map((type) => {
        if (['u64', 'u128', 'u256'].includes(type)) {
            return decodeBigint;
        }
        else if (type.includes("vector")) {
            return (value: any[]) => decodeVector(type, value)
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

function decodeVector(type: string, value: any[]) {
    const regex = /vector<([^]+)>/;
    const match = type.match(regex);
    if (!match) {
        // Should never happen
        throw new Error(`Unsupported type: ${type}`);
    }
    const innerType = match[1]!;

    if(["address", "bool", "u8", "u16", "u32"].includes(innerType)) {
        return value;
    }
    else if (["u64", "u128", "u256"].includes(innerType)) {
        return value.map((v: string) => BigInt(v));
    } else {
        // TODO: Figure out how to decode Vector of vector
        return value;
    }
}

function encodeVector(type: string, value: any[]) {
    const regex = /vector<([^]+)>/;
    const match = type.match(regex);
    if (!match) {
        // Should never happen
        throw new Error(`Unsupported type: ${type}`);
    }
    const innerType = match[1]!;
    if (innerType === "u8") {
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
    } else if (["bool", "u16", "u32"].includes(innerType)) {
        return value;
    } else if (["u64", "u128", "u256"].includes(innerType)) {
        return value.map((v: bigint) => v.toString());
    } else { // string or address
        // TODO: encode for Vector of vector
        return value;
    }
}