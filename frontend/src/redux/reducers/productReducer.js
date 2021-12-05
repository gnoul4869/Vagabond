import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

export const productList = (
    state = { isLoading: false, total: 0, products: [], error: '' },
    action
) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, products: [], error: '', isLoading: true };
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                total: action.payload.total,
                products: action.payload.products,
                isLoading: false,
            };
        case PRODUCT_LIST_FAIL:
            return { ...state, total: 0, products: [], error: action.payload, isLoading: false };
        default:
            return state;
    }
};

export const productDetails = (state = { isLoading: false, product: null, error: '' }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, product: null, error: '', isLoading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { isLoading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { ...state, product: null, error: action.payload, isLoading: false };
        default:
            return state;
    }
};
