import { NextResponse } from 'next/server';
import { AptosAccount } from 'aptos';
import { createClient, createEntryPayload } from '@thalalabs/surf';
import { COIN_ABI } from '../../abi/coin';

export async function GET(request: Request) {
    let account;
    try {
        account = new AptosAccount(
            Buffer.from(process.env.TEST_ACCOUNT_PRIVATE_KEY as string, "hex"));
    }
    catch (e) {
        return NextResponse.json({ error: "Invalid private key" });
    }

    try {
        const client = createClient({
            nodeUrl: "https://fullnode.testnet.aptoslabs.com/v1"
        });
        const transferPayload = createEntryPayload(COIN_ABI, {
            function: 'transfer',
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
            arguments: ['0x1', BigInt(1)]
        });
        const tx = await client.submitTransaction(transferPayload, { account });
        return NextResponse.json({ tx });
    }
    catch (e) {
        return NextResponse.json({ error: "submit transaction failed" });
    }
}
