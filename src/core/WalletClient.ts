import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { createEntryPayload } from './createEntryPayload.js';
import type { ABIRoot, ABIWalletClient, EntryPayload } from '../types/index.js';

type Wallet = ReturnType<typeof useWallet>;

export class WalletClient {
  private wallet: Wallet;

  constructor({ wallet }: { wallet: Wallet }) {
    this.wallet = wallet;
  }

  public async submitTransaction(
    payload: EntryPayload,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    return await this.wallet.signAndSubmitTransaction({
      sender: this.wallet.account?.address ?? '',
      data: {
        function: payload.function,
        typeArguments: payload.typeArguments,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        functionArguments: payload.functionArguments.map((arg: any) => {
          if (Array.isArray(arg)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return arg.map((item: any) => item);
          } else if (typeof arg === 'object') {
            throw new Error(`a value of struct type: ${arg} is not supported`);
          } else {
            return arg;
          }
        }),
      },
    });
  }

  public useABI<T extends ABIRoot>(abi: T) {
    return new Proxy({} as ABIWalletClient<T>, {
      get: (_, prop) => {
        const functionName = prop.toString();
        return (...args) => {
          const payload = createEntryPayload(abi, {
            function: functionName,
            typeArguments: args[0].type_arguments,
            functionArguments: args[0].arguments,
          });
          return this.submitTransaction(payload);
        };
      },
    });
  }
}
