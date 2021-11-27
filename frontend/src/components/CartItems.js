import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { removeFromCart } from '../redux/actions/cartActions';
import EmptyCart from './EmptyCart';
import NumberInput from './NumberInput';
import PriceFormat from './PriceFormat';

const CartItems = ({ cartItems, loadingItems, options }) => {
    const dispatch = useDispatch();

    return (
        <>
            {cartItems.length === 0 ? (
                <EmptyCart />
            ) : (
                cartItems.map((item) => {
                    return (
                        <div key={item.id}>
                            <div className="row align-items-center g-0">
                                {/* <div className="col-auto"> //? This is for another time
                                            <input type="checkbox" className="form-check-input" />
                                        </div> */}
                                <div className="col-12 col-md-4">
                                    <Link to={`/product/${item.id}`} className="link-inherit">
                                        <div className="d-flex">
                                            <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="cart-item-img"
                                            />
                                            <div className="cart-item-name ms-2">{item.name}</div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-6 col-md mt-2 mt-md-0">
                                    <div className="text-sdark fw-600 text-center">
                                        <PriceFormat price={item.price} />
                                    </div>
                                </div>

                                <div className="col-6 col-md mt-2">
                                    {options.numberInput ? (
                                        <div className="text-secondary fw-600 d-flex justify-content-center">
                                            <NumberInput
                                                qty={item.qty}
                                                max={item.countInStock}
                                                productID={item.id}
                                                disabled={
                                                    loadingItems && loadingItems.includes(item.id)
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-sdark fw-600 text-center">
                                            <span className="d-inline-block d-md-none">x</span>
                                            {item.qty}
                                        </div>
                                    )}
                                </div>

                                <div className="col d-none d-md-block">
                                    <div className="text-sdark fw-600 text-center">
                                        <PriceFormat price={item.price * item.qty} />
                                    </div>
                                </div>

                                {options.deleteBtn && (
                                    <div className="col-12 col-md-1 mt-3 mt-md-0 d-flex justify-content-end justify-content-md-center">
                                        <button
                                            className="button-main btn-del"
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                        >
                                            <MdDeleteForever className="icon" /> Xoá
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="divider-bottom my-3"></div>
                        </div>
                    );
                })
            )}
        </>
    );
};

export default CartItems;
