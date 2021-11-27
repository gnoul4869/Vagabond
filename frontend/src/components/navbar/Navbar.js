import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { socialLinks } from '../../data/links';
import IndexBar from './secondary/IndexBar';
import SecondaryBar from './secondary/SecondaryBar';
import NavBarUserSubmenu from './secondary/NavBarUserSubmenu';

const NavigationBar = () => {
    const location = useLocation();
    const usernameContainer = useRef();
    const [isDropdownShown, setIsDropdownShown] = useState(false);
    const [isSubmenuShown, setIsSubmenuShown] = useState(false);
    const [targetWidth, setTargetWidth] = useState(0);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo && usernameContainer.current) {
            setTargetWidth(usernameContainer.current.clientWidth);
        }
    }, [userInfo]);

    return (
        <header className="bg-ired">
            <div className="container">
                <nav className="navbar navbar-expand d-none d-md-flex pt-0 pb-1 mx-3">
                    <ul className="navbar-nav d-flex me-auto">
                        {socialLinks.map((socialLink) => {
                            const { id, url, icon } = socialLink;
                            return (
                                <li key={id}>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={url}
                                        className="navbar-link mx-1"
                                    >
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
                                <div className="navbar-user-container d-flex">
                                    <div className="navbar-avatar-container">
                                        <div
                                            className="navbar-avatar"
                                            style={{ backgroundImage: `url(${userInfo.image})` }}
                                        ></div>
                                    </div>
                                    <div className="ms-2" ref={usernameContainer}>
                                        {userInfo.name}
                                    </div>
                                </div>
                                <NavBarUserSubmenu
                                    isSubmenuShown={isSubmenuShown}
                                    setIsSubmenuShown={setIsSubmenuShown}
                                    targetWidth={targetWidth}
                                    isAdmin={userInfo.role === 'admin'}
                                />
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to={{
                                            pathname: '/user/register',
                                            state: {
                                                oldLocation:
                                                    location.state && location.state.oldLocation
                                                        ? location.state.oldLocation
                                                        : location.pathname,
                                            },
                                        }}
                                        className="nav-link"
                                    >
                                        <span className="navbar-link">Đăng ký</span>
                                    </Link>
                                </li>
                                <div className="separator"></div>
                                <li>
                                    <Link
                                        to={{
                                            pathname: '/user/login',
                                            state: {
                                                oldLocation:
                                                    location.state && location.state.oldLocation
                                                        ? location.state.oldLocation
                                                        : location.pathname,
                                            },
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
                {location.pathname === '/cart' || location.pathname === '/checkout' ? (
                    <SecondaryBar
                        path={location.pathname}
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
