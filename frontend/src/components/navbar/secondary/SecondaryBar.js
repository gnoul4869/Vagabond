import React from 'react';
import { Brand, Logo } from '../BrandLogo';
import { HiMenu } from 'react-icons/hi';
import SearchBox from '../SearchBox';
import NavbarDropdown from './NavbarDropdown';

const CartBar = ({ path, isDropdownShown, setIsDropdownShown, isAdmin }) => {
    let title = 'Welcome';
    if (path === '/cart') {
        title = 'Giỏ Hàng';
    }
    if (path === '/checkout') {
        title = 'Thanh toán';
    }

    return (
        <section>
            <div className="row d-flex align-items-center py-auto py-2 py-md-0 pb-md-2">
                <div className="col">
                    <div className="row align-items-center justify-content-center justify-content-md-start">
                        <div className="col-auto d-none d-md-block mb-2">
                            <Brand />
                        </div>
                        <div className="col-auto d-block d-md-none">
                            <Logo />
                        </div>
                        <div className="col-auto">
                            <div className="secondarybar-badge-separator"></div>
                        </div>
                        <div className="col-auto">
                            <div className="secondarybar-badge-title">{title}</div>
                        </div>
                    </div>
                </div>

                <div className="col-md-5 col-lg-5 d-none d-md-block">
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
            </div>
            <NavbarDropdown isDropdownShown={isDropdownShown} auth={false} search={true} />
        </section>
    );
};

export default CartBar;
