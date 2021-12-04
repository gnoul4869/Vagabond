import React from 'react';
import emptyImage from '../images/empty.png';

const EmptyReview = ({ message }) => {
    return (
        <section className="container text-center">
            <div className="row justify-content-center align-items-center">
                <div className="img-container-sm">
                    <img src={emptyImage} alt="notFound" className="img-sm" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <span className="fsr-4">{message}</span>
                </div>
            </div>
        </section>
    );
};

export default EmptyReview;
