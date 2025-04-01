export const FUNGIBLE_ASSET = {
  address: '0x1',
  name: 'fungible_asset',
  friends: [
    '0x1::aptos_account',
    '0x1::coin',
    '0x1::dispatchable_fungible_asset',
    '0x1::governed_gas_pool',
    '0x1::primary_fungible_store',
  ],
  exposed_functions: [
    {
      name: 'add_fungibility',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x1::object::ConstructorRef',
        '0x1::option::Option<u128>',
        '0x1::string::String',
        '0x1::string::String',
        'u8',
        '0x1::string::String',
        '0x1::string::String',
      ],
      return: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
    },
    {
      name: 'address_burn_from',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::fungible_asset::BurnRef', 'address', 'u64'],
      return: [],
    },
    {
      name: 'amount',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::fungible_asset::FungibleAsset'],
      return: ['u64'],
    },
    {
      name: 'asset_metadata',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::fungible_asset::FungibleAsset'],
      return: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
    },
    {
      name: 'balance',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['u64'],
    },
    {
      name: 'burn',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x1::fungible_asset::BurnRef',
        '0x1::fungible_asset::FungibleAsset',
      ],
      return: [],
    },
    {
      name: 'burn_from',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: [
        '&0x1::fungible_asset::BurnRef',
        '0x1::object::Object<T0>',
        'u64',
      ],
      return: [],
    },
    {
      name: 'burn_internal',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['0x1::fungible_asset::FungibleAsset'],
      return: ['u64'],
    },
    {
      name: 'burn_ref_metadata',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::fungible_asset::BurnRef'],
      return: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
    },
    {
      name: 'create_store',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['&0x1::object::ConstructorRef', '0x1::object::Object<T0>'],
      return: ['0x1::object::Object<0x1::fungible_asset::FungibleStore>'],
    },
    {
      name: 'decimals',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['u8'],
    },
    {
      name: 'deposit',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>', '0x1::fungible_asset::FungibleAsset'],
      return: [],
    },
    {
      name: 'deposit_dispatch_function',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::option::Option<0x1::function_info::FunctionInfo>'],
    },
    {
      name: 'deposit_internal',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['address', '0x1::fungible_asset::FungibleAsset'],
      return: [],
    },
    {
      name: 'deposit_sanity_check',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>', 'bool'],
      return: [],
    },
    {
      name: 'deposit_with_ref',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: [
        '&0x1::fungible_asset::TransferRef',
        '0x1::object::Object<T0>',
        '0x1::fungible_asset::FungibleAsset',
      ],
      return: [],
    },
    {
      name: 'derived_balance_dispatch_function',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::option::Option<0x1::function_info::FunctionInfo>'],
    },
    {
      name: 'destroy_zero',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['0x1::fungible_asset::FungibleAsset'],
      return: [],
    },
    {
      name: 'extract',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&mut 0x1::fungible_asset::FungibleAsset', 'u64'],
      return: ['0x1::fungible_asset::FungibleAsset'],
    },
    {
      name: 'generate_burn_ref',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::object::ConstructorRef'],
      return: ['0x1::fungible_asset::BurnRef'],
    },
    {
      name: 'generate_mint_ref',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::object::ConstructorRef'],
      return: ['0x1::fungible_asset::MintRef'],
    },
    {
      name: 'generate_mutate_metadata_ref',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::object::ConstructorRef'],
      return: ['0x1::fungible_asset::MutateMetadataRef'],
    },
    {
      name: 'generate_transfer_ref',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::object::ConstructorRef'],
      return: ['0x1::fungible_asset::TransferRef'],
    },
    {
      name: 'icon_uri',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::string::String'],
    },
    {
      name: 'is_address_balance_at_least',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['address', 'u64'],
      return: ['bool'],
    },
    {
      name: 'is_balance_at_least',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>', 'u64'],
      return: ['bool'],
    },
    {
      name: 'is_frozen',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['bool'],
    },
    {
      name: 'is_store_dispatchable',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['bool'],
    },
    {
      name: 'is_untransferable',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['bool'],
    },
    {
      name: 'maximum',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::option::Option<u128>'],
    },
    {
      name: 'merge',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&mut 0x1::fungible_asset::FungibleAsset',
        '0x1::fungible_asset::FungibleAsset',
      ],
      return: [],
    },
    {
      name: 'metadata',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::fungible_asset::Metadata'],
    },
    {
      name: 'metadata_from_asset',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::fungible_asset::FungibleAsset'],
      return: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
    },
    {
      name: 'mint',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::fungible_asset::MintRef', 'u64'],
      return: ['0x1::fungible_asset::FungibleAsset'],
    },
    {
      name: 'mint_internal',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['0x1::object::Object<0x1::fungible_asset::Metadata>', 'u64'],
      return: ['0x1::fungible_asset::FungibleAsset'],
    },
    {
      name: 'mint_ref_metadata',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::fungible_asset::MintRef'],
      return: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
    },
    {
      name: 'mint_to',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: [
        '&0x1::fungible_asset::MintRef',
        '0x1::object::Object<T0>',
        'u64',
      ],
      return: [],
    },
    {
      name: 'mutate_metadata',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x1::fungible_asset::MutateMetadataRef',
        '0x1::option::Option<0x1::string::String>',
        '0x1::option::Option<0x1::string::String>',
        '0x1::option::Option<u8>',
        '0x1::option::Option<0x1::string::String>',
        '0x1::option::Option<0x1::string::String>',
      ],
      return: [],
    },
    {
      name: 'name',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::string::String'],
    },
    {
      name: 'object_from_metadata_ref',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::fungible_asset::MutateMetadataRef'],
      return: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
    },
    {
      name: 'project_uri',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::string::String'],
    },
    {
      name: 'register_dispatch_functions',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x1::object::ConstructorRef',
        '0x1::option::Option<0x1::function_info::FunctionInfo>',
        '0x1::option::Option<0x1::function_info::FunctionInfo>',
        '0x1::option::Option<0x1::function_info::FunctionInfo>',
      ],
      return: [],
    },
    {
      name: 'remove_store',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::object::DeleteRef'],
      return: [],
    },
    {
      name: 'set_frozen_flag',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: [
        '&0x1::fungible_asset::TransferRef',
        '0x1::object::Object<T0>',
        'bool',
      ],
      return: [],
    },
    {
      name: 'set_frozen_flag_internal',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>', 'bool'],
      return: [],
    },
    {
      name: 'set_untransferable',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::object::ConstructorRef'],
      return: [],
    },
    {
      name: 'store_exists',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address'],
      return: ['bool'],
    },
    {
      name: 'store_metadata',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
    },
    {
      name: 'supply',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::option::Option<u128>'],
    },
    {
      name: 'symbol',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::string::String'],
    },
    {
      name: 'transfer',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: [
        '&signer',
        '0x1::object::Object<T0>',
        '0x1::object::Object<T0>',
        'u64',
      ],
      return: [],
    },
    {
      name: 'transfer_ref_metadata',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::fungible_asset::TransferRef'],
      return: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
    },
    {
      name: 'transfer_with_ref',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: [
        '&0x1::fungible_asset::TransferRef',
        '0x1::object::Object<T0>',
        '0x1::object::Object<T0>',
        'u64',
      ],
      return: [],
    },
    {
      name: 'upgrade_store_to_concurrent',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['&signer', '0x1::object::Object<T0>'],
      return: [],
    },
    {
      name: 'upgrade_to_concurrent',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::object::ExtendRef'],
      return: [],
    },
    {
      name: 'withdraw',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['&signer', '0x1::object::Object<T0>', 'u64'],
      return: ['0x1::fungible_asset::FungibleAsset'],
    },
    {
      name: 'withdraw_dispatch_function',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::option::Option<0x1::function_info::FunctionInfo>'],
    },
    {
      name: 'withdraw_internal',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['address', 'u64'],
      return: ['0x1::fungible_asset::FungibleAsset'],
    },
    {
      name: 'withdraw_sanity_check',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['&signer', '0x1::object::Object<T0>', 'bool'],
      return: [],
    },
    {
      name: 'withdraw_with_ref',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: [
        '&0x1::fungible_asset::TransferRef',
        '0x1::object::Object<T0>',
        'u64',
      ],
      return: ['0x1::fungible_asset::FungibleAsset'],
    },
    {
      name: 'zero',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['key'],
        },
      ],
      params: ['0x1::object::Object<T0>'],
      return: ['0x1::fungible_asset::FungibleAsset'],
    },
  ],
  structs: [
    {
      name: 'BurnRef',
      is_native: false,
      abilities: ['drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'metadata',
          type: '0x1::object::Object<0x1::fungible_asset::Metadata>',
        },
      ],
    },
    {
      name: 'ConcurrentFungibleBalance',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'balance',
          type: '0x1::aggregator_v2::Aggregator<u64>',
        },
      ],
    },
    {
      name: 'ConcurrentSupply',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'current',
          type: '0x1::aggregator_v2::Aggregator<u128>',
        },
      ],
    },
    {
      name: 'Deposit',
      is_native: false,
      abilities: ['drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'store',
          type: 'address',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'DepositEvent',
      is_native: false,
      abilities: ['drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'DispatchFunctionStore',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'withdraw_function',
          type: '0x1::option::Option<0x1::function_info::FunctionInfo>',
        },
        {
          name: 'deposit_function',
          type: '0x1::option::Option<0x1::function_info::FunctionInfo>',
        },
        {
          name: 'derived_balance_function',
          type: '0x1::option::Option<0x1::function_info::FunctionInfo>',
        },
      ],
    },
    {
      name: 'Frozen',
      is_native: false,
      abilities: ['drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'store',
          type: 'address',
        },
        {
          name: 'frozen',
          type: 'bool',
        },
      ],
    },
    {
      name: 'FrozenEvent',
      is_native: false,
      abilities: ['drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'frozen',
          type: 'bool',
        },
      ],
    },
    {
      name: 'FungibleAsset',
      is_native: false,
      abilities: [],
      generic_type_params: [],
      fields: [
        {
          name: 'metadata',
          type: '0x1::object::Object<0x1::fungible_asset::Metadata>',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'FungibleAssetEvents',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'deposit_events',
          type: '0x1::event::EventHandle<0x1::fungible_asset::DepositEvent>',
        },
        {
          name: 'withdraw_events',
          type: '0x1::event::EventHandle<0x1::fungible_asset::WithdrawEvent>',
        },
        {
          name: 'frozen_events',
          type: '0x1::event::EventHandle<0x1::fungible_asset::FrozenEvent>',
        },
      ],
    },
    {
      name: 'FungibleStore',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'metadata',
          type: '0x1::object::Object<0x1::fungible_asset::Metadata>',
        },
        {
          name: 'balance',
          type: 'u64',
        },
        {
          name: 'frozen',
          type: 'bool',
        },
      ],
    },
    {
      name: 'Metadata',
      is_native: false,
      abilities: ['copy', 'drop', 'key'],
      generic_type_params: [],
      fields: [
        {
          name: 'name',
          type: '0x1::string::String',
        },
        {
          name: 'symbol',
          type: '0x1::string::String',
        },
        {
          name: 'decimals',
          type: 'u8',
        },
        {
          name: 'icon_uri',
          type: '0x1::string::String',
        },
        {
          name: 'project_uri',
          type: '0x1::string::String',
        },
      ],
    },
    {
      name: 'MintRef',
      is_native: false,
      abilities: ['drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'metadata',
          type: '0x1::object::Object<0x1::fungible_asset::Metadata>',
        },
      ],
    },
    {
      name: 'MutateMetadataRef',
      is_native: false,
      abilities: ['drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'metadata',
          type: '0x1::object::Object<0x1::fungible_asset::Metadata>',
        },
      ],
    },
    {
      name: 'Supply',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'current',
          type: 'u128',
        },
        {
          name: 'maximum',
          type: '0x1::option::Option<u128>',
        },
      ],
    },
    {
      name: 'TransferRef',
      is_native: false,
      abilities: ['drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'metadata',
          type: '0x1::object::Object<0x1::fungible_asset::Metadata>',
        },
      ],
    },
    {
      name: 'Untransferable',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'dummy_field',
          type: 'bool',
        },
      ],
    },
    {
      name: 'Withdraw',
      is_native: false,
      abilities: ['drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'store',
          type: 'address',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'WithdrawEvent',
      is_native: false,
      abilities: ['drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
  ],
} as const;
