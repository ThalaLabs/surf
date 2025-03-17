import { useState, useRef } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import type { EntryPayload } from '../types/index.js';
import { InputGenerateTransactionOptions } from '@aptos-labs/ts-sdk';
// @ts-ignore
import { useWallet as useInitiaWallet } from '@initia/react-wallet-widget';
import { MsgExecute } from '@initia/initia.js';
import { bcsEncoding } from '../utils/bcs.js';
MsgExecute.fromData;
// TODO: add test for this
export const useSubmitTransaction = () => {
  const { connected, signAndSubmitTransaction } = useWallet();
  const { address: initiaAddress, requestInitiaTx: initiaSign } =
    useInitiaWallet();

  const [isIdle, setIsIdle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setResult] = useState<any>();
  const [error, setError] = useState<Error>();
  const idRef = useRef<number>(0);

  function reset() {
    setIsIdle(true);
    setIsLoading(false);
    setResult(undefined);
    setError(undefined);
    idRef.current = idRef.current + 1;
  }

  async function submitTransaction(
    payload: EntryPayload,
    options?: InputGenerateTransactionOptions,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const id = idRef.current;

    if (!isIdle) {
      throw new Error('Transaction is already in progress');
    }
    setIsLoading(true);
    setIsIdle(false);

    let result;
    try {
      if (connected && signAndSubmitTransaction !== undefined) {
        result = await signAndSubmitTransaction({
          data: {
            function: payload.function,
            typeArguments: payload.typeArguments,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            functionArguments: payload.functionArguments.map((arg: any) => {
              if (Array.isArray(arg)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return arg.map((item: any) => item);
              } else if (typeof arg === 'object') {
                throw new Error(
                  `a value of struct type: ${arg} is not supported`,
                );
              } else {
                return arg;
              }
            }),
          },
          options: options!,
        });
      } else if (initiaAddress && initiaSign) {
        if (!payload.abi) {
          throw new Error('abi is required for initia transactions');
        }
        const [moduleAddress, moduleName, functionName] =
          payload.function.split('::');
        const fnAbi = payload.abi;
        const nonSignerIndex = fnAbi.params.findIndex(
          (param) => param !== '&signer',
        );
        const bcsArgs: string[] = [];
        for (let i = 0; i < payload.functionArguments.length; i++) {
          const arg = payload.functionArguments[i];
          const paramType = fnAbi.params[i + nonSignerIndex];
          if (!paramType) {
            throw new Error('payload and abi mismatch');
          }

          bcsArgs.push(bcsEncoding(arg, paramType));
        }

        result = await initiaSign({
          msgs: [
            new MsgExecute(
              initiaAddress,
              moduleAddress as string,
              moduleName as string,
              functionName as string,
              payload.typeArguments,
              bcsArgs,
            ),
          ],
        });
      }

      // Only update the status if the request is not stale.
      if (id === idRef.current) {
        setResult(result);
        setIsLoading(false);
      }
    } catch (e) {
      setError(error);
      setIsLoading(false);
      throw e;
    }

    return result;
  }

  return { submitTransaction, reset, isLoading, isIdle, data, error };
};
