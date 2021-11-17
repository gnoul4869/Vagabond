import {
    USER_GET_DETAILS_FAIL,
    USER_GET_DETAILS_REQUEST,
    USER_GET_DETAILS_SUCCESS,
    USER_STATE_REFRESH,
    USER_UPDATE_DETAILS_FAIL,
    USER_UPDATE_DETAILS_REQUEST,
    USER_UPDATE_DETAILS_SUCCESS,
} from '../constants/userConstants';

export const user = (
    state = { isLoading: false, isUpdating: false, isDone: false, userDetails: null, error: '' },
    action
) => {
    switch (action.type) {
        case USER_GET_DETAILS_REQUEST:
            return {
                isLoading: true,
                error: '',
            };
        case USER_GET_DETAILS_SUCCESS:
            return {
                isLoading: false,
                userDetails: action.payload,
            };
        case USER_GET_DETAILS_FAIL:
            return {
                isLoading: false,
                error: action.payload,
            };
        case USER_UPDATE_DETAILS_REQUEST:
            return {
                ...state,
                isUpdating: true,
                isDone: false,
                error: '',
            };
        case USER_UPDATE_DETAILS_SUCCESS:
            return { ...state, isUpdating: false, isDone: true, userDetails: action.payload };
        case USER_UPDATE_DETAILS_FAIL:
            return { ...state, isUpdating: false, error: action.payload };
        case USER_STATE_REFRESH:
            return {
                ...state,
                isDone: false,
            };
        default:
            return state;
    }
};
