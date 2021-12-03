import React, { useLayoutEffect, useRef, useState } from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const CategoryDropdown = ({ dropdownTitle, dropdownOptions, category, queryHandler }) => {
    const optionRef = useRef(null);
    const [isDropdownShown, setIsDropdownShown] = useState(false);
    const [optionWidth, setOptionWidth] = useState(0);

    const longestOption =
        dropdownOptions.length !== 0 &&
        dropdownOptions.reduce((a, b) => (a.length > b.length ? a : b));

    useLayoutEffect(() => {
        setOptionWidth(optionRef.current.clientWidth);
    }, []);

    return (
        <>
            {/* Only visible for a short time to get width */}
            <div className={`pagination-dropdown-index ${optionWidth && 'd-none'}`} ref={optionRef}>
                <span className="me-2">{longestOption}</span>
                <FiChevronDown className="ms-auto" />
            </div>
            {/* ------------------------------------------ */}

            <div
                className="pagination-dropdown-index"
                onMouseEnter={() => setIsDropdownShown(true)}
                onMouseLeave={() => setIsDropdownShown(false)}
                style={{ width: `${optionWidth}px` }}
            >
                {dropdownOptions.find((item) => item === category) ? (
                    <span className="me-2 text-ired">
                        {dropdownOptions.find((item) => item === category)}
                    </span>
                ) : (
                    <span className="me-2">{dropdownTitle}</span>
                )}

                <FiChevronDown className="ms-auto" />

                {dropdownOptions && (
                    <aside className={`pagination-dropdown ${isDropdownShown && 'show'}`}>
                        {dropdownOptions.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() =>
                                        queryHandler('', item === category ? 'all' : item)
                                    }
                                    className="pagination-dropdown-item d-flex align-items-center"
                                >
                                    <span className="me-2">{item}</span>
                                    {category === item && (
                                        <FaCheckSquare className="ms-auto text-ired" />
                                    )}
                                </div>
                            );
                        })}
                    </aside>
                )}
            </div>
        </>
    );
};

export default CategoryDropdown;
