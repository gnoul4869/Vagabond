import React from 'react';
import ProductCarouselLoading from './ProductCarouselLoading';
import ProductDescriptionLoading from './ProductDescriptionLoading';

const ProductDetailsLoading = () => {
    return (
        <section>
            <div className="container bg-white">
                <div className="container p-3">
                    <div className="row h-3">
                        <div className="col-12 col-md-6 mx-auto">
                            <ProductCarouselLoading />
                        </div>
                        <div className="col-12 col-md-6 mx-auto">
                            <div className="row">
                                <div className="product-details-name bg-loading rounded-pill"></div>
                            </div>
                            <div className="row my-4">
                                <div className="container">
                                    <div className="product-details-value me-1 bg-loading rounded-pill"></div>
                                    <div className="bg-loading rounded-pill w-50"></div>
                                    <div className="product-details-reviews">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="bg-label container rounded">
                                    <div className="bg-loading rounded-pill"></div>
                                    <div className="ms-2">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-auto my-auto product-details-label">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                                <div className="col-auto">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                                <div className="col-auto my-auto text-secondary product-details-label">
                                    <div className="product-details-value">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-auto mb-2 mb-xl-0">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                                <div className="col-auto mb-2 mb-xl-0">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductDescriptionLoading />
        </section>
    );
};

export default ProductDetailsLoading;
