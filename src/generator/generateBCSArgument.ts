export function generateBCSArgument(type:string): (val:string)=>string {
    switch (type) {
        case 'bool':
            return (val: string) => `BCS.bcsSerializeBool(${val})`;
        case 'address':
            return (val: string) => `BCS.bcsToBytes(
                TxnBuilderTypes.AccountAddress.fromHex(${val})
            )`;
        case 'u8':
            return (val: string) => `BCS.bcsSerializeU8(${val})`;
        case 'u16':
            return (val: string) => `BCS.bcsSerializeU16(${val})`;
        case 'u32':
            return (val: string) => `BCS.bcsSerializeU32(${val})`;
        case 'u64':
            return (val: string) => `BCS.bcsSerializeUint64(${val})`;
        case 'u128':
            return (val: string) => `BCS.bcsSerializeU128(${val})`;
        case 'u256':
            return (_: string) => `throw new Error('u256 not supported')`; // BCS API not support u256
        case '0x1::string::String':
            return (val: string) => `BCS.bcsSerializeStr(${val})`;
        default:
            return (_: string) => `trow new Error('type '${type}' not supported')`; // TODO: support complex type
    }
}