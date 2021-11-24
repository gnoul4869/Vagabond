import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { detailProduct } from '../redux/actions/productActions';
import { FaCartPlus } from 'react-icons/fa';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { IoIosWarning } from 'react-icons/io';
import ErrorPage from './error/ErrorPage';
import NumberInput from '../components/NumberInput';
import RatingStars from '../components/RatingStars';
import PriceFormat from '../components/PriceFormat';
import ProductCarousel from '../components/product/ProductCarousel';
import ProductDetailsPageLoading from '../components/loading/ProductDetailsPageLoading';
import ProductDescription from '../components/product/ProductDescription';
import BreadCrumbs from '../components/BreadCrumbs';
import { addToCart } from '../redux/actions/cartActions';
import SuccessModal from '../components/modals/SuccessModal';

const ProductDetailsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const { isLoading, product, error } = useSelector((state) => state.productDetails);
    const isDone = useSelector((state) => state.cart.isDone);
    const [isModalShown, setIsModalShown] = useState(false);

    useEffect(() => {
        dispatch(detailProduct(id));
    }, [dispatch, id]);

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

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            {isLoading ? (
                <ProductDetailsPageLoading />
            ) : (
                product && (
                    <>
                        <BreadCrumbs category={product.category} name={product.name} />
                        <section>
                            <div className="container bg-white">
                                <div className="container p-3">
                                    <div className="row h-3">
                                        <div className="col-12 col-md-6 mx-auto">
                                            <ProductCarousel
                                                images={product.images}
                                                name={product.name}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 mx-auto">
                                            <div className="row">
                                                <div className="product-details-name fs-3">
                                                    {product.name}
                                                </div>
                                            </div>
                                            <div className="row my-4">
                                                <div className="container">
                                                    <span className="product-details-value me-1">
                                                        {product.rating}
                                                    </span>
                                                    <RatingStars
                                                        rating={product.rating}
                                                        numReviews={product.numReviews}
                                                    />
                                                    <span className="product-details-separator"></span>
                                                    <span className="product-details-reviews text-secondary">
                                                        <span className="product-details-value">
                                                            {product.numReviews}
                                                        </span>{' '}
                                                        lượt đánh giá
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row my-4">
                                                <div className="bg-label container rounded">
                                                    <span className="fs-3">Giá:</span>{' '}
                                                    <span className="text-ired fw-600 fs-2 ms-2">
                                                        <PriceFormat price={product.price} />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-auto my-auto text-secondary product-details-label">
                                                    Số lượng
                                                </div>
                                                <div className="col-auto">
                                                    <NumberInput
                                                        qty={qty}
                                                        max={product.countInStock}
                                                        setQty={setQty}
                                                    />
                                                </div>
                                                <div className="col-auto my-auto text-secondary product-details-label">
                                                    <span className="product-details-value">
                                                        {product.countInStock}
                                                    </span>{' '}
                                                    sản phẩm có sẵn
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                {product.countInStock <= 0 ? (
                                                    <span className="fw-bold fs-4 text-danger">
                                                        <IoIosWarning className="icon" /> Sản phẩm
                                                        tạm hết
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className="col-auto mb-2 mb-xl-0">
                                                            <button
                                                                type="button"
                                                                className="product-details-btn btn-cart"
                                                                onClick={() =>
                                                                    dispatch(
                                                                        addToCart(product._id, qty)
                                                                    )
                                                                }
                                                            >
                                                                <FaCartPlus className="icon" /> Thêm
                                                                vào giỏ hàng
                                                            </button>
                                                        </div>
                                                        <div className="col-auto mb-2 mb-xl-0">
                                                            <button
                                                                className="product-details-btn btn-buy"
                                                                onClick={() =>
                                                                    dispatch(
                                                                        addToCart(
                                                                            product._id,
                                                                            qty,
                                                                            history
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                <RiShoppingBag3Fill className="icon" />{' '}
                                                                Mua ngay
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ProductDescription
                                category={product.category}
                                brand={product.brand}
                                weight={product.weight}
                                description={product.description}
                            />
                        </section>
                        {isModalShown && (
                            <SuccessModal message={'Sản phẩm đã được thêm vào giỏ hàng'} />
                        )}
                    </>
                )
            )}
        </>
    );
};

export default ProductDetailsPage;
