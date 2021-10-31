import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();

    return (
        <section className="container my-5 pt-5">
            <div className="row mt-5">{id}</div>
        </section>
    );
};

export default ProductDetails;
