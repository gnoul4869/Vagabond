import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cart = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.id === item.id);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => (x.id === item.id ? item : x)),
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
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
