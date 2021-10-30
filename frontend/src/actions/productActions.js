import { GET_ALL_PRODUCTS_REQUEST } from '../constants/productConstants';

const getAllProducts = () => async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
    try {
    } catch (error) {}
};
