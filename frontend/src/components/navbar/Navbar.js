import React from 'react';
import userIcon from '../../images/user_icon.png';
import { useLocation } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { socialLinks } from '../../data/links';
import Cartbar from './Cartbar';
import Indexbar from './Indexbar';

const NavigationBar = () => {
    const location = useLocation().pathname;

    return (
        <header className="bg-inspiring-red">
            <Container>
                <Navbar variant="dark" className="navbar navbar-expand pt-0 pb-1">
                    <ul className="navbar-nav d-flex me-auto">
                        {socialLinks.map((socialLink) => {
                            const { id, url, icon } = socialLink;
                            return (
                                <li key={id}>
                                    <a href={url} className="navbar-link mx-1">
                                        {icon}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className="navbar-nav d-flex align-items-center">
                        {/* <li className="nav-item">
                                <img
                                    src={userIcon}
                                    className="rounded-circle"
                                    width="30"
                                />
                            </li>
                            <li className="nav-item">
                                <LinkContainer to="/user/:id">
                                    <Nav.Link className="d-flex align-items-center">
                                        <span className="navbar-link">
                                            Username
                                        </span>
                                    </Nav.Link>
                                </LinkContainer>
                            </li> */}
                        <li>
                            <LinkContainer to="/user/register">
                                <Nav.Link>
                                    <span className="navbar-link">Đăng ký</span>
                                </Nav.Link>
                            </LinkContainer>
                        </li>
                        <div className="navbar-link-separator"></div>
                        <li>
                            <LinkContainer to="/user/login">
                                <Nav.Link>
                                    <span className="navbar-link">Đăng nhập</span>
                                </Nav.Link>
                            </LinkContainer>
                        </li>
                    </ul>
                </Navbar>
                {location === '/cart' ? <Cartbar /> : <Indexbar />}
            </Container>
        </header>
    );
};

export default NavigationBar;
