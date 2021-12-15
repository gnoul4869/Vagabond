import { INTEREST_ADD_FAIL, INTEREST_ADD_SUCCESS } from '../constants/interestConstants';

export const interest = (state = { userInterests: [], error: '' }, action) => {
    switch (action.type) {
        case INTEREST_ADD_SUCCESS:
            return {
                ...state,
                userInterests: action.payload,
                error: '',
            };
        case INTEREST_ADD_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
