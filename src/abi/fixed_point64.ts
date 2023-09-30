export const FIXED_POINT64_ABI = {
  address: '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9',
  name: 'fixed_point64',
  friends: [],
  exposed_functions: [
    {
      name: 'add',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        'u64',
      ],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'add_fp',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'compare',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: ['u8'],
    },
    {
      name: 'decode',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: ['u64'],
    },
    {
      name: 'decode_round_down',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: ['u64'],
    },
    {
      name: 'decode_round_up',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: ['u64'],
    },
    {
      name: 'div',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        'u64',
      ],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'div_fp',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'encode',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['u64'],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'eq',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: ['bool'],
    },
    {
      name: 'fraction',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['u64', 'u64'],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'from_u128',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['u128'],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'gt',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: ['bool'],
    },
    {
      name: 'gte',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: ['bool'],
    },
    {
      name: 'is_zero',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: ['bool'],
    },
    {
      name: 'lt',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: ['bool'],
    },
    {
      name: 'lte',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: ['bool'],
    },
    {
      name: 'max',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: [
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'min',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: [
        '&0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'mul',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        'u64',
      ],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'mul_fp',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'one',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'sub',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        'u64',
      ],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'sub_fp',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
    {
      name: 'to_u128',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
      return: ['u128'],
    },
    {
      name: 'zero',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: [],
      return: [
        '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64::FixedPoint64',
      ],
    },
  ],
  structs: [
    {
      name: 'FixedPoint64',
      is_native: false,
      abilities: ['copy', 'drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'v',
          type: 'u128',
        },
      ],
    },
  ],
} as const;
