// 1. Generate submit entry function as a JavaScript function instead TypeScript type.
// Because submit function need to know the exact type at runtime to do correct bcs serialization
// 2. We won't put all of the functions into a class,
// So that if the function isn't used by the app, it won't be included in the bundle because of tree shaking.

import { generateBCSArgument } from "./generateBCSArgument.js";
import { generateArgumentType } from "./generatePrimitive.js";
import { capitalizeFirstLetter } from "./utils.js";

// TODO: use generic type to verify the relationship between type_arguments and arguments.
export function generateEntryFunctionImpl(func: ABIFunction, abi: ABIRoot): string {
    return `
    export async function submit${capitalizeFirstLetter(abi.name)}${capitalizeFirstLetter(func.name)}(
        account: AptosAccount,
        request: {
            type_arguments: [${func.generic_type_params.map(() => 'MoveStruct').join(', ')}],
            arguments: [${func.params.slice(1).map(t => generateArgumentType(t)).join(', ')}],
        }
    ): Promise<string> {
        const entryFunction = TxnBuilderTypes.EntryFunction.natural(
            "${abi.address}::${abi.name}",
            "${func.name}",
            request.type_arguments.map(type => new TxnBuilderTypes.TypeTagStruct(
                TxnBuilderTypes.StructTag.fromString(type)
            )),
            [
                ${func.params.slice(1).map((argType, i) => generateBCSArgument(argType)(`request.arguments[${i}]`)).join(',\n')}
            ]
        );
        return submitEntryFunctionImpl(account, entryFunction);
    }    
    `;
}