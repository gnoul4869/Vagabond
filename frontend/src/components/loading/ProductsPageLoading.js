import React from 'react';

const ProductsPageLoading = () => {
    return [...Array(20)].map((x, index) => {
        return (
            <div key={index} className="product-wrapper">
                <div className="product-container">
                    <div className="product-image-container">
                        <div className="product-image bg-loading"></div>
                    </div>
                    <div className="product-name bg-loading rounded-pill"></div>

                    <div className="product-bottom">
                        <div className="product-info-container">
                            <div className="product-price">
                                <div className="bg-loading rounded-pill w-75"></div>
                            </div>
                            <div className="product-rating">
                                <div className="bg-loading rounded-pill w-50"></div>
                            </div>
                        </div>
                        <div className="bg-loading rounded-pill w-25"></div>
                    </div>
                </div>
            </div>
        );
    });
};

export default ProductsPageLoading;
