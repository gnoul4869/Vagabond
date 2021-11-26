import {} from 'dotenv/config';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { getUserDetails } from '../redux/actions/userAction';
import CartItems from '../components/CartItems';
import ShippingDetails from '../components/checkout/ShippingDetails';
import CheckoutPageLoading from '../components/loading/checkoutLoading/CheckoutPageLoading';
import ErrorPage from './error/ErrorPage';
import PriceFormat from '../components/PriceFormat';
import { ImTruck } from 'react-icons/im';
import axios from 'axios';
import { BiPurchaseTag } from 'react-icons/bi';
import { removeAllFromCart, updateCart } from '../redux/actions/cartActions';

const CheckoutPage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { isLoading, userDetails, error } = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);

    const [shippingFee, setShippingFee] = useState(0);
    const [isGettingShippingFee, setIsGettingShippingFee] = useState(false);
    const [localError, setLocalError] = useState('');

    const totalItemsPrice = cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const totalItemsWeight = cart.cartItems.reduce((a, c) => a + c.weight * c.qty, 0);
    const totalItemsHeight = Math.round(totalItemsWeight / 100);

    console.log(totalItemsHeight, totalItemsWeight, totalItemsPrice);

    const orderHandler = async () => {
        try {
            const products = cart.cartItems.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.images[0],
                    qty: item.qty,
                };
            });
            await axios.post(
                '/api/v1/orders',
                { products, shippingFee },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            dispatch(removeAllFromCart());
            history.push('/user/purchase');
        } catch (error) {
            setLocalError(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa'
            );
        }
    };

    useEffect(() => {
        if (totalItemsWeight === 0) {
            return setShippingFee(0);
        }

        let mounted = true;

        if (userDetails) {
            const getShippingFee = async () => {
                if (mounted) {
                    setIsGettingShippingFee(true);
                }
                try {
                    const { data } = await axios.get(
                        'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
                        {
                            headers: {
                                token: process.env.REACT_APP_GHN_TOKEN,
                                shopid: process.env.REACT_APP_GHN_SHOP_ID,
                            },
                            params: {
                                service_type_id: 2, // Standard
                                insurance_value: totalItemsPrice,
                                coupon: null,
                                from_district_id: process.env.REACT_APP_GHN_SHOP_DISTRICT_ID,
                                to_district_id: userDetails.addresses.districtID,
                                to_ward_code: userDetails.addresses.wardID,
                                weight: totalItemsWeight,
                                height: totalItemsHeight,
                                length: 15,
                                width: 15,
                            },
                        }
                    );

                    if (mounted) {
                        const roundedNumber = Math.ceil(data.data.service_fee / 1000) * 1000;
                        setShippingFee(roundedNumber);
                        setIsGettingShippingFee(false);
                    }
                } catch (error) {
                    setLocalError(
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa'
                    );
                    if (mounted) {
                        setIsGettingShippingFee(false);
                    }
                }
            };

            getShippingFee();

            return () => {
                mounted = false;
            };
        }
    }, [totalItemsHeight, totalItemsPrice, totalItemsWeight, userDetails]);

    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(updateCart());
    }, [dispatch]);

    useEffect(() => {
        if (!userInfo) {
            history.push({
                pathname: '/user/login',
                state: { oldLocation: location.pathname },
            });
        }
    }, [history, location.pathname, userInfo]);

    if (error || localError) {
        return <ErrorPage error={error || localError} />;
    }

    return (
        <>
            {isLoading || cart.isLoading || isGettingShippingFee ? (
                <CheckoutPageLoading />
            ) : (
                userDetails && (
                    <>
                        <ShippingDetails
                            name={userDetails.name}
                            phoneNumber={userDetails.phoneNumber}
                            provinceName={userDetails.addresses.provinceName}
                            districtName={userDetails.addresses.districtName}
                            wardName={userDetails.addresses.wardName}
                            addressDetails={userDetails.addresses.addressDetails}
                        />

                        <div className="container bg-white mt-2 p-4">
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
                                cartItems={cart.cartItems}
                                options={{ numberInput: false, deleteBtn: false }}
                            />

                            <div className="row text-secondary fw-600 g-0 d-flex justify-content-center">
                                <div className="col-auto d-none d-md-inline-flex align-items-center ms-auto">
                                    <div>
                                        Tổng số tiền (
                                        <span className="text-ired">{cart.cartItems.length}</span>{' '}
                                        Sản phẩm):
                                    </div>
                                </div>
                                <div className="col-auto d-inline-flex d-md-none align-items-center">
                                    Tổng tiền:
                                </div>
                                <div className="col-auto d-flex align-items-center mx-2">
                                    <span className="text-ired fw-600 fs-5">
                                        <PriceFormat price={totalItemsPrice} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="container bg-white mt-2 p-3">
                            <div className="row align-items-center text-sdark fw-600 px-md-3">
                                <div className="col text-start fsr-4">Phương thức thanh toán</div>
                                <div className="col">
                                    <div className="row ">
                                        <div className="col fsr-3 text-end">
                                            Thanh toán khi nhận hàng
                                        </div>
                                    </div>
                                    <div className="row g-0 mx-2 fsr-2">
                                        <div className="col fw-normal text-secondary text-end">
                                            <ImTruck className="icon me-1" />
                                            <span className="d-none d-md-inline-flex">
                                                Đơn vị vận chuyển:
                                            </span>
                                            <span className="d-inline-flex d-md-none">ĐVVC:</span>
                                        </div>
                                        <div className="col-auto text-coral ms-2">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="https://ghn.vn/"
                                                className="link-inherit"
                                            >
                                                GHN
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="divider-dash-bottom my-3"></div>

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

                            <div className="divider-dash-bottom my-3"></div>

                            <div className="row justify-content-center">
                                <div className="col-8 col-sm-6 col-md-3 p-0 my-2 ms-md-auto me-md-4">
                                    <button
                                        type="button"
                                        className="button-main btn-buy w-100"
                                        onClick={orderHandler}
                                    >
                                        <BiPurchaseTag className="icon" /> Đặt hàng
                                    </button>
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
