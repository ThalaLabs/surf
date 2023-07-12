module surf_addr::test_option {
    use std::option::{Option, get_with_default, is_some};

    #[view]
    public fun test_option_view(t: Option<u64>): u64 {
        get_with_default(&t, 0)
    }

    public entry fun test_option_entry(t: Option<u64>) {
        assert!(is_some<u64>(&t), 1);
        get_with_default(&t, 0);
    }
}
 