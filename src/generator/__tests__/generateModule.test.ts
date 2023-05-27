import { generateModule } from '../generateModule.js';
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
      "
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
              args: [MovePrimitiveAddress];
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
              args: [MovePrimitiveAddress];
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
          }"
    `);
  });
});
