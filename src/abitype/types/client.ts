import { AptosAccount } from "aptos";
import { ABIRoot } from "./abi";
import { ConvertEntryParams, ConvertReturns, ConvertTypeParams, EntryFunctionName, ExtractFunction, ViewFunctionName } from "./common";
import { CamelCase } from "./util";

export type ABIClient<TABI extends ABIRoot> = {
    [TFuncName in ViewFunctionName<TABI> | EntryFunctionName<TABI> as
    (TFuncName extends ViewFunctionName<TABI> ? CamelCase<`view_${TFuncName}`> : CamelCase<`entry_${TFuncName}`>)]:
    TFuncName extends ViewFunctionName<TABI> ? (
        (payload: {
            type_arguments: ConvertTypeParams<ExtractFunction<TABI, TFuncName>['generic_type_params']>,
            arguments: ConvertEntryParams<ExtractFunction<TABI, TFuncName>['params']>,
        }) => Promise<ConvertReturns<ExtractFunction<TABI, TFuncName>['return']>>
    ) : (
        (payload: {
            type_arguments: ConvertTypeParams<ExtractFunction<TABI, TFuncName>['generic_type_params']>,
            arguments: ConvertEntryParams<ExtractFunction<TABI, TFuncName>['params']>,
            account: AptosAccount
        }) => Promise<{ hash: string }>  // TODO: use {hash: string} instead. Also for submit function
    )
};
