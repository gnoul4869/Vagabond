import {
    REVIEW_LIST_FAIL,
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_UPDATE_FAIL,
    REVIEW_UPDATE_REQUEST,
    REVIEW_UPDATE_SUCCESS,
} from '../constants/reviewConstants';

export const review = (
    state = { totalCount: 0, reviews: [], isLoading: false, isUpdating: false, error: '' },
    action
) => {
    switch (action.type) {
        case REVIEW_LIST_REQUEST:
            return {
                ...state,
                error: '',
                isLoading: true,
            };
        case REVIEW_LIST_SUCCESS:
            return {
                ...state,
                total: action.payload.total,
                reviews: action.payload.reviews,
                isLoading: false,
            };
        case REVIEW_LIST_FAIL:
            return { ...state, reviews: [], error: action.payload, isLoading: false };
        case REVIEW_UPDATE_REQUEST:
            return {
                ...state,
                error: '',
                isUpdating: true,
            };
        case REVIEW_UPDATE_SUCCESS:
            const reviews = state.reviews.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
            return {
                ...state,
                reviews: reviews,
                isUpdating: false,
            };
        case REVIEW_UPDATE_FAIL:
            return { ...state, error: action.payload, isUpdating: false };
        default:
            return state;
    }
};
