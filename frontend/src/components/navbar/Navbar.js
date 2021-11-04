import React, { useState } from 'react';
import userIcon from '../../images/user_icon.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { socialLinks } from '../../data/links';
import Cartbar from './Cartbar';
import Indexbar from './Indexbar';

const NavigationBar = () => {
    const [isDropdownShown, setIsDropdownShown] = useState(false);
    const location = useLocation().pathname;

    return (
        <header className="bg-ired">
            <div className="container">
                <nav className="navbar navbar-expand d-none d-md-flex pt-0 pb-1">
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
                        {/* <li className="nav-item">
                                <img
                                    src={userIcon}
                                    className="rounded-circle"
                                    width="30"
                                />
                            </li>
                            <li className="nav-item">
                                <LinkContainer to="/user/:id">
                                    <Nav.Link className="d-flex align-items-center">
                                        <span className="navbar-link">
                                            Username
                                        </span>
                                    </Nav.Link>
                                </LinkContainer>
                            </li> */}
                        <li>
                            <Link to="/user/register" className="nav-link">
                                <span className="navbar-link">Đăng ký</span>
                            </Link>
                        </li>
                        <div className="navbar-link-separator"></div>
                        <li>
                            <Link to="/user/login" className="nav-link">
                                <span className="navbar-link">Đăng nhập</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {location === '/cart' ? (
                    <Cartbar
                        isDropdownShown={isDropdownShown}
                        setIsDropdownShown={setIsDropdownShown}
                    />
                ) : (
                    <Indexbar
                        isDropdownShown={isDropdownShown}
                        setIsDropdownShown={setIsDropdownShown}
                    />
                )}
            </div>
        </header>
    );
};

export default NavigationBar;
