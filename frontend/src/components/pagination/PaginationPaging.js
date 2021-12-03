import React from 'react';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

const PaginationPaging = () => {
    return (
        <div className="container d-inline-flex align-items-center justify-content-center fsr-5 mt-3">
            <button className="pagination-paging-btn">
                <BsCaretLeftFill />
            </button>
            <div className="pagination-paging-item">1</div>
            <div className="pagination-paging-item">2</div>
            <div className="pagination-paging-item active">3</div>
            <div className="pagination-paging-item">4</div>
            <div className="pagination-paging-item">5</div>
            <div className="pagination-paging-item">...</div>
            <button className="pagination-paging-btn">
                <BsCaretRightFill />
            </button>
        </div>
    );
};

export default PaginationPaging;
