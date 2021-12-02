import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Pagination = ({ buttons, selections, categories, sort, addSort }) => {
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
                    <div className="option-select">
                        Giá thấp đến cao
                        <FiChevronDown className="ms-2" />
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
