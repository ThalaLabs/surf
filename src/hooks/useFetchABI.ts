import { useState, useEffect } from 'react';
import { WalletClient } from '../core/WalletClient.js';

export const useFetchABI = () => {
  const [abi, setABI] = useState<string | null>(null);

  useEffect(() => {
    const fetchABI = async () => {
      const client = new WalletClient();
      const abi = await client.fetchABI();
      setABI(abi);
    };
    fetchABI();
  }, []);

  return abi;
};
