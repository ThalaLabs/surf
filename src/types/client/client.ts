/**
 * The types for the `Client` class.
 */

import { AptosAccount, TxnBuilderTypes } from 'aptos';
import { ABIRoot } from '../abi.js';
import {
  EntryFunctionName,
  ExtractArgsTypeOmitSigner,
  ExtractGenericArgsType,
  ViewFunctionName,
  ExtractArgsType,
} from '../extractor/functionExtractor.js';
import { MoveFunctionId, MoveStructId, MoveValue } from '@aptos-labs/ts-sdk';

export type TransactionResponse = {
  hash: string;
};

export type EntryOptions = {
  account: AptosAccount;
};

/**
 * The return payload type of `createEntryPayload`
 */
export type EntryPayload = {
  rawPayload: {
    function: string;
    type_arguments: string[];
    arguments: any[];
  };
  entryRequest: TxnBuilderTypes.EntryFunction;
};

/**
 * The input payload type of `createEntryPayload`
 */
export type EntryRequestPayload<
  T extends ABIRoot,
  TFuncName extends EntryFunctionName<T>,
> = {
  function: TFuncName;
  arguments: ExtractArgsTypeOmitSigner<T, TFuncName>;
  type_arguments: ExtractGenericArgsType<T, TFuncName>;
};

/**
 * The input payload type of `createViewPayload`
 */
export type ViewRequestPayload<
  T extends ABIRoot,
  TFuncName extends ViewFunctionName<T>,
> = {
  function: TFuncName;
  arguments: ExtractArgsType<T, TFuncName>;
  type_arguments: ExtractGenericArgsType<T, TFuncName>;
};

/**
 * The return payload type of `createViewPayload`
 */
export type ViewPayload<_TReturn> = {
  function: MoveFunctionId;
  typeArguments?: Array<MoveStructId>;
  functionArguments?: Array<MoveValue>;
};
