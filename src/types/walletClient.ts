import type { ABIRoot } from "./abi.js";
import { EntryFunctionName, ExtractGenericParamsType, ExtractParamsTypeOmitSigner, TransactionResponse } from "./common.js";

export type ABIWalletClient<T extends ABIRoot> = {
    [TFuncName in EntryFunctionName<T>]:
    (payload: {
        type_arguments: ExtractGenericParamsType<T, TFuncName>,
        arguments: ExtractParamsTypeOmitSigner<T, TFuncName>,
    }) => Promise<TransactionResponse>
};
