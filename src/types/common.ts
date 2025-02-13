export type UnknownStruct<_T extends string> = unknown;

export type AnyNumber = number | bigint | string;

// Remove all `signer` and `&signer` from argument list because the Move VM injects those arguments. Clients do not
// need to care about those args. `signer` and `&signer` are required be in the front of the argument list.
export type OmitSigner<T extends readonly string[]> = T extends readonly [
  '&signer' | 'signer',
  ...infer Rest extends readonly string[],
]
  ? OmitSigner<Rest>
  : T;

// Remove the inner type of a string.
// For example, `0x1::object::Object<u8>` -> `0x1::object::Object`.
export type OmitInner<T extends string> =
  T extends `${infer TOuter}<${infer _TInner}>` ? `${TOuter}` : T;
