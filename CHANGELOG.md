# @thalalabs/surf

## 1.0.1

### Patch Changes

- 67ab47a: Upgrade @aptos-labs/ts-sdk to 1.0.0

## 1.0.0

### Major Changes

- da2d29f: Use Aptos ts-sdk v2

## 0.0.16

### Patch Changes

- ade995a: export a util type function to declare types of struct

## 0.0.15

### Patch Changes

- ccfd874: add string and Uint8Array support for vector<u8> as input type

## 0.0.14

### Patch Changes

- 661f925: Add ledger version arguments for view and resource functions

## 0.0.13

### Patch Changes

- 75d0420: make aptos wallet library optional, resolve a build error when the wallet library is missing.

## 0.0.12

### Patch Changes

- a0b7dc2: Support 0x1::option::Option as function inputs, and add some tests

## 0.0.11

### Patch Changes

- 64ea383: Support 0x1::object::Object

## 0.0.10

### Patch Changes

- d4d702d: Support `0x1::option::Option<T>` type.

## 0.0.9

### Patch Changes

- 030d907: Support vector of struct in get account resource

## 0.0.8

### Patch Changes

- b15264f: Support customize ABITable

## 0.0.7

### Patch Changes

- 5d6d75b: Bug fix: abi files are missing in the package

## 0.0.6

### Patch Changes

- 2618838: Add a getAccountResource API in useABI client
- 4609afb: Add some builtin 0x1 types for getting account resource

## 0.0.5

### Patch Changes

- ab1d8a5: fix a problem when decode vector\<u64\>, vector\<u128\>, vector\<u256\>

## 0.0.4

### Patch Changes

- 2fb3cfc: Enforce the import syntax to include the file extension. So that Surf could be more compatible with some NodeJS settings.

## 0.0.3

### Patch Changes

- 5d3395d: Add changeset as devDependency and use it to manage the versioning and releasing.
