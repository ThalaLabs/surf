import { generateFunction } from "./generateFunction.js";
import { generateStruct } from "./generateStruct.js";

export function generateModule(abi: ABIRoot): string {
    return `
    import * as MoveType from '../primitives';
    import { MoveStruct } from "../moduleTable";

    export namespace Structs {
        ${abi.structs
        .map(struct => generateStruct(struct))
        .join('\n\n')}
    }

    export namespace Functions {
        ${abi.exposed_functions.filter(func => func.is_entry || func.is_view)
        .map(func => generateFunction(func))
        .join('\n\n')}
    }
    `;
}
