import { AptosClient, TxnBuilderTypes } from "aptos";
import { camelToSnake } from "../utils";
import { createViewPayload } from "./createViewPayload";
import { createEntryPayload } from "./createEntryPayload";
import { ABIClient, ABIRoot, DeepReadonly, EntryOptions, EntryPayload, ViewOptions, ViewPayload } from "../types";

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
    ): Promise<string> {
        const { account } = options;
        const entryFunctionPayload =
            new TxnBuilderTypes.TransactionPayloadEntryFunction(payload.entryRequest);

        // Create a raw transaction out of the transaction payload
        const rawTxn = await this.client.generateRawTransaction(
            account.address(),
            entryFunctionPayload
        );

        // Sign the raw transaction with account's private key
        const bcsTxn = AptosClient.generateBCSTransaction(account, rawTxn);

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
        return transactionRes.hash;
    }

    //@ts-ignore TODO: remove this ignore
    public useABI<T extends DeepReadonly<ABIRoot>>(abi: T) {
        return new Proxy({} as ABIClient<T>, {
            get: (_, prop) => {
                const functionName = prop.toString();
                if (functionName.startsWith("view")) {
                    const realFunctionName = camelToSnake(functionName.slice("view".length));
                    return (...args) => {
                        const payload = createViewPayload(abi, {
                            function: realFunctionName,
                            type_arguments: args[0].type_arguments,
                            arguments: args[0].arguments,
                        });
                        return this.view(payload);
                    };
                }
                else if (functionName.startsWith("entry")) {
                    const realFunctionName = camelToSnake(functionName.slice("entry".length));

                    return (...args) => {
                        const payload = createEntryPayload(abi, {
                            function: realFunctionName,
                            type_arguments: args[0].type_arguments,
                            arguments: args[0].arguments,
                        });
                        return this.submitTransaction(payload, { account: args[0].account });
                    };
                }

                throw new Error(`Function "${functionName}" not found`);
            }
        });
    }
}