import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { getUserDetails } from '../redux/actions/userAction';
import CartItems from '../components/CartItems';
import ShippingDetails from '../components/checkout/ShippingDetails';
import CheckoutLoading from '../components/loading/CheckoutLoading';
import ErrorPage from './error/ErrorPage';

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
                    </>
                )
            )}
        </>
    );
};

export default CheckoutPage;
