'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AptosWalletAdapterProvider autoConnect>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AptosWalletAdapterProvider>
  );
}
