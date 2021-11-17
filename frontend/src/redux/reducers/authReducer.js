import {
    AUTH_STATE_REFRESH,
    AUTH_STATE_UPDATE,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from '../constants/authConstants';

export const auth = (state = { isLoading: false, userInfo: null, error: '' }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                isLoading: true,
            };
        case LOGIN_SUCCESS:
            return {
                isLoading: false,
                userInfo: action.payload,
            };
        case LOGIN_FAIL:
            return {
                isLoading: false,
                error: action.payload,
            };
        case REGISTER_REQUEST:
            return {
                isLoading: true,
            };
        case REGISTER_SUCCESS:
            return {
                isLoading: false,
                userInfo: action.payload,
            };
        case REGISTER_FAIL:
            return {
                isLoading: false,
                error: action.payload,
            };
        case LOGOUT:
            return {};
        case AUTH_STATE_REFRESH:
            if (action.payload === 'ERROR_REFRESH') {
                return {
                    ...state,
                    error: '',
                };
            }
            return {};
        case AUTH_STATE_UPDATE:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    name: action.payload.name,
                    image: action.payload.image,
                },
            };
        default:
            return state;
    }
};
