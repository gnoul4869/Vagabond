import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { auth } from './reducers/authReducer';
import { user } from './reducers/userReducer';
import { cart } from './reducers/cartReducer';
import { verification } from './reducers/verificationReducer';
import { productList, productDetails } from './reducers/productReducer';
import { review } from './reducers/reviewReducer';
import { order } from './reducers/orderReducer';
import { interest } from './reducers/interestReducer';
import { chatbot } from './reducers/chatbotReducer';

const initialState = {
    auth: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
        isLoading: false,
        error: '',
    },
    user: {
        isLoading: false,
        isUpdating: false,
        isDone: false,
        userDetails: null,
        error: '',
    },
    verification: {
        isLoading: false,
        isEmailSent: false,
        isVerified: false,
        error: '',
        status: '',
    },
    cart: {
        loadingItems: [],
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        isUpdated: false,
        isDone: false,
        isLoading: false,
        error: '',
        modalError: '',
    },
    productList: {
        total: 0,
        products: [],
        isLoading: false,
        error: '',
    },
    productDetails: {
        product: null,
        isLoading: false,
        error: '',
    },
    review: {
        total: 0,
        reviews: [],
        newRating: 0,
        newNumReviews: 0,
        isLoading: false,
        isUpdating: false,
        error: '',
    },
    order: {
        total: 0,
        orderList: [],
        isDone: false,
        isLoading: false,
        error: '',
    },
    interest: {
        userInterests: localStorage.getItem('userInterests')
            ? JSON.parse(localStorage.getItem('userInterests'))
            : [],
        error: '',
    },
    chatbot: {
        messages: [],
        isLoading: false,
    },
};

const reducer = combineReducers({
    auth,
    user,
    verification,
    cart,
    productList,
    productDetails,
    review,
    order,
    interest,
    chatbot,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
