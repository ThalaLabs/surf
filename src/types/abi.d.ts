interface ABIRoot {
    address:           string;
    name:              string;
    friends:           string[];
    exposed_functions: ABIFunction[];
    structs:           ABIStruct[];
}

interface ABIFunction {
    name:                string;
    visibility:          "friend" | "public";
    is_entry:            boolean;
    is_view:             boolean;
    generic_type_params: ABIFunctionGenericTypeParam[];
    params:              string[];
    return:              string[];
}

interface ABIFunctionGenericTypeParam {
    constraints: any[];
}

interface ABIStruct {
    name:                string;
    is_native:           boolean;
    abilities:           string[];
    generic_type_params: ABIFunctionGenericTypeParam[];
    fields:              ABIStructField[];
}

interface ABIStructField {
    name: string;
    type: string;
}
