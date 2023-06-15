import type { AptosAccount } from "aptos";
import type { ABIRoot } from "./abi.js";
import type {
    EntryFunctionName,
    ExtractGenericParamsType,
    ExtractParamsType,
    ExtractParamsTypeOmitSigner,
    ExtractReturnType,
    TransactionResponse,
    ViewFunctionName
} from "./common.js";

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