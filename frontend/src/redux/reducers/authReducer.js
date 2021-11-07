import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from '../constants/authConstants';

export const auth = (state = { isLoading: false, userInfo: null }, action) => {
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
        case LOGOUT:
            return {};
        default:
            return state;
    }
};
