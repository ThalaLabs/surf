import {
  ABIRoot,
  ExtractReturnType,
  ViewFunctionName,
  ViewPayload,
  ViewRequestPayload,
} from '../types/index.js';
import { ensureNumber } from '../ensureTypes.js';
import {
  MoveFunctionGenericTypeParam,
  MoveStructId,
  TypeTag,
  ViewFunctionABI,
  parseTypeTag,
} from '@aptos-labs/ts-sdk';
import { ABIFunction } from '../types/abi.js';

/**
 * Create a payload for calling a view function.
 *
 * @param abi The ABI JSON contains the view function. For type inference and encoding/decoding purpose.
 * @param payload.function The function name.
 * @param payload.arguments The input arguments for function.
 * @param payload.type_arguments The generic type arguments for function.
 * @returns The payload object to be used in `view` method.
 * @example
 * const payload = createViewPayload(COIN_ABI, {
 *   function: 'balance',
 *   functionArguments: ['0x1'],
 *   typeArguments: ['0x1::aptos_coin::AptosCoin'],
 * });
 * const [balance] = await client.view({ payload });
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
  const type_arguments: string[] = payload.typeArguments;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const val_arguments: any[] = payload.functionArguments;

  // Validations
  if (fnAbi === undefined)
    throw new Error(`Function ${payload.function} not found in ABI`);
  if (fnAbi.params.length !== val_arguments.length)
    throw new Error(
      `Function ${payload.function} expects ${fnAbi.params.length} arguments, but ${payload.functionArguments.length} were provided`,
    );
  if (fnAbi.generic_type_params.length !== type_arguments.length)
    throw new Error(
      `Function ${payload.function} expects ${fnAbi.generic_type_params.length} type arguments, but ${payload.functionArguments.length} were provided`,
    );

  // TODO: do serialization here
  const args = fnAbi.params.map((type, i) => {
    const arg = payload.functionArguments[i] as unknown;
    if (['u8', 'u16', 'u32'].includes(type)) {
      return ensureNumber(arg as number);
    } else if (['u64', 'u128', 'u256'].includes(type)) {
      if (!arg?.toString) {
        throw new Error(`Expecting a bigint, but got ${arg}`);
      }
      return arg.toString();
    } else if (type.includes('vector')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return encodeVector(type, arg as any[]);
    } else {
      // string or address
      return arg;
    }
  });

  return {
    function: `${payload.address ?? abi.address}::${abi.name}::${
      payload.function
    }`,
    functionArguments: args,
    typeArguments: payload.typeArguments as Array<MoveStructId>,
    abi: constructViewAbiObj(fnAbi),
  };
}

function constructViewAbiObj(abi: ABIFunction): ViewFunctionABI {
  // Non-view functions can't be used
  if (!abi.is_view) {
    throw new Error(`not an view function`);
  }

  // Type tag parameters for the function
  const params: TypeTag[] = [];
  for (let i = 0; i < abi.params.length; i += 1) {
    params.push(parseTypeTag(abi.params[i]!, { allowGenerics: true }));
  }

  // The return types of the view function
  const returnTypes: TypeTag[] = [];
  for (let i = 0; i < abi.return.length; i += 1) {
    returnTypes.push(parseTypeTag(abi.return[i]!, { allowGenerics: true }));
  }

  return {
    typeParameters:
      abi.generic_type_params as Array<MoveFunctionGenericTypeParam>,
    parameters: params,
    returnTypes,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function encodeVector(type: string, value: any) {
  const regex = /vector<([^]+)>/;
  const match = type.match(regex);
  if (!match) {
    // Should never happen
    throw new Error(`Unsupported type: ${type}`);
  }
  const innerType = match[1];
  if (!innerType) {
    throw new Error(`Unsupported type: ${type}`);
  }

  if (innerType === 'u8') {
    if (typeof value === 'string' || value instanceof Uint8Array) return value;
    if (Array.isArray(value)) {
      return value;
    }

    throw new Error(`Invalid u8 value: ${value}`);
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
