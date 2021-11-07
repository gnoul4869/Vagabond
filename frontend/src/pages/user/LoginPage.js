import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { VscError } from 'react-icons/vsc';
import { login } from '../../redux/actions/authActions';

const LoginPage = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userInfo, error } = useSelector((state) => state.auth);

    const oldLocation =
        location.state && location.state.oldLocation ? location.state.oldLocation : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (userInfo) {
            history.push(oldLocation);
        }
    }, [history, oldLocation, userInfo]);

    return (
        <div className="row align-items-center g-lg-5 py-5 mx-md-5">
            <div className="col-lg-7 text-center text-lg-start">
                <h1 className="display-5 fw-bold lh-1 mb-3 text-ired">Đăng nhập thành viên</h1>
                <p className="col-lg-10 fs-2 ms-3">Thoải mái mua hàng</p>
            </div>
            <div className="col-md-10 mx-auto col-lg-5">
                <form className="p-4 p-md-5 border rounded-3 bg-white" onSubmit={submitHandler}>
                    {error && (
                        <div className="error-container">
                            <VscError className="icon text-ired" />
                            <span className="ms-2">{error}</span>
                        </div>
                    )}
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            id="input"
                            placeholder="name@example.com"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="input">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Mật khẩu</label>
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
