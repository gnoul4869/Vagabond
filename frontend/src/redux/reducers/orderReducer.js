import {
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
} from '../constants/orderConstants';

export const order = (
    state = { totalCount: 0, orderList: [], isLoading: false, isDone: false, error: '' },
    action
) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                ...state,
                error: '',
                isDone: false,
                isLoading: true,
            };
        case ORDER_LIST_SUCCESS:
            return {
                totalCount: action.payload.total,
                orderList: state.orderList.concat(action.payload.orders),
                isDone: true,
                isLoading: false,
            };
        case ORDER_LIST_FAIL:
            return {
                error: action.payload,
                isDone: true,
                isLoading: false,
            };
        default:
            return state;
    }
};
