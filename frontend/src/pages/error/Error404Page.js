import React from 'react';
import error404Image from '../../images/error404.svg';
import { Link } from 'react-router-dom';
import { ImHome } from 'react-icons/im';

const ErrorNotFoundPage = () => {
    return (
        <section className="container pb-5 text-center">
            <div className="row d-flex justify-content-center">
                <div className="col-6 mt-5">
                    <div className="col-8 mt-5 mb-3 mx-auto">
                        <img
                            src={error404Image}
                            alt="error404"
                            className="img-fluid not-found-img"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <span className="fs-3">Xin lỗi, trang bạn tìm kiếm không tồn tại!</span>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="/" className="btn btn-primary mt-5 px-2 pt-2 fs-5">
                        <ImHome className="icon" /> Trở về trang chủ
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorNotFoundPage;
