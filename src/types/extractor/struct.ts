import { ABIRoot, ABIStruct } from '../abi.js';
import { MovePrimitivesMap } from '../moveTypes.js';

export type ExtractStructName<
  ABI extends ABIRoot,
  FunctionName extends string,
> =
  | `0x1::object::Object<${ABI['address']}::${ABI['name']}::${FunctionName}>`
  | `${ABI['address']}::${ABI['name']}::${FunctionName}`;

// Extracts a raw Struct from the ABI structs array by its name.
export type ExtractStruct<
  Abi extends ABIRoot,
  T extends Abi['structs'][number]['name'],
> = Extract<Abi['structs'][number], { name: T }>;

// Convert a raw Struct from abi to an object with its fields and parsed object types
export type ConvertedStruct<
  ABI extends ABIRoot,
  T extends ABIStruct,
  Fields extends T['fields'][number] = T['fields'][number],
> = {
  [Key in Fields as Key['name']]: Key['type'] extends keyof MovePrimitivesMap
    ? MovePrimitivesMap[Key['type']] // Non Struct Types
    : Key['type'] extends ExtractStructName<ABI, infer StructName>
      ? StructName extends ABI['structs'][number]['name']
        ? // Transformed 0x1::object::Object<0x1::coin::CustomStruct> to object.
          ConvertedStruct<ABI, ExtractStruct<ABI, StructName>>
        : never
      : never;
};
