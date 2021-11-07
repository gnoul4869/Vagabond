import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { socialLinks } from '../../data/links';
import CartBar from './CartBar';
import IndexBar from './IndexBar';
import { useSelector } from 'react-redux';
import NavBarUserSubmenu from './NavBarUserSubmenu';

const NavigationBar = () => {
    const [isDropdownShown, setIsDropdownShown] = useState(false);
    const [isSubmenuShown, setIsSubmenuShown] = useState(false);
    const location = useLocation().pathname;
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <header className="bg-ired">
            <div className="container">
                <nav className="navbar navbar-expand d-none d-md-flex pt-0 pb-1 mx-3">
                    <ul className="navbar-nav d-flex me-auto">
                        {socialLinks.map((socialLink) => {
                            const { id, url, icon } = socialLink;
                            return (
                                <li key={id}>
                                    <a href={url} className="navbar-link mx-1">
                                        {icon}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className="navbar-nav d-flex align-items-center">
                        {userInfo ? (
                            <li
                                className="nav-item"
                                onMouseEnter={() => setIsSubmenuShown(true)}
                                onMouseLeave={() => setIsSubmenuShown(false)}
                            >
                                <div className="navbar-user-container d-flex-inline">
                                    <img
                                        src={userInfo.image}
                                        alt={userInfo.name}
                                        className="navbar-avatar rounded-circle"
                                    />
                                    <span className="ms-1">{userInfo.name}</span>
                                </div>
                                <NavBarUserSubmenu
                                    isSubmenuShown={isSubmenuShown}
                                    setIsSubmenuShown={setIsSubmenuShown}
                                />
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/user/register" className="nav-link">
                                        <span className="navbar-link">Đăng ký</span>
                                    </Link>
                                </li>
                                <div className="navbar-link-separator"></div>
                                <li>
                                    <Link
                                        to={{
                                            pathname: '/user/login',
                                            state: { oldLocation: location },
                                        }}
                                        className="nav-link"
                                    >
                                        <span className="navbar-link">Đăng nhập</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                {location === '/cart' ? (
                    <CartBar
                        isDropdownShown={isDropdownShown}
                        setIsDropdownShown={setIsDropdownShown}
                    />
                ) : (
                    <IndexBar
                        isDropdownShown={isDropdownShown}
                        setIsDropdownShown={setIsDropdownShown}
                    />
                )}
            </div>
        </header>
    );
};

export default NavigationBar;
