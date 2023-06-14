import { NextResponse } from "next/server";
import { createClient, createViewPayload } from "@thalalabs/surf";
import { COIN_ABI } from "../../abi/coin";

export async function GET(request: Request) {
    try {
        const client = createClient({
            nodeUrl: "https://fullnode.testnet.aptoslabs.com/v1"
        });

        const balancePayload = createViewPayload(
            COIN_ABI,
            {
                function: 'balance',
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
                arguments: ['0x1']
            });
        const balance = await client.view(balancePayload);

        const coinNamePayload = createViewPayload(
            COIN_ABI,
            {
                function: 'name',
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
                arguments: []
            });
        const coinName = await client.view(coinNamePayload);

        return NextResponse.json({ message: `0x1 has ${balance} ${coinName}` });
    }
    catch (e) {
        return NextResponse.json({ error: "view failed" });
    }
}
