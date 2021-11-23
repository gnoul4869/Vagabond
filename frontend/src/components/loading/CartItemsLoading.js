import React from 'react';

const CartItemsLoading = ({ options }) => {
    return [...Array(3)].map((x, index) => {
        return (
            <div key={index}>
                <div className="row d-flex align-items-center g-0">
                    <div className="col-12 col-md-3">
                        <div className="row g-0">
                            <div className="col-auto">
                                <div className="cart-item-img-loading bg-loading"></div>
                            </div>
                            <div className="col ms-3">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md pe-5 mt-2 mt-md-0">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                    <div className="col-6 col-md pe-5 mt-2 mt-md-0">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                    <div className="col d-none d-md-block pe-5 mt-2 mt-md-0">
                        <div className="bg-loading rounded-pill"></div>
                    </div>
                    {options.deleteBtn && (
                        <div className="col-12 col-md-1 mt-2 mt-md-0 d-flex justify-content-end justify-content-md-center">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    )}
                </div>
                <div className="divider-bottom my-3"></div>
            </div>
        );
    });
};

export default CartItemsLoading;
