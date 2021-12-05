import React from 'react';

const ReviewPaginationOptions = ({ buttons, sort, setSort }) => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-4">
                {buttons.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => setSort(item.sort)}
                            className={`review-pagination-button me-lg-3 ${
                                sort === item.sort && 'active'
                            }`}
                        >
                            {item.name}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ReviewPaginationOptions;
