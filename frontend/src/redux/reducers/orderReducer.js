import {
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_REFRESH,
    ORDER_LIST_SUCCESS,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
} from '../constants/orderConstants';

export const order = (
    state = { total: 0, orderList: [], isLoading: false, isDone: false, error: '' },
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
                ...state,
                total: action.payload.total,
                orderList: state.orderList.concat(action.payload.orders),
                isDone: true,
                isLoading: false,
            };
        case ORDER_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
                isDone: true,
                isLoading: false,
            };
        case ORDER_LIST_REFRESH:
            return {
                ...state,
                orderList: [],
                isDone: false,
                isLoading: false,
            };
        case ORDER_UPDATE_REQUEST:
            return {
                ...state,
                isDone: false,
                isLoading: true,
            };
        case ORDER_UPDATE_SUCCESS:
            const orderList = state.orderList.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
            return {
                ...state,
                orderList: orderList,
                isDone: true,
                isLoading: false,
            };
        case ORDER_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload,
                isDone: true,
                isLoading: false,
            };
        default:
            return state;
    }
};
