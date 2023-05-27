import { generateFunctionName } from "./generateNames.js";
import { generateArgumentType } from "./generatePrimitive.js";

export function generateFunction(abi: ABIFunction): string {
    // TODO: add constraints
    // TODO: support generic type has relation ship with args
    return `
    type ${generateFunctionName(abi.name)} = {
        types: [${abi.generic_type_params.map(() => 'MoveStruct').join(',')}];
        args: [${(abi.is_entry ? abi.params.slice(1) : abi.params)
            .map(param => generateArgumentType(param)).join(',')}];
        return: [${abi.return.map(param => generateArgumentType(param)).join(',')}];
    };`;
}
