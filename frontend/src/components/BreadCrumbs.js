import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumbs = () => {
    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb my-3">
                <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item">
                    <span>Danh mục</span>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    <span>Regular Fit Suit Jacket</span>
                </li>
            </ol>
        </nav>
    );
};

export default BreadCrumbs;
