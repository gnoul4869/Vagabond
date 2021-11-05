import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import NumberInput from '../components/NumberInput';
import ProductPrice from '../components/product/ProductPrice';
import { removeFromCart } from '../actions/cartActions';

const Cart = () => {
    const dispatch = useDispatch();
    const { loading, cartItems } = useSelector((state) => state.cart);

    const deleteBtnHandler = (productID) => {
        dispatch(removeFromCart(productID));
    };

    return (
        <>
            <div className="container bg-white mt-4 p-3">
                <div className="container">
                    <div className="row d-none d-md-flex">
                        <div className="col-auto">
                            <input type="checkbox" className="form-check-input" />
                        </div>
                        <div className="col-3">
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
                        <div className="col">
                            <div className="text-secondary fw-600 text-center">Thao tác</div>
                        </div>
                    </div>
                    <div className="row d-flex d-md-none">
                        <div className="col-auto">
                            <input type="checkbox" className="form-check-input" />
                        </div>
                        <div className="col">
                            <div className="text-secondary fw-600">Tất cả</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container bg-white mt-2 p-3">
                <div className="container">
                    {cartItems &&
                        cartItems.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-auto">
                                            <input type="checkbox" className="form-check-input" />
                                        </div>
                                        <div className="col-3">
                                            <Link to={`/product/${item.id}`} className="link-tag">
                                                <div className="d-flex">
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        className="cart-item-img"
                                                    />
                                                    <div className="cart-item-name ms-2">
                                                        {item.name}
                                                        Lorem ipsum dolor sit amet consectetur
                                                        adipisicing elit. Tempore numquam libero
                                                        corrupti sequi! At minima corrupti ut, amet
                                                        vero doloremque magnam sequi repellendus
                                                        atque obcaecati aperiam? Voluptates, ut.
                                                        Facere, repellendus?
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="col">
                                            <div className="fw-600 text-center">
                                                <ProductPrice price={item.price} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="text-secondary fw-600 d-flex justify-content-center">
                                                <NumberInput
                                                    qty={item.qty}
                                                    max={item.countInStock}
                                                    productID={item.id}
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="fw-600 text-center d-none d-md-block">
                                                <ProductPrice price={item.price * item.qty} />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <button
                                                className="cart-btn btn-del"
                                                onClick={() => deleteBtnHandler(item.id)}
                                            >
                                                <MdDeleteForever className="icon" /> Xoá
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default Cart;
