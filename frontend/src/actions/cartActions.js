import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

const errorMessage = 'Đã có lỗi xảy ra, hãy thử lại sau';

export const addToCart = (productID, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/products/${productID}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            id: data._id,
            name: data.name,
            image: data.name,
            price: data.price,
            countInStock: data.countInStock,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productID) => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productID });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
