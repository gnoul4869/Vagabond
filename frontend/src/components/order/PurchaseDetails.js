import React from 'react';
import PriceFormat from '../PriceFormat';

const PurchaseDetails = ({ totalItemsPrice, shippingFee }) => {
    return (
        <>
            <div className="row text-secondary g-0">
                <div className="col offset-md-5 offset-lg-7 offset-xl-8 ps-md-5">
                    <div className="ps-md-4">Tổng tiền hàng:</div>
                </div>
                <div className="col fw-600 text-end">
                    <div className="me-md-3">
                        <PriceFormat price={totalItemsPrice} />
                    </div>
                </div>
            </div>
            <div className="row text-secondary g-0 mt-2">
                <div className="col offset-md-5 offset-lg-7 offset-xl-8 ps-md-5">
                    <div className="ps-md-4">Phí vận chuyển:</div>
                </div>
                <div className="col fw-600 text-end">
                    <div className="me-md-3">
                        <PriceFormat price={shippingFee} />
                    </div>
                </div>
            </div>
            <div className="row align-items-center text-secondary g-0 mt-2">
                <div className="col offset-md-5 offset-lg-7 offset-xl-8 ps-md-5">
                    <div className="ps-md-4">Tổng thanh toán:</div>
                </div>
                <div className="col text-end">
                    <div className="me-md-3">
                        <span className="text-ired fw-600 fs-3">
                            <PriceFormat price={totalItemsPrice + shippingFee} />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PurchaseDetails;
