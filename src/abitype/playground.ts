import { AptosClient } from "aptos";
import {coin_abi} from "./abi/coin";
import { createViewPayload, readContract } from ".";

async function main() {
    const viewPayload = createViewPayload(coin_abi, {
        function: 'balance',
        arguments: ['0x1'],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
    });
    
    const result = await readContract(
        new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
        viewPayload);
    const a = result[0];
    
    console.log(a);
}

main();