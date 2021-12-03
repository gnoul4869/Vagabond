import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { FiSearch } from 'react-icons/fi';

const SearchBox = () => {
    const location = useLocation();
    const [search, setSearch] = useState('');

    const searchQuery = queryString.parse(location.search);

    useEffect(() => {
        if (!searchQuery.search) {
            setSearch('');
        }
    }, [searchQuery.search]);

    return (
        <div className="d-flex navbar-form-inputs">
            <input
                type="text"
                id="searchbox"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Link
                to={{
                    pathname: '/',
                    search: `?search=${search}`,
                }}
            >
                <div className="btn-search">
                    <FiSearch className="search-icon" />
                </div>
            </Link>
        </div>
    );
};

export default SearchBox;
