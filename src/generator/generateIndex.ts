export function generateIndex() {
  return `
    import { AptosAccount, AptosClient, TxnBuilderTypes } from "aptos";
    import { AllViewFunctions, MoveViewFunction } from "./types/moduleTable";
    import { ViewRequest } from "./types/common";
    
    export async function view<T0 extends MoveViewFunction>(
      client: AptosClient, request: ViewRequest<T0>): Promise<AllViewFunctions[T0]["return"]> {
      // TODO: serialization for input, and deserialization for output
      return client.view(request) as Promise<AllViewFunctions[T0]["return"]>;
    }
    
    export async function submitEntryFunctionImpl(
      client: AptosClient,
      account: AptosAccount,
      entryFunction: TxnBuilderTypes.EntryFunction
    ) {
      const entryFunctionPayload =
        new TxnBuilderTypes.TransactionPayloadEntryFunction(entryFunction);
    
      // Create a raw transaction out of the transaction payload
      const rawTxn = await client.generateRawTransaction(
        account.address(),
        entryFunctionPayload
      );
    
      // Sign the raw transaction with account's private key
      const bcsTxn = AptosClient.generateBCSTransaction(account, rawTxn);
    
      // Submit the transaction
      const transactionRes = await client.submitSignedBCSTransaction(
        bcsTxn
      );
    
      // Wait for the transaction to finish
      // throws an error if the tx fails or not confirmed after timeout
      await client.waitForTransaction(transactionRes.hash, {
        timeoutSecs: 120,
        checkSuccess: true,
      });
      return transactionRes.hash;
    }    
    `;
}