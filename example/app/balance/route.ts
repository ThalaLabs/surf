import { NextResponse } from 'next/server';
import { createSurfClient, createViewPayload } from '@thalalabs/surf';
import { COIN_ABI } from '../../abi/coin';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

export async function GET(request: Request) {
  try {
    const client = createSurfClient(new Aptos(new AptosConfig({ network: Network.TESTNET })))

    const balancePayload = createViewPayload(COIN_ABI, {
      function: 'balance',
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
      functionArguments: ['0x1'],
    });
    const balance = await client.view({ payload: balancePayload });

    const coinNamePayload = createViewPayload(COIN_ABI, {
      function: 'name',
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
      functionArguments: [],
    });
    const coinName = await client.view({ payload: coinNamePayload });

    return NextResponse.json({ message: `0x1 has ${balance} ${coinName}` });
  } catch (e) {
    return NextResponse.json({ error: 'view failed' });
  }
}
