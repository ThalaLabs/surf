import type { COIN_ABI } from "../abi/coin.js";
import type { EVENT_ABI } from "../abi/event.js";
import { FIXED_POINT64_ABI } from "../abi/fixed_point64.js";
import type { GUID_ABI } from "../abi/guid.js";
import { TABLE_ABI } from "../abi/table.js";

export type GlobalABITable = {
    '0x1::coin': typeof COIN_ABI,
    '0x1::event': typeof EVENT_ABI,
    '0x1::guid': typeof GUID_ABI,
    '0x1::table': typeof TABLE_ABI,
    '0x4dcae85fc5559071906cd5c76b7420fcbb4b0a92f00ab40ffc394aadbbff5ee9::fixed_point64': typeof FIXED_POINT64_ABI,
};
