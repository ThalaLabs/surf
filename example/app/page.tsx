"use client"
import styles from './page.module.css'
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { createEntryPayload, useSubmitTransaction, useWalletClient } from '@thalalabs/move-ts';
import { COIN_ABI } from '../abi/coin';

export default function Home() {
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.connected) {
      wallet.connect(wallet.wallets[0].name);
    }
  }, [])

  // const { data, isLoading } = useQueryViewFunction(new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
  //   {
  //     function: '0x1::coin::balance',
  //     type_arguments: ['0x1::aptos_coin::AptosCoin'],
  //     arguments: ['0x1']
  //   });

  const { isLoading: submitIsLoading, error: submitError, submitTransaction, data: submitResult } = useSubmitTransaction();
  const { client } = useWalletClient({ nodeUrl: "https://fullnode.testnet.aptoslabs.com/v1" });

  const [result2, setResult2] = useState("");
  const onClick2 = async () => {
    try {
      const result = await client.useABI(COIN_ABI).entryTransfer({
        arguments: ["0x1", BigInt(1)],
        type_arguments: ["0x1::aptos_coin::AptosCoin"]
      });
      setResult2(result.hash);
    }
    catch (e) {
      console.error('error', e);
    }
  }

  const onClick = async () => {
    try {
      const payload = createEntryPayload(COIN_ABI, {
        function: "transfer",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
        arguments: ["0x1", BigInt(1)]
      });
      await submitTransaction(payload, { nodeUrl: "https://fullnode.testnet.aptoslabs.com/v1" });
    }
    catch (e) {
      console.error('error', e);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>

      {<div style={{
        fontSize: "20px",
      }} className={styles.center}>
        {/* Balance of 0x1 {!isLoading && data ? data[0].toString() : "loading"} */}
        <div>
          {`Wallet status: ${wallet.connected ? "connected" : "disconnected"}`}
        </div>
        <button style={{
          padding: "10px",
          margin: "50px",
          fontSize: "20px"
        }}
          onClick={onClick}>
          Submit transaction: transfer 1 coin to 0x1 on testnet
        </button>
        <button style={{
          padding: "10px",
          margin: "50px",
          fontSize: "20px"
        }}
          onClick={onClick2}>
          Submit transaction: transfer 1 coin to 0x1 on testnet
        </button>
        {submitIsLoading && "loading"}
        {submitResult && `Success: ${submitResult.hash}`}
        {submitError && `Failed: ${submitError}`}
        {result2 && `Submission with useWalletClient Success: ${result2}`}
      </div>
      }


      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
