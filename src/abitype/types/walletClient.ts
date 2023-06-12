import { ABIRoot } from "./abi";
import { ConvertEntryParams, ConvertTypeParams, DeepReadonly, EntryFunctionName, ExtractFunction } from "./common";
import { CamelCase } from "./util";

export type ABIWalletClient<TABI extends DeepReadonly<ABIRoot>> = {
    [TFuncName in EntryFunctionName<TABI> as CamelCase<`entry_${TFuncName}`>]:
    (payload: {
        type_arguments: ConvertTypeParams<ExtractFunction<TABI, TFuncName>['generic_type_params']>,
        arguments: ConvertEntryParams<ExtractFunction<TABI, TFuncName>['params']>,
    }) => Promise<{ hash: string }>  // TODO: use {hash: string} instead. Also for submit function
};
