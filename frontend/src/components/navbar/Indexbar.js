import React, { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { HiMenu } from 'react-icons/hi';
import { Brand, Logo } from './BrandLogo';
import NavbarDropdown from './NavbarDropdown';
import SearchBox from './SearchBox';

const Indexbar = () => {
    const [isDropdownShown, setIsDropdownShown] = useState(false);

    return (
        <section>
            <div className="row d-flex align-items-center justify-content-center pb-3 pt-3 pt-md-0">
                <div className="col-md-3 col-lg-2 d-none d-md-block">
                    <Brand />
                </div>

                <div className="col-2 d-block d-md-none">
                    <Logo />
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
