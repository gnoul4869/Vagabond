import React, { useEffect } from 'react';
import { MdPlace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import CheckoutLoading from '../components/loading/CheckoutLoading';
import { getUserDetails } from '../redux/actions/userAction';

const CheckoutPage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { isLoading, isUpdating, isDone, userDetails, error } = useSelector(
        (state) => state.user
    );

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

    return (
        <>
            {isLoading ? (
                <CheckoutLoading />
            ) : (
                userDetails && (
                    <div className="mt-3 bg-white">
                        <div className="postcard-border"></div>
                        <div className="container p-4">
                            <div className="text-ired fw-600 fs-5">
                                <MdPlace className="icon me-1" />
                                Thông tin đặt hàng
                            </div>
                            <div className="container px-3">
                                <div className="row mt-3">
                                    <div className="col-12 col-md">
                                        <div className="row">
                                            <div className="col-4 col-md-3 col-lg-4 text-secondary">
                                                <span className="d-none d-md-flex">
                                                    Tên người nhận
                                                </span>
                                                <span className="d-flex d-md-none">Tên</span>
                                            </div>
                                            <div className="col p-0">
                                                <span>{userDetails.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md mt-3 mt-md-0">
                                        <div className="row">
                                            <div className="col-4 col-md-3 col-lg-4 text-secondary">
                                                <span className="d-none d-md-flex">
                                                    Số điện thoại
                                                </span>
                                                <span className="d-flex d-md-none">Sđt</span>
                                            </div>
                                            <div className="col p-0">
                                                <span>{userDetails.phoneNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-4 col-md-3 col-lg-2 text-secondary">
                                        <span className="d-none d-md-flex">Địa chỉ nhận hàng</span>
                                        <span className="d-flex d-md-none">Địa chỉ</span>
                                    </div>
                                    <div className="col p-0">
                                        <span>{userDetails.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default CheckoutPage;
