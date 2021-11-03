import React from 'react';
import { useLocation } from 'react-router';

const Cart = () => {
    const location = useLocation();

    const productID = location.state && location.state.productID && location.state.productID;

    return <div className="container bg-white my-4">{productID}</div>;
};

export default Cart;
