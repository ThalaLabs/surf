import { generateFunctionName, generateModuleName, generateStructName } from "./generateNames.js";

function generateFunctionTableItem(func: ABIFunction, abi: ABIRoot): string {
    return `'${abi.address}::${abi.name}::${func.name}' : ${generateModuleName(abi)}.Functions.${generateFunctionName(func.name)};`;
}

function generateStructTableItem(struct: ABIStruct, abi: ABIRoot): string {
    return `'${abi.address}::${abi.name}::${struct.name}' : ${generateModuleName(abi)}.Structs.${generateStructName(struct.name)};`;
}

export function generateTable(abis: ABIRoot[]): string {
    const entryFunctions: string[] = [];
    const viewFunctions: string[] = [];
    const structs: string[] = [];
    abis.forEach(abi => {
        abi
            .exposed_functions
            .filter(func => func.is_entry)
            .map(func => generateFunctionTableItem(func, abi))
            .forEach(str => entryFunctions.push(str));

        abi
            .exposed_functions
            .filter(func => func.is_view)
            .map(func => generateFunctionTableItem(func, abi))
            .forEach(str => viewFunctions.push(str));

        abi
            .structs
            .map(struct => generateStructTableItem(struct, abi))
            .forEach(str => structs.push(str));
    });
    return `
        ${abis.map(abi => `import * as ${generateModuleName(abi)} from './modules/${abi.name}';`).join('\n')}

        type AllEntryFunctions = {
            ${entryFunctions.join('\n')}
        };

        type MoveEntryFunction = keyof AllEntryFunctions;

        type AllViewFunctions = {
            ${viewFunctions.join('\n')}
        };
        
        type MoveViewFunction = keyof AllViewFunctions;

        type AllStructs = {
            ${structs.join('\n')}
        };
        
        type MoveStruct = keyof AllStructs;
    `;
}