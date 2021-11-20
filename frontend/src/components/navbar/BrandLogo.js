import React from 'react';
import { Link } from 'react-router-dom';
import brand from '../../images/vagabond_brand.png';
import logo from '../../images/vagabond_logo.png';

export const Brand = () => {
    return (
        <Link to="/">
            <div className="brand-container">
                <div style={{ backgroundImage: `url(${brand})` }} className="brand"></div>
            </div>
        </Link>
    );
};

export const Logo = () => {
    return (
        <Link to="/">
            <div className="logo-container">
                <div style={{ backgroundImage: `url(${logo})` }} className="logo"></div>
            </div>
        </Link>
    );
};
