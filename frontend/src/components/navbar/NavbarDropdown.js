import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { socialLinks } from '../../data/links';
import SearchBox from './SearchBox';

const NavbarDropdown = ({ auth, search, isDropdownShown }) => {
    const [dropdownHeight, setDropdownHeight] = useState(120);

    useEffect(() => {
        if (search) {
            setDropdownHeight(165);
        } else {
            setDropdownHeight(120);
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
                {search && (
                    <li>
                        <SearchBox />
                    </li>
                )}
                <li className="py-2">
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
