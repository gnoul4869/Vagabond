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
                        <div className="row h-3">
                            <div className="col-12 col-md-6">
                                <img
                                    src={product.image[0]}
                                    alt={product.name}
                                    className="img-fluid"
                                />
                            </div>
                            <div className="col-12 col-md-6 bg-primary">test</div>
                        </div>
                    </div>
                )
            )}
        </section>
    );
};

export default ProductDetails;
