import React from 'react';
import brand from '../images/vagabond_brand.svg';
import { Container, Navbar } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar bg="inspiring-red" variant="dark">
            <Container>
                <Navbar.Brand>
                    <img src={brand} alt="vagabond_logo" className="logo" />
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
