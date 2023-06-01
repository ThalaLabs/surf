/* This file is only used for type checking,
 * to ensure the move-ts work properly. 
 */

import { AptosClient } from "aptos";
import { view, ViewRequest } from "../../bindings";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        // Expect fail when function not exist
        await view(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            {
                // @ts-expect-error abc is not a function
                function: '0x1::coin::abc',
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
                arguments: ['0x1']
            });

        // Expect fail when type_arguments not match
        const nameRequest: ViewRequest<'0x1::coin::name'> = {
            function: '0x1::coin::name',
            // @ts-expect-error require a type_argument
            type_arguments: [],
            arguments: []
        };

        // Expect fail when type_arguments not match
        await view(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            {
                function: '0x1::account::exists_at',
                // @ts-expect-error no type_argument required here
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
                arguments: ['0x1']
            });

        // Expect Fail when type_arguments not exist
        await view(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            {
                function: '0x1::coin::name',
                // @ts-expect-error type not exist
                type_arguments: ['0x1::aptos_coin::abc'],
                arguments: []
            });

        // Expect fail when args type wrong
        await view(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            {
                function: '0x1::account::exists_at',
                type_arguments: [],
                // @ts-expect-error expect a address
                arguments: [1]
            });
        
        // Expect fail when the number of args wrong
        await view(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            {
                function: '0x1::account::exists_at',
                type_arguments: [],
                // @ts-expect-error expect a address
                arguments: ['0x1', 1]
            });

        // Expect fail when the number of args wrong
        await view(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            {
                function: '0x1::account::exists_at',
                type_arguments: [],
                // @ts-expect-error expect a address
                arguments: ['0x1', 1]
            });

        // Expect the return type is strong typed
        const results = await view(
            new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
            {
                function: '0x1::coin::name',
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
                arguments: []
            });

        // it should be a string
        const aString: string = results[0];

        // @ts-expect-error access out of range index
        const aString2: string = results[1];

        // @ts-expect-error string not assignable to number
        const aString3: number = results[0];

        return NextResponse.json({});
    }
    catch (e) {
        return NextResponse.json({ error: "view failed" });
    }
}
