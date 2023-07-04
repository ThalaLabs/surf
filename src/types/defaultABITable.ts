import type { COIN_ABI } from "../abi/coin.js";
import type { EVENT_ABI } from "../abi/event.js";
import type { GUID_ABI } from "../abi/guid.js";
import { TABLE_ABI } from "../abi/table.js";

export type DefaultABITable = {
    '0x1::coin': typeof COIN_ABI,
    '0x1::event': typeof EVENT_ABI,
    '0x1::guid': typeof GUID_ABI,
    '0x1::table': typeof TABLE_ABI,
};
