export function generateArgumentType(raw: string): string {
    switch (raw) {
        case 'bool':
            return 'MoveType.Bool';
        case 'address':
            return 'MoveType.Address';
        case 'u8':
            return 'MoveType.U8';
        case 'u16':
            return 'MoveType.U16';
        case 'u32':
            return 'MoveType.U32';
        case 'u64':
            return 'MoveType.U64';
        case 'u128':
            return 'MoveType.U128';
        case 'u256':
            return 'MoveType.U256';
        case '0x1::string::String':
            return 'MoveType.String';
        default:
            return 'any'; // TODO: fix complex type
    }
}

export function generatePrimitives(): string {
    return `
    export type U8 = number;
    export type U16 = number;
    export type U32 = number;
    export type U64 = bigint;
    export type U128 = bigint;
    export type U256 = bigint;
    export type Address = \`0x\${string}\`;
    export type Bool = boolean;
    export type String = string;    
    `;
}
