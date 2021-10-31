import axios from 'axios';
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

const errorMessage = 'Đã có lỗi xảy ra, hãy thử lại sau';

export const listProducts = () => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
        const { data } = await axios.get('/api/v1/products');
        const { products } = data;
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};

export const detailsProduct = (id) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    try {
        const { data } = await axios.get(`/api/v1/products/${id}`);
        const { product } = data;
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};
