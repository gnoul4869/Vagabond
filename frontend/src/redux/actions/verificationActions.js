import axios from 'axios';
import {
    VERIFICATION_SEND_FAIL,
    VERIFICATION_SEND_REQUEST,
    VERIFICATION_SEND_SUCCESS,
    VERIFICATION_STATE_REFRESH,
} from '../constants/verificationConstants';

export const verifyEmail = (name, email) => async (dispatch) => {
    dispatch({ type: VERIFICATION_SEND_REQUEST });
    try {
        await axios.post('/api/v1/verification/verifyemail', { name, email });
        dispatch({ type: VERIFICATION_SEND_SUCCESS });
    } catch (error) {
        dispatch({
            type: VERIFICATION_SEND_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const refreshVerification = () => async (dispatch) => {
    dispatch({ type: VERIFICATION_STATE_REFRESH });
};
