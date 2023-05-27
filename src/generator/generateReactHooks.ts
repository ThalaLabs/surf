export function generateReactHooks(): string {
    return `
    import { useEffect, useState } from "react";
    import { useWallet } from "@aptos-labs/wallet-adapter-react";
    import { AptosClient, Types } from "aptos";
    import { view } from "./index";
    
    // TODO: add error handling
    // TODO: use React Query or SWR
    // TODO: test it
    export const useSubmitTransaction = () => {
        const { signAndSubmitTransaction } = useWallet();
      
        const [isLoading, setIsLoading] = useState(false);
        const [result, setResult] = useState<Types.Transaction_UserTransaction>();

        async function submitTransaction<
          T0 extends MoveEntryFunction,
          T1 extends AllEntryFunctions[T0]["types"],
          T2 extends AllEntryFunctions[T0]["args"]
        >(
          request: SubmitRequest<T0, T1, T2>
        ): Promise<void> {
          setIsLoading(true);
          const { hash } = await signAndSubmitTransaction({
            type: "entry_function_payload",
            ...request,
            arguments: request.arguments.map((arg) => arg.toString()),
          });
      
          // TODO: make it configurable
          const client = new AptosClient("https://fullnode.testnet.aptoslabs.com/v1");
      
          setResult(await client
            .waitForTransactionWithResult(hash, { checkSuccess: true })
            .finally(() => setIsLoading(false)) as Types.Transaction_UserTransaction);
        }
      
        return { submitTransaction, isLoading, result };
      };
      
      // TODO: add error handling
      // TODO: use React Query or SWR
      // TODO: test it
      export function useQueryViewFunction<
        T0 extends MoveViewFunction,
        T1 extends AllViewFunctions[T0]["types"],
        T2 extends AllViewFunctions[T0]["args"],
        T3 extends AllViewFunctions[T0]["return"]
      >(client: AptosClient, request: ViewRequest<T0, T1, T2>) {
        const [isLoading, setIsLoading] = useState(false);
        const [result, setResult] = useState<T3>();
      
        useEffect(() => {
          setIsLoading(true);
          view(client, request)
            .then((result) => {
              setResult(result as any); // TODO: fix this
            })
            .finally(() => setIsLoading(false));
        }, [])
      
        return { result, isLoading };
      }    
    `;
}