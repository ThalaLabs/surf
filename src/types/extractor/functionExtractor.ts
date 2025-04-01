/**
 * Extract function information from ABI JSON
 */

import { ABIRoot } from '../abi.js';
import { OmitSigner } from '../common.js';
import { ConvertArgs } from '../convertor/argsConvertor.js';
import { ConvertGenerics } from '../convertor/genericConvertor.js';
import { ConvertReturns } from '../convertor/returnConvertor.js';

/**
 * All view function names in the ABI.
 */
export type ViewFunctionName<T extends ABIRoot> = ViewFunction<T>['name'];

/**
 * All entry function names in the ABI.
 */
export type EntryFunctionName<T extends ABIRoot> = EntryFunction<T>['name'];

/**
 * Extract the return type of a function from ABI with function name.
 */
export type ExtractReturnType<
  Abi extends ABIRoot,
  TFuncName extends FunctionName<Abi>,
> = ConvertReturns<Abi, ExtractMoveReturnType<Abi, TFuncName>>;

/**
 * Extract the input arguments type of a function from ABI with function name.
 */
export type ExtractArgsType<
  Abi extends ABIRoot,
  TFuncName extends FunctionName<Abi>,
> = ConvertArgs<ExtractMoveArgsType<Abi, TFuncName>>;

/**
 * Extract the input arguments type of a function from ABI with function name, but omit the signer.
 */
export type ExtractArgsTypeOmitSigner<
  Abi extends ABIRoot,
  TFuncName extends FunctionName<Abi>,
> = ConvertArgs<OmitSigner<ExtractMoveArgsType<Abi, TFuncName>>>;

/**
 * Extract the input generic arguments type of a function from ABI with function name.
 */
export type ExtractGenericArgsType<
  Abi extends ABIRoot,
  TFuncName extends FunctionName<Abi>,
> = ConvertGenerics<ExtractMoveGenericParamsType<Abi, TFuncName>>;

/**
 * Internal
 */
type Functions<T extends ABIRoot> = T['exposed_functions'];
type Function<T extends ABIRoot> = Functions<T>[number];
type FunctionName<T extends ABIRoot> = Function<T>['name'];
type ViewFunction<T extends ABIRoot> = Extract<
  Functions<T>[number],
  { is_view: true }
>;
type EntryFunction<T extends ABIRoot> = Extract<
  Functions<T>[number],
  { is_entry: true }
>;

type ExtractFunction<
  Abi extends ABIRoot,
  TFuncName extends FunctionName<Abi>,
> = Extract<Function<Abi>, { name: TFuncName }>;

type ExtractMoveReturnType<
  Abi extends ABIRoot,
  TFuncName extends FunctionName<Abi>,
> = ExtractFunction<Abi, TFuncName>['return'];

type ExtractMoveArgsType<
  Abi extends ABIRoot,
  TFuncName extends FunctionName<Abi>,
> = ExtractFunction<Abi, TFuncName>['params'];

type ExtractMoveGenericParamsType<
  Abi extends ABIRoot,
  TFuncName extends FunctionName<Abi>,
> = ExtractFunction<Abi, TFuncName>['generic_type_params'];
