import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient, Types } from "aptos";
import { createEntryPayload } from "./createEntryPayload";
import { ABIRoot, ABIWalletClient, EntryOptions, EntryPayload } from "../types";
import { TransactionResponse } from "../types/common";

type Wallet = ReturnType<typeof useWallet>;

export class WalletClient {
    private wallet: Wallet;
    private client: AptosClient;

    constructor({ wallet, nodeUrl }: {
        wallet: Wallet,
        nodeUrl: string
    }) {
        this.wallet = wallet;
        this.client = new AptosClient(nodeUrl);
    }

    public async submitTransaction(
        payload: EntryPayload,
        _: EntryOptions | undefined = undefined
    ): Promise<TransactionResponse> {
        const request = payload.rawPayload;

        // TODO: use the BCS API instead
        const { hash } = await this.wallet.signAndSubmitTransaction({
            type: "entry_function_payload",
            ...request,
            arguments: request.arguments.map((arg: any) => {
                if (Array.isArray(arg)) {
                    // TODO: support nested array, or use the BCS API instead
                    return arg.map((item: any) => item.toString());
                } else if (typeof arg === "object") {
                    throw new Error(`a value of struct type: ${arg} is not supported`);
                } else {
                    return arg.toString();
                }
            }),
        });

        const result = (await this.client.waitForTransactionWithResult(hash, {
            checkSuccess: true,
        })) as Types.Transaction_UserTransaction;

        return result;
    }

    public useABI<T extends ABIRoot>(abi: T) {
        return new Proxy({} as ABIWalletClient<T>, {
            get: (_, prop) => {
                const functionName = prop.toString();
                return (...args) => {
                    const payload = createEntryPayload(abi, {
                        function: functionName,
                        type_arguments: args[0].type_arguments,
                        arguments: args[0].arguments,
                    });
                    return this.submitTransaction(payload);
                };
            }
        });
    }
}