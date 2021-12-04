import {
    REVIEW_LIST_FAIL,
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
} from '../constants/reviewConstants';

export const review = (
    state = { totalCount: 0, reviews: [], isLoading: false, error: '' },
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
        default:
            return state;
    }
};
