import React from 'react';

const ProductCarouselLoading = () => {
    return (
        <div className="container mb-4 mb-lg-0">
            <div className="row">
                <div className="product-carousel-img-big bg-loading"></div>
            </div>
            <div className="row justify-content-center align-items-center mt-3 mx-md-2">
                <div className="col d-flex justify-content-center flex-wrap">
                    <div className="product-carousel-img-container">
                        <div className="product-carousel-img-small bg-loading"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCarouselLoading;
