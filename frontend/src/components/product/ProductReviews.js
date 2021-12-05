import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import { listReviews } from '../../redux/actions/reviewActions';
import ErrorPage from '../../pages/error/ErrorPage';
import EmptyReview from '../EmptyReview';
import RatingStars from '../RatingStars';

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
                            return (
                                <div key={item.id} className="container">
                                    <div className="row">
                                        <div className="col-auto d-flex align-items-center">
                                            <div className="product-review-user-image-container">
                                                <div
                                                    className="product-review-user-image"
                                                    style={{
                                                        backgroundImage: `url(${item.createdBy.image})`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="d-flex flex-column bg-info ms-3">
                                                <div className="bg-warning">
                                                    {item.createdBy.name}
                                                </div>
                                                <div className="bg-info">
                                                    <RatingStars rating={5} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container ms-2 my-2">
                                        <p>{item.content}</p>
                                    </div>
                                    <div className="divider-bottom my-3"></div>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
