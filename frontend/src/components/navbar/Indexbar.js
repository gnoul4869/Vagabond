import React, { useState } from 'react';
import brand from '../../images/vagabond_brand.svg';
import logo from '../../images/vagabond_logo.svg';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { HiMenu } from 'react-icons/hi';
import NavbarDropdown from './NavbarDropdown';
import SearchBox from './SearchBox';

const Indexbar = () => {
    const [isDropdownShown, setIsDropdownShown] = useState(false);

    return (
        <section>
            <div className="row d-flex align-items-center justify-content-center pb-3 pt-3 pt-md-0">
                <div className="col-md-3 col-lg-2 d-none d-md-block">
                    <Link to="/" className="nav-link">
                        <img src={brand} alt="vagabond_brand" />
                    </Link>
                </div>

                <div className="col-2 d-block d-md-none">
                    <Link to="/" className="nav-link">
                        <img src={logo} alt="vagabond_logo" className="nav-logo" />
                    </Link>
                </div>

                <div className="col col-md-7 col-lg-8">
                    <SearchBox />
                </div>

                <div className="col-2 d-block d-md-none ps-0">
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsDropdownShown(!isDropdownShown)}
                    >
                        <HiMenu className="text-light" />
                    </button>
                </div>

                <div className="col-md-2 d-none d-md-block">
                    <BsCart2 className="navbar-cart-icon text-light mx-auto" />
                </div>
            </div>
            <NavbarDropdown auth={false} search={false} isDropdownShown={isDropdownShown} />
        </section>
    );
};

export default Indexbar;
