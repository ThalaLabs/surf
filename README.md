# Move-TS

Generate TypeScript bindings & React Hooks for Move smart contracts based on ABI.

## Highlights

- Small bundle size: You won't pay for what you are not using. Even if tons of entry functions has been generated, if you are not using in your our code, it would be striped out by tree shaking.
- Low runtime cost: We put as much as verification at build time to reduce the runtime cost.

## Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `prettier` - reformat files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests
