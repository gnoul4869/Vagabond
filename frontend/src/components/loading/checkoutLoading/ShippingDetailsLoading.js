import React from 'react';

const ShippingDetailsLoading = () => {
    return (
        <div className="mt-3 bg-white">
            <div className="postcard-border"></div>
            <div className="container p-4">
                <div className="bg-loading rounded-pill w-30"></div>
                <div className="container px-0 px-md-4">
                    <div className="row mt-3">
                        <div className="col-12 col-md">
                            <div className="row">
                                <div className="col-3 col-md-3 col-lg-4 text-secondary">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                                <div className="col-6 p-0">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md mt-3 mt-md-0">
                            <div className="row">
                                <div className="col-3 col-md-3 col-lg-4 text-secondary">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                                <div className="col-4 p-0">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-3 col-md-3 col-lg-2 text-secondary">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                        <div className="col-5 p-0">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-3 col-md-3 col-lg-2 text-secondary">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                        <div className="col-6 p-0">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingDetailsLoading;
