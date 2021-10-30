import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { listProducts } from '../actions/productActions';
import Loading from './Loading';
import RatingStars from './RatingStars';

const ProductList = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div className="container-fluid bg-trasparent my-4 p-3">
            <div className="row-cols-2 row row-cols-sm-2 row-cols-md-2 row-cols-lg-5 g-4">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    products.map((item) => {
                        return (
                            <div key={item._id} className="col">
                                <div className="card h-100 w-10 shadow-sm">
                                    <img
                                        src={item.image}
                                        className="card-img-top"
                                        alt={item.name}
                                    />
                                    <div className="card-body d-flex flex-column text-start">
                                        <div className="text-secondary fw-bold flex-fill ">
                                            {item.name.length >= 48
                                                ? `${item.name.substring(0, 45)}...`
                                                : item.name}
                                        </div>
                                        <div className="product-list-price fs-5">
                                            <NumberFormat
                                                value={item.price}
                                                displayType={'text'}
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                prefix={'₫'}
                                            ></NumberFormat>
                                        </div>
                                        <RatingStars
                                            rating={item.rating}
                                            numReviews={item.numReviews}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ProductList;
