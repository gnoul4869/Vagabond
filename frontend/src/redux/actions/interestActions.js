import { INTEREST_ADD_REQUEST } from '../constants/interestConstants';

export const addInterest = (productID) => async (dispatch) => {
    dispatch({ type: INTEREST_ADD_REQUEST });

    try {
    } catch (error) {}
};
