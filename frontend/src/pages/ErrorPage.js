import React from 'react';
import notFoundImage from '../images/not_found.svg';
import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';

const ErrorPage = ({ error }) => {
    return (
        <section className="container mt-5 text-center">
            <div className="row d-flex justify-content-center">
                <div className="col-3 my-5">
                    <div className="col-8 mt-5 mb-3 mx-auto">
                        <img
                            src={notFoundImage}
                            alt="notFound"
                            className="img-fluid not-found-img"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <span className="fs-3">{error}</span>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="/" className="btn btn-primary mt-5 px-2 pt-2 fs-5">
                        <ImHome className="btn-icon" /> Trở về trang chủ
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;
