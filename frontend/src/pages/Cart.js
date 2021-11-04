import React from 'react';
import { useLocation } from 'react-router';

const Cart = () => {
    const location = useLocation();

    const productID = location.state && location.state.productID && location.state.productID;

    return (
        <>
            <div className="container bg-white mt-4 p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-auto">
                            <input type="checkbox" className="form-check-input" />
                        </div>
                        <div className="col-4">
                            <div className="text-secondary fw-600">Sản Phẩm</div>
                        </div>
                        <div className="col">
                            <div className="text-secondary fw-600">Đơn Giá</div>
                        </div>
                        <div className="col">
                            <div className="text-secondary fw-600">Số Lượng</div>
                        </div>
                        <div className="col">
                            <div className="text-secondary fw-600">Số tiền</div>
                        </div>
                        <div className="col">
                            <div className="text-secondary fw-600">Thao tác</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container bg-white mt-2 p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-auto">
                            <input type="checkbox" className="form-check-input" />
                        </div>
                        <div className="col-4">
                            <div className="text-secondary fw-600">Sản Phẩm</div>
                        </div>
                        <div className="col">
                            <div className="text-secondary fw-600">Đơn Giá</div>
                        </div>
                        <div className="col">
                            <div className="text-secondary fw-600">Số Lượng</div>
                        </div>
                        <div className="col">
                            <div className="text-secondary fw-600">Số tiền</div>
                        </div>
                        <div className="col">
                            <div className="text-secondary fw-600">Thao tác</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
