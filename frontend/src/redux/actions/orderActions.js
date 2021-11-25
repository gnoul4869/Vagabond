import axios from 'axios';
import {
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
} from '../constants/orderConstants';

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const listOrders = (status, page, limit) => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });

    try {
        const { token } = getState().auth.userInfo;
        const { data } = await axios.get('/api/v1/orders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                status,
                page,
                limit,
            },
        });
        const { total, orders } = data;
        dispatch({ type: ORDER_LIST_SUCCESS, payload: { total, orders } });
    } catch (error) {
        console.log(error);
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};
