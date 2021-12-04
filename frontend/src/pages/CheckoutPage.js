import {} from 'dotenv/config';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';
import { ImTruck } from 'react-icons/im';
import { BiPurchaseTag } from 'react-icons/bi';
import BarLoader from 'react-spinners/BarLoader';
import { getUserDetails } from '../redux/actions/userAction';
import { removeAllFromCart, updateCart } from '../redux/actions/cartActions';
import CartItems from '../components/CartItems';
import ErrorPage from './error/ErrorPage';
import PriceFormat from '../components/PriceFormat';
import ShippingDetails from '../components/order/ShippingDetails';
import PurchaseDetails from '../components/order/PurchaseDetails';
import CheckoutPageLoading from '../components/loading/checkoutLoading/CheckoutPageLoading';

const CheckoutPage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { isLoading, userDetails, error } = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);

    const [shippingFee, setShippingFee] = useState(0);
    const [isGettingShippingFee, setIsGettingShippingFee] = useState(false);
    const [isOrdering, setIsOrdering] = useState(false);
    const [localError, setLocalError] = useState('');

    const totalItemsPrice = cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const totalItemsWeight = cart.cartItems.reduce((a, c) => a + c.weight * c.qty, 0);
    const totalItemsHeight = Math.round(totalItemsWeight / 100);

    const orderHandler = async () => {
        setIsOrdering(true);
        try {
            const user = {
                name: userDetails.name,
                phoneNumber: userDetails.phoneNumber,
                address: {
                    provinceName: userDetails.address.provinceName,
                    districtName: userDetails.address.districtName,
                    wardName: userDetails.address.wardName,
                    addressDetails: userDetails.address.addressDetails,
                },
            };

            const products = cart.cartItems.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    qty: product.qty,
                };
            });
            await axios.post(
                '/api/v1/orders',
                { user, products, shippingFee },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            dispatch(removeAllFromCart());
            setIsOrdering(false);
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
                                to_district_id: userDetails.address.districtID,
                                to_ward_code: userDetails.address.wardID,
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
        return <ErrorPage error={error || localError} backHome={true} />;
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
                            provinceName={userDetails.address.provinceName}
                            districtName={userDetails.address.districtName}
                            wardName={userDetails.address.wardName}
                            addressDetails={userDetails.address.addressDetails}
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

                            <PurchaseDetails
                                totalItemsPrice={totalItemsPrice}
                                shippingFee={shippingFee}
                            />

                            <div className="divider-dash-bottom my-3"></div>

                            <div className="row justify-content-center">
                                <div className="col-8 col-sm-6 col-md-3 p-0 my-2 ms-md-auto me-md-4">
                                    <button
                                        type="button"
                                        className={`button-main btn-buy w-100 ${
                                            isOrdering ? 'btn-ired-loading' : ''
                                        }`}
                                        onClick={orderHandler}
                                    >
                                        {!isOrdering ? (
                                            <span>
                                                <BiPurchaseTag className="icon" /> Đặt hàng
                                            </span>
                                        ) : (
                                            <BarLoader
                                                color="white"
                                                css="display: inherit; margin-bottom: .25rem;"
                                                width="3.125rem"
                                            />
                                        )}
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
