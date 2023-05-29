import { generateCommon } from '../generateCommon.js';

describe('generate function', () => {
  // Act before assertions
  beforeAll(async () => {});

  // Teardown (cleanup) after assertions
  afterAll(() => {});

  it('generate function basic', () => {
    const result = generateCommon();
    expect(result).toMatchInlineSnapshot(`
      "
          import { AllViewFunctions, AllEntryFunctions, MoveEntryFunction, MoveViewFunction } from "./moduleTable";

          type ViewRequest<T0 extends MoveViewFunction> = {
              function: T0;
              /**
               * Type arguments of the function
               */
              type_arguments: AllViewFunctions[T0]['types'];
              /**
               * Arguments of the function
               */
              arguments: AllViewFunctions[T0]['args'];
          }

          type SubmitRequest<T0 extends MoveEntryFunction> = {
              function: T0;
              /**
               * Type arguments of the function
               */
              type_arguments: AllEntryFunctions[T0]["types"];
              /**
               * Arguments of the function
               */
              arguments: AllEntryFunctions[T0]['args'];
          };
          "
    `);
  });
});
