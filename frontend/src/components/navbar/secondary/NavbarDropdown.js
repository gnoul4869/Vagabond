import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { socialLinks } from '../../../data/links';
import CartBadge from '../CartBadge';
import SearchBox from '../SearchBox';
import { logout } from '../../../redux/actions/authActions';

const NavbarDropdown = ({ cartBadge, search, isDropdownShown }) => {
    const dispatch = useDispatch();
    const [dropdownHeight, setDropdownHeight] = useState(112);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        const userHeight = userInfo ? 40 : 0;
        const cartHeight = cartBadge ? 50 : 0;
        const searchHeight = search ? 53 : 0;
        setDropdownHeight(112 + userHeight + cartHeight + searchHeight);
    }, [cartBadge, search, userInfo]);

    return (
        <div
            className={`container d-block d-md-none navbar-dropdown ${
                isDropdownShown &&
                `navbar-dropdown-active navbar-dropdown-active-height-${dropdownHeight}`
            }`}
        >
            <ul className="navbar-nav text-center">
                {userInfo ? (
                    <>
                        <li>
                            <Link to="/user/profile" className="nav-link">
                                <span className="navbar-link">Tài khoản của tôi</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/purchase" className="nav-link">
                                <span className="navbar-link">Đơn mua</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#logout"
                                className="nav-link"
                                onClick={() => dispatch(logout())}
                            >
                                <span className="navbar-link">Đăng xuất</span>
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/user/register" className="nav-link">
                                <span className="navbar-link">Đăng ký</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/login" className="nav-link">
                                <span className="navbar-link">Đăng nhập</span>
                            </Link>
                        </li>
                    </>
                )}
                {cartBadge && (
                    <li>
                        <div className="d-flex justify-content-center align-item-center">
                            <CartBadge />
                        </div>
                    </li>
                )}

                {search && (
                    <li className="pt-2">
                        <SearchBox />
                    </li>
                )}
                <li className="py-1">
                    {socialLinks.map((socialLink) => {
                        const { id, url, icon } = socialLink;
                        return (
                            <a key={id} href={url} className="navbar-link mx-1">
                                {icon}
                            </a>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};

export default NavbarDropdown;
