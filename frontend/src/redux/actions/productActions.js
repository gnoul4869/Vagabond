import axios from 'axios';
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const listProducts = (search, sort, category, page, limit) => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
        const { data } = await axios.get('/api/v1/products', {
            params: { search, sort, category, page, limit },
        });
        const { total, products } = data;
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: { total, products } });
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

export const detailProduct = (productID) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    try {
        const { data } = await axios.get(`/api/v1/products/${productID}`);
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
