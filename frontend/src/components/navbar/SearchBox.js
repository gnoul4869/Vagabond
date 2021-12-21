import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { FiSearch } from 'react-icons/fi';

const SearchBox = () => {
    const history = useHistory();
    const location = useLocation();
    const [search, setSearch] = useState('');

    const searchQuery = queryString.parse(location.search);

    const searchHandler = (e) => {
        e.preventDefault();

        history.push({
            pathname: '/products',
            search: `?search=${search}`,
        });
    };

    useEffect(() => {
        if (!searchQuery.search) {
            setSearch('');
        }
    }, [searchQuery.search]);

    return (
        <form className="d-flex navbar-form-inputs" onSubmit={(e) => searchHandler(e)}>
            <input
                type="text"
                id="searchbox"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit" className="btn-search">
                <FiSearch className="search-icon" />
            </button>
        </form>
    );
};

export default SearchBox;
