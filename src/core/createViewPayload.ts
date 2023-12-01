import { HexString } from 'aptos';
import {
  ABIRoot,
  ExtractReturnType,
  ViewFunctionName,
  ViewPayload,
  ViewRequestPayload,
} from '../types/index.js';
import { ensureNumber } from '../ensureTypes.js';
import { MoveStructId } from '@aptos-labs/ts-sdk';

/**
 * Create a payload for calling a view function.
 *
 * @param abi The ABI JSON contains the view function. For type inference and encoding/decoding purpose.
 * @param payload.function The function name.
 * @param payload.arguments The input arguments for function.
 * @param payload.type_arguments The generic type arguments for function.
 * @returns The payload object to be used in `view` method.
 * @example
 * const viewPayload = createViewPayload(COIN_ABI, {
 *   function: 'balance',
 *   arguments: ['0x1'],
 *   type_arguments: ['0x1::aptos_coin::AptosCoin'],
 * });
 * const [balance] = await client.view(viewPayload);
 */
export function createViewPayload<
  T extends ABIRoot,
  TFuncName extends ViewFunctionName<T>,
>(
  abi: T,
  payload: ViewRequestPayload<T, TFuncName>,
): ViewPayload<ExtractReturnType<T, TFuncName>> {
  const fnAbi = abi.exposed_functions.filter(
    (f) => f.name === payload.function,
  )[0];
  const type_arguments: string[] = payload.type_arguments;
  const val_arguments: any[] = payload.arguments;

  // Validations
  if (fnAbi === undefined)
    throw new Error(`Function ${payload.function} not found in ABI`);
  if (fnAbi.params.length !== val_arguments.length)
    throw new Error(
      `Function ${payload.function} expects ${fnAbi.params.length} arguments, but ${payload.arguments.length} were provided`,
    );
  if (fnAbi.generic_type_params.length !== type_arguments.length)
    throw new Error(
      `Function ${payload.function} expects ${fnAbi.generic_type_params.length} type arguments, but ${payload.type_arguments.length} were provided`,
    );

  // TODO: do serialization here
  const args = fnAbi.params.map((type, i) => {
    const arg = payload.arguments[i] as unknown;
    if (['u8', 'u16', 'u32'].includes(type)) {
      return ensureNumber(arg as number);
    } else if (['u64', 'u128', 'u256'].includes(type)) {
      if (!arg?.toString) {
        throw new Error(`Expecting a bigint, but got ${arg}`);
      }
      return arg.toString();
    } else if (type.includes('vector')) {
      return encodeVector(type, arg as any[]);
    } else {
      // string or address
      return arg;
    }
  });

  return {
    function: `${abi.address}::${abi.name}::${payload.function}`,
    functionArguments: args,
    typeArguments: payload.type_arguments as Array<MoveStructId>,
  };
}

function encodeVector(type: string, value: any[]) {
  const regex = /vector<([^]+)>/;
  const match = type.match(regex);
  if (!match) {
    // Should never happen
    throw new Error(`Unsupported type: ${type}`);
  }
  const innerType = match[1]!;
  if (innerType === 'u8') {
    return (
      HexString.fromUint8Array(
        typeof value === 'string' ?
          new TextEncoder().encode(value) :
          value instanceof Uint8Array ?
            value :
            new Uint8Array(
              value.map((v: number) => {
                const result = ensureNumber(v);
                if (result < 0 || result > 255)
                  throw new Error(`Invalid u8 value: ${result}`);
                return result;
              }),
            ),
      ) as any
    ).hexString;
  } else if (['bool', 'u16', 'u32'].includes(innerType)) {
    return value;
  } else if (['u64', 'u128', 'u256'].includes(innerType)) {
    return value.map((v: bigint) => v.toString());
  } else {
    // string or address
    // TODO: encode for Vector of vector
    return value;
  }
}
