import { NextResponse } from 'next/server';
import { createEntryPayload, createSurfClient } from '@thalalabs/surf';
import { COIN_ABI } from '../../abi/coin';
import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from '@aptos-labs/ts-sdk';

export async function GET(request: Request) {
  let account;
  try {
    account = Account.fromPrivateKey({ privateKey: new Ed25519PrivateKey(process.env.TEST_ACCOUNT_PRIVATE_KEY as string) });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid private key' });
  }

  try {
    const client = createSurfClient(new Aptos(new AptosConfig({ network: Network.TESTNET })))

    const transferPayload = createEntryPayload(COIN_ABI, {
      function: 'transfer',
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
      functionArguments: ['0x1', BigInt(1)],
    });
    const tx = await client.submitTransaction({
      payload: transferPayload,
      signer: account
    });
    return NextResponse.json({ tx });
  } catch (e) {
    return NextResponse.json({ error: 'submit transaction failed' });
  }
}
