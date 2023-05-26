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
          "
    `);
  });
});
