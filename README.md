<br/>

<h1 align="center">
  Surf
</h1>

<p align="center">
  Type-Safe TypeScript Interfaces & React Hooks for Aptos.
<p>

<p align="center">
  <a href="https://www.npmjs.com/package/@thalalabs/surf">
      <img src="https://img.shields.io/npm/v/@thalalabs/surf?colorA=2c8af7&colorB=2c8af7&style=flat" alt="Version">
  </a>
  <a href="https://github.com/ThalaLabs/surf/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/@thalalabs/surf?colorA=2c8af7&colorB=2c8af7&style=flat" alt="MIT License">
  </a>
  <a href="https://bundlephobia.com/package/@thalalabs/surf">
      <img src="https://img.shields.io/bundlephobia/minzip/@thalalabs/surf?colorA=2c8af7&colorB=2c8af7&style=flat" alt="MIT License">
  </a>
</p>

<br>

## Features

- **No code-generation**: Interact with smart contracts using fully typed APIs based on static type inference. Inspired by [Viem](https://viem.sh/).
- **Get rid of encoding/decoding**: Surf takes care of the complexities within the APIs, so you don't have to.
- **Linting and Auto-Completion**: Enjoy a better development experience with type safety. No more guesswork for input and output.
- **Both TypeScript Interfaces & React Hooks**: Easy to use, whether working with wallets or private keys.
- **Low runtime cost & small bundle size**: [minzipped size: 1.77 kB](https://bundlephobia.com/package/@thalalabs/surf).

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

When you input `client.useABI(COIN_ABI).view.` into your IDE, the auto-completion show as below. You could also see the input and output types for the function, all of which are statically inferred from the ABI.

![demo image](./images/surf-hero.gif)

## Quick Start

### Installation

```shell
npm i @thalalabs/surf aptos
```

If you want to use the React Hooks, install the `@aptos-labs/wallet-adapter-react` additionally. Those React Hooks will be moved to a separate package in near future.

### Start

Create the client:

```TypeScript
import { createClient } from '@thalalabs/surf';

const client = createClient({
    nodeUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
});
```

Surf infers types from ABI to give you the end-to-end type-safety from your Move contract to your frontend. So firstly, you need to prepare the ABI json object of your contract in TypeScript:

```TypeScript
const abi = {…} as const;
```

If type inference isn't working, it's likely you forgot to add the const assertion for the object. And make sure that you set `strict` to `true` in your `tsconfig.json` compiler options.

### Call View functions

There are two ways to call a view function with the client:

```typescript
// Option 1. Use the `useABI` interface
const [balance] = await client.useABI(COIN_ABI).view.balance({
    arguments: ['0x1'],
    type_arguments: ['0x1::aptos_coin::AptosCoin'],
});

// Option 2. Create payload and use the `view` interface
import { createViewPayload } from "@thalalabs/surf";
const viewPayload = createViewPayload(COIN_ABI, {
    function: 'balance',
    arguments: ['0x1'],
    type_arguments: ['0x1::aptos_coin::AptosCoin'],
});
const [balance] = await client.view(viewPayload);
```

Both of the interfaces can provide type safety.

Calling `useABI` returns an object without any ABI parsing, so that the runtime cost is low.

### Submit Transaction

Similar to the `view` function, there are also two ways to submit transactions.

```typescript
// prepare your AptosAccount
const account = /* your AptosAccount */;

// Option 1. Use the `useABI` interface
const { hash } = await client.useABI(COIN_ABI).entry.transfer({
    arguments: ['0x1', 1],
    type_arguments: ['0x1::aptos_coin::AptosCoin'],
    account,
});

// Option 2. Create payload and use the `submitTransaction` interface
import { createEntryPayload } from "@thalalabs/surf";
const entryPayload = createEntryPayload(COIN_ABI, {
    function: 'transfer',
    arguments: ['0x1', 1],
    type_arguments: ['0x1::aptos_coin::AptosCoin'],
});

const { hash } = await client.submitTransaction(
    entryPayload, 
    { account },
);
```

You can also simulate a transaction:

```typescript
// prepare your AptosAccount
const account = /* your AptosAccount */;

// Option 1. Use the `useABI` interface
const { hash } = await client.useABI(COIN_ABI).entry.transfer({
    arguments: ['0x1', 1],
    type_arguments: ['0x1::aptos_coin::AptosCoin'],
    account,
    isSimulation: true,
});

// Option 2. Create payload and use the `simulateTransaction` interface
import { createEntryPayload } from "@thalalabs/surf";
const entryPayload = createEntryPayload(COIN_ABI, {
    function: 'transfer',
    arguments: ['0x1', 1],
    type_arguments: ['0x1::aptos_coin::AptosCoin'],
});

const { hash } = await client.simulateTransaction(
    entryPayload, 
    { account }
);
```

### React Hooks

Surf currently offers two React Hooks: `useWalletClient` and `useSubmitTransaction`. Both require the `@aptos-labs/wallet-adapter-react`. Check out the [example NextJS package](https://github.com/ThalaLabs/surf/blob/main/example/app/page.tsx) for more information.

## Motivation

WIP

## Contributing

WIP

## License

Released under [MIT](/LICENSE) by [@ThalaLabs](https://github.com/ThalaLabs).
