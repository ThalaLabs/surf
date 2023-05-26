import { generateFunction } from "./generateFunction.js";
import { generateModuleName } from "./generateNames.js";
import { generateStruct } from "./generateStruct.js";

// TODO: how to resolve same name module from difference address
export function generateModule(abi: ABIRoot): string {
    return `
    declare namespace ${generateModuleName(abi)} {
        namespace Structs {
            ${abi.structs
            .map(struct => generateStruct(struct))
            .join('\n\n')}
        }

        namespace Functions {
            ${abi.exposed_functions.filter(func => func.is_entry || func.is_view)
            .map(func => generateFunction(func))
            .join('\n\n')}
        }
    }`;
}



