import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import { FaCartPlus } from 'react-icons/fa';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { IoIosWarning } from 'react-icons/io';
import ErrorPage from './ErrorPage';
import NumberInput from '../components/NumberInput';
import RatingStars from '../components/RatingStars';
import ProductPrice from '../components/ProductPrice';
import ProductDetailsLoading from '../components/loading/ProductDetailLoading';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, product, error } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(id));
    }, [dispatch, id]);

    if (error) {
        console.log('ok');
        return <ErrorPage error={error} />;
    }

    console.log(qty);

    return (
        <section>
            {loading ? (
                <ProductDetailsLoading />
            ) : (
                product && (
                    <div className="container bg-white mt-5">
                        <div className="container p-3">
                            <div className="row h-3">
                                <div className="col-12 col-md-6 col-lg-5 mx-auto">
                                    <img
                                        src={product.image[0]}
                                        alt={product.name}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-12 col-md-6 col-lg-5 mx-auto">
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
                                        <div className="container product-details-price-container rounded">
                                            <span className="fs-3">Giá:</span>{' '}
                                            <span className="product-price fs-2 ms-2">
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
                                                setQty={setQty}
                                                max={product.countInStock}
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
                                                <IoIosWarning className="icon" /> Sản phẩm tạm hết
                                            </span>
                                        ) : (
                                            <>
                                                <div className="col-auto mb-2 mb-xl-0">
                                                    <button
                                                        type="button"
                                                        className="product-details-btn btn-cart"
                                                    >
                                                        <FaCartPlus className="icon" /> Thêm vào giỏ
                                                        hàng
                                                    </button>
                                                </div>
                                                <div className="col-auto mb-2 mb-xl-0">
                                                    <button className="product-details-btn btn-buy">
                                                        <RiShoppingBag3Fill className="icon" /> Mua
                                                        ngay
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </section>
    );
};

export default ProductDetails;
