import { generateTable } from '../generateTable.js';
const fs = require('fs/promises');

describe('generate module', () => {
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('generate function table', async () => {
    const abi: ABIRoot = JSON.parse(
      await fs.readFile('./abi/coin.json', 'utf-8'),
    );
    const result = generateTable([abi]);
    expect(result).toMatchInlineSnapshot(`
      "
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
          "
    `);
  });
});
