export const PYTH_ABI = {
    "address": "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387",
    "name": "pyth",
    "friends": [],
    "exposed_functions": [
      {
        "name": "get_ema_price",
        "visibility": "public",
        "is_entry": false,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price_identifier::PriceIdentifier"
        ],
        "return": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price::Price"
        ]
      },
      {
        "name": "get_ema_price_no_older_than",
        "visibility": "public",
        "is_entry": false,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price_identifier::PriceIdentifier",
          "u64"
        ],
        "return": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price::Price"
        ]
      },
      {
        "name": "get_ema_price_unsafe",
        "visibility": "public",
        "is_entry": false,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price_identifier::PriceIdentifier"
        ],
        "return": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price::Price"
        ]
      },
      {
        "name": "get_price",
        "visibility": "public",
        "is_entry": false,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price_identifier::PriceIdentifier"
        ],
        "return": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price::Price"
        ]
      },
      {
        "name": "get_price_no_older_than",
        "visibility": "public",
        "is_entry": false,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price_identifier::PriceIdentifier",
          "u64"
        ],
        "return": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price::Price"
        ]
      },
      {
        "name": "get_price_unsafe",
        "visibility": "public",
        "is_entry": false,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price_identifier::PriceIdentifier"
        ],
        "return": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price::Price"
        ]
      },
      {
        "name": "get_stale_price_threshold_secs",
        "visibility": "public",
        "is_entry": false,
        "is_view": false,
        "generic_type_params": [],
        "params": [],
        "return": [
          "u64"
        ]
      },
      {
        "name": "get_update_fee",
        "visibility": "public",
        "is_entry": false,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "&vector<vector<u8>>"
        ],
        "return": [
          "u64"
        ]
      },
      {
        "name": "init",
        "visibility": "public",
        "is_entry": true,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "&signer",
          "u64",
          "u64",
          "vector<u8>",
          "vector<u64>",
          "vector<vector<u8>>",
          "u64"
        ],
        "return": []
      },
      {
        "name": "price_feed_exists",
        "visibility": "public",
        "is_entry": false,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price_identifier::PriceIdentifier"
        ],
        "return": [
          "bool"
        ]
      },
      {
        "name": "update_cache",
        "visibility": "friend",
        "is_entry": false,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "vector<0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387::price_info::PriceInfo>"
        ],
        "return": []
      },
      {
        "name": "update_price_feeds",
        "visibility": "public",
        "is_entry": false,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "vector<vector<u8>>",
          "0x1::coin::Coin<0x1::aptos_coin::AptosCoin>"
        ],
        "return": []
      },
      {
        "name": "update_price_feeds_if_fresh",
        "visibility": "public",
        "is_entry": true,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "vector<vector<u8>>",
          "vector<vector<u8>>",
          "vector<u64>",
          "0x1::coin::Coin<0x1::aptos_coin::AptosCoin>"
        ],
        "return": []
      },
      {
        "name": "update_price_feeds_if_fresh_with_funder",
        "visibility": "public",
        "is_entry": true,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "&signer",
          "vector<vector<u8>>",
          "vector<vector<u8>>",
          "vector<u64>"
        ],
        "return": []
      },
      {
        "name": "update_price_feeds_with_funder",
        "visibility": "public",
        "is_entry": true,
        "is_view": false,
        "generic_type_params": [],
        "params": [
          "&signer",
          "vector<vector<u8>>"
        ],
        "return": []
      }
    ],
    "structs": []
  } as const;