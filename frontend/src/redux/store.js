import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { auth } from './reducers/authReducer';
import { user } from './reducers/userReducer';
import { cart } from './reducers/cartReducer';
import { verification } from './reducers/verificationReducer';
import { productList, productDetails } from './reducers/productReducer';
import { order } from './reducers/orderReducer';

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
        isLoading: false,
        products: null,
        error: '',
    },
    productDetails: {
        isLoading: false,
        product: null,
        error: '',
    },
    order: {
        totalCount: 0,
        orderList: [],
        isLoading: false,
        error: '',
    },
};

const reducer = combineReducers({
    auth,
    user,
    verification,
    cart,
    productList,
    productDetails,
    order,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
