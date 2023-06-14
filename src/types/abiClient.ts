import { AptosAccount } from "aptos";
import { ABIRoot } from "./abi";
import { EntryFunctionName, ExtractGenericParamsType, ExtractParamsType, ExtractParamsTypeOmitSigner, ExtractReturnType, TransactionResponse, ViewFunctionName } from "./common";

export type ABIViewClient<T extends ABIRoot> = {
    [TFuncName in ViewFunctionName<T>]: (payload: {
        type_arguments: ExtractGenericParamsType<T, TFuncName>
        arguments: ExtractParamsType<T, TFuncName>,
    }) => Promise<ExtractReturnType<T, TFuncName>>
};

export type ABIEntryClient<T extends ABIRoot> = {
    [TFuncName in EntryFunctionName<T>]: (payload: {
        type_arguments: ExtractGenericParamsType<T, TFuncName>,
        arguments: ExtractParamsTypeOmitSigner<T, TFuncName>,
        account: AptosAccount,
        isSimulation?: boolean
    }) => Promise<TransactionResponse>
};