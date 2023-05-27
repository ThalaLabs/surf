"use client"
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import './globals.css'
import { Inter } from 'next/font/google'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

const inter = Inter({ subsets: ['latin'] })

const wallets = [
  new PetraWallet(),
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AptosWalletAdapterProvider autoConnect plugins={wallets}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AptosWalletAdapterProvider>
  )
}
