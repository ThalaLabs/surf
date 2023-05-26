import { generateCommon } from "./generateCommon.js";
import { generateModule } from "./generateModule.js";
import { generateTable } from "./generateTable.js";

export function generateAll(abi: ABIRoot): string {
    return `
        ${generateCommon()}

        ${generateTable([abi])}

        ${generateModule(abi)}
    `;
}