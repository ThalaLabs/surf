module surf_addr::test {
    use std::vector;

    struct RunFunctionStruct has key {
        sum: u8
    }


    #[view]
    public fun test_view_function_bool(v: vector<bool>): u32 {
        let sum: u32 = 0;
        while (!vector::is_empty(&v)) {
            let r = vector::pop_back(&mut v);
            if(r) {
                sum = sum + 1;
            }
        };
        sum
    }

    #[view]
    public fun test_view_function_u8(v: vector<u8>): u8 {
        let sum: u8 = 0;
        foreach<u8>(&v, |e| sum = sum + *e);
        sum
    }

    #[view]
    public fun test_view_function_u16(v: vector<u16>): u16 {
        let sum: u16 = 0;
        foreach<u16>(&v, |e| sum = sum + *e);
        sum
    }

    #[view]
    public fun test_view_function_u32(v: vector<u32>): u32 {
        let sum: u32 = 0;
        foreach<u32>(&v, |e| sum = sum + *e);
        sum
    }

    #[view]
    public fun test_view_function_u64(v: vector<u64>): u64 {
        let sum: u64 = 0;
        foreach<u64>(&v, |e| sum = sum + *e);
        sum
    }

    #[view]
    public fun test_view_function_u64_return_vector(v: vector<u64>): vector<u64> {
        v
    }

    #[view]
    public fun test_view_function_u128(v: vector<u128>): u128 {
        let sum: u128 = 0;
        foreach<u128>(&v, |e| sum = sum + *e);
        sum
    }

    #[view]
    public fun test_view_function_u256(v: vector<u256>): u256 {
        let sum: u256 = 0;
        foreach<u256>(&v, |e| sum = sum + *e);
        sum
    }

    public entry fun test_run_function(owner: &signer, v: vector<u8>) {
        let sum: u8 = 0;
        foreach<u8>(&v, |e| sum = sum + *e);

        let s = RunFunctionStruct {
            sum: sum,
        };

        move_to(owner, s);
    }

    public inline fun foreach<X>(v: &vector<X>, action: |&X|) {
        let i = 0;
        while (i < vector::length(v)) {
            action(vector::borrow(v, i));
            i = i + 1;
        }
    }

    #[test()]
    fun test_view_bool() {
        let v = vector::empty<bool>();
        vector::push_back<bool>(&mut v, true);
        vector::push_back<bool>(&mut v, false);
        vector::push_back<bool>(&mut v, true);
        let result = test_view_function_bool(v);

        assert!(result == 2, 1);
    }

    #[test()]
    fun test_view_u8() {
        let v = vector::empty<u8>();
        vector::push_back<u8>(&mut v, 1);
        vector::push_back<u8>(&mut v, 2);
        vector::push_back<u8>(&mut v, 3);
        let result = test_view_function_u8(v);

        assert!(result == 6, 1);
    }

    #[test]
    fun test_view_u16() {
        let v = vector::empty<u16>();
        vector::push_back<u16>(&mut v, 1);
        vector::push_back<u16>(&mut v, 2);
        vector::push_back<u16>(&mut v, 3);
        let result = test_view_function_u16(v);

        assert!(result == 6, 1);
    }

    #[test]
    fun test_view_u32() {
        let v = vector::empty<u32>();
        vector::push_back<u32>(&mut v, 1);
        vector::push_back<u32>(&mut v, 2);
        vector::push_back<u32>(&mut v, 3);
        let result = test_view_function_u32(v);

        assert!(result == 6, 1);
    }

    #[test]
    fun test_view_u64() {
        let v = vector::empty<u64>();
        vector::push_back<u64>(&mut v, 1);
        vector::push_back<u64>(&mut v, 2);
        vector::push_back<u64>(&mut v, 3);
        let result = test_view_function_u64(v);

        assert!(result == 6, 1);
    }

    #[test]
    fun test_view_u128() {
        let v = vector::empty<u128>();
        vector::push_back<u128>(&mut v, 1);
        vector::push_back<u128>(&mut v, 2);
        vector::push_back<u128>(&mut v, 3);
        let result = test_view_function_u128(v);

        assert!(result == 6, 1);
    }

    #[test]
    fun test_view_256() {
        let v = vector::empty<u256>();
        vector::push_back<u256>(&mut v, 1);
        vector::push_back<u256>(&mut v, 2);
        vector::push_back<u256>(&mut v, 3);
        let result = test_view_function_u256(v);

        assert!(result == 6, 1);
    }

    #[test(owner = @0x123)]
    fun test_run(owner: &signer) acquires RunFunctionStruct {
        let v = vector::empty<u8>();
        vector::push_back<u8>(&mut v, 1);
        vector::push_back<u8>(&mut v, 2);
        vector::push_back<u8>(&mut v, 3);
        test_run_function(owner, v);

        assert!(exists<RunFunctionStruct>(signer::address_of(owner)), 1);

        let struct_sum = &borrow_global<RunFunctionStruct>(signer::address_of(owner)).sum;
        assert!(*struct_sum == 6, 1);
    }

    #[test_only]
    use std::signer;
}