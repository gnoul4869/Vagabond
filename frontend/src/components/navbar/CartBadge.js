import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const CartBadge = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    return (
        <div className="navbar-cart-container">
            <Link to="/cart">
                <BsCart2 className="navbar-cart-icon text-light mx-auto" />
            </Link>
            <span className="navbar-cart-badge">{cartItems.length}</span>
        </div>
    );
};

export default CartBadge;
