import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store.js';
// import reportWebVitals from './reportWebVitals';

import './css/index.css';
import './css/error.css';
import './css/numberInput.css';

import './css/breadCrumbs.css';

import './css/navbar/navBar.css';
import './css/navbar/navBarDropdown.css';
import './css/navbar/navBarCartBadge.css';

import './css/product/product.css';
import './css/product/productList.css';
import './css/product/productDetails.css';
import './css/product/productCarousel.css';
import './css/product/productDescription.css';

import './css/cart.css';

import './css/loading/productDetailsLoading.css';

import './css/modals/addToCartModal.css';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// reportWebVitals(console.log);
