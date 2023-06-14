import { ABIRoot } from "./abi";
import { EntryFunctionName, ExtractGenericParamsType, ExtractParamsTypeOmitSigner, TransactionResponse } from "./common";

export type ABIWalletClient<T extends ABIRoot> = {
    [TFuncName in EntryFunctionName<T>]:
    (payload: {
        type_arguments: ExtractGenericParamsType<T, TFuncName>,
        arguments: ExtractParamsTypeOmitSigner<T, TFuncName>,
    }) => Promise<TransactionResponse>
};
