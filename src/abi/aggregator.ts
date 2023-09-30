export const AGGREGATOR_ABI = {
  address: '0x1',
  name: 'aggregator',
  friends: [],
  exposed_functions: [
    {
      name: 'add',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&mut 0x1::aggregator::Aggregator', 'u128'],
      return: [],
    },
    {
      name: 'destroy',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['0x1::aggregator::Aggregator'],
      return: [],
    },
    {
      name: 'limit',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::aggregator::Aggregator'],
      return: ['u128'],
    },
    {
      name: 'read',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::aggregator::Aggregator'],
      return: ['u128'],
    },
    {
      name: 'sub',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&mut 0x1::aggregator::Aggregator', 'u128'],
      return: [],
    },
  ],
  structs: [
    {
      name: 'Aggregator',
      is_native: false,
      abilities: ['store'],
      generic_type_params: [],
      fields: [
        {
          name: 'handle',
          type: 'address',
        },
        {
          name: 'key',
          type: 'address',
        },
        {
          name: 'limit',
          type: 'u128',
        },
      ],
    },
  ],
} as const;
