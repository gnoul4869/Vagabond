import React from 'react';
import { Link } from 'react-router-dom';
import brand from '../../images/vagabond_brand.svg';
import logo from '../../images/vagabond_logo.svg';

const Brand = () => {
    return (
        <Link to="/" className="nav-link">
            <img src={brand} alt="vagabond_brand" />
        </Link>
    );
};

const Logo = () => {
    return (
        <Link to="/" className="nav-link">
            <img src={logo} alt="vagabond_logo" className="nav-logo" />
        </Link>
    );
};

export { Brand, Logo };
