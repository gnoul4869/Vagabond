import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { auth } from './reducers/authReducer';
import { user } from './reducers/userReducer';
import { cart } from './reducers/cartReducer';
import { verification } from './reducers/verificationReducer';
import { productList, productDetails } from './reducers/productReducer';

const initialState = {
    auth: {
        isLoading: false,
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
        userDetails: null,
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
        isDone: false,
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
};

const reducer = combineReducers({
    auth,
    user,
    verification,
    cart,
    productList,
    productDetails,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
