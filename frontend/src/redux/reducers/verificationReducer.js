import {
    VERIFICATION_CONFIRM_FAIL,
    VERIFICATION_CONFIRM_REQUEST,
    VERIFICATION_CONFIRM_SUCCESS,
    VERIFICATION_SEND_FAIL,
    VERIFICATION_SEND_REQUEST,
    VERIFICATION_SEND_SUCCESS,
    VERIFICATION_STATE_REFRESH,
} from '../constants/verificationConstants';

export const verification = (
    state = { isLoading: false, isEmailSent: false, isVerified: false, error: '', status: '' },
    action
) => {
    switch (action.type) {
        case VERIFICATION_SEND_REQUEST:
            return {
                isLoading: true,
            };
        case VERIFICATION_SEND_SUCCESS:
            return {
                isLoading: false,
                isEmailSent: true,
                status: action.payload.status,
            };
        case VERIFICATION_SEND_FAIL:
            return {
                isLoading: false,
                error: action.payload,
            };
        case VERIFICATION_CONFIRM_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case VERIFICATION_CONFIRM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isVerified: true,
            };
        case VERIFICATION_CONFIRM_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case VERIFICATION_STATE_REFRESH:
            if (action.payload === 'REFRESH_ERROR') {
                return {
                    ...state,
                    error: '',
                };
            }
            return {
                isLoading: false,
                isEmailSent: false,
                isVerified: false,
                error: '',
            };
        default:
            return state;
    }
};
