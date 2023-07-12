import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { MoveTsWalletClient } from '../core/index.js';

export const useWalletClient = ({ nodeUrl }: { nodeUrl: string }) => {
  const wallet = useWallet();
  return {
    connected: wallet.connected,
    client: wallet.connected
      ? new MoveTsWalletClient({ wallet, nodeUrl })
      : undefined,
  };
};
