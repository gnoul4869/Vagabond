import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrders } from '../../redux/actions/orderActions';
import { purchaseLabels } from '../../data/purchaseLabels';
import OrdersLoading from '../../components/loading/OrdersLoading';
import PriceFormat from '../../components/PriceFormat';
import ErrorPage from '../error/ErrorPage';
import EmptyPurchase from '../../components/EmptyPurchase';

const PurchasePage = () => {
    const dispatch = useDispatch();
    const [activeID, setActiveID] = useState(0);

    const { orderList, isLoading, error } = useSelector((state) => state.order);

    useEffect(() => {
        if (activeID === 0) {
            return dispatch(listOrders());
        }
        if (activeID === 1) {
            return dispatch(listOrders('pending'));
        }
        if (activeID === 2) {
            return dispatch(listOrders('shipping'));
        }
        if (activeID === 3) {
            return dispatch(listOrders('delivered'));
        }
        if (activeID === 4) {
            return dispatch(listOrders('cancelled'));
        }
    }, [activeID, dispatch]);

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            <div className="container bg-white mt-3 mx-auto">
                <div className="row fsr-2 text-sdark text-center">
                    {purchaseLabels.map((item) => {
                        return (
                            <div
                                key={item.id}
                                onClick={() => setActiveID(item.id)}
                                className={`purchase-label col py-3 ${
                                    activeID === item.id && 'purchase-label-active'
                                }`}
                            >
                                {item.name}
                            </div>
                        );
                    })}
                </div>
            </div>

            {isLoading ? (
                <OrdersLoading />
            ) : orderList.length === 0 ? (
                <EmptyPurchase />
            ) : (
                orderList.map((order) => {
                    const totalItemsPrice = order.products.reduce((a, c) => a + c.price * c.qty, 0);

                    return (
                        <div key={order._id} className="bg-white mt-3 mx-auto">
                            <div className="container p-4">
                                <div className="d-flex align-items-center px-1">
                                    {purchaseLabels.map((label) => {
                                        return (
                                            label.code === order.status && (
                                                <>
                                                    <div
                                                        className={`fw-600 fsr-3 me-auto ${label.color}`}
                                                    >
                                                        <span>{label.icon}</span>
                                                        {label.text}
                                                    </div>
                                                    {label.code === 'pending' && (
                                                        <button className="button-main btn-cancel fsr-3 p-0">
                                                            Hủy
                                                        </button>
                                                    )}
                                                </>
                                            )
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="divider-strong-bottom"></div>

                            {order.products.map((product, index) => {
                                return (
                                    <React.Fragment key={product._id}>
                                        <div className="container p-3">
                                            <div className="row align-items-center">
                                                <div className="col-12 col-md-8 ms-0 ms-md-3">
                                                    <Link
                                                        to={`/product/${product._id}`}
                                                        className="link-inherit"
                                                    >
                                                        <div className="d-flex">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="cart-item-img"
                                                            />
                                                            <div className="cart-item-name ms-2">
                                                                {product.name}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>

                                                <div className="col-6 col-md mt-2 mt-md-0">
                                                    <div className="text-sdark fw-600 text-center text-md-start">
                                                        <span className="d-none d-md-inline-block text-secondary fsr-1 me-2">
                                                            Số lượng:
                                                        </span>
                                                        <span className="d-inline-block d-md-none">
                                                            x
                                                        </span>
                                                        {product.qty}
                                                    </div>
                                                </div>

                                                <div className="col mt-2 mt-md-0">
                                                    <div className="text-sdark fw-600 text-end text-md-start">
                                                        <span className="d-none d-md-inline-block text-secondary fsr-1 me-2">
                                                            Số tiền:
                                                        </span>
                                                        <PriceFormat price={product.price} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {index + 1 < order.products.length && (
                                            <div className="divider-bottom my-3"></div>
                                        )}
                                    </React.Fragment>
                                );
                            })}

                            <div className="divider-strong-bottom"></div>

                            <div className="p-3 bg-warm">
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
                                            <PriceFormat price={order.shippingFee} />
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
                                                <PriceFormat
                                                    price={totalItemsPrice + order.shippingFee}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
};

export default PurchasePage;
