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
              
          import {
              AllViewFunctions,
              AllEntryFunctions,
              MoveEntryFunction,
              MoveViewFunction,
            } from "./moduleTable";
            
            type ViewFuncTypeArgs<T0 extends MoveViewFunction> = AllViewFunctions[T0]["types"];
            type ViewFuncArgs<T0 extends MoveViewFunction> = AllViewFunctions[T0]["args"];
            type EntryFuncTypeArgs<T0 extends MoveEntryFunction> = AllEntryFunctions[T0]["types"];
            type EntryFuncArgs<T0 extends MoveEntryFunction> = AllEntryFunctions[T0]["args"];
            
            type ViewRequest<TFunc extends MoveViewFunction> = {
              function: TFunc;
              /**
               * Type arguments of the function
               */
              type_arguments: ViewFuncTypeArgs<TFunc>;
              /**
               * Arguments of the function
               */
              arguments: ViewFuncArgs<TFunc>;
            };
            
            type SubmitRequest<TFunc extends MoveEntryFunction> = {
              function: TFunc;
              /**
               * Type arguments of the function
               */
              type_arguments: EntryFuncTypeArgs<TFunc>;
              /**
               * Arguments of the function
               */
              arguments: EntryFuncArgs<TFunc>;
            };      
          

              
              import * as Coin from './modules/Coin';
              
              type AllEntryFunctions = {
                  '0x1::coin::freeze_coin_store' : Coin.Functions.Freeze_coin_store;
      '0x1::coin::transfer' : Coin.Functions.Transfer;
      '0x1::coin::unfreeze_coin_store' : Coin.Functions.Unfreeze_coin_store;
      '0x1::coin::upgrade_supply' : Coin.Functions.Upgrade_supply;
              };

              type MoveEntryFunction = keyof AllEntryFunctions;

              type AllViewFunctions = {
                  '0x1::coin::balance' : Coin.Functions.Balance;
      '0x1::coin::decimals' : Coin.Functions.Decimals;
      '0x1::coin::is_account_registered' : Coin.Functions.Is_account_registered;
      '0x1::coin::is_coin_initialized' : Coin.Functions.Is_coin_initialized;
      '0x1::coin::name' : Coin.Functions.Name;
      '0x1::coin::supply' : Coin.Functions.Supply;
      '0x1::coin::symbol' : Coin.Functions.Symbol;
              };
              
              type MoveViewFunction = keyof AllViewFunctions;

              type AllStructs = {
                  '0x1::coin::AggregatableCoin' : Coin.Structs.AggregatableCoin;
      '0x1::coin::BurnCapability' : Coin.Structs.BurnCapability;
      '0x1::coin::Coin' : Coin.Structs.Coin;
      '0x1::coin::CoinInfo' : Coin.Structs.CoinInfo;
      '0x1::coin::CoinStore' : Coin.Structs.CoinStore;
      '0x1::coin::DepositEvent' : Coin.Structs.DepositEvent;
      '0x1::coin::FreezeCapability' : Coin.Structs.FreezeCapability;
      '0x1::coin::MintCapability' : Coin.Structs.MintCapability;
      '0x1::coin::SupplyConfig' : Coin.Structs.SupplyConfig;
      '0x1::coin::WithdrawEvent' : Coin.Structs.WithdrawEvent;
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
              return: [MoveType.U64Return];
          };


          type Decimals = {
              types: [MoveStruct];
              args: [];
              return: [MoveType.U8Return];
          };


          type Freeze_coin_store = {
              types: [MoveStruct];
              args: [any];
              return: [];
          };


          type Is_account_registered = {
              types: [MoveStruct];
              args: [MoveType.Address];
              return: [MoveType.BoolReturn];
          };


          type Is_coin_initialized = {
              types: [MoveStruct];
              args: [];
              return: [MoveType.BoolReturn];
          };


          type Name = {
              types: [MoveStruct];
              args: [];
              return: [MoveType.StringReturn];
          };


          type Supply = {
              types: [MoveStruct];
              args: [];
              return: [any];
          };


          type Symbol = {
              types: [MoveStruct];
              args: [];
              return: [MoveType.StringReturn];
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
