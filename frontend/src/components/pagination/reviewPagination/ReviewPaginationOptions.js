import React from 'react';

const ReviewPaginationOptions = ({ buttons, rating, setRating }) => {
    return (
        <>
            <div className="review-pagination-container">
                {buttons.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => setRating(item.rating)}
                            className={`review-pagination-button me-lg-3 ${
                                rating === item.rating && 'active'
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
