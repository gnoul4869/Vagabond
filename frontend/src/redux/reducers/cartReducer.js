import {
    CART_ADD_ITEM_FAIL,
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_REMOVE_ALL_ITEMS,
    CART_REMOVE_ITEM,
    CART_STATE_REFRESH,
    CART_UPDATE_FAIL,
    CART_UPDATE_REQUEST,
    CART_UPDATE_SUCCESS,
} from '../constants/cartConstants';

export const cart = (
    state = {
        loadingItems: [],
        cartItems: [],
        isUpdated: false,
        isDone: false,
        isLoading: false,
        error: '',
        modalError: '',
    },
    action
) => {
    switch (action.type) {
        //* CART_ADD_ITEM
        case CART_ADD_ITEM_REQUEST:
            return {
                ...state,
                error: '',
                modalError: '',
                loadingItems: [...state.loadingItems, action.payload],
                isDone: false,
                isLoading: true,
            };
        case CART_ADD_ITEM_SUCCESS:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.id === item.id);
            const newItems = existItem
                ? state.cartItems.map((x) => (x.id === item.id ? item : x))
                : [...state.cartItems, item];

            return {
                ...state,
                loadingItems: state.loadingItems.filter((x) => x !== item.id),
                cartItems: newItems,
                isDone: true,
                isLoading: false,
            };
        case CART_ADD_ITEM_FAIL:
            return {
                ...state,
                loadingItems: state.loadingItems.filter((x) => x !== action.payload.productID),
                isDone: true,
                error: action.payload.error,
                modalError: action.payload.modalError,
                isLoading: false,
            };
        //* CART_UPDATE
        case CART_UPDATE_REQUEST:
            return {
                ...state,
                error: '',
                modalError: '',
                isUpdated: false,
                isLoading: true,
            };
        case CART_UPDATE_SUCCESS:
            let updatedItems = [];
            action.payload.forEach((x) => {
                const item = state.cartItems.find((y) => y.id === x.id);
                x = { ...x, qty: item.qty };
                updatedItems.push(x);
            });
            return {
                ...state,
                cartItems: updatedItems,
                isUpdated: true,
                isLoading: false,
            };
        case CART_UPDATE_FAIL:
            return {
                ...state,
                isUpdated: false,
                isLoading: false,
                error: action.payload,
            };
        //* CART_REMOVE
        case CART_REMOVE_ITEM:
            return {
                ...state,
                loadingItems: state.loadingItems.filter((x) => x !== action.payload),
                cartItems: state.cartItems.filter((x) => x.id !== action.payload),
            };
        case CART_REMOVE_ALL_ITEMS:
            return {
                ...state,
                cartItems: [],
            };
        case CART_STATE_REFRESH:
            return {
                ...state,
                isLoading: false,
                isDone: false,
                error: '',
                modalError: '',
            };
        default:
            return state;
    }
};
