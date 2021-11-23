import React from 'react';
import CartItemsLoading from './CartItemsLoading';

const CartPageLoading = () => {
    return (
        <>
            <div className="container bg-white mt-4 p-3 d-none d-md-flex">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-3 ms-2">
                            <div className="bg-loading rounded-pill w-45"></div>
                        </div>
                        <div className="col pe-2">
                            <div className="bg-loading rounded-pill w-50"></div>
                        </div>
                        <div className="col ms-5 pe-2">
                            <div className="bg-loading rounded-pill w-50 ms-4"></div>
                        </div>
                        <div className="col ms-5">
                            <div className="bg-loading rounded-pill w-55 ms-5"></div>
                        </div>
                        <div className="col ms-5 d-flex justify-content-end">
                            <div className="bg-loading rounded-pill w-55 ms-5"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container bg-white mt-2 p-3">
                <div className="container">
                    <CartItemsLoading options={{ deleteBtn: true }} />
                </div>
            </div>

            <div className="container bg-white mt-2 p-3">
                <div className="row text-secondary fw-600 g-0 d-flex justify-content-center">
                    <div className="col-3 ms-auto">
                        <div className="bg-loading rounded-pill"></div>
                    </div>

                    <div className="col-auto d-flex align-items-center mx-2">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPageLoading;
