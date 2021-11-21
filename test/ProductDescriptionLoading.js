import React from 'react';

const ProductDescriptionLoading = () => {
    return (
        <>
            <div className="container bg-white mt-3 p-3">
                <div className="bg-label container rounded mb-3">
                    <div className="product-description-label fs-4">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                </div>
                <div className="container p-3">
                    <div className="row">
                        <div className="col-4 col-md-3 col-lg-2 text-secondary product-description-label">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                        <div className="col p-0">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 col-md-3 col-lg-2 text-secondary product-description-label">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                        <div className="col p-0">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container bg-white mt-3 p-3">
                <div className="bg-label container rounded mb-3">
                    <div className="product-description-label fs-4">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                </div>
                <div className="container p-3">
                    <div className="bg-loading rounded-pill"></div>
                </div>
            </div>
        </>
    );
};

export default ProductDescriptionLoading;
