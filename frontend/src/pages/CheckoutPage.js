import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { getUserDetails } from '../redux/actions/userAction';
import CartItems from '../components/CartItems';
import ShippingDetails from '../components/checkout/ShippingDetails';
import CheckoutLoading from '../components/loading/CheckoutLoading';
import ErrorPage from './error/ErrorPage';
import ProductPrice from '../components/product/ProductPrice';
import { RiShoppingBag3Fill } from 'react-icons/ri';

const CheckoutPage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { isLoading, isUpdating, isDone, userDetails, error } = useSelector(
        (state) => state.user
    );
    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

    useEffect(() => {
        if (!userInfo) {
            history.push({
                pathname: '/user/login',
                state: { oldLocation: location.pathname },
            });
        }
    }, [history, location.pathname, userInfo]);

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            {isLoading ? (
                <CheckoutLoading />
            ) : (
                userDetails && (
                    <>
                        <ShippingDetails
                            name={userDetails.name}
                            address={userDetails.address}
                            phoneNumber={userDetails.phoneNumber}
                        />

                        <div className="container bg-white mt-3 p-4">
                            <div className="row g-0 mb-3 d-none d-md-flex">
                                <div className="col-4">
                                    <div className="text-secondary fw-600">Sản Phẩm</div>
                                </div>
                                <div className="col">
                                    <div className="text-secondary fw-600 text-center">Đơn Giá</div>
                                </div>
                                <div className="col">
                                    <div className="text-secondary fw-600 text-center">
                                        Số Lượng
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="text-secondary fw-600 text-center">
                                        Thành tiền
                                    </div>
                                </div>
                            </div>

                            <CartItems
                                cartItems={cartItems}
                                options={{ numberInput: false, deleteBtn: false }}
                            />
                        </div>

                        <div className="container bg-white mt-2 p-3">
                            <div className="container">
                                <div className="row text-secondary fw-600 g-0 d-flex justify-content-center">
                                    <div className="col-auto d-none d-md-inline-flex align-items-center ms-auto">
                                        <div>
                                            Tổng thanh toán (
                                            <span className="text-ired">{cartItems.length}</span>{' '}
                                            Sản phẩm):
                                        </div>
                                    </div>
                                    <div className="col-auto d-inline-flex d-md-none align-items-center">
                                        Tổng tiền:
                                    </div>
                                    <div className="col-auto d-flex align-items-center mx-2">
                                        <span className="text-ired fw-600 fs-5">
                                            <ProductPrice
                                                price={cartItems.reduce(
                                                    (a, c) => a + c.price * c.qty,
                                                    0
                                                )}
                                            />
                                        </span>
                                    </div>

                                    <div className="col-12 col-md-auto d-flex justify-content-center pt-2 p-md-0">
                                        <button
                                            type="button"
                                            className="cart-btn btn-purchase ms-1"
                                        >
                                            <RiShoppingBag3Fill className="icon" /> Mua hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            )}
        </>
    );
};

export default CheckoutPage;
