import React, { useEffect, useState } from 'react';
import { VscError } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import moment from 'moment';
import BarLoader from 'react-spinners/BarLoader';
import {
    confirmEmail,
    refreshVerification,
    verifyEmail,
} from '../../redux/actions/verificationActions';
import UserDetails from '../../components/register/UserDetails';
import EmailVerification from '../../components/register/EmailVerification';
import PersonalDetails from '../../components/register/PersonalDetails';

const RegisterPage = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const [step, setStep] = useState(2);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const { userInfo } = useSelector((state) => state.auth);

    console.log(phoneNumber.length);

    const { isLoading, isEmailSent, isVerified, error, status } = useSelector(
        (state) => state.verification
    );
    const oldLocation =
        location.state && location.state.oldLocation ? location.state.oldLocation : '/';

    const submitHandler = (e) => {
        e.preventDefault();

        switch (step) {
            case 0:
                if (!isEmailSent) {
                    return dispatch(verifyEmail(name, email, setStep));
                } else {
                    return setStep(step + 1);
                }
            case 1:
                if (!isVerified) {
                    return dispatch(confirmEmail(email, otp, setStep));
                } else {
                    return setStep(step + 1);
                }
            case 2: {
                if (!address) {
                    return setValidationError('Hãy nhập địa chỉ của bạn');
                }
                if (!phoneNumber) {
                    return setValidationError('Hãy nhập số điện thoại của bạn');
                }
                if (phoneNumber.length !== 10) {
                    return setValidationError('Số điện thoại của bạn không hợp lệ');
                }
                if (!gender) {
                    return setValidationError('Hãy chọn giới tính của bạn');
                }
                if (birthDate) {
                    var age = moment().diff(birthDate, 'years');
                    if (age < 12) {
                        return setValidationError('Bạn phải lớn hơn 12 tuổi để đăng ký tài khoản');
                    }
                    if (age > 125) {
                        return setValidationError('Số tuổi không hợp lệ');
                    }
                }
                return setStep(step + 1);
            }
            default:
            // Do nothing
        }
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
                    <EmailVerification
                        email={email}
                        status={status}
                        otp={otp}
                        setOtp={setOtp}
                        error={error}
                        isVerified={isVerified}
                    />
                );
            case 2:
                return (
                    <PersonalDetails
                        address={address}
                        setAddress={setAddress}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        setGender={setGender}
                        birthDate={birthDate}
                        setBirthDate={setBirthDate}
                    />
                );
            default:
            // Do nothing
        }
    };

    const backBtnHandler = () => {
        dispatch(refreshVerification('REFRESH_ERROR'));
        setValidationError('');
        setStep(step - 1 >= 0 ? step - 1 : step);
    };

    useEffect(() => {
        dispatch(refreshVerification());
    }, [dispatch, email]);

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
                    {error ? (
                        <div className="auth-error-container mt-4 mt-md-0">
                            <VscError className="icon text-ired" />
                            <span className="ms-2">{error}</span>
                        </div>
                    ) : (
                        validationError && (
                            <div className="auth-error-container mt-4 mt-md-0">
                                <VscError className="icon text-ired" />
                                <span className="ms-2">{validationError}</span>
                            </div>
                        )
                    )}
                    {switchStep(step)}
                    <button
                        className={`w-100 btn btn-lg btn-ired ${isLoading && 'btn-ired-loading'}`}
                        type="submit"
                    >
                        {!isLoading ? (
                            'Tiếp theo'
                        ) : (
                            <BarLoader
                                color="white"
                                css="display: inherit; margin-bottom: 4px;"
                                width="50"
                            />
                        )}
                    </button>
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
