/**
 * Move `bool` type value is serialized into `boolean`.
 * 
 * Move `u8`, `u16` and `u32` type value is serialized into `integer`.
 * 
 * Move `u64`, `u128` and `u256` type value is serialized into `string`.
 * 
 * Move `address` type value (32 byte Aptos account address) is serialized into a HexEncodedBytes string.
 * For example:
 *   - `0x1`
 *   - `0x1668f6be25668c1a17cd8caf6b8d2f25`
 * 
 * Move `vector` type value is serialized into `array`, except `vector<u8>` which is serialized into a
 * HexEncodedBytes string with `0x` prefix.
 * For example:
 *   - `vector<u64>{255, 255}` => `[\"255\", \"255\"]`
 *   - `vector<u8>{255, 255}` => `0xffff`
 * 
 * Move `struct` type value is serialized into `object` that looks like this (except some Move stdlib types, see the following section):
 *   ```json
 *   {
 *     field1_name: field1_value,
 *     field2_name: field2_value,
 *     ......
 *   }
 *   ```
 * 
 * For example:
 *   `{ \"created\": \"0xa550c18\", \"role_id\": \"0\" }`
 * 
 * Special serialization for Move stdlib types:
 *   - [0x1::string::String](https://github.com/aptos-labs/aptos-core/blob/main/language/move-stdlib/docs/ascii.md)
 *     is serialized into `string`. For example, struct value `0x1::string::String{bytes: b\"Hello World!\"}`
 *     is serialized as `\"Hello World!\"` in JSON.
 */

export function generateArgumentType(raw: string): string {
    const vectorRegex = /vector<([^]+)>/;
    const match = raw.match(vectorRegex);
    if(match) {
        return `MoveType.Vector<${generateArgumentType(match[1])}>`;
    }

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

export function generateReturnType(raw: string): string {
    const vectorRegex = /vector<([^]+)>/;
    const match = raw.match(vectorRegex);
    if(match) {
        return `MoveType.VectorReturn<${generateArgumentType(match[1])}>`;
    }

    switch (raw) {
        case 'bool':
            return 'MoveType.BoolReturn';
        case 'address':
            return 'MoveType.AddressReturn';
        case 'u8':
            return 'MoveType.U8Return';
        case 'u16':
            return 'MoveType.U16Return';
        case 'u32':
            return 'MoveType.U32Return';
        case 'u64':
            return 'MoveType.U64Return';
        case 'u128':
            return 'MoveType.U128Return';
        case 'u256':
            return 'MoveType.U256Return';
        case '0x1::string::String':
            return 'MoveType.StringReturn';
        default:
            return 'any'; // TODO: fix complex type
    }
}

export function generatePrimitives(): string {
    return `
    export type U8 = number;
    export type U16 = number;
    export type U32 = number;
    export type U64 = bigint | string;
    export type U128 = bigint | string;
    export type U256 = bigint | string;
    export type Address = string;
    export type Bool = boolean;
    export type String = string;
    export type Vector<T> = T[];

    export type U8Return = number;
    export type U16Return = number;
    export type U32Return = number;
    export type U64Return = string;
    export type U128Return = string;
    export type U256Return = string;
    export type AddressReturn = \`0x\${string}\`;
    export type BoolReturn = boolean;
    export type StringReturn = string;
    export type VectorReturn<T> = T[];
    `;
}

