import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import Profile from './pages/user/Profile';
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <Router>
            <Navbar />
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
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;