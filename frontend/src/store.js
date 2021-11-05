import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productList, productDetails } from './reducers/productReducer';
import { cart } from './reducers/cartReducer';

const initialState = {
    productList: {
        loading: false,
        products: null,
    },
    productDetails: {
        loading: false,
        product: null,
    },
    cart: {
        loading: false,
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },
};

const reducer = combineReducers({
    productList,
    productDetails,
    cart,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
