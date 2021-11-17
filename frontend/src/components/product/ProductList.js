import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../../redux/actions/productActions';
import ProductPrice from './ProductPrice';
import ProductListLoading from '../loading/ProductListLoading';
import RatingStars from '../RatingStars';
import ErrorPage from '../../pages/error/ErrorPage';
import { FaCartPlus } from 'react-icons/fa';
import { addToCart } from '../../redux/actions/cartActions';
import SuccessModal from '../modals/SuccessModal';

const ProductList = () => {
    const dispatch = useDispatch();
    const { isLoading, products, error } = useSelector((state) => state.productList);

    const isDone = useSelector((state) => state.cart.isDone);
    const [isModalShown, setIsModalShown] = useState(false);

    useEffect(() => {
        if (isDone === true) {
            setIsModalShown(true);
        }
        if (isModalShown === true) {
            const modalTimeout = setTimeout(() => setIsModalShown(false), 2000);
            return () => {
                clearTimeout(modalTimeout);
            };
        }
    }, [isDone, isModalShown]);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            <section className="container d-flex flex-wrap">
                {isLoading ? (
                    <ProductListLoading />
                ) : (
                    products &&
                    products.map((item) => {
                        return (
                            <div key={item._id} className="product-wrapper">
                                <div className="product-container">
                                    <Link to={`/product/${item._id}`} className="link-inherit">
                                        <div className="product-image-container">
                                            <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="product-image"
                                            />
                                        </div>
                                        <div className="product-name line-clamp-2">{item.name}</div>
                                    </Link>

                                    <div className="product-bottom">
                                        <div className="product-info-container">
                                            <div className="product-price">
                                                <ProductPrice price={item.price} />
                                            </div>
                                            <div className="product-rating">
                                                <RatingStars
                                                    rating={item.rating}
                                                    numReviews={item.numReviews}
                                                />
                                                <span className="text-secondary">
                                                    | {`${item.numReviews} lượt đánh giá`}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="product-cart-btn"
                                            onClick={() => dispatch(addToCart(item._id, 1))}
                                        >
                                            <FaCartPlus className="icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </section>
            {isModalShown && <SuccessModal message={'Sản phẩm đã được thêm vào giỏ hàng'} />}
        </>
    );
};

export default ProductList;
