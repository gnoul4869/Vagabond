import React from 'react';
import CartItemsLoading from '../CartItemsLoading';
import ShippingDetailsLoading from './ShippingDetailsLoading';

const CheckoutPageLoading = () => {
    return (
        <>
            <div className="mt-3">
                <ShippingDetailsLoading />
            </div>

            <div className="container bg-white mt-2 p-4">
                <div className="row g-0 mb-3 d-none d-md-flex">
                    <div className="col pe-5">
                        <div className="bg-loading rounded-pill w-50"></div>
                    </div>
                    <div className="col pe-5">
                        <div className="bg-loading rounded-pill w-50"></div>
                    </div>
                    <div className="col pe-5">
                        <div className="bg-loading rounded-pill w-50"></div>
                    </div>
                    <div className="col pe-5">
                        <div className="bg-loading rounded-pill w-55"></div>
                    </div>
                </div>

                <CartItemsLoading options={{ deleteBtn: false }} />

                <div className="row text-secondary fw-600 g-0 d-flex justify-content-center">
                    <div className="col-3 ms-auto">
                        <div className="bg-loading rounded-pill"></div>
                    </div>

                    <div className="col-auto d-flex align-items-center mx-2">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                </div>
            </div>

            <div className="container bg-white mt-2 p-3">
                <div className="row align-items-center text-sdark fw-600 px-md-3">
                    <div className="col-4">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                    <div className="col-4 offset-4">
                        <div className="row">
                            <div className="col">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                        <div className="row g-0 mx-2 mt-2">
                            <div className="col-6 ms-auto">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                            <div className="col-4 ms-2">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="divider-dash-bottom my-3"></div>

                <div className="row text-secondary">
                    <div className="col offset-md-5 offset-lg-7 offset-xl-8 ps-md-5">
                        <div className="ps-md-4">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                    <div className="col fw-600 text-end">
                        <div className="me-md-3">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                </div>
                <div className="row text-secondary mt-2">
                    <div className="col offset-md-5 offset-lg-7 offset-xl-8 ps-md-5">
                        <div className="ps-md-4">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                    <div className="col fw-600 text-end">
                        <div className="me-md-3">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center text-secondary mt-2">
                    <div className="col offset-md-5 offset-lg-7 offset-xl-8 ps-md-5">
                        <div className="ps-md-4">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                    <div className="col text-end">
                        <div className="me-md-3">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                </div>

                <div className="divider-dash-bottom my-3"></div>

                <div className="row justify-content-center">
                    <div className="col-8 col-sm-6 col-md-3 p-0 my-2 ms-md-auto me-md-4">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPageLoading;
