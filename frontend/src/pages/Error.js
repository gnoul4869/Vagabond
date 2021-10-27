import React from 'react';
import error404 from '../images/error404.svg';
import { Link } from 'react-router-dom';
import { ImHome } from 'react-icons/im';
import { Container } from 'react-bootstrap';

const Error = () => {
    return (
        <Container className="text-center mt-10">
            <div className="col align-items-center mt-5">
                <img
                    src={error404}
                    alt="error404"
                    className="img-fluid not-found-img"
                />
                <h1>Xin lỗi, trang bạn tìm kiếm không tồn tại!</h1>
            </div>
            <Link to="/" className="btn btn-primary mt-4 px-3 pt-2 fs-5">
                <ImHome className="btn-icon" /> Trở về trang chủ
            </Link>
        </Container>
    );
};

export default Error;
