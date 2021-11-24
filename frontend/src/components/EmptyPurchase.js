import React from 'react';
import emptyImage from '../images/empty.png';

const EmptyPurchase = () => {
    return (
        <section className="container mb-5 text-center">
            <div className="row d-flex justify-content-center">
                <div className="col-8 col-md-3 my-5">
                    <div className="col-8 mt-5 mb-3 mx-auto">
                        <img src={emptyImage} alt="notFound" className="img-fluid not-found-img" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <span className="fs-3">Bạn chưa có đơn hàng nào cả</span>
                </div>
            </div>
        </section>
    );
};

export default EmptyPurchase;
