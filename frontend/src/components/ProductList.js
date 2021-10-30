import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { listProducts } from '../actions/productActions';
import Loading from './Loading';

const ProductList = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    console.log(typeof products);

    return (
        <div class="container-fluid bg-trasparent my-4 p-3">
            <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    products.map((item) => {
                        return (
                            <div key={item.id} class="col">
                                <div class="card h-100 shadow-sm">
                                    <img src={item.image} class="card-img-top" alt={item.name} />
                                    <div class="card-body">
                                        <div class="clearfix mb-3">
                                            <span class="float-start badge rounded-pill bg-primary">
                                                {item.brand}
                                            </span>
                                            <h5 class="float-end">
                                                <NumberFormat
                                                    value={item.price}
                                                    displayType={'text'}
                                                    thousandSeparator={'.'}
                                                    decimalSeparator={','}
                                                    prefix={'₫'}
                                                ></NumberFormat>
                                            </h5>
                                        </div>
                                        <h5 class="card-title">{item.name}</h5>
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
