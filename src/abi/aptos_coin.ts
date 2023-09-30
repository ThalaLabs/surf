export const APTOS_COIN_ABI = {
  address: '0x1',
  name: 'aptos_coin',
  friends: ['0x1::genesis'],
  exposed_functions: [
    {
      name: 'claim_mint_capability',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ['&signer'],
      return: [],
    },
    {
      name: 'configure_accounts_for_test',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&signer',
        '&signer',
        '0x1::coin::MintCapability<0x1::aptos_coin::AptosCoin>',
      ],
      return: [],
    },
    {
      name: 'delegate_mint_capability',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ['signer', 'address'],
      return: [],
    },
    {
      name: 'destroy_mint_cap',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&signer'],
      return: [],
    },
    {
      name: 'has_mint_capability',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&signer'],
      return: ['bool'],
    },
    {
      name: 'initialize',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&signer'],
      return: [
        '0x1::coin::BurnCapability<0x1::aptos_coin::AptosCoin>',
        '0x1::coin::MintCapability<0x1::aptos_coin::AptosCoin>',
      ],
    },
    {
      name: 'mint',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ['&signer', 'address', 'u64'],
      return: [],
    },
  ],
  structs: [
    {
      name: 'AptosCoin',
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
      name: 'DelegatedMintCapability',
      is_native: false,
      abilities: ['store'],
      generic_type_params: [],
      fields: [
        {
          name: 'to',
          type: 'address',
        },
      ],
    },
    {
      name: 'Delegations',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'inner',
          type: 'vector<0x1::aptos_coin::DelegatedMintCapability>',
        },
      ],
    },
    {
      name: 'MintCapStore',
      is_native: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'mint_cap',
          type: '0x1::coin::MintCapability<0x1::aptos_coin::AptosCoin>',
        },
      ],
    },
  ],
} as const;
