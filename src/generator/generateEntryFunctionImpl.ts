// 1. Generate submit entry function as a JavaScript function instead TypeScript type.
// Because submit function need to know the exact type at runtime to do correct bcs serialization
// 2. We won't put all of the functions into a class,
// So that if the function isn't used by the app, it won't be included in the bundle because of tree shaking.

import { generateBCSArgument } from "./generateBCSArgument.js";
import { generateArgumentType } from "./generatePrimitive.js";
import { capitalizeFirstLetter } from "./utils.js";

// TODO: use generic type to verify the relationship between type_arguments and arguments.
export function generateEntryFunctionImpl(func: ABIFunction, abi: ABIRoot): string {
    const params = func.params.slice(1);
    return `
    export async function submit${capitalizeFirstLetter(abi.name)}${capitalizeFirstLetter(func.name)}(
        client: AptosClient,
        account: AptosAccount,
        request: {
            type_arguments: [${func.generic_type_params.map(() => 'MoveStruct').join(', ')}],
            arguments: [${params.map(t => generateArgumentType(t)).join(', ')}],
        }
    ): Promise<string> {
        ${params.map((argType, i) => {
            if(['u8', 'u16', 'u32'].includes(argType))
            {
                return `const a${i} = typeof request.arguments[${i}] === 'string' ? Number(request.arguments[${i}]) : request.arguments[${i}]`;
            }

            if(['u64', 'u128', 'u256'].includes(argType))
            {
                return `const a${i} = typeof request.arguments[${i}] === 'string' ? BigInt(request.arguments[${i}]) : request.arguments[${i}]`;
            }

            return `const a${i} = request.arguments[${i}]`;
        })
        .join('\n')}

        const entryFunction = TxnBuilderTypes.EntryFunction.natural(
            "${abi.address}::${abi.name}",
            "${func.name}",
            request.type_arguments.map(type => new TxnBuilderTypes.TypeTagStruct(
                TxnBuilderTypes.StructTag.fromString(type)
            )),
            [
                ${params.map((argType, i) => generateBCSArgument(argType)(`a${i}`)).join(',\n')}
            ]
        );
        return submitEntryFunctionImpl(client, account, entryFunction);
    }    
    `;
}

export function generateAllEntryFunctionImpl(abi: ABIRoot): string {
    const entries = abi.exposed_functions
        .filter(func => func.is_entry);
    if (entries.length === 0) return '';

    return `
    import { AptosAccount, AptosClient, BCS, TxnBuilderTypes } from "aptos";
    import {submitEntryFunctionImpl} from "../index";
    import { MoveStruct } from "../types/moduleTable";
    import * as MoveType from '../types/primitives';

    ${entries
            .map(func => generateEntryFunctionImpl(func, abi))
            .join('\n')}
    `;
}
