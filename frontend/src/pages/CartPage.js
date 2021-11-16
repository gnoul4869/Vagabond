import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import NumberInput from '../components/NumberInput';
import ProductPrice from '../components/product/ProductPrice';
import { removeFromCart } from '../redux/actions/cartActions';
import EmptyCart from '../components/EmptyCart';

const CartPage = () => {
    const dispatch = useDispatch();
    const { loadingItems, cartItems } = useSelector((state) => state.cart);

    return (
        <>
            <div className="container bg-white mt-4 p-3 d-none d-md-flex">
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
                            <div className="text-secondary fw-600 text-center">Số Lượng</div>
                        </div>
                        <div className="col">
                            <div className="text-secondary fw-600 text-center">Số tiền</div>
                        </div>
                        <div className="col-1">
                            <div className="text-secondary fw-600 text-center">Thao tác</div>
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
                    {cartItems.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        cartItems.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div className="row d-flex align-items-center g-0">
                                        {/* <div className="col-auto"> //? This is for another time
                                            <input type="checkbox" className="form-check-input" />
                                        </div> */}
                                        <div className="col-12 col-md-4">
                                            <Link
                                                to={`/product/${item.id}`}
                                                className="link-inherit"
                                            >
                                                <div className="d-flex">
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        className="cart-item-img"
                                                    />
                                                    <div className="cart-item-name ms-2">
                                                        {item.name}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="col-6 col-md">
                                            <div className="text-dark fw-600 text-center">
                                                <ProductPrice price={item.price} />
                                            </div>
                                        </div>
                                        <div className="col-6 col-md">
                                            <div className="text-secondary fw-600 d-flex justify-content-center">
                                                <NumberInput
                                                    qty={item.qty}
                                                    max={item.countInStock}
                                                    productID={item.id}
                                                    disabled={
                                                        loadingItems &&
                                                        loadingItems.includes(item.id)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col d-none d-md-block">
                                            <div className="text-dark fw-600 text-center">
                                                <ProductPrice price={item.price * item.qty} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-1 mt-2 mt-md-0 d-flex justify-content-end justify-content-md-center">
                                            <button
                                                className="cart-btn btn-del"
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                            >
                                                <MdDeleteForever className="icon" /> Xoá
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <div className="container bg-white mt-2 p-3">
                <div className="container">
                    <div className="row text-secondary fw-600 g-0 d-flex justify-content-center">
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
                                <ProductPrice
                                    price={cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                />
                            </span>
                        </div>

                        <div className="col-12 col-md-auto d-flex justify-content-center pt-2 p-md-0">
                            <button type="button" className="cart-btn btn-purchase ms-1">
                                <RiShoppingBag3Fill className="icon" /> Mua hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;
