import type {
  ABIRoot,
  EntryPayload,
  EntryRequestPayload,
} from '../types/index.js';
import { EntryFunctionName } from '../types/extractor/functionExtractor.js';

/**
 * Create a payload for calling a entry function.
 *
 * @param abi The ABI JSON contains the entry function. For type inference and encoding/decoding purpose.
 * @param payload.function The function name.
 * @param payload.arguments The input arguments for function.
 * @param payload.type_arguments The generic type arguments for function.
 * @returns The payload object to be used in `simulateTransaction` or `submitTransaction` method.
 * @example
 * const payload = createEntryPayload(COIN_ABI, {
 *   function: 'transfer',
 *   functionArguments: ['0x1', 1],
 *   typeArguments: ['0x1::aptos_coin::AptosCoin'],
 * });
 *
 * const result = await client.submitTransaction({
 *   payload,
 *   signer: account,
 * });
 */
export function createEntryPayload<
  T extends ABIRoot,
  TFuncName extends EntryFunctionName<T>,
>(abi: T, payload: EntryRequestPayload<T, TFuncName>): EntryPayload {
  const fnAbi = abi.exposed_functions.filter(
    (f) => f.name === payload.function,
  )[0];

  if (fnAbi === undefined)
    throw new Error(`Function ${payload.function} not found in ABI`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typeArguments: string[] = payload.typeArguments as any[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const valArguments: any[] = payload.functionArguments as any[];
  const abiArgs = (fnAbi.params as string[]).slice(
    fnAbi.params.findIndex((param) => param !== '&signer'),
  );

  // Validations
  if (fnAbi === undefined)
    throw new Error(`Function ${payload.function} not found in ABI`);
  if (abiArgs.length !== valArguments.length)
    throw new Error(
      `Function ${payload.function} expects ${fnAbi.params.length} arguments, but ${payload.functionArguments.length} were provided`,
    );
  if (fnAbi.generic_type_params.length !== typeArguments.length)
    throw new Error(
      `Function ${payload.function} expects ${fnAbi.generic_type_params.length} type arguments, but ${payload.typeArguments.length} were provided`,
    );

  return {
    typeArguments: payload.typeArguments,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    functionArguments: payload.functionArguments as any,
    function: `${payload.address ?? abi.address}::${abi.name}::${payload.function}`,
  };
}
