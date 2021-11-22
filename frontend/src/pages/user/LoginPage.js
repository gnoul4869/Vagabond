import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { VscError } from 'react-icons/vsc';
import BarLoader from 'react-spinners/BarLoader';
import { login, refreshAuth } from '../../redux/actions/authActions';

const LoginPage = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');

    const { userInfo, isLoading, error } = useSelector((state) => state.auth);

    const oldLocation =
        location.state && location.state.oldLocation ? location.state.oldLocation : '/';

    const submitHandler = (e) => {
        e.preventDefault();

        if (!email) {
            return setValidationError('Hãy nhập email của bạn');
        }

        if (
            !RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ).test(email)
        ) {
            return setValidationError('Email không hợp lệ');
        }

        if (!password) {
            return setValidationError('Hãy nhập mật khẩu của bạn');
        }

        if (password.length < 6) {
            return setValidationError('Mật khẩu không hợp lệ');
        }

        setValidationError('');

        dispatch(login(email, password));
    };

    useEffect(() => {
        if (userInfo) {
            history.push(oldLocation);
        }
    }, [history, oldLocation, userInfo]);

    useEffect(() => {
        dispatch(refreshAuth('REFRESH_ERROR'));
    }, [dispatch]);

    return (
        <div className="container-fluid">
            <div className="row align-items-center g-0 py-5 mx-md-5">
                <div className="col-lg-7 text-center text-lg-start">
                    <h1 className="display-5 fw-bold mb-3 text-ired">Đăng nhập thành viên</h1>
                    <p className="col-lg-10 fs-2 ms-3 text-sdark">Thoải mái mua hàng</p>
                </div>
                <div className="col-12 col-lg-5 mx-auto p-0">
                    <form
                        className="p-4 p-md-5 border rounded-3 bg-white"
                        onSubmit={submitHandler}
                        noValidate
                    >
                        {(error || validationError) && (
                            <div className="auth-error-container">
                                <VscError className="icon text-ired" />
                                <span className="ms-2">{error || validationError}</span>
                            </div>
                        )}
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                id="email"
                                placeholder="name@example.com"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                            <label htmlFor="input">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                id="password"
                                placeholder="Mật khẩu"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                            <label htmlFor="password">Mật khẩu</label>
                        </div>
                        <button
                            className={`w-100 btn btn-lg btn-ired ${
                                isLoading && 'btn-ired-loading'
                            }`}
                            type="submit"
                        >
                            {!isLoading ? (
                                'Đăng nhập'
                            ) : (
                                <BarLoader
                                    color="white"
                                    css="display: inherit; margin-bottom: .25rem;"
                                    width="3.125rem"
                                />
                            )}
                        </button>
                        <hr className="my-4" />
                        <div className="text-muted text-center">
                            <span>Chưa phải là thành viên?</span>{' '}
                            <Link
                                to={{
                                    pathname: '/user/register',
                                    state: {
                                        oldLocation:
                                            location.state && location.state.oldLocation
                                                ? location.state.oldLocation
                                                : '/',
                                    },
                                }}
                                className="link-label"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
