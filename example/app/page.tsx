"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { view } from '../bindings'
import { AptosClient } from 'aptos';
import { useState } from 'react';

export default function Home() {
  const [balance, setBalance] = useState<bigint>();
  const [coinName, setCoinName] = useState<string>();
  view(
    new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
    {
      function: '0x1::coin::balance',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
      arguments: ['0x1']
    }).then((result) => {
      setBalance(result[0]);
    });

  view(
    new AptosClient("https://fullnode.testnet.aptoslabs.com/v1"),
    {
      function: '0x1::coin::name',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
      arguments: []
    }).then((result) => {
      setCoinName(result[0]);
    });

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>

      {!!balance && !!coinName && <div className={styles.center}>
        0x1 has {balance + " " + coinName}
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
