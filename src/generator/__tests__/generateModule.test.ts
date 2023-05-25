import { generateModule } from '../generateModule.js';
import type { ABIRoot } from '../../abi.js';
const fs = require('fs/promises');

describe('generate module', () => {
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('generate module basic', async () => {
    const abi: ABIRoot = JSON.parse(
      await fs.readFile('./abi/coin.json', 'utf-8'),
    );
    const result = generateModule(abi);
    expect(result).toMatchInlineSnapshot(`
      "namespace ModuleCoin {
              export namespace Structs {
                  export interface AggregatableCoin {
              value: any;
          }

      export interface BurnCapability {
              dummy_field: MovePrimitiveBool;
          }

      export interface Coin {
              value: MovePrimitiveU64;
          }

      export interface CoinInfo {
              name: MoveString;
      symbol: MoveString;
      decimals: MovePrimitiveU8;
      supply: any;
          }

      export interface CoinStore {
              coin: any;
      frozen: MovePrimitiveBool;
      deposit_events: any;
      withdraw_events: any;
          }

      export interface DepositEvent {
              amount: MovePrimitiveU64;
          }

      export interface FreezeCapability {
              dummy_field: MovePrimitiveBool;
          }

      export interface MintCapability {
              dummy_field: MovePrimitiveBool;
          }

      export interface SupplyConfig {
              allow_upgrades: MovePrimitiveBool;
          }

      export interface WithdrawEvent {
              amount: MovePrimitiveU64;
          }
              }

              export namespace Functions {
                  export type Balance = {
              types: [MoveStruct];
              args: [];
              return: [MovePrimitiveU64];
          };

      export type Decimals = {
              types: [MoveStruct];
              args: [];
              return: [MovePrimitiveU8];
          };

      export type Freeze_coin_store = {
              types: [MoveStruct];
              args: [any];
              return: [];
          };

      export type Is_account_registered = {
              types: [MoveStruct];
              args: [];
              return: [MovePrimitiveBool];
          };

      export type Is_coin_initialized = {
              types: [MoveStruct];
              args: [];
              return: [MovePrimitiveBool];
          };

      export type Name = {
              types: [MoveStruct];
              args: [];
              return: [MoveString];
          };

      export type Supply = {
              types: [MoveStruct];
              args: [];
              return: [any];
          };

      export type Symbol = {
              types: [MoveStruct];
              args: [];
              return: [MoveString];
          };

      export type Transfer = {
              types: [MoveStruct];
              args: [MovePrimitiveAddress,MovePrimitiveU64];
              return: [];
          };

      export type Unfreeze_coin_store = {
              types: [MoveStruct];
              args: [any];
              return: [];
          };

      export type Upgrade_supply = {
              types: [MoveStruct];
              args: [];
              return: [];
          };
              }
          }"
    `);
  });
});
