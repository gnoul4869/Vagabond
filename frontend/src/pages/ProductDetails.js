import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import { FaCartPlus } from 'react-icons/fa';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { IoIosWarning } from 'react-icons/io';
import ErrorPage from './error/ErrorPage';
import NumberInput from '../components/NumberInput';
import RatingStars from '../components/RatingStars';
import ProductPrice from '../components/product/ProductPrice';
import ProductCarousel from '../components/product/ProductCarousel';
import ProductDetailsLoading from '../components/loading/ProductDetailsLoading';
import ProductDescription from '../components/product/ProductDescription';
import BreadCrumbs from '../components/BreadCrumbs';
import { addToCart } from '../actions/cartActions';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, product, error } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(id));
    }, [dispatch, id]);

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            {loading ? (
                <ProductDetailsLoading />
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
                                                <div className="product-label-bg container rounded">
                                                    <span className="fs-3">Giá:</span>{' '}
                                                    <span className="text-ired fw-600 fs-2 ms-2">
                                                        <ProductPrice price={product.price} />
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
                                description={product.description}
                            />
                        </section>
                    </>
                )
            )}
        </>
    );
};

export default ProductDetails;
