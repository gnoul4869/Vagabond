import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store.js';
// import reportWebVitals from './reportWebVitals';

import './css/index.css';
import './css/error.css';

import './css/navbar/navBar.css';
import './css/navbar/navBarDropdown.css';
import './css/navbar/navBarCartBadge.css';
import './css/navbar/navBarUserSubmenu.css';

import './css/product/product.css';
import './css/product/productList.css';
import './css/product/productDetails.css';
import './css/product/productCarousel.css';
import './css/product/productDescription.css';

import './css/auth.css';
import './css/cart.css';
import './css/breadCrumbs.css';
import './css/numberInput.css';
import './css/dateInput.css';
import './css/passwordStrength.css';

import './css/loading/productDetailsLoading.css';

import './css/modals/addToCartModal.css';

import './css/footer.css';

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
