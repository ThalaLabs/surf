import { generateAll } from '../generateAll.js';

describe('generate all', () => {
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('generate all', async () => {
    const fs = require('fs/promises');
    const result = generateAll(
      JSON.parse(await fs.readFile('./abi/coin.json', 'utf-8')),
    );
    expect(result).toMatchInlineSnapshot(`
      "
              
          import { AllViewFunctions, AllEntryFunctions, MoveEntryFunction, MoveViewFunction } from "./moduleTable";

          type ViewRequest<T0 extends MoveViewFunction> = {
              function: T0;
              /**
               * Type arguments of the function
               */
              type_arguments: AllViewFunctions[T0]['types'];
              /**
               * Arguments of the function
               */
              arguments: AllViewFunctions[T0]['args'];
          }

          type SubmitRequest<T0 extends MoveEntryFunction> = {
              function: T0;
              /**
               * Type arguments of the function
               */
              type_arguments: AllEntryFunctions[T0]["types"];
              /**
               * Arguments of the function
               */
              arguments: AllEntryFunctions[T0]['args'];
          };
          

              
              import * as ModuleCoin from './modules/coin';

              type AllEntryFunctions = {
                  '0x1::coin::freeze_coin_store' : ModuleCoin.Functions.Freeze_coin_store;
      '0x1::coin::transfer' : ModuleCoin.Functions.Transfer;
      '0x1::coin::unfreeze_coin_store' : ModuleCoin.Functions.Unfreeze_coin_store;
      '0x1::coin::upgrade_supply' : ModuleCoin.Functions.Upgrade_supply;
              };

              type MoveEntryFunction = keyof AllEntryFunctions;

              type AllViewFunctions = {
                  '0x1::coin::balance' : ModuleCoin.Functions.Balance;
      '0x1::coin::decimals' : ModuleCoin.Functions.Decimals;
      '0x1::coin::is_account_registered' : ModuleCoin.Functions.Is_account_registered;
      '0x1::coin::is_coin_initialized' : ModuleCoin.Functions.Is_coin_initialized;
      '0x1::coin::name' : ModuleCoin.Functions.Name;
      '0x1::coin::supply' : ModuleCoin.Functions.Supply;
      '0x1::coin::symbol' : ModuleCoin.Functions.Symbol;
              };
              
              type MoveViewFunction = keyof AllViewFunctions;

              type AllStructs = {
                  '0x1::coin::AggregatableCoin' : ModuleCoin.Structs.AggregatableCoin;
      '0x1::coin::BurnCapability' : ModuleCoin.Structs.BurnCapability;
      '0x1::coin::Coin' : ModuleCoin.Structs.Coin;
      '0x1::coin::CoinInfo' : ModuleCoin.Structs.CoinInfo;
      '0x1::coin::CoinStore' : ModuleCoin.Structs.CoinStore;
      '0x1::coin::DepositEvent' : ModuleCoin.Structs.DepositEvent;
      '0x1::coin::FreezeCapability' : ModuleCoin.Structs.FreezeCapability;
      '0x1::coin::MintCapability' : ModuleCoin.Structs.MintCapability;
      '0x1::coin::SupplyConfig' : ModuleCoin.Structs.SupplyConfig;
      '0x1::coin::WithdrawEvent' : ModuleCoin.Structs.WithdrawEvent;
              };
              
              type MoveStruct = keyof AllStructs;
          

              
          import * as MoveType from '../primitives';
          import { MoveStruct } from "../moduleTable";

          export namespace Structs {
              
          interface AggregatableCoin {
              value: any;
          }


          interface BurnCapability {
              dummy_field: MoveType.Bool;
          }


          interface Coin {
              value: MoveType.U64;
          }


          interface CoinInfo {
              name: MoveType.String;
      symbol: MoveType.String;
      decimals: MoveType.U8;
      supply: any;
          }


          interface CoinStore {
              coin: any;
      frozen: MoveType.Bool;
      deposit_events: any;
      withdraw_events: any;
          }


          interface DepositEvent {
              amount: MoveType.U64;
          }


          interface FreezeCapability {
              dummy_field: MoveType.Bool;
          }


          interface MintCapability {
              dummy_field: MoveType.Bool;
          }


          interface SupplyConfig {
              allow_upgrades: MoveType.Bool;
          }


          interface WithdrawEvent {
              amount: MoveType.U64;
          }
          }

          export namespace Functions {
              
          type Balance = {
              types: [MoveStruct];
              args: [MoveType.Address];
              return: [MoveType.U64];
          };


          type Decimals = {
              types: [MoveStruct];
              args: [];
              return: [MoveType.U8];
          };


          type Freeze_coin_store = {
              types: [MoveStruct];
              args: [any];
              return: [];
          };


          type Is_account_registered = {
              types: [MoveStruct];
              args: [MoveType.Address];
              return: [MoveType.Bool];
          };


          type Is_coin_initialized = {
              types: [MoveStruct];
              args: [];
              return: [MoveType.Bool];
          };


          type Name = {
              types: [MoveStruct];
              args: [];
              return: [MoveType.String];
          };


          type Supply = {
              types: [MoveStruct];
              args: [];
              return: [any];
          };


          type Symbol = {
              types: [MoveStruct];
              args: [];
              return: [MoveType.String];
          };


          type Transfer = {
              types: [MoveStruct];
              args: [MoveType.Address,MoveType.U64];
              return: [];
          };


          type Unfreeze_coin_store = {
              types: [MoveStruct];
              args: [any];
              return: [];
          };


          type Upgrade_supply = {
              types: [MoveStruct];
              args: [];
              return: [];
          };
          }
          
          "
    `);
  });
});
