import React from 'react';
import { Brand, Logo } from '../BrandLogo';
import { HiMenu } from 'react-icons/hi';
import SearchBox from '../SearchBox';
import NavbarDropdown from './NavbarDropdown';

const CartBar = ({ isDropdownShown, setIsDropdownShown }) => {
    return (
        <section>
            <div className="row d-flex align-items-center py-auto pb-md-3">
                <div className="col">
                    <div className="row align-items-center justify-content-center justify-content-md-start">
                        <div className="secondarybar-badge-container">
                            <div className="secondarybar-badge">
                                <Brand />
                            </div>
                        </div>
                        {/* <div className="col-md-4 col-lg-3 d-none d-md-block p-0">
                            <Brand />
                        </div>

                        <div className="col-md-5 col-lg-4 d-flex align-items-center">
                            <div className="d-block d-md-none">
                                <Logo />
                            </div>
                            <div className="navbar-cart-logo text-white fw-600 fs-3">Giỏ hàng</div>
                        </div> */}
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
            <NavbarDropdown auth={false} search={true} isDropdownShown={isDropdownShown} />
        </section>
    );
};

export default CartBar;
