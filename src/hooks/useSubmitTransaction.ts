import { useState, useRef } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import type { EntryPayload } from '../types/index.js';
import { InputGenerateTransactionOptions } from '@aptos-labs/ts-sdk';

export const useSubmitTransaction = () => {
  const { connected, signAndSubmitTransaction } = useWallet();

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
      } else {
        throw new Error('Wallet is not connected');
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
