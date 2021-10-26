import React from 'react';
import brand from '../images/vagabond_brand.svg';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar bg="inspiring-red" variant="dark" sticky="top">
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
                        <Nav.Link>Đăng Ký</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <Nav.Link>Đăng Nhập</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
            <Container>
                <div class="input-group">
                    <div class="form-outline">
                        <input type="search" id="form1" class="form-control" />
                        <label class="form-label" for="form1">
                            Search
                        </label>
                    </div>
                    <button type="button" class="btn btn-primary">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
