import { NextResponse } from 'next/server';
import { submitCoinTransfer } from '../../bindings/entries/coin';
import { AptosAccount, AptosClient } from 'aptos';

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
        const tx = await submitCoinTransfer(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            account,
            {
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
                arguments: ['0x1', BigInt(1)]
            }
        )
        return NextResponse.json({ tx });
    }
    catch(e) {
        return NextResponse.json({ error: "submit transaction failed" });
    }
}
