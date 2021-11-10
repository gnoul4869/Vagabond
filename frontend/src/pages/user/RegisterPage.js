import React, { useEffect, useState } from 'react';
import { VscError } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import UserDetails from '../../components/register/UserDetails';

const RegisterPage = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { userInfo, error } = useSelector((state) => state.auth);

    const oldLocation =
        location.state && location.state.oldLocation ? location.state.oldLocation : '/';

    const submitHandler = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (userInfo) {
            history.push(oldLocation);
        }
    }, [history, oldLocation, userInfo]);

    return (
        <div className="row align-items-center g-lg-5 py-5 mx-md-5">
            <div className="col-lg-7 text-center text-lg-start">
                <h1 className="display-5 fw-bold lh-1 mb-3 text-ired">Đăng ký thành viên</h1>
                <p className="col-lg-10 fs-2 ms-3">Bước đầu khám phá</p>
            </div>
            <div className="col-md-10 mx-auto col-lg-5">
                <form className="p-4 p-md-5 border rounded-3 bg-white" onSubmit={submitHandler}>
                    {error && (
                        <div className="error-container">
                            <VscError className="icon text-ired" />
                            <span className="ms-2">{error}</span>
                        </div>
                    )}
                    <UserDetails setEmail={setEmail} setPassword={setPassword} setName={setName} />
                    <hr className="my-4" />
                    <div className="text-muted text-center">
                        <span>Đã là thành viên?</span>{' '}
                        <Link
                            to={{
                                pathname: '/user/login',
                                state: { oldLocation: location.pathname },
                            }}
                            className="link-label"
                        >
                            Đăng nhập
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
