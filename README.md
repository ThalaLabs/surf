# Surf

**Surf** provides TypeScript Interfaces & React Hooks for seamlessly interacting with Aptos Smart Contracts with full type safety.

## Features

- **No code-generation**: provide fully typed APIs based on static type inference.
- **Get rid of encoding/decoding**: We handle the complex within the APIs, so you don't have to.
- **Linting and Auto-Completion**: Better development experience because of type safety.
- **Both TypeScript Interfaces & React Hooks**: easy to use, whether working with wallets or private keys.

## Overview

```TypeScript
const client = createClient({
    nodeUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
});

await client.useABI(COIN_ABI).entry.transfer({
    arguments: ['0x1', 1],
    type_arguments: ['0x1::aptos_coin::AptosCoin'],
    account,
});

const [balance] = await client.useABI(COIN_ABI).view.balance({
    arguments: ['0x1'],
    type_arguments: ['0x1::aptos_coin::AptosCoin'],
});
```

## Motivation

WIP

## Quick Start

WIP

## Contributing

WIP