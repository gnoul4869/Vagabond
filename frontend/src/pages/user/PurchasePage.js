import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
import HashLoader from 'react-spinners/HashLoader';
import { listOrders, refreshOrders, updateOrder } from '../../redux/actions/orderActions';
import { purchaseLabels } from '../../data/purchaseLabels';
import PriceFormat from '../../components/PriceFormat';
import ErrorPage from '../error/ErrorPage';
import EmptyPurchase from '../../components/EmptyPurchase';
import ShippingDetails from '../../components/order/ShippingDetails';
import PurchaseDetails from '../../components/order/PurchaseDetails';

const PurchasePage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { orderList, total, isDone, isLoading, error } = useSelector((state) => state.order);

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [activeID, setActiveID] = useState(0);
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);

    const isAdmin = userInfo && userInfo.role === 'admin' && location.pathname === '/control';

    const infiniteScroll = () => {
        setPage(page + 1);
    };

    const orderHandler = (id, status) => {
        if (!isLoading) {
            dispatch(updateOrder(id, status));
        }
    };

    useEffect(() => {
        dispatch(listOrders(status, page, isAdmin));
    }, [dispatch, isAdmin, page, status]);

    useEffect(() => {
        dispatch(refreshOrders());
        setPage(1);
        setStatus(purchaseLabels.find((label) => label.id === activeID).status);
        setIsInitialLoad(true);
    }, [activeID, dispatch]);

    useEffect(() => {
        if (isInitialLoad && isDone) {
            setIsInitialLoad(false);
        }
    }, [isInitialLoad, isDone]);

    useEffect(() => {
        if (isDone) {
            dispatch(refreshOrders('REFRESH_IS_DONE'));
        }
    }, [dispatch, isDone]);

    useEffect(() => {
        if (!userInfo) {
            history.push({
                pathname: '/user/login',
                state: { oldLocation: location.pathname },
            });
        }
    }, [history, location.pathname, userInfo]);

    if (error && error !== 'Không có đơn hàng nào') {
        return <ErrorPage error={error} backHome={true} />;
    }

    return (
        <>
            <div className="container bg-white p-0">
                <div className="d-flex fsr-2 text-sdark text-center">
                    {purchaseLabels.map((label) => {
                        return (
                            <div
                                key={label.id}
                                onClick={() => setActiveID(label.id)}
                                className={`purchase-label col py-3 ${
                                    activeID === label.id && 'active'
                                }`}
                            >
                                {label.name}
                            </div>
                        );
                    })}
                </div>
            </div>

            {isInitialLoad ? (
                <HashLoader
                    color="#c73434"
                    css="display: inherit; margin: 12rem auto 30rem;"
                    width="3.125rem"
                />
            ) : orderList.length === 0 ? (
                <EmptyPurchase />
            ) : (
                <InfiniteScroll
                    dataLength={orderList.length}
                    next={infiniteScroll}
                    hasMore={orderList.length < total}
                    scrollThreshold={0.7}
                    loader={
                        <HashLoader
                            color="#c73434"
                            css="display: inherit; margin: 5rem auto;"
                            width="3.125rem"
                        />
                    }
                >
                    {orderList.map((order) => {
                        const totalItemsPrice = order.products.reduce(
                            (a, c) => a + c.price * c.qty,
                            0
                        );

                        return (
                            <div key={order.id} className="bg-white mt-3 mx-auto">
                                {isAdmin && (
                                    <div className="container bg-label px-2 fsr-2">
                                        <span className="text-secondary">Mã đơn hàng:</span>
                                        <span className="text-steelblue fw-600 ms-2">
                                            {order.id.toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div className="container px-2 py-3 p-md-4">
                                    <div className="d-flex align-items-center">
                                        {purchaseLabels.map((label) => {
                                            return (
                                                label.status === order.status && (
                                                    <React.Fragment key={label.id}>
                                                        <div
                                                            className={`fw-600 fsr-3 me-auto ${label.color}`}
                                                        >
                                                            <span>{label.icon}</span>
                                                            <span>
                                                                {isAdmin
                                                                    ? label.textAlt
                                                                        ? label.textAlt
                                                                        : label.text
                                                                    : label.text}
                                                            </span>
                                                        </div>

                                                        {label.status === 'pending'
                                                            ? isAdmin && (
                                                                  <button
                                                                      className="button-main btn-accept fsr-3 p-0"
                                                                      onClick={() =>
                                                                          orderHandler(
                                                                              order.id,
                                                                              'shipping'
                                                                          )
                                                                      }
                                                                  >
                                                                      Chấp nhận
                                                                  </button>
                                                              )
                                                            : label.status === 'shipping' &&
                                                              isAdmin && (
                                                                  <button
                                                                      className="button-main btn-complete fsr-3 p-0"
                                                                      onClick={() =>
                                                                          orderHandler(
                                                                              order.id,
                                                                              'delivered'
                                                                          )
                                                                      }
                                                                  >
                                                                      Đã nhận hàng
                                                                  </button>
                                                              )}

                                                        {(label.status === 'pending' ||
                                                            (label.status === 'shipping' &&
                                                                isAdmin)) && (
                                                            <button
                                                                className="button-main btn-cancel fsr-3 p-0 ms-3 me-1"
                                                                onClick={() =>
                                                                    orderHandler(
                                                                        order.id,
                                                                        'cancelled'
                                                                    )
                                                                }
                                                            >
                                                                Hủy
                                                            </button>
                                                        )}
                                                    </React.Fragment>
                                                )
                                            );
                                        })}
                                    </div>
                                </div>

                                <ShippingDetails
                                    name={order.user.name}
                                    phoneNumber={order.user.phoneNumber}
                                    provinceName={order.user.address.provinceName}
                                    districtName={order.user.address.districtName}
                                    wardName={order.user.address.wardName}
                                    addressDetails={order.user.address.addressDetails}
                                />

                                <div className="divider-strong-bottom"></div>

                                {order.products.map((product, index) => {
                                    return (
                                        <React.Fragment key={product._id}>
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="link-inherit"
                                            >
                                                <div className="container fsr-2 px-3 py-4 position-relative">
                                                    {order.status === 'delivered' &&
                                                        product.current &&
                                                        product.current.reviewers.includes(
                                                            userInfo.id
                                                        ) && (
                                                            <div className="purchase-product-review-status">
                                                                Có thể đánh giá
                                                            </div>
                                                        )}
                                                    <div className="row align-items-center">
                                                        <div className="col-12 col-md-8 ms-0 ms-md-3">
                                                            <div className="d-flex">
                                                                <div className="cart-item-image-container">
                                                                    <img
                                                                        src={product.image}
                                                                        alt={product.name}
                                                                        className="cart-item-image"
                                                                    />
                                                                </div>
                                                                <div className="cart-item-name ms-2 ms-md-4">
                                                                    {product.name}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-6 col-md mt-2 mt-md-0">
                                                            <div className="text-sdark fw-600 text-center text-md-start">
                                                                <span className="d-none d-md-inline-block text-secondary me-2">
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
                                                                <span className="d-none d-md-inline-block text-secondary me-2">
                                                                    Số tiền:
                                                                </span>
                                                                <PriceFormat
                                                                    price={product.price}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>

                                            {index + 1 < order.products.length && (
                                                <div className="divider-bottom"></div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}

                                <div className="divider-strong-bottom"></div>

                                <div className="p-2 p-md-3 bg-warm">
                                    <PurchaseDetails
                                        totalItemsPrice={totalItemsPrice}
                                        shippingFee={order.shippingFee}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </InfiniteScroll>
            )}
        </>
    );
};

export default PurchasePage;
