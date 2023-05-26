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
              
          type ViewRequest<T0 extends MoveViewFunction,
              T1 extends AllViewFunctions[T0]['types'],
              T2 extends AllViewFunctions[T0]['args'],
          > = {
              function: T0;
              /**
               * Type arguments of the function
               */
              type_arguments: T1;
              /**
               * Arguments of the function
               */
              arguments: T2;
          }
          

              
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
          

              
          declare namespace ModuleCoin {
              namespace Structs {
                  
          interface AggregatableCoin {
              value: any;
          }


          interface BurnCapability {
              dummy_field: MovePrimitiveBool;
          }


          interface Coin {
              value: MovePrimitiveU64;
          }


          interface CoinInfo {
              name: MoveString;
      symbol: MoveString;
      decimals: MovePrimitiveU8;
      supply: any;
          }


          interface CoinStore {
              coin: any;
      frozen: MovePrimitiveBool;
      deposit_events: any;
      withdraw_events: any;
          }


          interface DepositEvent {
              amount: MovePrimitiveU64;
          }


          interface FreezeCapability {
              dummy_field: MovePrimitiveBool;
          }


          interface MintCapability {
              dummy_field: MovePrimitiveBool;
          }


          interface SupplyConfig {
              allow_upgrades: MovePrimitiveBool;
          }


          interface WithdrawEvent {
              amount: MovePrimitiveU64;
          }
              }

              namespace Functions {
                  
          type Balance = {
              types: [MoveStruct];
              args: [];
              return: [MovePrimitiveU64];
          };


          type Decimals = {
              types: [MoveStruct];
              args: [];
              return: [MovePrimitiveU8];
          };


          type Freeze_coin_store = {
              types: [MoveStruct];
              args: [any];
              return: [];
          };


          type Is_account_registered = {
              types: [MoveStruct];
              args: [];
              return: [MovePrimitiveBool];
          };


          type Is_coin_initialized = {
              types: [MoveStruct];
              args: [];
              return: [MovePrimitiveBool];
          };


          type Name = {
              types: [MoveStruct];
              args: [];
              return: [MoveString];
          };


          type Supply = {
              types: [MoveStruct];
              args: [];
              return: [any];
          };


          type Symbol = {
              types: [MoveStruct];
              args: [];
              return: [MoveString];
          };


          type Transfer = {
              types: [MoveStruct];
              args: [MovePrimitiveAddress,MovePrimitiveU64];
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
          }
          "
    `);
  });
});
