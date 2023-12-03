/**
 * The types for `client.useABI` API.
 */

import { ABIRoot } from '../abi.js';
import { ABITable } from '../defaultABITable.js';
import {
  EntryFunctionName,
  ExtractArgsType,
  ExtractArgsTypeOmitSigner,
  ExtractGenericArgsType,
  ExtractReturnType,
  ViewFunctionName,
} from '../extractor/functionExtractor.js';
import {
  ResourceStructName,
  ExtractStructGenericArgsType,
  ExtractStructType,
} from '../extractor/structExtractor.js';
import { Account, AccountAddressInput, CommittedTransactionResponse } from '@aptos-labs/ts-sdk';

export type ABIViewClient<T extends ABIRoot> = {
  [TFuncName in ViewFunctionName<T>]: (payload: {
    typeArguments: ExtractGenericArgsType<T, TFuncName>;
    functionArguments: ExtractArgsType<T, TFuncName>;
    ledgerVersion?: string;
  }) => Promise<ExtractReturnType<T, TFuncName>>;
};

export type ABIEntryClient<T extends ABIRoot> = {
  [TFuncName in EntryFunctionName<T>]: (payload: {
    typeArguments: ExtractGenericArgsType<T, TFuncName>;
    functionArguments: ExtractArgsTypeOmitSigner<T, TFuncName>;
    account: Account;
    isSimulation?: boolean;
  }) => Promise<CommittedTransactionResponse>;
};

export type ABIResourceClient<TABITable extends ABITable, T extends ABIRoot> = {
  [TStructName in ResourceStructName<T>]: (payload: {
    typeArguments: ExtractStructGenericArgsType<T, TStructName>;
    account: AccountAddressInput;
    ledgerVersion?: string;
    }) => Promise<ExtractStructType<TABITable, T, TStructName>>;
};
