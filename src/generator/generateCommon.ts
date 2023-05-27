export function generateCommon(): string {
    return `
    type ViewRequest<T0 extends MoveViewFunction,
        T1 extends AllViewFunctions[T0]['types'],
        T2 extends AllViewFunctions[T0]['args'],
    > = {
        function: T0;
        /**
         * Type arguments of the function
         */
        type_arguments: T1;
        /**
         * Arguments of the function
         */
        arguments: T2;
    }

    type SubmitRequest<
        T0 extends MoveEntryFunction,
        T1 extends AllEntryFunctions[T0]["types"],
        T2 extends AllEntryFunctions[T0]['args'],
    > = {
        function: T0;
        /**
         * Type arguments of the function
         */
        type_arguments: T1;
        /**
         * Arguments of the function
         */
        arguments: T2;
    };
    `;
}
