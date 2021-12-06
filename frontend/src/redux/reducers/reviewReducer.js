import {
    REVIEW_CREATE_FAIL,
    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,
    REVIEW_LIST_FAIL,
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_UPDATE_FAIL,
    REVIEW_UPDATE_REQUEST,
    REVIEW_UPDATE_SUCCESS,
} from '../constants/reviewConstants';

export const review = (
    state = {
        total: 0,
        reviews: [],
        totalRating: 0,
        totalNumReviews: 0,
        isLoading: false,
        isUpdating: false,
        error: '',
    },
    action
) => {
    switch (action.type) {
        case REVIEW_LIST_REQUEST:
            return {
                ...state,
                total: 0,
                reviews: [],
                totalRating: 0,
                totalNumReviews: 0,
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
            return { ...state, total: 0, reviews: [], error: action.payload, isLoading: false };
        case REVIEW_UPDATE_REQUEST:
            return {
                ...state,
                error: '',
                isUpdating: true,
            };
        case REVIEW_UPDATE_SUCCESS:
            const updatedReviews = state.reviews.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
            return {
                ...state,
                reviews: updatedReviews,
                isUpdating: false,
            };
        case REVIEW_UPDATE_FAIL:
            return { ...state, error: action.payload, isUpdating: false };
        case REVIEW_CREATE_REQUEST:
            return {
                ...state,
                error: '',
                isUpdating: true,
            };
        case REVIEW_CREATE_SUCCESS:
            const newReviews = [action.payload.review, ...state.reviews];
            return {
                ...state,
                reviews: newReviews,
                totalRating: action.payload.product.rating,
                totalNumReviews: action.payload.product.totalNumReviews,
                isUpdating: false,
            };
        case REVIEW_CREATE_FAIL:
            return { ...state, error: action.payload, isUpdating: false };
        default:
            return state;
    }
};
