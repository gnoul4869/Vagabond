import {
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_REMOVE_ITEM,
    CART_STATE_REFRESH,
} from '../constants/cartConstants';

export const cart = (state = { loadingItems: [], cartItems: [], isDone: false }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM_REQUEST:
            return {
                ...state,
                loadingItems: [...state.loadingItems, action.payload],
                isDone: false,
            };
        case CART_ADD_ITEM_SUCCESS:
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.id === item.id);
            let newItems;
            if (existItem) {
                newItems = state.cartItems.map((x) => (x.id === item.id ? item : x));
            } else {
                newItems = [...state.cartItems, item];
            }

            return {
                ...state,
                loadingItems: state.loadingItems.filter((x) => x !== item.id),
                cartItems: newItems,
                isDone: true,
            };
        case CART_REMOVE_ITEM:
            return {
                ...state,
                loadingItems: state.loadingItems.filter((x) => x !== action.payload),
                cartItems: state.cartItems.filter((x) => x.id !== action.payload),
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
