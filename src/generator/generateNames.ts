import { accountTable } from "../accountTable.js";
import { capitalizeFirstLetter } from "./utils.js";

export function generateModuleFileName(abi: ABIRoot, accountName: string): string {
    return `${accountName}${capitalizeFirstLetter(abi.name)}`;
}

export function generateModuleName(abi: ABIRoot): string {
    return `${capitalizeFirstLetter(accountTable[abi.address] ?? "")}${capitalizeFirstLetter(abi.name)}`;
}

export function generateFunctionName(rawName: string): string {
    return `${capitalizeFirstLetter(rawName)}`;
}

export function generateStructName(rawName: string): string {
    return `${capitalizeFirstLetter(rawName)}`;
}