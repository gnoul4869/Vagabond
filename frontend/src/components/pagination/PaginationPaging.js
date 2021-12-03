import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

const PaginationPaging = ({ total, page, queryHandler, limit, isLoading }) => {
    const totalPages = Math.ceil(total / limit);

    const pageHandler = (value) => {
        if (page !== value) {
            queryHandler('', '', value);
        }
    };

    return (
        <div className="container d-inline-flex align-items-center justify-content-center fsr-4 mt-3">
            {isLoading ? (
                <SyncLoader
                    color="#c73434"
                    css="display: inherit; margin: 0 auto;"
                    width="3.125rem"
                />
            ) : totalPages > 1 ? (
                <>
                    <button
                        onClick={() => pageHandler(page - 1 > 0 ? page - 1 : page)}
                        className="pagination-paging-btn"
                    >
                        <BsCaretLeftFill />
                    </button>
                    {[...Array(totalPages)].map((x, index) => {
                        const pageNum = index + 1;
                        return (
                            <div
                                key={index}
                                onClick={() => pageHandler(pageNum)}
                                className={`pagination-paging-item ${page === pageNum && 'active'}`}
                            >
                                {pageNum}
                            </div>
                        );
                    })}
                    {/* <div className="pagination-paging-dots">...</div> */}
                    <button
                        onClick={() => pageHandler(page + 1 > totalPages ? page : page + 1)}
                        className="pagination-paging-btn"
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
