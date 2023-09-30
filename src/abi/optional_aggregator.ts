export const OPTIONAL_AGGREGATOR_ABI = {
  address: '0x1',
  name: 'optional_aggregator',
  friends: ['0x1::coin'],
  exposed_functions: [
    {
      name: 'add',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&mut 0x1::optional_aggregator::OptionalAggregator', 'u128'],
      return: [],
    },
    {
      name: 'destroy',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['0x1::optional_aggregator::OptionalAggregator'],
      return: [],
    },
    {
      name: 'is_parallelizable',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::optional_aggregator::OptionalAggregator'],
      return: ['bool'],
    },
    {
      name: 'new',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['u128', 'bool'],
      return: ['0x1::optional_aggregator::OptionalAggregator'],
    },
    {
      name: 'read',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&0x1::optional_aggregator::OptionalAggregator'],
      return: ['u128'],
    },
    {
      name: 'sub',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&mut 0x1::optional_aggregator::OptionalAggregator', 'u128'],
      return: [],
    },
    {
      name: 'switch',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ['&mut 0x1::optional_aggregator::OptionalAggregator'],
      return: [],
    },
  ],
  structs: [
    {
      name: 'Integer',
      is_native: false,
      abilities: ['store'],
      generic_type_params: [],
      fields: [
        {
          name: 'value',
          type: 'u128',
        },
        {
          name: 'limit',
          type: 'u128',
        },
      ],
    },
    {
      name: 'OptionalAggregator',
      is_native: false,
      abilities: ['store'],
      generic_type_params: [],
      fields: [
        {
          name: 'aggregator',
          type: '0x1::option::Option<0x1::aggregator::Aggregator>',
        },
        {
          name: 'integer',
          type: '0x1::option::Option<0x1::optional_aggregator::Integer>',
        },
      ],
    },
  ],
} as const;
