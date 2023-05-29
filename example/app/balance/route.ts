import { AptosClient } from "aptos";
import { view } from "../../bindings";
import { NextResponse } from "next/server";
import { ViewRequest } from "../../bindings/types/common";

export async function GET(request: Request) {
    try {
        // Call view function with type safety.
        const balance = await view(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            {
                function: '0x1::coin::balance',
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
                arguments: ['0x1']
            });

        // Create a request object before call view function.
        const nameRequest: ViewRequest<'0x1::coin::name'> = {
            function: '0x1::coin::name',
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
            arguments: []
        };
        const coinName = await view(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            nameRequest
        )

        return NextResponse.json({ message: `0x1 has ${balance} ${coinName}` });
    }
    catch (e) {
        return NextResponse.json({ error: "view failed" });
    }
}
