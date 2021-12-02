import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar.js';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/user/RegisterPage';
import LoginPage from './pages/user/LoginPage';
import ProfilePage from './pages/user/ProfilePage';
import NotFoundPage from './pages/error/NotFoundPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage.js';
import Footer from './components/Footer.js';
import PurchasePage from './pages/user/PurchasePage.js';
import ControlPage from './pages/ControlPage.js';
import ScrollToTop from './utils/ScrollToTop.js';

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <NavBar />
            <div className="container px-2">
                <Switch>
                    <Route exact path="/:q?">
                        <HomePage />
                    </Route>
                    <Route path="/user/register">
                        <RegisterPage />
                    </Route>
                    <Route path="/user/login">
                        <LoginPage />
                    </Route>
                    <Route path="/user/profile">
                        <ProfilePage />
                    </Route>
                    <Route path="/user/purchase">
                        <PurchasePage />
                    </Route>
                    <Route path="/control">
                        <ControlPage />
                    </Route>
                    <Route path="/product/:id">
                        <ProductDetailsPage />
                    </Route>
                    <Route path="/cart">
                        <CartPage />
                    </Route>
                    <Route path="/checkout">
                        <CheckoutPage />
                    </Route>
                    <Route path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
