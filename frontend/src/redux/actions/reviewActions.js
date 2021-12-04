import axios from 'axios';
import {
    REVIEW_LIST_FAIL,
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
} from '../constants/reviewConstants';

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const listReviews = (productID) => async (dispatch) => {
    dispatch({ type: REVIEW_LIST_REQUEST });

    try {
        const { data } = await axios.get('/api/v1/reviews', { params: { productID } });
        const { total, reviews } = data;
        dispatch({ type: REVIEW_LIST_SUCCESS, payload: { total, reviews } });
    } catch (error) {
        dispatch({
            type: REVIEW_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};
