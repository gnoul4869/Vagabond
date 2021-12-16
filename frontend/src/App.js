import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/user/RegisterPage';
import LoginPage from './pages/user/LoginPage';
import ProfilePage from './pages/user/ProfilePage';
import PurchasePage from './pages/user/PurchasePage';
import ControlPage from './pages/ControlPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer';
import NotFoundPage from './pages/error/NotFoundPage';
import ScrollToTop from './utils/ScrollToTop';
import Chatbot from './components/Chatbot';

const App = () => {
    return (
        <Router>
            <Chatbot />
            <ScrollToTop />
            <NavBar />
            <div className="container px-2">
                <Switch>
                    <Route exact path="/">
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
                    <Route exact path="/products">
                        <ProductsPage />
                    </Route>
                    <Route path="/products/:id">
                        <ProductDetailsPage />
                    </Route>
                    <Route path="/cart">
                        <CartPage />
                    </Route>
                    <Route path="/checkout">
                        <CheckoutPage />
                    </Route>
                    <Route path="/not-found">
                        <NotFoundPage />
                    </Route>
                    <Redirect to="/not-found" />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
