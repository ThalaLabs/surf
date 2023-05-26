import { capitalizeFirstLetter } from "./utils.js";

export function generateModuleName(abi: ABIRoot): string {
    return `Module${capitalizeFirstLetter(abi.name)}`;
}

export function generateFunctionName(rawName: string): string {
    return `${capitalizeFirstLetter(rawName)}`;
}

export function generateStructName(rawName: string): string {
    return `${capitalizeFirstLetter(rawName)}`;
}