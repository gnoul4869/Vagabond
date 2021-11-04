import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBox = () => {
    return (
        <div className="d-flex navbar-form-inputs">
            <input className="form-control" type="text" placeholder="Tìm kiếm sản phẩm..." />
            <button className="btn-search">
                <FiSearch className="search-icon" />
            </button>
        </div>
    );
};

export default SearchBox;
