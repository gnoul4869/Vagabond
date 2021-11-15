import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
} from '../constants/userConstants';

export const user = (state = { isLoading: false, userDetails: {}, error: '' }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                isLoading: true,
            };
        case USER_DETAILS_SUCCESS:
            return {
                isLoading: false,
                userDetails: action.payload,
            };
        case USER_DETAILS_FAIL:
            return {
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
