import React from 'react';
import brand from '../../images/vagabond_brand.svg';
import { FiSearch } from 'react-icons/fi';
import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Indexbar = () => {
    return (
        <section>
            <div className="row d-flex align-items-center pb-3">
                <Link to="/" className="nav-link">
                    <img src={brand} alt="vagabond_brand" />
                </Link>
                <div className="col-md-8">
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
    );
};

export default Indexbar;
