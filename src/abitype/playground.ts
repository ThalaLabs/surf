import { COIN_ABI } from "./abi/coin";
import { PYTH_ABI } from "./abi/pyth";
import { createClient, createEntryPayload, createViewPayload } from ".";
import { AptosAccount } from "aptos";

async function main() {
    console.log("start");

    const client = createClient({
        nodeUrl: "https://fullnode.testnet.aptoslabs.com/v1"
    });

    console.log("call view");
    const viewPayload = createViewPayload(COIN_ABI, {
        function: 'balance',
        arguments: ['0x1'],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
    });
    const result = await client.view(viewPayload);
    const a = result[0];

    console.log("view result:", a);

    console.log("call submit");
    const entryPayload = createEntryPayload(COIN_ABI, {
        function: 'transfer',
        arguments: ['0x1', 1],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
    });
    const tx = await client.submitTransaction(
        entryPayload,
        {
            account: new AptosAccount(Buffer.from(
                process.env.TEST_ACCOUNT_PRIVATE_KEY as string,
                "hex"
            )),
        });
    console.log("tx", tx);


    // Input vector of vector
    createEntryPayload(PYTH_ABI, {
        function: "update_price_feeds_with_funder",
        type_arguments: [],
        arguments: [[[1, 2, 3], [4, 5, 6]]],
    });
}

main().then(() => console.log("done")).catch(console.error);