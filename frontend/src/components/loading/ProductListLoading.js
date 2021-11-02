import React from 'react';

const ProductListLoading = () => {
    return (
        <>
            {[...Array(10)].map((x, index) => {
                return (
                    <div key={index} className="col">
                        <div className="product-list-card card shadow-sm">
                            <div className="ratio ratio-1x1">
                                <div className="bg-loading"></div>
                            </div>
                            <div className="card-body d-flex flex-column align-items-start">
                                <div className="container ps-0">
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="bg-loading rounded-pill"></div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-8">
                                            <div className="bg-loading rounded-pill"></div>
                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col-7">
                                            <div className="bg-loading rounded-pill"></div>
                                        </div>
                                        <div className="col-1 ps-0">
                                            <div className="bg-loading rounded-pill"></div>
                                        </div>
                                        <div className="col-4 ps-0">
                                            <div className="bg-loading rounded-pill"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductListLoading;
