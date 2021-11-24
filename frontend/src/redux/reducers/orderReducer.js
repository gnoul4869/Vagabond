import {
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
} from '../constants/orderConstants';

export const order = (state = { orderList: [], isLoading: false, error: '' }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                isLoading: true,
            };
        case ORDER_LIST_SUCCESS:
            return {
                orderList: action.payload,
                isLoading: false,
            };
        case ORDER_LIST_FAIL:
            return {
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};
