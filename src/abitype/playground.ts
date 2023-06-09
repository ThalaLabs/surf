import { COIN_ABI } from "./abi/coin";
import { PYTH_ABI } from "./abi/pyth";
import { createClient, createEntryPayload, createViewPayload } from ".";
import { AptosAccount } from "aptos";

async function main() {
    console.log("start");

    const client = createClient({
        nodeUrl: "https://fullnode.testnet.aptoslabs.com/v1"
    });

    const result1 = await client.useABI(COIN_ABI).viewBalance({
        arguments: ['0x1'],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
    });
    console.log(typeof result1[0]);
    console.log(result1);

    console.log("entry start");
    const result2 = await client.useABI(COIN_ABI).entryTransfer({
        arguments: ['0x1', 1],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        account: new AptosAccount(Buffer.from(
            "da00cd868b59c22a1cb3cbfcb4bf0f8c8829662c504019c729825483fb85f9b2",
            "hex"
        )),
    });
    console.log(result2);

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