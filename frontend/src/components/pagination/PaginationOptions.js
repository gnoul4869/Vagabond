import React from 'react';
import SortDropdown from './SortDropdown';
import CategoryDropdown from './CategoryDropdown';
import PaginationLoading from '../loading/PaginationLoading';

const PaginationOptions = ({
    buttons,
    selections,
    categories,
    sort,
    category,
    queryHandler,
    isLoading,
}) => {
    return (
        <>
            {isLoading ? (
                <PaginationLoading buttons={buttons} selection={selections} category={categories} />
            ) : (
                <div className="container bg-white p-2">
                    <div className="container d-flex">
                        <div className="d-flex align-items-center">
                            <div className="text-secondary fw-600 me-4">Sắp xếp theo</div>
                            {buttons.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => queryHandler(item.sort, '')}
                                        className={`pagination-button me-3 ${
                                            sort === item.sort && 'active'
                                        }`}
                                    >
                                        {item.name}
                                    </div>
                                );
                            })}
                        </div>

                        <SortDropdown
                            dropdownTitle={selections.title}
                            dropdownOptions={selections.options}
                            sort={sort}
                            queryHandler={queryHandler}
                        />

                        <div className="d-inline-flex align-items-center ms-auto">
                            <div className="text-secondary fw-600 me-4">Danh mục</div>
                            <CategoryDropdown
                                dropdownTitle={'Tất cả'}
                                dropdownOptions={categories}
                                category={category}
                                queryHandler={queryHandler}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PaginationOptions;
