import axios from 'axios';
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
} from '../constants/userConstants';

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const detailUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST });
    try {
        const { token } = getState().auth.userInfo;
        const { data } = await axios.get('/api/v1/user', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const { userDetails } = data;
        dispatch({ type: USER_DETAILS_SUCCESS, payload: userDetails });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};
