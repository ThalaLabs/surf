export const EVENT_ABI = {
  address: '0x1',
  name: 'event',
  friends: ['0x1::account', '0x1::object'],
  exposed_functions: [
    {
      name: 'counter',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['drop', 'store'],
        },
      ],
      params: ['&0x1::event::EventHandle<T0>'],
      return: ['u64'],
    },
    {
      name: 'destroy_handle',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['drop', 'store'],
        },
      ],
      params: ['0x1::event::EventHandle<T0>'],
      return: [],
    },
    {
      name: 'emit_event',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['drop', 'store'],
        },
      ],
      params: ['&mut 0x1::event::EventHandle<T0>', 'T0'],
      return: [],
    },
    {
      name: 'guid',
      visibility: 'public',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['drop', 'store'],
        },
      ],
      params: ['&0x1::event::EventHandle<T0>'],
      return: ['&0x1::guid::GUID'],
    },
    {
      name: 'new_event_handle',
      visibility: 'friend',
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: ['drop', 'store'],
        },
      ],
      params: ['0x1::guid::GUID'],
      return: ['0x1::event::EventHandle<T0>'],
    },
  ],
  structs: [
    {
      name: 'EventHandle',
      is_native: false,
      abilities: ['store'],
      generic_type_params: [
        {
          constraints: ['drop', 'store'],
        },
      ],
      fields: [
        {
          name: 'counter',
          type: 'u64',
        },
        {
          name: 'guid',
          type: '0x1::guid::GUID',
        },
      ],
    },
  ],
} as const;
