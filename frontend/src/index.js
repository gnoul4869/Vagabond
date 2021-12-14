import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store.js';
// import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

//* Components
import './css/components/home/homeBanner.css';
import './css/components/home/homeCategories.css';
import './css/components/modal.css';
import './css/components/footer.css';
import './css/components/sidebar.css';
import './css/components/cartItems.css';
import './css/components/dateInput.css';
import './css/components/numberInput.css';
import './css/components/breadCrumbs.css';
import './css/components/passwordStrength.css';
import './css/components/navbar/navBar.css';
import './css/components/navbar/brandLogo.css';
import './css/components/navbar/cartBadge.css';
import './css/components/navbar/secondary/secondaryBar.css';
import './css/components/navbar/secondary/navBarDropdown.css';
import './css/components/navbar/secondary/navBarUserSubmenu.css';
import './css/components/product/productCard.css';
import './css/components/product/productReview.css';
import './css/components/product/productCarousel.css';
import './css/components/pagination/reviewPagination.css';
import './css/components/pagination/productPagination.css';
import './css/components/loading/profilePageLoading.css';
import './css/components/loading/productDetailsPageLoading.css';

//* Pages
import './css/pages/authPage.css';
import './css/pages/errorPage.css';
import './css/pages/profilePage.css';
import './css/pages/purchasePage.css';
import './css/pages/checkoutPage.css';
import './css/pages/productDetailsPage.css';
import './css/pages/controlPage.css';

import './css/index.css';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// reportWebVitals(console.log);
