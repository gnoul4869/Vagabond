import axios from 'axios';
import {
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
} from '../constants/orderConstants';

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const listOrders = (status) => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });

    try {
        const { token } = getState().auth.userInfo;
        const { data } = await axios.get('/api/v1/orders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                status,
            },
        });
        const { orders } = data;

        dispatch({ type: ORDER_LIST_SUCCESS, payload: orders });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};
