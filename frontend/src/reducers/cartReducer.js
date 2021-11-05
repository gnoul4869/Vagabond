import {
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_REMOVE_ITEM,
} from '../constants/cartConstants';

export const cart = (state = { loadingItems: [], cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM_REQUEST:
            return { ...state, loadingItems: [...state.loadingItems, action.payload] };
        case CART_ADD_ITEM_SUCCESS:
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.id === item.id);
            if (existItem) {
                return {
                    ...state,
                    loadingItems: state.loadingItems.filter((x) => x !== action.payload.id),
                    cartItems: state.cartItems.map((x) => (x.id === item.id ? item : x)),
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                loadingItems: state.loadingItems.filter((x) => x !== action.payload),
                cartItems: state.cartItems.filter((x) => x.id !== action.payload),
            };
        default:
            return state;
    }
};
