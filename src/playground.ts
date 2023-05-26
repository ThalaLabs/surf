import { ViewRequest, AllEntryFunctions, AllViewFunctions, MoveEntryFunction, MoveViewFunction, MoveStruct, MovePrimitiveAddress, MovePrimitiveU64 } from './playgroundType.js';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosAccount, BCS, AptosClient as Client, TxnBuilderTypes, Types } from 'aptos';
import { useState } from 'react';

async () => {
    const client = new AptosClient();
    const result = await client.view({
        function: '0x1::coin::balance',
        type_arguments: ['0x1::coin::Coin'],
        arguments: []
    });
    result[0];

    const fun = '0x1::coin::decimals';
    const result2 = await client.view({
        function: fun,
        type_arguments: ['0x1::coin::Coin'],
        arguments: [1]
    });
    result2[0];

    const account = new AptosAccount(Buffer.from("", "hex"));
    submitCoinTransfer(account, {
        type_arguments: ['0x1::coin::Coin'],
        arguments: ['0x1', BigInt(1)]
    });
}

type SubmitRequest<T0 extends MoveEntryFunction,
    T1 extends AllEntryFunctions[T0]['types'],
    T2 extends AllEntryFunctions[T0]['args'],
> = {
    function: T0;
    /**
     * Type arguments of the function
     */
    type_arguments: T1;
    /**
     * Arguments of the function
     */
    arguments: T2;
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
        const client = new Client('https://fullnode.testnet.aptoslabs.com/v1')

        return (await client
            .waitForTransactionWithResult(hash, { checkSuccess: true })
            .finally(() => setIsLoading(false))) as Types.Transaction_UserTransaction;
    }

    return { submitTransaction, isLoading };
};

export async function submitCoinTransfer(
    account: AptosAccount,
    request: {
        type_arguments: [MoveStruct],
        arguments: [MovePrimitiveAddress, MovePrimitiveU64],
    }
): Promise<string> {
    const entryFunction = TxnBuilderTypes.EntryFunction.natural(
        "0x1::coin",
        "transfer",
        request.type_arguments.map(type => new TxnBuilderTypes.TypeTagStruct(
            TxnBuilderTypes.StructTag.fromString(type)
        )),
        [
            BCS.bcsToBytes(
                TxnBuilderTypes.AccountAddress.fromHex(request.arguments[0])
            ),
            BCS.bcsSerializeUint64(request.arguments[1])
        ]
    );
    return submitEntryFunctionImpl(account, entryFunction);
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

export class AptosClient {
    // TODO: make this configurable
    client = new Client('https://fullnode.testnet.aptoslabs.com/v1');
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
