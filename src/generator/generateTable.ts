import { ABIRoot, ABIFunction } from "../abi.js";
import { generateFunctionName, generateModuleName, generateStructName } from "./generateNames.js";

function generateFunctionTable(func: ABIFunction[], abi: ABIRoot): string {
    return func
        .map(func => `'${abi.address}::${abi.name}::${func.name}' : ${generateModuleName(abi)}.Functions.${generateFunctionName(func.name)};`)
        .join('\n')
}

export function generateTable(abi: ABIRoot): string {
    return `type AllEntryFunctions = {
            ${generateFunctionTable(abi.exposed_functions.filter(func => func.is_entry), abi)}
        };

        type MoveEntryFunction = keyof AllEntryFunctions;

        type AllViewFunctions = {
            ${generateFunctionTable(abi.exposed_functions.filter(func => func.is_view), abi)}
        };
        
        type MoveViewFunction = keyof AllViewFunctions;

        type AllStructs = {
            ${abi.structs
                .map(struct => `'${abi.address}::${abi.name}::${struct.name}' : ${generateModuleName(abi)}.Structs.${generateStructName(struct.name)};`)
                .join('\n')}
        };
        
        type MoveStruct = keyof AllStructs;
    `;
}