"use client"
import { AptosClient } from 'aptos';
import { useQueryViewFunction, useSubmitTransaction } from '../bindings/hooks'
import styles from './page.module.css'
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export default function Home() {
  const wallet = useWallet();

  if (!wallet.connected) {
    wallet.connect(wallet.wallets[0].name);
  }

  const { result, isLoading } = useQueryViewFunction(new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
    {
      function: '0x1::coin::balance',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
      arguments: ['0x1']
    });

  const { isLoading: submitIsLoading, submitTransaction, result: submitResult } = useSubmitTransaction();
  const onClick = async () => {
    try {
      await submitTransaction({
        function: '0x1::coin::transfer',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        arguments: ['0x1', BigInt(1)]
      });
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
        Balance of 0x1 {!isLoading && result ? result[0].toString() : "loading"}
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
          {submitIsLoading && "loading"}
          {submitResult && `Result: ${submitResult.hash}`}
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
