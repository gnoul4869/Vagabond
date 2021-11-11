import React, { useEffect, useState } from 'react';
import { VscError } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { refreshVerification, verifyEmail } from '../../redux/actions/verificationActions';
import UserDetails from '../../components/register/UserDetails';
import EmailVerification from '../../components/register/EmailVerification';
import { MdArrowBack } from 'react-icons/md';

const RegisterPage = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(0);
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const { userInfo } = useSelector((state) => state.auth);
    const { isLoading, isEmailSent, error, message } = useSelector((state) => state.verification);

    const oldLocation =
        location.state && location.state.oldLocation ? location.state.oldLocation : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(verifyEmail(name, email));
    };

    const switchStep = (step) => {
        switch (step) {
            case 0:
                return (
                    <UserDetails
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        isLoading={isLoading}
                    />
                );
            case 1:
                return (
                    <EmailVerification email={email} message={message} otp={otp} setOtp={setOtp} />
                );
            default:
            // Do nothing
        }
    };

    const backBtnHandler = () => {
        dispatch(refreshVerification());
        setStep(step - 1);
    };

    useEffect(() => {
        if (isEmailSent && step === 0) {
            setStep(1);
        }
    }, [isEmailSent, step]);

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
                <form
                    className="auth-form p-4 p-md-5 border rounded-3 bg-white"
                    onSubmit={submitHandler}
                >
                    {step > 0 && (
                        <button type="button" className="auth-back-btn" onClick={backBtnHandler}>
                            <MdArrowBack className="icon" />
                        </button>
                    )}
                    {error && (
                        <div className="auth-error-container">
                            <VscError className="icon text-ired" />
                            <span className="ms-2">{error}</span>
                        </div>
                    )}
                    {switchStep(step)}
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
