import axios from 'axios';
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

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
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : 'Đã có lỗi xảy ra, hãy thử lại sau',
        });
    }
};

// export const detailsProduct = () => async (dispatch) => {
//     dispatch({type: loading:})
// }
