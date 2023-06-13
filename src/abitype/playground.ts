import { COIN_ABI } from "./abi/coin";
import { AptosAccount } from "aptos";
import { createClient } from "./core";

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
            process.env.TEST_ACCOUNT_PRIVATE_KEY as string,
            "hex"
        )),
    });
    console.log(result2);
}

main().then(() => console.log("done")).catch(console.error);
