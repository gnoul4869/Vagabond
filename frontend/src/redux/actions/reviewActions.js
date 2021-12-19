import axios from 'axios';
import {
    REVIEW_CREATE_FAIL,
    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,
    REVIEW_LIST_FAIL,
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_UPDATE_FAIL,
    REVIEW_UPDATE_REQUEST,
    REVIEW_UPDATE_SUCCESS,
} from '../constants/reviewConstants';

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const listReviews = (productID, rating, page, limit) => async (dispatch) => {
    dispatch({ type: REVIEW_LIST_REQUEST });

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_MAIN_SERVER}/api/v1/reviews`, {
            params: { productID, rating, page, limit },
        });
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

export const updateReview = (reviewID, action) => async (dispatch, getState) => {
    dispatch({ type: REVIEW_UPDATE_REQUEST });

    try {
        const { token } = getState().auth.userInfo;
        const { data } = await axios.patch(
            `${process.env.REACT_APP_MAIN_SERVER}/api/v1/reviews`,
            { reviewID, action },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const { review } = data;
        dispatch({ type: REVIEW_UPDATE_SUCCESS, payload: review });
    } catch (error) {
        dispatch({
            type: REVIEW_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};

export const createReview = (productID, rating, content) => async (dispatch, getState) => {
    dispatch({ type: REVIEW_CREATE_REQUEST });

    try {
        const { token } = getState().auth.userInfo;
        const { data } = await axios.post(
            `${process.env.REACT_APP_MAIN_SERVER}/api/v1/reviews`,
            { productID, rating, content },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const { review, product } = data;
        dispatch({ type: REVIEW_CREATE_SUCCESS, payload: { review, product } });
    } catch (error) {
        dispatch({
            type: REVIEW_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};
