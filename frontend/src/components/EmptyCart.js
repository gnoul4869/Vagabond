import React from 'react';
import { Link } from 'react-router-dom';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import emptyCartImage from '../images/empty_cart.svg';

const EmptyCart = () => {
    return (
        <section className="container mb-5 text-center">
            <div className="row d-flex justify-content-center">
                <div className="col-3 my-5">
                    <div className="col-8 mt-5 mb-3 mx-auto">
                        <img
                            src={emptyCartImage}
                            alt="notFound"
                            className="img-fluid not-found-img"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <span className="fs-3">Giỏ hàng của bạn còn trống</span>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="/" className="btn btn-ired mt-5 px-2 pt-2 fs-5">
                        <RiShoppingBag3Fill className="icon" /> Mua ngay
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default EmptyCart;
