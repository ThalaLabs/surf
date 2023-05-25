export function generateArgumentType(raw: string): string {
    switch (raw) {
        case 'bool':
            return 'MovePrimitiveBool';
        case 'address':
            return 'MovePrimitiveAddress';
        case 'u8':
            return 'MovePrimitiveU8';
        case 'u64':
            return 'MovePrimitiveU64';
        case 'u128':
            return 'MovePrimitiveU128';
        // TODO: add other primitive types
        default:
            return 'any'; // TODO: fix complex type
    }
}