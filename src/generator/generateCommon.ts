export function generateCommon(): string {
    return `
    import {
        AllViewFunctions,
        AllEntryFunctions,
        MoveEntryFunction,
        MoveViewFunction,
      } from "./moduleTable";
      
      type ViewFuncTypeArgs<T0 extends MoveViewFunction> = AllViewFunctions[T0]["types"];
      type ViewFuncArgs<T0 extends MoveViewFunction> = AllViewFunctions[T0]["args"];
      type EntryFuncTypeArgs<T0 extends MoveEntryFunction> = AllEntryFunctions[T0]["types"];
      type EntryFuncArgs<T0 extends MoveEntryFunction> = AllEntryFunctions[T0]["args"];
      
      type ViewRequest<TFunc extends MoveViewFunction> = {
        function: TFunc;
        /**
         * Type arguments of the function
         */
        type_arguments: ViewFuncTypeArgs<TFunc>;
        /**
         * Arguments of the function
         */
        arguments: ViewFuncArgs<TFunc>;
      };
      
      type SubmitRequest<TFunc extends MoveEntryFunction> = {
        function: TFunc;
        /**
         * Type arguments of the function
         */
        type_arguments: EntryFuncTypeArgs<TFunc>;
        /**
         * Arguments of the function
         */
        arguments: EntryFuncArgs<TFunc>;
      };      
    `;
}
