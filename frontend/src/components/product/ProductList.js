import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../../redux/actions/productActions';
import ProductPrice from './ProductPrice';
import ProductListLoading from '../loading/ProductListLoading';
import RatingStars from '../RatingStars';
import ErrorPage from '../../pages/error/ErrorPage';
import { FaCartPlus } from 'react-icons/fa';
import { addToCart } from '../../redux/actions/cartActions';

const ProductList = () => {
    const dispatch = useDispatch();
    const { isLoading, products, error } = useSelector((state) => state.productList);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <section className="product-list container pt-3">
            {isLoading ? (
                <ProductListLoading />
            ) : (
                products &&
                products.map((item) => {
                    return (
                        <div key={item._id} className="product-container">
                            <Link to={`/product/${item._id}`} className="link-inherit">
                                <div className="product-image">
                                    <img src={item.images[0]} alt={item.name} />
                                </div>
                                <div className="product-name line-clamp-2">{item.name}</div>
                            </Link>

                            <div className="product-bottom">
                                <div className="product-price-status-container">
                                    <span className="product-price">
                                        <ProductPrice price={item.price} />
                                    </span>
                                    <div className="product-status">
                                        <RatingStars
                                            rating={item.rating}
                                            numReviews={item.numReviews}
                                        />
                                        <span className="product-num-reviews text-secondary">
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
                    );
                })
            )}
        </section>
    );
};

export default ProductList;
