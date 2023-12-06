import { useState, useRef } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import type { EntryPayload } from '../types/index.js';
import { InputGenerateTransactionOptions } from '@aptos-labs/ts-sdk';

// TODO: add test for this
export const useSubmitTransaction = () => {
  const { connected, signAndSubmitTransaction, account } = useWallet();

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
    // TODO: remove this
    if (connected === false) {
      throw new Error('Wallet is not connected');
    }

    if (signAndSubmitTransaction === undefined) {
      return;
    }
    const id = idRef.current;

    if (!isIdle) {
      throw new Error('Transaction is already in progress');
    }
    setIsLoading(true);
    setIsIdle(false);

    let result
    try {
      result = await signAndSubmitTransaction(
        {
          sender: account?.address ?? "",
          data: {
            ...payload,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            functionArguments: payload.functionArguments.map((arg: any) => {
              if (Array.isArray(arg)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return arg.map((item: any) => item.toString());
              } else if (typeof arg === 'object') {
                throw new Error(
                  `a value of struct type: ${arg} is not supported`,
                );
              } else {
                return arg.toString();
              }
            }),
          }
        },
        options,
      );

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
