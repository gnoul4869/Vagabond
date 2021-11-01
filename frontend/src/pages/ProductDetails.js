import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import ErrorPage from './ErrorPage';
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
                                <div className="col-4 col-md-3 mx-auto">
                                    <img
                                        src={product.image[0]}
                                        alt={product.name}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-8 col-md-6 mx-auto">
                                    <div className="row">
                                        <div className="product-details-name fs-3">
                                            {product.name}
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="container">
                                            <span className="product-details-rating me-1">
                                                {product.rating}
                                            </span>
                                            <RatingStars
                                                rating={product.rating}
                                                numReviews={product.numReviews}
                                            />
                                            <span className="product-details-separator"></span>
                                            <span className="product-details-reviews text-secondary">
                                                <span className="product-details-rating">
                                                    {product.numReviews}
                                                </span>{' '}
                                                lượt đánh giá
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="container product-details-price-container rounded">
                                            <span className="fs-3">Giá:</span>{' '}
                                            <span className="product-price fs-2">
                                                <ProductPrice price={product.price} />
                                            </span>
                                        </div>
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
