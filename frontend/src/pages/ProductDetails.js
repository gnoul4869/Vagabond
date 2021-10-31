import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import ProductDetailsLoading from '../components/loading/ProductDetailLoading';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, product, error } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(id));
    }, [dispatch, id]);

    return (
        <>
            {loading ? (
                <ProductDetailsLoading />
            ) : error ? (
                <p>test</p>
            ) : (
                <section className="container my-5 pt-5">
                    <div className="row mt-5">dsa</div>
                </section>
            )}
        </>
    );
};

export default ProductDetails;
