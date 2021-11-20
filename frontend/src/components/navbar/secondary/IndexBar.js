import React from 'react';
import { HiMenu } from 'react-icons/hi';
import { Brand, Logo } from '../BrandLogo';
import CartBadge from '../CartBadge';
import NavbarDropdown from './NavbarDropdown';
import SearchBox from '../SearchBox';

const IndexBar = ({ isDropdownShown, setIsDropdownShown }) => {
    return (
        <section>
            <div className="row d-flex align-items-center justify-content-between pb-3 pt-3 pt-md-0">
                <div className="col-md-3 col-lg-2 d-none d-md-block p-0">
                    <Brand />
                </div>

                <div className="col-2 d-block d-md-none">
                    <Logo />
                </div>

                <div className="col col-md-7 col-lg-8">
                    <SearchBox />
                </div>

                <div className="col-2 d-block d-md-none">
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsDropdownShown(!isDropdownShown)}
                    >
                        <HiMenu className="text-light" />
                    </button>
                </div>

                <div className="col-auto 2 d-none d-md-flex justify-content-center align-item-center bg-dark">
                    <CartBadge />
                </div>
            </div>
            <NavbarDropdown cartBadge={true} search={false} isDropdownShown={isDropdownShown} />
        </section>
    );
};

export default IndexBar;
