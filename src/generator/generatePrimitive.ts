export function generateArgumentType(raw: string): string {
    switch (raw) {
        case 'bool':
            return 'MovePrimitiveBool';
        case 'address':
            return 'MovePrimitiveAddress';
        case 'u8':
            return 'MovePrimitiveU8';
        case 'u16':
            return 'MovePrimitiveU16';
        case 'u32':
            return 'MovePrimitiveU32';
        case 'u64':
            return 'MovePrimitiveU64';
        case 'u128':
            return 'MovePrimitiveU128';
        case 'u256':
            return 'MovePrimitiveU256';
        case '0x1::string::String':
            return 'MoveString';
        default:
            return 'any'; // TODO: fix complex type
    }
}
