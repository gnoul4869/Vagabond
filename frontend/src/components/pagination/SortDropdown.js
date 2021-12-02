import React, { useLayoutEffect, useRef, useState } from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const PaginationDropdown = ({ dropdownTitle, dropdownOptions, sort, queryHandler }) => {
    const optionRef = useRef(null);
    const [isDropdownShown, setIsDropdownShown] = useState(false);
    const [optionWidth, setOptionWidth] = useState(0);

    const longestOption = dropdownOptions.reduce((a, b) => (a.name.length > b.name.length ? a : b));

    useLayoutEffect(() => {
        setOptionWidth(optionRef.current.clientWidth);
    }, []);

    return (
        <>
            {/* Only visible for a short time to get width */}
            <div className={`pagination-dropdown-index ${optionWidth && 'd-none'}`} ref={optionRef}>
                <span className="me-2">{longestOption.name}</span>
                <FiChevronDown className="ms-auto" />
            </div>
            {/* ------------------------------------------ */}

            <div
                className="pagination-dropdown-index"
                onMouseEnter={() => setIsDropdownShown(true)}
                onMouseLeave={() => setIsDropdownShown(false)}
                style={{ width: `${optionWidth}px` }}
            >
                {dropdownOptions.find((item) => item.sort === sort) ? (
                    <span className="me-2">
                        {dropdownOptions.find((item) => item.sort === sort).name}
                    </span>
                ) : (
                    <span className="me-2">{dropdownTitle}</span>
                )}

                <FiChevronDown className="ms-auto" />

                {dropdownOptions && (
                    <aside className={`pagination-dropdown ${isDropdownShown && 'show'}`}>
                        {dropdownOptions.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => queryHandler(item.sort, '')}
                                    className="pagination-dropdown-item d-flex align-items-center"
                                >
                                    <span className="me-2">{item.name}</span>
                                    {sort === item.sort && (
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

export default PaginationDropdown;
