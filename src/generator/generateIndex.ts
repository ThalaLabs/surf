export function generateIndex() {
    return `
    import { AptosAccount, AptosClient, TxnBuilderTypes, Types } from "aptos";
    import { useState } from 'react';
    import { useWallet } from '@aptos-labs/wallet-adapter-react';
        
    export async function view<
        T0 extends MoveViewFunction,
        T1 extends AllViewFunctions[T0]["types"],
        T2 extends AllViewFunctions[T0]["args"],
        T3 extends AllViewFunctions[T0]["return"]
    >(client: AptosClient,
        request: ViewRequest<T0, T1, T2>): Promise<T3> {
        // TODO: serialization for input, and deserialization for output
        return client.view(request) as Promise<T3>;
    }

    export async function submitEntryFunctionImpl(
        account: AptosAccount,
        entryFunction: TxnBuilderTypes.EntryFunction
    ) {
        const entryFunctionPayload =
            new TxnBuilderTypes.TransactionPayloadEntryFunction(entryFunction);
    
        // Create a raw transaction out of the transaction payload
        const rawTxn = await this.serverClient.generateRawTransaction(
            account.address(),
            entryFunctionPayload
        );
    
        // Sign the raw transaction with account's private key
        const bcsTxn = AptosClient.generateBCSTransaction(account, rawTxn);
    
        // Submit the transaction
        const transactionRes = await this.serverClient.submitSignedBCSTransaction(
            bcsTxn
        );
    
        // Wait for the transaction to finish
        // throws an error if the tx fails or not confirmed after timeout
        await this.serverClient.waitForTransaction(transactionRes.hash, {
            timeoutSecs: 120,
            checkSuccess: true,
        });
        return transactionRes.hash;
    }

    // TODO: add error handling
    // TODO: use React Query or SWR
    // TODO: test it
    export const useSubmitTransaction = () => {
        const { signAndSubmitTransaction } = useWallet();
        
        const [isLoading, setIsLoading] = useState(false);
    
        async function submitTransaction<T0 extends MoveEntryFunction,
            T1 extends AllEntryFunctions[T0]['types'],
            T2 extends AllEntryFunctions[T0]['args'],
        >(request: SubmitRequest<T0, T1, T2>): Promise<Types.Transaction_UserTransaction> {
            setIsLoading(true);
            const { hash } = await signAndSubmitTransaction({
                type: 'entry_function_payload',
                ...request
            });
    
            // TODO: make it configurable
            const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1')
    
            return (await client
                .waitForTransactionWithResult(hash, { checkSuccess: true })
                .finally(() => setIsLoading(false))) as Types.Transaction_UserTransaction;
        }
    
        return { submitTransaction, isLoading };
    };

    // TODO: add error handling
    // TODO: use React Query or SWR
    // TODO: test it
    export function useQueryViewFunction<
    T0 extends MoveViewFunction,
    T1 extends AllViewFunctions[T0]["types"],
    T2 extends AllViewFunctions[T0]["args"],
    T3 extends AllViewFunctions[T0]["return"]>(
        client: AptosClient, request: ViewRequest<T0, T1, T2>
    ) {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<T3>();

    setIsLoading(true);
    view(client, request)
        .then((result) => {
        setResult(result);
        })
        .finally(() => setIsLoading(false));

    return { result, isLoading };
    };
    `;
}