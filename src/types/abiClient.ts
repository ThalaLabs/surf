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
import { ABITable, ExtractStructGenericParamsType, ExtractStructType, ResourceStructName } from "./struct.js";

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

export type ABIResourceClient<TABITable extends ABITable, T extends ABIRoot> = {
    [TStructName in ResourceStructName<T>]: (payload: {
        type_arguments: ExtractStructGenericParamsType<T, TStructName>,
        account: `0x${string}`,
    }) => Promise<{
        data: ExtractStructType<TABITable, T, TStructName>,
        type: string
    }>
};
