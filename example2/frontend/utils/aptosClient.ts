import { createSurfClient } from "@thalalabs/surf";
import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";

import { NETWORK } from "@/constants";
import { ABI } from "@/utils/abi";

const aptos = new Aptos(new AptosConfig({ network: NETWORK }));

// Reuse same Aptos instance to utilize cookie based sticky routing
export function aptosClient() {
  return aptos;
}

export function surfClient() {
  const surf = createSurfClient(aptosClient()).useABI(ABI);
  return surf;
}
