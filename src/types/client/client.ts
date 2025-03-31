/**
 * The types for the `Client` class.
 */

import { ABIRoot } from '../abi.js';
import {
  EntryFunctionName,
  ExtractArgsTypeOmitSigner,
  ExtractGenericArgsType,
  ViewFunctionName,
  ExtractArgsType,
} from '../extractor/functionExtractor.js';
import {
  EntryFunctionABI,
  EntryFunctionArgumentTypes,
  MoveFunctionId,
  SimpleEntryFunctionArgumentTypes,
  TypeTag,
  ViewFunctionABI,
} from '@aptos-labs/ts-sdk';

export type TransactionResponse = {
  hash: string;
};

/**
 * The return payload type of `createEntryPayload`
 */
export type EntryPayload = {
  function: MoveFunctionId;
  typeArguments: Array<string>;
  functionArguments: Array<
    EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
  >;
  abi?: EntryFunctionABI;
};

/**
 * The input payload type of `createEntryPayload`
 */
export type EntryRequestPayload<
  T extends ABIRoot,
  TFuncName extends EntryFunctionName<T>,
> = {
  address?: `0x${string}`;
  function: TFuncName;
  functionArguments: ExtractArgsTypeOmitSigner<T, TFuncName>;
  typeArguments: ExtractGenericArgsType<T, TFuncName>;
};

/**
 * The input payload type of `createViewPayload`
 */
export type ViewRequestPayload<
  T extends ABIRoot,
  TFuncName extends ViewFunctionName<T>,
> = {
  address?: `0x${string}`;
  function: TFuncName;
  functionArguments: ExtractArgsType<T, TFuncName>;
  typeArguments: ExtractGenericArgsType<T, TFuncName>;
};

/**
 * The return payload type of `createViewPayload`
 */
export type ViewPayload<_TReturn> = {
  function: MoveFunctionId;
  typeArguments?: Array<TypeTag | string>;
  functionArguments?: Array<
    EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
  >;
  abi?: ViewFunctionABI;
};
