export function generateIndex() {
  return `
    export * from "./impl";
    export * from "./types/moduleTable.d";
    export * from "./types/common.d";
    `;
}