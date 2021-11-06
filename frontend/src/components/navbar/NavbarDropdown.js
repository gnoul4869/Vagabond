import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { socialLinks } from '../../data/links';
import CartBadge from './CartBadge';
import SearchBox from './SearchBox';

const NavbarDropdown = ({ auth, cartBadge, search, isDropdownShown }) => {
    const [dropdownHeight, setDropdownHeight] = useState(162);

    useEffect(() => {
        if (search) {
            setDropdownHeight(215);
        } else {
            setDropdownHeight(162);
        }
    }, [search]);

    return (
        <div
            className={`container d-block d-md-none navbar-dropdown ${
                isDropdownShown &&
                `navbar-dropdown-active navbar-dropdown-active-height-${dropdownHeight}`
            }`}
        >
            <ul className="navbar-nav text-center">
                {auth ? (
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
