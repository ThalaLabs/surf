export function generateIndex() {
    return `
    import { AptosAccount, AptosClient as Client, TxnBuilderTypes } from "aptos";

    export class AptosClient {
        // TODO: make this configurable
        client: Client = new Client('https://fullnode.testnet.aptoslabs.com/v1');
        serverClient = new Client(
            "https://aptos-mainnet.nodereal.io/v1/742235cb25ef46c3aee41db5681af358"
        );

        constructor() {
            this.client
        }

        async view<T0 extends MoveViewFunction,
            T1 extends AllViewFunctions[T0]['types'],
            T2 extends AllViewFunctions[T0]['args'],
            T3 extends AllViewFunctions[T0]['return'],
        >(request: ViewRequest<T0, T1, T2>): Promise<T3> {
            // TODO: serialization for input, and deserialization for output
            return this.client.view(request) as Promise<T3>;
        }
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
        const bcsTxn = Client.generateBCSTransaction(account, rawTxn);
    
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
    `;
}