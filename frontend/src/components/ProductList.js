import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {products.map((item) => (
                        <div>{item.name}</div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ProductList;
