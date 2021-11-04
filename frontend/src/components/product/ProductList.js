import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import ProductPrice from './ProductPrice';
import ProductListLoading from '../loading/ProductListLoading';
import RatingStars from '../RatingStars';
import ErrorPage from '../../pages/error/ErrorPage';

const ProductList = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <section className="container bg-trasparent my-4 p-3">
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {loading ? (
                    <ProductListLoading />
                ) : (
                    products &&
                    products.map((item) => {
                        return (
                            <Link to={`/product/${item._id}`} key={item._id} className="link-tag">
                                <div className="col">
                                    <div className="product-list-card card shadow-sm">
                                        <div className="ratio ratio-1x1">
                                            <img
                                                src={item.images[0]}
                                                className="product-list-image card-img-top"
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="card-body d-flex flex-column text-start">
                                            <div className="product-list-name text-secondary fw-bold flex-fill">
                                                {item.name}
                                            </div>
                                            <div className="text-ired fw-600 fs-5">
                                                <ProductPrice price={item.price} />
                                            </div>
                                            <div>
                                                <RatingStars
                                                    rating={item.rating}
                                                    numReviews={item.numReviews}
                                                />
                                                <span className="product-num-reviews text-secondary d-none d-md-inline-block">
                                                    | {`${item.numReviews} lượt đánh giá`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default ProductList;
