import { ABIRoot } from "./abi";
import { ConvertEntryParams, ConvertTypeParams, EntryFunctionName, ExtractFunction, TransactionResponse } from "./common";

export type ABIWalletClient<TABI extends ABIRoot> = {
    [TFuncName in EntryFunctionName<TABI>]:
    (payload: {
        type_arguments: ConvertTypeParams<ExtractFunction<TABI, TFuncName>['generic_type_params']>,
        arguments: ConvertEntryParams<ExtractFunction<TABI, TFuncName>['params']>,
    }) => Promise<TransactionResponse>  // TODO: use {hash: string} instead. Also for submit function
};
