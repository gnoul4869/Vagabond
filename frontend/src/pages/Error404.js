import React from 'react';
import error404 from '../images/error404.svg';
import { Link } from 'react-router-dom';
import { ImHome } from 'react-icons/im';
import { Container } from 'react-bootstrap';

const NotFound = () => {
    return (
        <section className="container mt-5 d-flex flex-column align-items-center">
            <div className="col mt-5">
                <div className="col-8 mt-5 mb-3 mx-auto">
                    <img src={error404} alt="error404" className="img-fluid not-found-img" />
                </div>
                <span className="fs-3">Xin lỗi, trang bạn tìm kiếm không tồn tại!</span>
            </div>
            <Link to="/" className="btn btn-primary mt-5 px-2 pt-2 fs-5">
                <ImHome className="btn-icon" /> Trở về trang chủ
            </Link>
        </section>
    );
};

export default NotFound;
