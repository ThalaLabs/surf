import { AptosAccount, AptosClient as Client, TxnBuilderTypes, Types } from 'aptos';

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

type SubmitRequest<T0 extends MoveEntryFunction,
    T1 extends AllEntryFunctions[T0]['types'],
    T2 extends AllEntryFunctions[T0]['args'],
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


type MovePrimitiveU8 = number;
type MovePrimitiveU64 = bigint;
type MovePrimitiveAddress = `0x${string}`;
type MovePrimitiveBool = boolean;


type AllEntryFunctions = {
    '0x1::coin::freeze_coin_store': ModuleCoin.Functions.Freeze_coin_store;
    '0x1::coin::transfer': ModuleCoin.Functions.Transfer;
    '0x1::coin::unfreeze_coin_store': ModuleCoin.Functions.Unfreeze_coin_store;
    '0x1::coin::upgrade_supply': ModuleCoin.Functions.Upgrade_supply;
};

type MoveEntryFunction = keyof AllEntryFunctions;

type AllViewFunctions = {
    '0x1::coin::balance': ModuleCoin.Functions.Balance;
    '0x1::coin::decimals': ModuleCoin.Functions.Decimals;
    '0x1::coin::is_account_registered': ModuleCoin.Functions.Is_account_registered;
    '0x1::coin::is_coin_initialized': ModuleCoin.Functions.Is_coin_initialized;
    '0x1::coin::name': ModuleCoin.Functions.Name;
    '0x1::coin::supply': ModuleCoin.Functions.Supply;
    '0x1::coin::symbol': ModuleCoin.Functions.Symbol;
};

type MoveViewFunction = keyof AllViewFunctions;

type AllStructs = {
    '0x1::coin::AggregatableCoin': ModuleCoin.Structs.AggregatableCoin;
    '0x1::coin::BurnCapability': ModuleCoin.Structs.BurnCapability;
    '0x1::coin::Coin': ModuleCoin.Structs.Coin;
    '0x1::coin::CoinInfo': ModuleCoin.Structs.CoinInfo;
    '0x1::coin::CoinStore': ModuleCoin.Structs.CoinStore;
    '0x1::coin::DepositEvent': ModuleCoin.Structs.DepositEvent;
    '0x1::coin::FreezeCapability': ModuleCoin.Structs.FreezeCapability;
    '0x1::coin::MintCapability': ModuleCoin.Structs.MintCapability;
    '0x1::coin::SupplyConfig': ModuleCoin.Structs.SupplyConfig;
    '0x1::coin::WithdrawEvent': ModuleCoin.Structs.WithdrawEvent;
};

type MoveStruct = keyof AllStructs;


export namespace ModuleCoin {
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
            name: any;
            symbol: any;
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
            args: [MovePrimitiveU8];
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
            return: [any];
        };

        export type Supply = {
            types: [MoveStruct];
            args: [];
            return: [any];
        };

        export type Symbol = {
            types: [MoveStruct];
            args: [];
            return: [any];
        };

        export type Transfer = {
            types: [MoveStruct];
            args: [MovePrimitiveAddress, MovePrimitiveU64];
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
}
