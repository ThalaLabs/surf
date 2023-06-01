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
