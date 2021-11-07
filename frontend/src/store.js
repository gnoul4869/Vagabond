import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productList, productDetails } from './reducers/productReducer';
import { cart } from './reducers/cartReducer';
import { auth } from './reducers/authReducer';

const initialState = {
    productList: {
        isLoading: false,
        products: null,
    },
    productDetails: {
        isLoading: false,
        product: null,
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
    },
};

const reducer = combineReducers({
    productList,
    productDetails,
    cart,
    auth,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
