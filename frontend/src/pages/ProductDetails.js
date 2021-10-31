import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import ProductDetailsLoading from '../components/loading/ProductDetailLoading';
import ErrorPage from './ErrorPage';

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
                    <div className="container mt-5">
                        {console.log(product)}
                        <div className="row">
                            <div className="col">
                                <img src={product.image[0]} alt="" />
                            </div>
                        </div>
                    </div>
                )
            )}
        </section>
    );
};

export default ProductDetails;
