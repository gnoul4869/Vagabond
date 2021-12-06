import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { MdThumbUp } from 'react-icons/md';
import PulseLoader from 'react-spinners/PulseLoader';
import moment from 'moment';
import 'moment/locale/vi';
import { createReview, listReviews, updateReview } from '../../redux/actions/reviewActions';
import ErrorPage from '../../pages/error/ErrorPage';
import EmptyReview from '../EmptyReview';
import SelectStars from '../SelectStars';
import ReviewPaginationOptions from '../pagination/reviewPagination/ReviewPaginationOptions';
import { reviewPaginationButtons } from '../../data/reviewPaginationData';
import ReviewPaginationPaging from '../pagination/reviewPagination/ReviewPaginationPaging';
import RatingStars from '../RatingStars';
import { VscError } from 'react-icons/vsc';

const ProductReviews = ({ productID, productRating, productReviewers }) => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const { total, reviews, totalRating, isLoading, isUpdating, error } = useSelector(
        (state) => state.review
    );
    const { userInfo } = useSelector((state) => state.auth);

    const reviewRef = useRef(null);

    const [rating, setRating] = useState('');
    const [page, setPage] = useState(1);
    const limit = 5;

    const [stars, setStars] = useState(0);
    const [content, setContent] = useState('');

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [postError, setPostError] = useState('');
    const [isPostErrorShown, setIsPostErrorShown] = useState(false);

    const queryHandler = (ratingValue, pageValue) => {
        if (ratingValue !== null && ratingValue !== rating) {
            setPage(1);
            setRating(ratingValue);
        }
        if (pageValue && pageValue !== page) {
            setPage(pageValue);
        }

        reviewRef.current.scrollIntoView();
    };

    const likeHandler = (reviewID) => {
        if (!userInfo) {
            history.push({
                pathname: '/user/login',
                state: { oldLocation: location.pathname },
            });
        }
        if (!isUpdating) {
            dispatch(updateReview(reviewID, 'like'));
        }
    };

    const postHandler = () => {
        if (stars === 0) {
            setPostError('Hãy chọn mức đánh giá');
            return setIsPostErrorShown(true);
        }
        if (!content) {
            setPostError('Hãy nhập nội dung đánh giá');
            return setIsPostErrorShown(true);
        }
        setIsPostErrorShown(false);

        dispatch(createReview(productID, stars, content));
    };

    useEffect(() => {
        dispatch(listReviews(productID, rating, page, limit));
    }, [dispatch, productID, rating, page]);

    useEffect(() => {
        if (!isLoading && reviews.length !== 0 && isInitialLoad) {
            setIsInitialLoad(false);
        }
    }, [isInitialLoad, isLoading, reviews]);

    return (
        <div className="container bg-white mt-3 p-3" ref={reviewRef}>
            <div className="bg-label container rounded mb-3">
                <div className="fw-600 fsr-4">Đánh giá sản phẩm</div>
            </div>

            {!isInitialLoad && (
                <div className="product-review-rating-container container mb-3">
                    <div>
                        <span className="fsr-5">{totalRating || productRating}</span>
                        <span className="fsr-4 ms-1">trên 5</span>
                    </div>

                    <RatingStars
                        rating={totalRating || productRating}
                        css={'text-ired fsr-5 mt-2'}
                    />

                    <ReviewPaginationOptions
                        buttons={reviewPaginationButtons}
                        rating={rating}
                        queryHandler={queryHandler}
                    />
                </div>
            )}

            {userInfo && productReviewers.includes(userInfo.id) && !totalRating && (
                <div className="container p-0 p-md-4 my-4">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <div className="product-review-poster-image-container">
                                <div
                                    className="product-review-user-image mt-2"
                                    style={{
                                        backgroundImage: `url(${userInfo.image})`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="col col-lg-6 position-relative">
                            <div className="fsr-3">Hãy viết đánh giá của bạn</div>
                            <div className="mt-1 mb-3">
                                <div className="d-flex">
                                    <SelectStars
                                        stars={stars}
                                        setStars={setStars}
                                        css={'text-ired fsr-3'}
                                    />

                                    <div
                                        className={`product-review-post-error-container ms-auto ${
                                            isPostErrorShown && 'show'
                                        }`}
                                    >
                                        <VscError className="text-ired me-1" />
                                        <span>{postError}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-column">
                                <textarea
                                    name="review"
                                    cols="30"
                                    rows="5"
                                    placeholder={'Bạn nghĩ gì về sản phẩm này...'}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="product-review-post form-control fsr-2"
                                ></textarea>
                                <button
                                    type="button"
                                    onClick={postHandler}
                                    className="button-main btn-post fsr-2 ms-auto me-3 mt-3"
                                >
                                    Đánh giá
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <PulseLoader
                        color="#c73434"
                        css="display: inherit; margin: 7.5rem; 0"
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
                        reviews.length !== 0 && (
                            <>
                                {reviews.map((item) => {
                                    const postDate = moment(item.createdAt).format(
                                        'DD-MM-YYYY HH:mm'
                                    );
                                    return (
                                        <div
                                            key={item.id}
                                            className={`container text-sdark fsr-2 p-0 px-md-2`}
                                        >
                                            <div
                                                className={`row pb-3 ${
                                                    item.isNew && 'product-review-new'
                                                }`}
                                            >
                                                <div className="col-auto">
                                                    <div className="product-review-user-image-container mt-2">
                                                        <div
                                                            className="product-review-user-image"
                                                            style={{
                                                                backgroundImage: `url(${item.createdBy.image})`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="col d-flex flex-column">
                                                    <span>{item.createdBy.name}</span>
                                                    <div className="mt-1">
                                                        <RatingStars
                                                            rating={item.rating}
                                                            css={'text-ired'}
                                                        />
                                                    </div>
                                                    <div className="mt-2 ms-2">
                                                        <p>{item.content}</p>
                                                    </div>
                                                    <div className="fsr-1 text-secondary">
                                                        {postDate}
                                                    </div>
                                                    <div className="d-inline-flex align-items-center mt-3">
                                                        <MdThumbUp
                                                            className={`product-review-like-btn ${
                                                                userInfo &&
                                                                item.likedBy.includes(
                                                                    userInfo.id
                                                                ) &&
                                                                'active'
                                                            }`}
                                                            onClick={() => likeHandler(item.id)}
                                                        />
                                                        <div className="product-review-like-count">
                                                            {item.numLikes <= 0
                                                                ? 'Hữu ích?'
                                                                : item.numLikes}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="divider-bottom my-3"></div>
                                        </div>
                                    );
                                })}

                                <ReviewPaginationPaging
                                    total={total}
                                    page={page}
                                    queryHandler={queryHandler}
                                    limit={limit}
                                    isLoading={isLoading}
                                />
                            </>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
