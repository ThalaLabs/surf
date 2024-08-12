module message_board_addr::message_board {
    use std::option::Option;
    use std::string::String;

    use aptos_framework::object::{Self, Object, ObjectCore, ExtendRef};

    const BOARD_OBJECT_SEED: vector<u8> = b"message_board";

    struct BoardObjectController has key {
        extend_ref: ExtendRef,
    }

    struct Message has key, drop {
        boolean_content: bool,
        string_content: String,
        number_content: u64,
        address_content: address,
        object_content: Object<ObjectCore>,
        vector_content: vector<String>,
        optional_boolean_content: Option<bool>,
        optional_string_content: Option<String>,
        optional_number_content: Option<u64>,
        optional_address_content: Option<address>,
        optional_object_content: Option<Object<ObjectCore>>,
        optional_vector_content: Option<vector<String>>,
    }

    // This function is only called once when the module is published for the first time.
    // init_module is optional, you can also have an entry function as the initializer.
    fun init_module(sender: &signer) {
        let constructor_ref = &object::create_named_object(sender, BOARD_OBJECT_SEED);
        move_to(&object::generate_signer(constructor_ref), BoardObjectController {
            extend_ref: object::generate_extend_ref(constructor_ref),
        });
    }

    // ======================== Write functions ========================

    public entry fun post_message(
        _sender: &signer,
        boolean_content: bool,
        string_content: String,
        number_content: u64,
        address_content: address,
        object_content: Object<ObjectCore>,
        vector_content: vector<String>,
        optional_boolean_content: Option<bool>,
        optional_string_content: Option<String>,
        optional_number_content: Option<u64>,
        optional_address_content: Option<address>,
        optional_object_content: Option<Object<ObjectCore>>,
        optional_vector_content: Option<vector<String>>,
    ) acquires Message, BoardObjectController {
        // Drop the old message if exists
        if (exists<Message>(get_board_obj_address())) {
            move_from<Message>(get_board_obj_address());
        };

        move_to(&get_board_obj_signer(), Message {
            boolean_content,
            string_content,
            number_content,
            address_content,
            object_content,
            vector_content,
            optional_boolean_content,
            optional_string_content,
            optional_number_content,
            optional_address_content,
            optional_object_content,
            optional_vector_content,
        });
    }

    // ======================== Read Functions ========================

    #[view]
    public fun exist_message(): bool {
        exists<Message>(get_board_obj_address())
    }

    #[view]
    public fun get_message_content(): (
        bool,
        String,
        u64,
        address,
        Object<ObjectCore>,
        vector<String>,
        Option<bool>,
        Option<String>,
        Option<u64>,
        Option<address>,
        Option<Object<ObjectCore>>,
        Option<vector<String>>,
    ) acquires Message {
        let message = borrow_global<Message>(get_board_obj_address());
        (
            message.boolean_content,
            message.string_content,
            message.number_content,
            message.address_content,
            message.object_content,
            message.vector_content,
            message.optional_boolean_content,
            message.optional_string_content,
            message.optional_number_content,
            message.optional_address_content,
            message.optional_object_content,
            message.optional_vector_content,
        )
    }

    // ======================== Helper functions ========================

    fun get_board_obj_address(): address {
        object::create_object_address(&@message_board_addr, BOARD_OBJECT_SEED)
    }

    fun get_board_obj_signer(): signer acquires BoardObjectController {
        object::generate_signer_for_extending(&borrow_global<BoardObjectController>(get_board_obj_address()).extend_ref)
    }

    // ======================== Unit Tests ========================


    #[test_only]
    use std::signer;
    #[test_only]
    use std::option;
    #[test_only]
    use std::string;

    #[test(sender = @message_board_addr)]
    fun test_end_to_end<>(sender: &signer) acquires BoardObjectController, Message {
        let sende_addr = signer::address_of(sender);

        init_module(sender);

        let obj_constructor_ref = &object::create_object(sende_addr);
        let obj = object::object_from_constructor_ref<ObjectCore>(obj_constructor_ref);

        post_message(
            sender,
            true,
            string::utf8(b"hello world"),
            42,
            @0x1,
            obj,
            vector[string::utf8(b"hello")],
            option::some(true),
            option::some(string::utf8(b"hello")),
            option::some(42),
            option::some(@0x1),
            option::some(obj),
            option::some(vector[string::utf8(b"hello")]),
        );

        let (
            boolean_content,
            string_content,
            number_content,
            address_content,
            object_content,
            vector_content,
            optional_boolean_content,
            optional_string_content,
            optional_number_content,
            optional_address_content,
            optional_object_content,
            optional_vector_content,
        ) = get_message_content();
        assert!(boolean_content == true, 2);
        assert!(string_content == string::utf8(b"hello world"), 3);
        assert!(number_content == 42, 4);
        assert!(address_content == @0x1, 5);
        assert!(object_content == obj, 6);
        assert!(vector_content == vector[string::utf8(b"hello")], 7);
        assert!(optional_boolean_content == option::some(true), 8);
        assert!(optional_string_content == option::some(string::utf8(b"hello")), 9);
        assert!(optional_number_content == option::some(42), 10);
        assert!(optional_address_content == option::some(@0x1), 11);
        assert!(optional_object_content == option::some(obj), 12);
        assert!(optional_vector_content == option::some(vector[string::utf8(b"hello")]), 13);

        // Post again, should overwrite the old message
        post_message(
            sender,
            true,
            string::utf8(b"hello aptos"),
            42,
            @0x1,
            obj,
            vector[string::utf8(b"yoho")],
            option::some(false),
            option::some(string::utf8(b"hello")),
            option::some(40),
            option::some(@0x2),
            option::some(obj),
            option::some(vector[string::utf8(b"hello")]),
        );

        let (
            boolean_content,
            string_content,
            number_content,
            address_content,
            object_content,
            vector_content,
            optional_boolean_content,
            optional_string_content,
            optional_number_content,
            optional_address_content,
            optional_object_content,
            optional_vector_content,
        ) = get_message_content();
        assert!(boolean_content == true, 15);
        assert!(string_content == string::utf8(b"hello aptos"), 16);
        assert!(number_content == 42, 17);
        assert!(address_content == @0x1, 18);
        assert!(object_content == obj, 19);
        assert!(vector_content == vector[string::utf8(b"yoho")], 20);
        assert!(optional_boolean_content == option::some(false), 21);
        assert!(optional_string_content == option::some(string::utf8(b"hello")), 22);
        assert!(optional_number_content == option::some(40), 23);
        assert!(optional_address_content == option::some(@0x2), 24);
        assert!(optional_object_content == option::some(obj), 25);
        assert!(optional_vector_content == option::some(vector[string::utf8(b"hello")]), 26);
    }
}
