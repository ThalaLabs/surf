import { AptosAccount, TxnBuilderTypes } from "aptos";

export type EntryOptions = {
    account: AptosAccount,
}

export type ViewOptions = {
    ledger_version?: string;
}

export type EntryPayload = {
    rawPayload: {
        function: string;
        type_arguments: string[];
        arguments: any[];
    },
    entryRequest: TxnBuilderTypes.EntryFunction,
    // readonly abi: any,
};

//@ts-ignore TODO: remove this ignore
export type ViewPayload<TReturn> = {
    viewRequest: {
        function: string;
        type_arguments: string[];
        arguments: any[];
    };
    decoders: (((value: any) => any) | null)[],
    // readonly abi: any,
    // readonly return: TReturn,
};

