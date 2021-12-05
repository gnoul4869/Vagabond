import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

const ReviewPaginationPaging = ({ total, page, queryHandler, limit, isLoading }) => {
    const totalPages = Math.ceil(total / limit);

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
                            queryHandler(
                                null,
                                Number(page) - 1 > 0 ? Number(page) - 1 : Number(page)
                            )
                        }
                        className="review-pagination-paging-btn"
                    >
                        <BsCaretLeftFill />
                    </button>
                    {[...Array(totalPages)].map((x, index) => {
                        const pageNum = index + 1;
                        return (
                            <div
                                key={index}
                                onClick={() => queryHandler(null, pageNum)}
                                className={`review-pagination-paging-item ${
                                    Number(page) === pageNum && 'active'
                                }`}
                            >
                                {pageNum}
                            </div>
                        );
                    })}
                    {/* <div className="review-pagination-paging-dots">...</div> */}
                    <button
                        onClick={() =>
                            queryHandler(
                                null,
                                Number(page) + 1 > totalPages ? Number(page) : Number(page) + 1
                            )
                        }
                        className="review-pagination-paging-btn"
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

export default ReviewPaginationPaging;
