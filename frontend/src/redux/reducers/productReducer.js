import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

export const productList = (state = { isLoading: false, products: [], error: '' }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { isLoading: true };
        case PRODUCT_LIST_SUCCESS:
            return { isLoading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export const productDetails = (state = { isLoading: false, product: {}, error: '' }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { isLoading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { isLoading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { isLoading: false, error: action.payload };
        default:
            return state;
    }
};
