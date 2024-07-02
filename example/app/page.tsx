'use client';
import styles from './page.module.css';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { createEntryPayload } from '@thalalabs/surf';
import { useSubmitTransaction, useWalletClient } from '@thalalabs/surf/hooks';

import { COIN_ABI } from '../abi/coin';

export default function Home() {
  const {
    isIdle,
    reset,
    isLoading: submitIsLoading,
    error: submitError,
    submitTransaction,
    data: submitResult,
  } = useSubmitTransaction();

  const { client } = useWalletClient();

  const wallet = useWallet();
  useEffect(() => {
    if (!wallet.connected) {
      wallet.connect(wallet.wallets?.find((w) => w.name === 'Petra')?.name!);
    }
  }, []);

  const [balanceMessage, setBalanceMessage] = useState();
  const onRefresh = () => {
    setBalanceMessage(undefined);
    fetch('/balance').then(async (response) => {
      const data = await response.json();
      setBalanceMessage(data.message);
    });
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const [result, setResult] = useState('');

  const onSubmitForUseSubmitTransaction = async () => {
    try {
      const payload = createEntryPayload(COIN_ABI, {
        function: 'transfer',
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
        functionArguments: ['0x1', BigInt(1)],
      });
      await submitTransaction(payload);
      onRefresh();
    } catch (e) {
      console.error('error', e);
    }
  };

  const onSubmitForUseWalletClient = async () => {
    try {
      if (!client) return;
      const result = await client.useABI(COIN_ABI).transfer({
        arguments: ['0x1', BigInt(1)],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      });
      setResult(result.hash);
      onRefresh();
    } catch (e) {
      console.error('error', e);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>

      {
        <div
          style={{
            fontSize: '20px',
          }}
          className={styles.center}
        >
          <div>{balanceMessage ?? 'loading balance of 0x1'}</div>
          <div>
            {`Wallet status: ${
              wallet.connected ? 'connected' : 'disconnected'
            }`}
          </div>
          {isIdle && (
            <button
              style={{
                padding: '10px',
                margin: '50px',
                fontSize: '20px',
              }}
              onClick={onSubmitForUseSubmitTransaction}
            >
              Submit transaction: transfer 1 coin to 0x1 on testnet <br />{' '}
              (useSubmitTransaction)
            </button>
          )}
          {!isIdle && (
            <button
              style={{
                padding: '10px',
                margin: '50px',
                fontSize: '20px',
              }}
              onClick={reset}
            >
              Reset <br /> (useSubmitTransaction)
            </button>
          )}
          <button
            style={{
              padding: '10px',
              margin: '50px',
              fontSize: '20px',
            }}
            onClick={onSubmitForUseWalletClient}
          >
            Submit transaction: transfer 1 coin to 0x1 on testnet <br />{' '}
            (useWalletClient)
          </button>
          {submitIsLoading && <div>running</div>}
          {submitResult && <div>{`Success: ${submitResult.hash}`}</div>}
          {submitError && <div>{`Failed: ${submitError}`}</div>}
          {result && (
            <div>{`Submission with useWalletClient Success: ${result}`}</div>
          )}
        </div>
      }
    </main>
  );
}
