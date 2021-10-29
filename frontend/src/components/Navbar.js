import React from 'react';
import brand from '../images/vagabond_brand.svg';
import userIcon from '../images/user_icon.png';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { socialLinks } from '../data/links.js';
import { FiSearch } from 'react-icons/fi';
import { BsCart2 } from 'react-icons/bs';

const NavigationBar = () => {
    return (
        <header className="bg-inspiring-red sticky-top">
            <Container>
                <Navbar variant="dark" className="navbar navbar-expand pt-0 pb-1">
                    <ul className="navbar-nav d-none d-md-flex me-auto">
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
                    <ul className="navbar-nav d-flex align-items-center ">
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
                        <div className="navbar-link-separator "></div>
                        <li>
                            <LinkContainer to="/user/login">
                                <Nav.Link>
                                    <span className="navbar-link">Đăng nhập</span>
                                </Nav.Link>
                            </LinkContainer>
                        </li>
                    </ul>
                </Navbar>
                <section>
                    <div className="row d-flex align-items-center pb-3">
                        <LinkContainer to="/">
                            <Nav.Link className="col-md-2">
                                <img src={brand} alt="vagabond_brand" />
                            </Nav.Link>
                        </LinkContainer>
                        <div className=" col-md-8">
                            <div className="d-flex navbar-form-inputs">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm..."
                                />
                                <button className="btn-search">
                                    <FiSearch className="search-icon" />
                                </button>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="d-flex d-none d-md-flex flex-row align-items-center">
                                <BsCart2 className="navbar-cart-icon text-light" />
                                <div className="d-flex flex-column ms-2">
                                    <span className="navbar-qty text-light">1 Product</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </header>
    );
};

export default NavigationBar;
