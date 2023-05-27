import { AptosClient } from "aptos";
import { view } from "../../bindings";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const balance = await view(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            {
                function: '0x1::coin::balance',
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
                arguments: ['0x1']
            });

        const coinName = await view(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            {
                function: '0x1::coin::name',
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
                arguments: []
            })

        return NextResponse.json({ message: `0x1 has ${balance} ${coinName}` });

    }
    catch (e) {
        return NextResponse.json({ error: "view failed" });
    }
}
