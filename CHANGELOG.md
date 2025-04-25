# @thalalabs/surf

## 1.9.4

### Patch Changes

- 0a2978b: Make initia package optional

## 1.9.3

### Patch Changes

- 06d76c9: Upgrade initia packages
- a930aa9: refactor abi type conversion

## 1.9.2

### Patch Changes

- 119f0ed: fix entry function abi type

## 1.9.1

### Patch Changes

- e6dfbfd: Fix the inconsistency in the return type of the Initia view function.

## 1.9.0

### Minor Changes

- 6a51aed: Partially support Initia

## 1.8.1

### Patch Changes

- 3d6e4dc: Fix a bug that makes the function unusable when there are zero input arguments.

## 1.8.0

### Minor Changes

- 0c730c8: bump aptos ts-sdk

## 1.7.4

### Patch Changes

- 598f09f: Remove all leading signer of a entry function

## 1.7.3

### Patch Changes

- 00e316b: bump ts-sdk packages

## 1.7.2

### Patch Changes

- fa03792: support 0x1::object::Object and 0x1::option::Option for view function returns
- 6113067: support 0x1::object::Object type in struct

## 1.7.1

### Patch Changes

- df5280a: Fix failed to override resource abi address

## 1.7.0

### Minor Changes

- 8fad9b9: add "private" in ABI visibility field
- 8fad9b9: Fix Aptos Move optional type

## 1.6.1

### Patch Changes

- a6e1081: upgrade Aptos libraries

## 1.6.0

### Minor Changes

- d7b62ed: Change ABITable to an array type instead of a map

## 1.5.1

### Patch Changes

- 09f70fb: upgrade dependencies

## 1.5.0

### Minor Changes

- 0a16c3f: Support override address of the contract in ABI

## 1.4.1

### Patch Changes

- 4b6f32c: change abi param to optional

## 1.4.0

### Minor Changes

- 2b84c87: improve createViewPayload to includes abi object, so that aptos ts-sdk can avoid to fetch the abi again.

## 1.3.1

### Patch Changes

- a0f3563: fix aptos ts-sdk breaking change in wallet hooks

## 1.3.0

### Minor Changes

- b65034e: upgrade aptos packages and fix breaking changes

## 1.2.0

### Minor Changes

- 6c51b22: upgrade @aptos-labs/ts-sdk to 1.2.0 which includes some breaking change

## 1.1.0

### Minor Changes

- 3095b48: Upgrade aptos libraries which includes some breaking change

## 1.0.2

### Patch Changes

- da4253c: re-throw exception from useSubmitTransaction

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
