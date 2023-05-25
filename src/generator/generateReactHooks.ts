export function generateReactHooks(): string {
    return `
    import { useState } from 'react';
    import { useWallet } from '@aptos-labs/wallet-adapter-react';
    import { AptosClient as Client, Types } from 'aptos';

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
            const client = new Client('https://fullnode.testnet.aptoslabs.com/v1')

            return (await client
                .waitForTransactionWithResult(hash, { checkSuccess: true })
                .finally(() => setIsLoading(false))) as Types.Transaction_UserTransaction;
        }

        return { submitTransaction, isLoading };
    };
    `;
}