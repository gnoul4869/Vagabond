import axios from 'axios';
import {
    AUTH_STATE_REFRESH,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from '../constants/authConstants';

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await axios.post('/api/v1/auth/login', { email, password });
        const userInfo = {
            name: data.userInfo.name,
            image: data.userInfo.image,
            role: data.userInfo.role,
            token: data.userInfo.token,
        };
        dispatch({ type: LOGIN_SUCCESS, payload: userInfo });
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa',
        });
    }
};

export const register =
    (email, password, name, address, phoneNumber, gender, birthDate) => async (dispatch) => {
        dispatch({ type: REGISTER_REQUEST });
        try {
            const { data } = await axios.post('/api/v1/auth/register', {
                email,
                password,
                name,
                address,
                phoneNumber,
                gender,
                birthDate,
            });
            const userInfo = {
                name: data.userInfo.name,
                image: data.userInfo.image,
                role: data.userInfo.role,
                token: data.userInfo.token,
            };
            dispatch({ type: REGISTER_SUCCESS, payload: userInfo });
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa',
            });
        }
    };

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: LOGOUT });
};

export const refreshAuth = (target) => (dispatch) => {
    dispatch({ type: AUTH_STATE_REFRESH, payload: target });
};
