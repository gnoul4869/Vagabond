import React from 'react';

const ProductDetailsLoading = () => {
    return (
        <>
            <div className="container bg-white mt-5">
                <div className="container p-3">
                    <div className="row h-3">
                        <div className="col-12 col-md-6 mx-auto">
                            <div className="container mb-4 mb-lg-0">
                                <div className="row">
                                    <div className="product-details-loading-img-big bg-loading mx-auto"></div>
                                </div>
                                <div className="row mt-3 justify-content-center">
                                    <div className="product-carousel-img-container col d-flex justify-content-center flex-wrap">
                                        <div className="product-details-loading-img-small bg-loading me-1 mb-2"></div>
                                        <div className="product-details-loading-img-small bg-loading me-1 mb-2"></div>
                                        <div className="product-details-loading-img-small bg-loading me-1 mb-2"></div>
                                        <div className="product-details-loading-img-small bg-loading me-1 mb-2"></div>
                                        <div className="product-details-loading-img-small bg-loading me-1 mb-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mx-auto">
                            <div className="row">
                                <div className="col-10 p-0 mb-5">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                                <div className="row my-4">
                                    <div className="col-3 p-0">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                    <div className="col-1">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                    <div className="col-3 p-0">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                </div>
                                <div className="row my-4 product-label-bg">
                                    <div className="col-3">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                    <div className="col-6">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-3 p-0">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                    <div className="col-3">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                    <div className="col-3 p-0">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-12 col-lg-5 mt-3 mx-0 pe-1 px-0">
                                        <div className="bg-loading product-details-loading-btn rounded-pill"></div>
                                    </div>
                                    <div className="col-12 col-lg-5 mt-3 mx-0 px-0">
                                        <div className="bg-loading product-details-loading-btn rounded-pill"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container bg-white mt-3 p-3">
                <div className="product-label-bg container rounded mb-3">
                    <div className="col-2 p-0 mb-5">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                </div>
                <div className="container mb-3">
                    <div className="row">
                        <div className="col-2 pe-5">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                        <div className="col-5">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container bg-white mt-3 p-3">
                <div className="product-label-bg container rounded mb-3">
                    <div className="col-2 p-0 mb-5">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                    <div className="col-2 mb-5">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailsLoading;
