import {
    VERIFICATION_SEND_FAIL,
    VERIFICATION_SEND_REQUEST,
    VERIFICATION_SEND_SUCCESS,
    VERIFICATION_STATE_REFRESH,
} from '../constants/verificationConstants';

export const verification = (
    state = { isLoading: false, isEmailSent: false, isVerified: false, message: '' },
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
                message: action.payload,
            };
        case VERIFICATION_SEND_FAIL:
            return {
                isLoading: false,
                error: action.payload,
            };
        case VERIFICATION_STATE_REFRESH:
            return {
                isLoading: false,
                isEmailSent: false,
                isVerified: false,
                message: '',
            };
        default:
            return state;
    }
};
