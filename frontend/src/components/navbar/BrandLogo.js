import React from 'react';
import { Link } from 'react-router-dom';
import brand from '../../images/vagabond_brand.png';
import logo from '../../images/vagabond_logo.png';

export const Brand = () => {
    return (
        <Link to="/">
            <div className="brand-container">
                <img src={brand} alt="vagabond_brand" className="brand" />
            </div>
        </Link>
    );
};

export const Logo = () => {
    return (
        <Link to="/">
            <div className="logo-container">
                <img src={logo} alt="vagabond_logo" className="navbar-logo" />
            </div>
        </Link>
    );
};
