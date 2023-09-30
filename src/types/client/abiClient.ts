/**
 * The types for `client.useABI` API.
 */

import type { AptosAccount } from 'aptos';
import { TransactionResponse } from './client.js';
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

export type ABIViewClient<T extends ABIRoot> = {
  [TFuncName in ViewFunctionName<T>]: (payload: {
    type_arguments: ExtractGenericArgsType<T, TFuncName>;
    arguments: ExtractArgsType<T, TFuncName>;
    ledger_version?: string;
  }) => Promise<ExtractReturnType<T, TFuncName>>;
};

export type ABIEntryClient<T extends ABIRoot> = {
  [TFuncName in EntryFunctionName<T>]: (payload: {
    type_arguments: ExtractGenericArgsType<T, TFuncName>;
    arguments: ExtractArgsTypeOmitSigner<T, TFuncName>;
    account: AptosAccount;
    isSimulation?: boolean;
  }) => Promise<TransactionResponse>;
};

export type ABIResourceClient<TABITable extends ABITable, T extends ABIRoot> = {
  [TStructName in ResourceStructName<T>]: (payload: {
    type_arguments: ExtractStructGenericArgsType<T, TStructName>;
    account: `0x${string}`;
    ledger_version?: string;
  }) => Promise<{
    data: ExtractStructType<TABITable, T, TStructName>;
    type: string;
  }>;
};
