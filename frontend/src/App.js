import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Container>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Container>
            </Switch>
        </Router>
    );
};

export default App;
