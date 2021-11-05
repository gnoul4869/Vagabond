import {
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_REMOVE_ITEM,
} from '../constants/cartConstants';

export const cart = (state = { loading: false, cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM_REQUEST:
            return { ...state, loading: true };
        case CART_ADD_ITEM_SUCCESS:
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.id === item.id);
            if (existItem) {
                return {
                    ...state,
                    loading: false,
                    cartItems: state.cartItems.map((x) => (x.id === item.id ? item : x)),
                };
            } else {
                return { ...state, loading: false, cartItems: [...state.cartItems, item] };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.id !== action.payload.id),
            };
        default:
            return state;
    }
};
