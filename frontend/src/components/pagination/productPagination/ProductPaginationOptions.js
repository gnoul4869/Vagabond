import React from 'react';
import ProductSortDropdown from './ProductSortDropdown';
import ProductCategoryDropdown from './ProductCategoryDropdown';
import ProductPaginationLoading from '../../loading/PaginationLoading';

const ProductPaginationOptions = ({
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
                <ProductPaginationLoading
                    buttons={buttons}
                    selection={selections}
                    category={categories}
                />
            ) : (
                <div className="container bg-white p-0 p-lg-2">
                    <div className="container d-flex px-0 px-lg-2">
                        <div className="d-flex align-items-center">
                            <div className="d-none d-lg-flex text-secondary fw-600 me-lg-2 me-xl-4">
                                Sắp xếp theo
                            </div>
                            {buttons.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => queryHandler(item.sort, '')}
                                        className={`product-pagination-button me-lg-3 ${
                                            sort === item.sort && 'active'
                                        }`}
                                    >
                                        {item.name}
                                    </div>
                                );
                            })}
                        </div>

                        <ProductSortDropdown
                            dropdownTitle={selections.title}
                            dropdownOptions={selections.options}
                            sort={sort}
                            queryHandler={queryHandler}
                        />

                        <ProductCategoryDropdown
                            dropdownTitle={'Tất cả'}
                            dropdownOptions={categories}
                            category={category}
                            queryHandler={queryHandler}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductPaginationOptions;
