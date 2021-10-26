import React from 'react';
import brand from '../images/vagabond_brand.svg';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Button, Nav, Navbar } from 'react-bootstrap';
import { socialLinks } from '../data/links.js';
import { FiSearch } from 'react-icons/fi';
import { BsCart2 } from 'react-icons/bs';

const NavigationBar = () => {
    return (
        <header className="bg-inspiring-red">
            <Container>
                <Navbar variant="dark" className="navbar navbar-expand p-0">
                    <div className="container-fluid">
                        <ul className="navbar-nav d-none d-md-flex mr-auto">
                            {socialLinks.map((socialLink) => {
                                const { id, url, icon } = socialLink;
                                return (
                                    <li key={id}>
                                        <a
                                            href={url}
                                            className="text-light mx-1"
                                        >
                                            {icon}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className="navbar-nav d-flex align-items-center">
                            <li className="nav-item">
                                <div className="d-flex flex-row">
                                    <img
                                        src="https://i.imgur.com/EYFtR83.jpg"
                                        className="rounded-circle"
                                        width="30"
                                    />
                                </div>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#"
                                    className="nav-link d-flex align-items-center"
                                    data-abc="true"
                                >
                                    <span>Nantano M</span>
                                    <i className="bx bxs-chevron-down"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </Navbar>
                <section>
                    <div className="row d-flex align-items-center pb-3">
                        <div className="col-md-2">
                            <img src={brand} alt="vagabond_brand" />
                        </div>
                        <div className=" col-md-8">
                            <div className="d-flex form-inputs">
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
                                <BsCart2 className="cart-icon text-light" />
                                <div className="d-flex flex-column ms-2">
                                    <span className="qty text-light">
                                        1 Product
                                    </span>
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
