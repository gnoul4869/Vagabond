import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { updateCart } from '../redux/actions/cartActions';
import CartItems from '../components/CartItems';
import PriceFormat from '../components/PriceFormat';
import CartItemsLoading from '../components/loading/CartItemsLoading';
import ErrorPage from './error/ErrorPage';

const CartPage = () => {
    const dispatch = useDispatch();
    const { cartItems, loadingItems, isLoading, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(updateCart());
    }, [dispatch]);

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            {isLoading ? (
                <CartItemsLoading options={{ deleteBtn: true }} />
            ) : (
                <>
                    <div
                        className={`container bg-white mt-4 p-3 d-none d-md-flex ${
                            cartItems.length === 0 && 'd-md-none'
                        }`}
                    >
                        <div className="container">
                            <div className="row g-0">
                                {/* <div className="col-auto"> //? This is for another time
                            <input type="checkbox" className="form-check-input" />
                        </div> */}
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
                                <div className="col-1">
                                    <div className="text-secondary fw-600 text-center">
                                        Thao tác
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row d-flex d-md-none"> //? This is for another time
                        <div className="col-auto">
                            <input type="checkbox" className="form-check-input" />
                        </div>
                        <div className="col">
                            <div className="text-secondary fw-600">Tất cả</div>
                        </div>
                    </div> */}
                        </div>
                    </div>
                    <div className="container bg-white mt-2 p-3">
                        <div className="container">
                            <CartItems
                                loadingItems={loadingItems}
                                cartItems={cartItems}
                                options={{ numberInput: true, deleteBtn: true }}
                            />
                        </div>
                    </div>
                    <div
                        className={`container bg-white mt-2 p-3 ${
                            cartItems.length === 0 && 'd-none'
                        }`}
                    >
                        <div className="row text-secondary fw-600 g-0 d-flex justify-content-center px-md-2">
                            <div className="col-auto d-none d-md-inline-flex align-items-center ms-auto">
                                <div>
                                    Tổng thanh toán (
                                    <span className="text-ired">{cartItems.length}</span> Sản phẩm):
                                </div>
                            </div>
                            <div className="col-auto d-inline-flex d-md-none align-items-center">
                                Tổng tiền:
                            </div>
                            <div className="col-auto d-flex align-items-center mx-2">
                                <span className="text-ired fw-600 fs-5">
                                    <PriceFormat
                                        price={cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                    />
                                </span>
                            </div>

                            <div className="col-12 col-md-auto d-flex justify-content-center pt-2 p-md-0">
                                <Link to="/checkout">
                                    <button type="button" className="button-main btn-purchase ms-1">
                                        <RiShoppingBag3Fill className="icon" /> Mua hàng
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default CartPage;
