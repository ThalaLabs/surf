export function generateReactHooks(): string {
    return `
    import { useEffect, useState } from "react";
    import { useWallet } from "@aptos-labs/wallet-adapter-react";
    import { AptosClient, Types } from "aptos";
    import { view } from "./index";
    import { AllViewFunctions, MoveEntryFunction, MoveViewFunction } from "./types/moduleTable";
    import { SubmitRequest, ViewRequest } from "./types/common";
    
    type Error = any;

    // TODO: use React Query or SWR
    export const useSubmitTransaction = () => {
      const { signAndSubmitTransaction } = useWallet();
    
      const [isLoading, setIsLoading] = useState(false);
      const [data, setResult] = useState<Types.Transaction_UserTransaction>();
      const [error, setError] = useState<Error>();
    
      async function submitTransaction<T0 extends MoveEntryFunction>(
        request: SubmitRequest<T0>
      ): Promise<void> {
        setIsLoading(true);
        setResult(undefined);
        setError(undefined);
    
        try {
          const { hash } = await signAndSubmitTransaction({
            type: "entry_function_payload",
            ...request,
            arguments: request.arguments.map((arg: any) => arg.toString()),
          });
    
          // TODO: make it configurable
          const client = new AptosClient("https://fullnode.testnet.aptoslabs.com/v1");
    
          setResult(
            (await client
              .waitForTransactionWithResult(hash, { checkSuccess: true })) as Types.Transaction_UserTransaction
          );
        }
        catch (e) {
          setError(e ? e : new Error("unknown error"));
        }
        finally {
          setIsLoading(false);
        }
      }
    
      return { submitTransaction, isLoading, data, error };
    };
      
      
      // TODO: use React Query or SWR
      export function useQueryViewFunction<T0 extends MoveViewFunction>(
        client: AptosClient,
        request: ViewRequest<T0>
      ) {
        const [isLoading, setIsLoading] = useState(false);
        const [data, setResult] = useState<AllViewFunctions[T0]["return"]>();
        const [error, setError] = useState<Error>();

        useEffect(() => {
          setIsLoading(true);
          setResult(undefined);
          setError(undefined);

          view(client, request)
            .then((result) => {
              setResult(result as AllViewFunctions[T0]["return"]);
            })
            .catch((e) => {
              setError(e ? e : new Error("unknown error"));
            })
            .finally(() => setIsLoading(false));
        }, []); // TODO: re-validate when request changes, what should be used as key?

        return { data, error, isLoading };
      }
    `;
}