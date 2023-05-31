export function abiPreProcessor(abi: ABIRoot): ABIRoot {
    abi.address = normalizeAddress(abi.address);
    return abi;
}

export function normalizeAddress(address: string): string {
    if (address === "0x1") {
        return address;
    }
    return '0x' + BigInt(address).toString(16).padStart(64, '0');
}
