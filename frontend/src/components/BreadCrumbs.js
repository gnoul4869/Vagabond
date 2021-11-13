import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumbs = (props) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-nowrap my-3">
                <li className="breadcrumb-item">
                    <Link to="/" className="link-label">
                        Home
                    </Link>
                </li>
                {Object.entries(props).map(([itemKey, itemValue], index, { length }) => {
                    if (index === length - 1) {
                        return (
                            <li
                                key={index}
                                className="breadcrumb-item text-truncate active"
                                aria-current="page"
                            >
                                <span>{itemValue}</span>
                            </li>
                        );
                    } else {
                        return (
                            <li key={index} className="breadcrumb-item text-truncate">
                                <span>{itemValue}</span>
                            </li>
                        );
                    }
                })}
            </ol>
        </nav>
    );
};

export default BreadCrumbs;
