import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import { listReviews } from '../../redux/actions/reviewActions';
import ErrorPage from '../../pages/error/ErrorPage';
import EmptyReview from '../EmptyReview';

const ProductReviews = ({ productID }) => {
    const dispatch = useDispatch();

    const { total, reviews, isLoading, error } = useSelector((state) => state.review);

    useEffect(() => {
        dispatch(listReviews(productID));
    }, [dispatch, productID]);

    console.log(error);

    return (
        <div className="container bg-white mt-3 p-3">
            <div className="bg-label container rounded mb-3">
                <div className="fw-600 fsr-4">Đánh giá sản phẩm</div>
            </div>

            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center my-5">
                    <PulseLoader
                        color="#c73434"
                        css="display: inherit;"
                        size={12}
                        speedMultiplier={0.9}
                    />
                </div>
            ) : (
                <div className="container">
                    {error && error === 'Không tìm thấy đánh giá nào' ? (
                        <EmptyReview message={error} />
                    ) : error ? (
                        <ErrorPage error={error} backHome={false} />
                    ) : (
                        reviews.length !== 0 &&
                        reviews.map((item) => {
                            return <div>{item.content}</div>;
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
