import { AptosClient, TxnBuilderTypes } from "aptos";
import { createViewPayload } from "./createViewPayload";
import { createEntryPayload } from "./createEntryPayload";
import { ABIRoot, EntryOptions, EntryPayload, ViewOptions, ViewPayload } from "../types";
import { TransactionResponse } from "../types/common";
import { ABIEntryClient, ABIViewClient } from "../types/client";

export function createClient(options: { nodeUrl: string }): Client {
    return new Client(
        new AptosClient(options.nodeUrl)
    );
}

export class Client {
    private client: AptosClient;

    constructor(client: AptosClient) {
        this.client = client;
    }

    public async view<TReturn>(
        payload: ViewPayload<TReturn>,
        options?: ViewOptions
    ): Promise<TReturn> {
        const result = await this.client.view(
            payload.viewRequest,
            options?.ledger_version
        );

        // Decode the return value
        // TODO: for vectors, struct
        return result.map((value, i) =>
            payload.decoders[i] ?
                payload.decoders[i]!(value) :
                value
        ) as TReturn;
    }

    public async submitTransaction(
        payload: EntryPayload,
        options: EntryOptions
    ): Promise<TransactionResponse> {
        const rawTxn = await this.generateRawTxn(payload, options);

        // Sign the raw transaction with account's private key
        const bcsTxn = AptosClient.generateBCSTransaction(options.account, rawTxn);

        // Submit the transaction
        const transactionRes = await this.client.submitSignedBCSTransaction(
            bcsTxn
        );

        // Wait for the transaction to finish
        // throws an error if the tx fails or not confirmed after timeout
        await this.client.waitForTransaction(transactionRes.hash, {
            timeoutSecs: 120,
            checkSuccess: true,
        });
        return transactionRes;
    }

    public async simulateTransaction(
        payload: EntryPayload,
        options: EntryOptions
    ): Promise<TransactionResponse> {
        const rawTxn = await this.generateRawTxn(payload, options);

        const transactionRes = (await this.client.simulateTransaction(options.account, rawTxn))[0];
        if (!transactionRes) {
            throw new Error("Failed to simulate transaction");
        }

        return transactionRes;
    }

    public useABI<T extends ABIRoot>(abi: T) {
        return {
            view: new Proxy({} as ABIViewClient<T>, {
                get: (_, prop) => {
                    const functionName = prop.toString();
                    return (...args) => {
                        const payload = createViewPayload(abi, {
                            function: functionName,
                            type_arguments: args[0].type_arguments,
                            arguments: args[0].arguments,
                        });
                        return this.view(payload);
                    };
                }
            }),
            entry: new Proxy({} as ABIEntryClient<T>, {
                get: (_, prop) => {
                    const functionName = prop.toString();
                    return (...args) => {
                        const payload = createEntryPayload(abi, {
                            function: functionName,
                            type_arguments: args[0].type_arguments,
                            arguments: args[0].arguments,
                        });
                        return args[0].isSimulation ?
                            this.simulateTransaction(payload, { account: args[0].account }) :
                            this.submitTransaction(payload, { account: args[0].account });
                    };
                }
            })
        };
    }

    private async generateRawTxn(payload: EntryPayload, options: EntryOptions,) {
        const { account } = options;
        const entryFunctionPayload = new TxnBuilderTypes.TransactionPayloadEntryFunction(payload.entryRequest);

        // Create a raw transaction out of the transaction payload
        const rawTxn = await this.client.generateRawTransaction(
            account.address(),
            entryFunctionPayload
        );
        return rawTxn;
    }
}