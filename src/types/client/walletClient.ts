/**
 * The types for the `WalletClient` class.
 */

import { ABIRoot } from '../abi.js';
import {
  EntryFunctionName,
  ExtractGenericArgsType,
  ExtractArgsTypeOmitSigner,
} from '../extractor/functionExtractor.js';
import { TransactionResponse } from './client.js';

export type ABIWalletClient<T extends ABIRoot> = {
  [TFuncName in EntryFunctionName<T>]: (payload: {
    type_arguments: ExtractGenericArgsType<T, TFuncName>;
    arguments: ExtractArgsTypeOmitSigner<T, TFuncName>;
  }) => Promise<TransactionResponse>;
};
