import React from 'react';
import brand from '../../images/vagabond_brand.svg';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';

const Cartbar = () => {
    return (
        <section>
            <div className="row d-flex align-items-center pb-3">
                <div className="col">
                    <div className="row align-items-center justify-content-center justify-content-md-start">
                        <div className="col-5 p-0">
                            <LinkContainer to="/">
                                <Nav.Link>
                                    <img src={brand} alt="vagabond_brand" />
                                </Nav.Link>
                            </LinkContainer>
                        </div>

                        <div className="col-5 p-0">
                            <div className="cart-logo text-white fw-600 fs-3">Giỏ hàng</div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
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
            </div>
        </section>
    );
};

export default Cartbar;
