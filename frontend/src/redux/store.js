import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productList, productDetails } from './reducers/productReducer';
import { cart } from './reducers/cartReducer';
import { auth } from './reducers/authReducer';
import { verification } from './reducers/verificationReducer';

const initialState = {
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
    cart: {
        loadingItems: [],
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        isDone: false,
    },
    auth: {
        isLoading: false,
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
        error: '',
    },
    verification: {
        isLoading: false,
        isEmailSent: false,
        isVerified: false,
        error: '',
        status: '',
    },
};

const reducer = combineReducers({
    productList,
    productDetails,
    cart,
    auth,
    verification,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
