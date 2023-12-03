/**
 * Convert an array of generic arguments from Move type to TypeScript type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConvertGenerics<T extends readonly any[]> = T extends readonly [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ...infer TRest,
]
  ? [string, ...ConvertGenerics<TRest>]
  : [];
