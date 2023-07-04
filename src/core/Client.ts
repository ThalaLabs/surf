import { AptosClient, TxnBuilderTypes } from "aptos";
import { createViewPayload } from "./createViewPayload.js";
import { createEntryPayload } from "./createEntryPayload.js";
import type { ABIEntryClient, ABIViewClient, ABIRoot, EntryOptions, EntryPayload, ViewOptions, ViewPayload, DefaultABITable } from "../types/index.js";
import type { TransactionResponse } from "../types/common.js";
import { ABIResourceClient } from "../types/abiClient.js";
import { ABITable } from "../types/struct.js";

export function createClient<TABITable extends ABITable = DefaultABITable>
    (options: { nodeUrl: string }): Client<TABITable> {
    return new Client<TABITable>(
        new AptosClient(options.nodeUrl)
    );
}

export class Client<TABITable extends ABITable> {
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
        // TODO: for struct
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
            }),
            resource: new Proxy({} as ABIResourceClient<TABITable, T>, {
                get: (_, prop) => {
                    let structName = prop.toString();
                    return (...args) => {
                        if (args[0].type_arguments.length !== 0) {
                            structName += `<${args[0].type_arguments.join(",")}>`;
                        }
                        return this.client.getAccountResource(
                            args[0].account,
                            `${abi.address}::${abi.name}::${structName}`,
                        );

                        // TODO: decode the u64, u128, u256 to bigint
                    };
                }
            }),
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