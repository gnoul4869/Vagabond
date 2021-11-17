import axios from 'axios';
import { AUTH_STATE_UPDATE } from '../constants/authConstants';
import {
    USER_GET_DETAILS_FAIL,
    USER_GET_DETAILS_REQUEST,
    USER_GET_DETAILS_SUCCESS,
    USER_STATE_REFRESH,
    USER_UPDATE_DETAILS_FAIL,
    USER_UPDATE_DETAILS_REQUEST,
    USER_UPDATE_DETAILS_SUCCESS,
} from '../constants/userConstants';

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const getUserDetails = () => async (dispatch, getState) => {
    dispatch({ type: USER_GET_DETAILS_REQUEST });
    try {
        const { token } = getState().auth.userInfo;
        const { data } = await axios.get('/api/v1/user', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const { userDetails } = data;
        dispatch({ type: USER_GET_DETAILS_SUCCESS, payload: userDetails });
    } catch (error) {
        dispatch({
            type: USER_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};

export const updateUserDetails =
    (name, address, phoneNumber, gender, birthDate) => async (dispatch, getState) => {
        dispatch({ type: USER_UPDATE_DETAILS_REQUEST });
        try {
            const { userInfo } = getState().auth;
            const { data } = await axios.patch(
                '/api/v1/user',
                { name, address, phoneNumber, gender, birthDate },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            const { userDetails } = data;
            dispatch({ type: USER_UPDATE_DETAILS_SUCCESS, payload: userDetails });
            dispatch({
                type: AUTH_STATE_UPDATE,
                payload: { name: userDetails.name, image: userDetails.image },
            });
            localStorage.setItem(
                'userInfo',
                JSON.stringify({ ...userInfo, name: userDetails.name, image: userDetails.image })
            );
            dispatch({ type: USER_STATE_REFRESH });
        } catch (error) {
            dispatch({
                type: USER_UPDATE_DETAILS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : errorMessage,
            });
        }
    };
