import type { ABIFunction } from "../abi.d.ts";
import { generateFunctionName } from "./generateNames.js";
import { generateArgumentType } from "./generatePrimitive.js";

export function generateFunction(abi: ABIFunction): string {
    // TODO: add constraints
    // TODO: support generic type has relation ship with args
    return `export type ${generateFunctionName(abi.name)} = {
        types: [${abi.generic_type_params.map(() => 'MoveStruct').join(',')}];
        args: [${abi.params.slice(1).map(param => generateArgumentType(param)).join(',')}];
        return: [${abi.return.map(param => generateArgumentType(param)).join(',')}];
    };`;
}
