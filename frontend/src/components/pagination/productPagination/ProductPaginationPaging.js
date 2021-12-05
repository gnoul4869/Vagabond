import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

const PaginationPaging = ({ total, page, queryHandler, limit, isLoading }) => {
    const totalPages = Math.ceil(total / limit);

    const pageHandler = (value) => {
        if (Number(page) !== value) {
            queryHandler('', '', value);
        }
    };

    return (
        <div className="container d-inline-flex align-items-center justify-content-center fsr-4 mt-3">
            {isLoading ? (
                <PulseLoader
                    color="#c73434"
                    css="display: inherit; margin: 0 auto;"
                    width="3.125rem"
                    speedMultiplier={0.9}
                />
            ) : totalPages > 1 ? (
                <>
                    <button
                        onClick={() =>
                            pageHandler(Number(page) - 1 > 0 ? Number(page) - 1 : Number(page))
                        }
                        className="product-pagination-paging-btn"
                    >
                        <BsCaretLeftFill />
                    </button>
                    {[...Array(totalPages)].map((x, index) => {
                        const pageNum = index + 1;
                        return (
                            <div
                                key={index}
                                onClick={() => pageHandler(pageNum)}
                                className={`product-pagination-paging-item ${
                                    Number(page) === pageNum && 'active'
                                }`}
                            >
                                {pageNum}
                            </div>
                        );
                    })}
                    {/* <div className="product-pagination-paging-dots">...</div> */}
                    <button
                        onClick={() =>
                            pageHandler(
                                Number(page) + 1 > totalPages ? Number(page) : Number(page) + 1
                            )
                        }
                        className="product-pagination-paging-btn"
                    >
                        <BsCaretRightFill />
                    </button>
                </>
            ) : (
                <div className="d-none">...</div>
            )}
        </div>
    );
};

export default PaginationPaging;
