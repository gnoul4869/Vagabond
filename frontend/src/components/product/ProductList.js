import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../../redux/actions/productActions';
import PriceFormat from '../PriceFormat';
import ProductListLoading from '../loading/ProductListLoading';
import RatingStars from '../RatingStars';
import ErrorPage from '../../pages/error/ErrorPage';
import { FaCartPlus } from 'react-icons/fa';
import { addToCart } from '../../redux/actions/cartActions';
import InfoModal from '../modals/InfoModal';
import { FiChevronDown } from 'react-icons/fi';

const ProductList = () => {
    const dispatch = useDispatch();
    const { isLoading, products, error } = useSelector((state) => state.productList);
    const cart = useSelector((state) => state.cart);

    const [isModalShown, setIsModalShown] = useState(false);
    const [cartError, setCartError] = useState('');
    const [modalError, setModalError] = useState('');

    const cartBtnHandler = (productID) => {
        if (!cart.isLoading) {
            dispatch(addToCart(productID, 1));
        }
    };

    useEffect(() => {
        if (cart.isDone === true) {
            setCartError(cart.error);
            setIsModalShown(true);
            setModalError(cart.modalError);
        }
        if (isModalShown === true) {
            const modalTimeout = setTimeout(() => setIsModalShown(false), 2000);
            return () => {
                clearTimeout(modalTimeout);
            };
        }
    }, [cart.error, cart.isDone, cart.modalError, isModalShown]);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    if (error || cartError) {
        return <ErrorPage error={error || cartError} />;
    }

    return (
        <>
            <div className="container bg-white p-2">
                <div className="container d-flex">
                    <div className="d-flex align-items-center">
                        <div className="text-secondary fw-600 me-4">Sắp xếp theo</div>
                        <div className="option-btn me-3">Liên quan</div>
                        <div className="option-btn option-btn-active me-3">Mới nhất</div>
                        <div className="option-btn me-3">Bán chạy</div>
                        <div className="option-select">
                            Giá thấp đến cao
                            <FiChevronDown className="ms-2" />
                        </div>
                    </div>

                    <div className="d-inline-flex align-items-center ms-auto">
                        <div className="text-secondary fw-600 me-4">Danh mục</div>
                        <div className="option-select">
                            Tất cả <FiChevronDown className="ms-2" />
                        </div>
                    </div>
                </div>
            </div>

            <section className="container d-flex flex-wrap p-0 pt-1">
                {isLoading ? (
                    <ProductListLoading />
                ) : (
                    products &&
                    products.map((item) => {
                        return (
                            <div key={item.id} className="product-wrapper">
                                <div className="product-container">
                                    <Link to={`/product/${item.id}`} className="link-inherit">
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
                                                <PriceFormat price={item.price} />
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
                                            onClick={() => cartBtnHandler(item.id)}
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
            {isModalShown && (
                <InfoModal
                    message={modalError ? modalError : 'Sản phẩm đã được thêm vào giỏ hàng'}
                    isError={modalError}
                />
            )}
        </>
    );
};

export default ProductList;
