import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar.js';
import Home from './pages/Home';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import Profile from './pages/user/Profile';
import Error404 from './pages/error/Error404';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Footer from './components/Footer.js';

const App = () => {
    return (
        <Router>
            <NavBar />
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/user/register">
                        <Register />
                    </Route>
                    <Route path="/user/login">
                        <Login />
                    </Route>
                    <Route path="/user/profile/:id">
                        <Profile />
                    </Route>
                    <Route path="/product/:id">
                        <ProductDetails />
                    </Route>
                    <Route path="/cart">
                        <Cart />
                    </Route>
                    <Route path="*">
                        <Error404 />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
