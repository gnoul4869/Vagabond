import axios from 'axios';
import {
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_REMOVE_ITEM,
} from '../constants/cartConstants';

export const addToCart = (productID, qty) => async (dispatch, getState) => {
    dispatch({ type: CART_ADD_ITEM_REQUEST, payload: productID });

    const loadingItems = getState().cart.loadingItems;
    if (loadingItems.includes(productID)) {
        const { data } = await axios.get(`/api/v1/products/${productID}`);
        const { product } = data;

        dispatch({
            type: CART_ADD_ITEM_SUCCESS,
            payload: {
                id: product._id,
                name: product.name,
                images: product.images,
                price: product.price,
                countInStock: product.countInStock,
                qty,
            },
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }
};

export const removeFromCart = (productID) => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productID });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};