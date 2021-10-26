import React from 'react';
import brand from '../images/vagabond_brand.svg';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar bg="inspiring-red" variant="dark">
            <Container>
                <Navbar.Brand>
                    <LinkContainer to="/">
                        <Nav.Link>
                            <img
                                src={brand}
                                alt="vagabond_logo"
                                className="logo"
                            />
                        </Nav.Link>
                    </LinkContainer>
                </Navbar.Brand>
                <Nav>
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
