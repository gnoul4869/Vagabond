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

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await axios.post('/api/v1/auth/login', { email, password });
        const userInfo = {
            id: data.userInfo.id,
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
                    : errorMessage,
        });
    }
};

export const register =
    (
        email,
        password,
        name,
        phoneNumber,
        gender,
        birthDate,
        provinceID,
        provinceName,
        districtID,
        districtName,
        wardID,
        wardName,
        addressDetails
    ) =>
    async (dispatch) => {
        dispatch({ type: REGISTER_REQUEST });
        try {
            const { data } = await axios.post('/api/v1/auth/register', {
                email,
                password,
                name,
                phoneNumber,
                gender,
                birthDate,
                provinceID,
                provinceName,
                districtID,
                districtName,
                wardID,
                wardName,
                addressDetails,
            });
            const userInfo = {
                id: data.userInfo.id,
                image: data.userInfo.image,
                name: data.userInfo.name,
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
                        : errorMessage,
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
