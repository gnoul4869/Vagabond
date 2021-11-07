import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className="row align-items-center g-lg-5 py-5 mx-md-5">
            <div className="col-lg-7 text-center text-lg-start">
                <h1 className="display-5 fw-bold lh-1 mb-3 text-ired">Đăng nhập thành viên</h1>
                <p className="col-lg-10 fs-2">Thoải mái mua hàng</p>
            </div>
            <div className="col-md-10 mx-auto col-lg-5">
                <form className="p-4 p-md-5 border rounded-3 bg-white" onSubmit={submitHandler}>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            id="input"
                            placeholder="name@example.com"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="input">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label for="password">Mật khẩu</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-ired" type="submit">
                        Đăng nhập
                    </button>
                    <hr className="my-4" />
                    <div className="text-muted text-center">
                        <span>Chưa phải là thành viên?</span>{' '}
                        <Link to="/user/register" className="link-label">
                            Đăng ký
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
