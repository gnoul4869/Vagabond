import {
    CART_ADD_ITEM_FAIL,
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_REMOVE_ITEM,
    CART_STATE_REFRESH,
    CART_UPDATE_FAIL,
    CART_UPDATE_REQUEST,
    CART_UPDATE_SUCCESS,
} from '../constants/cartConstants';

export const cart = (
    state = { loadingItems: [], cartItems: [], isDone: false, isLoading: false, error: '' },
    action
) => {
    switch (action.type) {
        //* CART_ADD_ITEM
        case CART_ADD_ITEM_REQUEST:
            return {
                ...state,
                loadingItems: [...state.loadingItems, action.payload],
                isDone: false,
            };
        case CART_ADD_ITEM_SUCCESS:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);
            const newItems = existItem
                ? state.cartItems.map((x) => (x._id === item._id ? item : x))
                : [...state.cartItems, item];

            return {
                ...state,
                loadingItems: state.loadingItems.filter((x) => x !== item._id),
                cartItems: newItems,
                isDone: true,
            };
        case CART_ADD_ITEM_FAIL:
            return {
                ...state,
                loadingItems: state.loadingItems.filter((x) => x !== item._id),
                isDone: true,
                error: action.payload,
            };
        //* CART_UPDATE
        case CART_UPDATE_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case CART_UPDATE_SUCCESS:
            let updatedItems = [];
            action.payload.forEach((x) => {
                const item = state.cartItems.find((y) => y._id === x._id);
                x = { ...x, qty: item.qty };
                updatedItems.push(x);
            });
            return {
                ...state,
                isLoading: false,
                cartItems: updatedItems,
            };
        case CART_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        //*
        case CART_REMOVE_ITEM:
            return {
                ...state,
                loadingItems: state.loadingItems.filter((x) => x !== action.payload),
                cartItems: state.cartItems.filter((x) => x._id !== action.payload),
            };
        case CART_STATE_REFRESH:
            return {
                ...state,
                isDone: false,
            };
        default:
            return state;
    }
};
