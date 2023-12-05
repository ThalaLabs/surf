import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletClient } from '../core/WalletClient.js';

export const useWalletClient = () => {
  const wallet = useWallet();
  return {
    connected: wallet.connected,
    client: wallet.connected
      ? new WalletClient({ wallet, })
      : undefined,
  };
};
