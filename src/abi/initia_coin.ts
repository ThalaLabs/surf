export const INITIA_COIN_ABI = {
  address: '0x1',
  name: 'coin',
  friends: ['0x1::managed_coin', '0x1::staking'],
  exposed_functions: [
    {
      name: 'name',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
      return: ['0x1::string::String'],
    },
    {
      name: 'transfer',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: [
        '&signer',
        'address',
        '0x1::object::Object<0x1::fungible_asset::Metadata>',
        'u64',
      ],
      return: [],
    },
    {
      name: 'metadata',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address', '0x1::string::String'],
      return: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
    },
    {
      name: 'symbol',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
      return: ['0x1::string::String'],
    },
    {
      name: 'decimals',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
      return: ['u8'],
    },
    {
      name: 'balance',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address', '0x1::object::Object<0x1::fungible_asset::Metadata>'],
      return: ['u64'],
    },
    {
      name: 'burn',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x1::coin::BurnCapability',
        '0x1::fungible_asset::FungibleAsset',
      ],
      return: [],
    },
    {
      name: 'deposit',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['address', '0x1::fungible_asset::FungibleAsset'],
      return: [],
    },
    {
      name: 'is_frozen',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address', '0x1::object::Object<0x1::fungible_asset::Metadata>'],
      return: ['bool'],
    },
    {
      name: 'maximum',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
      return: ['0x1::option::Option<u128>'],
    },
    {
      name: 'mint',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::coin::MintCapability', 'u64'],
      return: ['0x1::fungible_asset::FungibleAsset'],
    },
    {
      name: 'mint_to',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::coin::MintCapability', 'address', 'u64'],
      return: [],
    },
    {
      name: 'sudo_deposit',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['address', '0x1::fungible_asset::FungibleAsset'],
      return: [],
    },
    {
      name: 'sudo_transfer',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: [
        '&signer',
        '&signer',
        'address',
        '0x1::object::Object<0x1::fungible_asset::Metadata>',
        'u64',
      ],
      return: [],
    },
    {
      name: 'supply',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
      return: ['0x1::option::Option<u128>'],
    },
    {
      name: 'withdraw',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&signer',
        '0x1::object::Object<0x1::fungible_asset::Metadata>',
        'u64',
      ],
      return: ['0x1::fungible_asset::FungibleAsset'],
    },
    {
      name: 'metadata_address',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address', '0x1::string::String'],
      return: ['address'],
    },
    {
      name: 'balances',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address', '0x1::option::Option<address>', 'u8'],
      return: [
        'vector<0x1::object::Object<0x1::fungible_asset::Metadata>>',
        'vector<u64>',
      ],
    },
    {
      name: 'denom_to_metadata',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['0x1::string::String'],
      return: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
    },
    {
      name: 'freeze_coin_store',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::coin::FreezeCapability', 'address'],
      return: [],
    },
    {
      name: 'initialize',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&signer',
        '0x1::option::Option<u128>',
        '0x1::string::String',
        '0x1::string::String',
        'u8',
        '0x1::string::String',
        '0x1::string::String',
      ],
      return: [
        '0x1::coin::MintCapability',
        '0x1::coin::BurnCapability',
        '0x1::coin::FreezeCapability',
      ],
    },
    {
      name: 'initialize_and_generate_extend_ref',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&signer',
        '0x1::option::Option<u128>',
        '0x1::string::String',
        '0x1::string::String',
        'u8',
        '0x1::string::String',
        '0x1::string::String',
      ],
      return: [
        '0x1::coin::MintCapability',
        '0x1::coin::BurnCapability',
        '0x1::coin::FreezeCapability',
        '0x1::object::ExtendRef',
      ],
    },
    {
      name: 'is_coin',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address'],
      return: ['bool'],
    },
    {
      name: 'is_coin_by_symbol',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address', '0x1::string::String'],
      return: ['bool'],
    },
    {
      name: 'metadata_to_denom',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['0x1::object::Object<0x1::fungible_asset::Metadata>'],
      return: ['0x1::string::String'],
    },
    {
      name: 'sudo_multisend',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: [
        '&signer',
        '&signer',
        '0x1::object::Object<0x1::fungible_asset::Metadata>',
        'vector<address>',
        'vector<u64>',
      ],
      return: [],
    },
    {
      name: 'unfreeze_coin_store',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::coin::FreezeCapability', 'address'],
      return: [],
    },
  ],
  structs: [
    {
      name: 'BurnCapability',
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
      name: 'Coin',
      is_native: false,
      abilities: [],
      generic_type_params: [{ constraints: [], is_phantom: true }],
      fields: [{ name: 'dummy_field', type: 'bool' }],
    },
    {
      name: 'CoinCreatedEvent',
      is_native: false,
      abilities: ['drop', 'store'],
      generic_type_params: [],
      fields: [{ name: 'metadata_addr', type: 'address' }],
    },
    {
      name: 'FreezeCapability',
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
      name: 'ManagingRefs',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        { name: 'mint_ref', type: '0x1::fungible_asset::MintRef' },
        { name: 'burn_ref', type: '0x1::fungible_asset::BurnRef' },
        { name: 'transfer_ref', type: '0x1::fungible_asset::TransferRef' },
      ],
    },
    {
      name: 'MintCapability',
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
  ],
} as const;
