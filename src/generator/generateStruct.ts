import { generateStructName } from "./generateNames.js";
import { generateArgumentType } from "./generatePrimitive.js";

export function generateStruct(abi: ABIStruct): string {
    return `
    interface ${generateStructName(abi.name)} {
        ${abi.fields.map(field => {
        return `${field.name}: ${generateArgumentType(field.type)};`
    }).join('\n')}
    }`;
}
