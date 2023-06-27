import { useState, useRef } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient, Types } from "aptos";
import type { EntryPayload } from "../types/index.js";

export type submitTransactionOptions = {
    nodeUrl: string,
    onSuccess?: (result: Types.Transaction_UserTransaction) => void,
    onFailed?: (error: Error) => void,
    max_gas_amount?: string,
}

function isRawPayload(payload: EntryPayload | Types.TransactionPayload_EntryFunctionPayload,): payload is EntryPayload {
    return (<EntryPayload>payload).rawPayload !== undefined;
}

// TODO: add test for this
export const useSubmitTransaction = () => {
    const { signAndSubmitTransaction } = useWallet();

    const [isIdle, setIsIdle] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setResult] = useState<Types.Transaction_UserTransaction>();
    const [error, setError] = useState<Error>();
    const idRef = useRef<number>(0);

    function reset() {
        setIsIdle(true);
        setIsLoading(false);
        setResult(undefined);
        setError(undefined);
        idRef.current = idRef.current + 1;
    }

    async function submitTransaction(
        payload: EntryPayload | Types.TransactionPayload_EntryFunctionPayload,
        {
            nodeUrl,
            onSuccess,
            onFailed,
            max_gas_amount
        }: submitTransactionOptions
    ): Promise<void> {
        // TODO: remove this
        if (signAndSubmitTransaction === undefined) {
            return;
        }
        const id = idRef.current;

        if (!isIdle) {
            throw new Error("Transaction is already in progress");
        }
        setIsLoading(true);
        setIsIdle(false);

        // TODO: make it better. This way to determine the type is tricky.
        const request = isRawPayload(payload) ? payload.rawPayload : payload;

        try {
            // TODO: use the BCS API instead
            const { hash } = await signAndSubmitTransaction({
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
            }, { max_gas_amount });

            const client = new AptosClient(nodeUrl);
            const result = (await client.waitForTransactionWithResult(hash, {
                checkSuccess: true,
            })) as Types.Transaction_UserTransaction;

            // Only update the status if the request is not stale.
            if (id === idRef.current) {
                try {
                    onSuccess?.(result);
                }
                catch (e) {
                    // error from user's callback
                    console.error(e);
                }
                setResult(result);
            }
        } catch (e) {
            // Only update the status if the request is not stale.
            if (id === idRef.current) {
                const error = e instanceof Error ? e :
                    e ? new Error(String(e)) :
                        new Error("unknown error");

                try {
                    onFailed?.(error);
                }
                catch (e2) {
                    // error from user's callback
                    console.error(e2);
                }

                setError(error);
            }
        } finally {
            // Only update the status if the request is not stale.
            if (id === idRef.current) {
                setIsLoading(false);
            }
        }
    }

    return { submitTransaction, reset, isLoading, isIdle, data, error };
};