import { AGGREGATOR_ABI } from '../abi/aggregator.js';
import type { COIN_ABI } from '../abi/coin.js';
import type { EVENT_ABI } from '../abi/event.js';
import type { GUID_ABI } from '../abi/guid.js';
import { OPTIONAL_AGGREGATOR_ABI } from '../abi/optional_aggregator.js';
import { TABLE_ABI } from '../abi/table.js';
import { ABIRoot } from './abi.js';

export type ABITable = ABIRoot[];

export type DefaultABITable = [
  typeof COIN_ABI,
  typeof EVENT_ABI,
  typeof GUID_ABI,
  typeof TABLE_ABI,
  typeof OPTIONAL_AGGREGATOR_ABI,
  typeof AGGREGATOR_ABI,
];
