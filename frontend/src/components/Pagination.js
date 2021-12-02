import React, { useLayoutEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Pagination = ({ buttons, selections, categories, sort, addSort }) => {
    const selectionRef = useRef(null);
    const [selectionWidth, setSelectionWidth] = useState(0);

    const longestSelection = selections.reduce((a, b) => (a.name.length > b.name.length ? a : b));

    useLayoutEffect(() => {
        setSelectionWidth(selectionRef.current.clientWidth);
    }, []);

    return (
        <div className="container bg-white p-2">
            <div className="container d-flex">
                <div className="d-flex align-items-center">
                    <div className="text-secondary fw-600 me-4">Sắp xếp theo</div>
                    {buttons.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => addSort(item.sort)}
                                className={`option-btn me-3 ${
                                    sort === item.sort && 'option-btn-active'
                                }`}
                            >
                                {item.name}
                            </div>
                        );
                    })}

                    {/* Only visible for a short time to get width */}
                    <div
                        className={`option-select ${selectionWidth && 'd-none'}`}
                        ref={selectionRef}
                    >
                        <span className="me-2">{longestSelection.name}</span>
                        <FiChevronDown className="ms-auto" />
                    </div>
                    {/* ------------------------------------------ */}

                    <div className="option-select" style={{ width: `${selectionWidth}px` }}>
                        <span className="me-2">{selections[0].name}</span>
                        <FiChevronDown className="ms-auto" />
                    </div>
                </div>

                <div className="d-inline-flex align-items-center ms-auto">
                    <div className="text-secondary fw-600 me-4">Danh mục</div>
                    <div className="option-select">
                        Tất cả <FiChevronDown className="ms-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
