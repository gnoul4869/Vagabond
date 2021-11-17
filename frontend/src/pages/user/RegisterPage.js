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
import Confirmation from '../../components/register/Confirmation';
import { register } from '../../redux/actions/authActions';

const RegisterPage = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState('');

    const auth = useSelector((state) => state.auth);
    const userInfo = auth.userInfo;

    const { isLoading, isEmailSent, isVerified, error, status } = useSelector(
        (state) => state.verification
    );

    const oldLocation =
        location.state && location.state.oldLocation ? location.state.oldLocation : '/';

    const submitHandler = (e) => {
        e.preventDefault();

        switch (step) {
            case 0:
                if (!name) {
                    return setValidationError('Hãy nhập tên của bạn');
                }

                if (name.length < 5) {
                    return setValidationError('Tên không thể có ít hơn 5 ký tự');
                }

                if (name.length > 40) {
                    return setValidationError('Tên không thể có nhiều hơn 40 ký tự');
                }

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

                setValidationError('');

                if (!isEmailSent && !isVerified) {
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

                if (!birthDate) {
                    return setValidationError('Hãy chọn ngày sinh của bạn');
                }

                if (!moment(birthDate).isValid()) {
                    return setValidationError('Ngày sinh không hợp lệ');
                }

                var age = moment().diff(birthDate, 'years');
                if (age < 12) {
                    return setValidationError('Bạn phải lớn hơn 12 tuổi để đăng ký tài khoản');
                }
                if (age > 125) {
                    return setValidationError('Số tuổi không hợp lệ');
                }

                setValidationError('');
                return setStep(step + 1);
            }
            case 3: {
                if (!password) {
                    return setValidationError('Hãy nhập mật khẩu của bạn');
                }
                if (!RegExp('(?=.*[a-z])|(?=.*[A-Z])').test(password)) {
                    return setValidationError('Mật khẩu phải có ít nhất 1 chữ cái');
                }
                if (!RegExp('(?=.*[0-9])').test(password)) {
                    return setValidationError('Mật khẩu phải có ít nhất 1 chữ số');
                }
                if (!RegExp('(?=.{6,})').test(password)) {
                    return setValidationError('Mật khẩu phải có ít nhất 6 ký tự');
                }
                if (!confirmPassword) {
                    return setValidationError('Hãy xác nhận mật khẩu của bạn');
                }
                if (password !== confirmPassword) {
                    return setValidationError('Mật khẩu xác nhận không đúng');
                }
                setValidationError('');
                return dispatch(
                    register(email, password, name, address, phoneNumber, gender, birthDate)
                );
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
                        isLoading={isLoading}
                    />
                );
            case 2:
                return (
                    <PersonalDetails
                        address={address}
                        setAddress={setAddress}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        gender={gender}
                        setGender={setGender}
                        birthDate={birthDate}
                        setBirthDate={setBirthDate}
                    />
                );
            case 3:
                return (
                    <Confirmation
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
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
        dispatch(refreshVerification('REFRESH_ERROR'));
    }, [dispatch]);

    useEffect(() => {
        if (userInfo) {
            history.push(oldLocation);
        }
    }, [history, oldLocation, userInfo]);

    return (
        <div className="row align-items-center g-lg-5 py-5 mx-md-5">
            <div className="col-lg-7 text-center text-lg-start">
                <h1 className="display-5 fw-bold mb-3 text-ired">Đăng ký thành viên</h1>
                <p className="col-lg-10 fs-2 ms-3 text-sdark">Bước đầu khám phá</p>
            </div>
            <div className="col-md-10 col-lg-5 mx-auto">
                <form
                    className="auth-form p-4 p-md-5 border rounded-3 bg-white"
                    onSubmit={submitHandler}
                    noValidate
                >
                    {step > 0 && (
                        <button type="button" className="auth-back-btn" onClick={backBtnHandler}>
                            <MdArrowBack className="icon" />
                        </button>
                    )}
                    {(error || validationError) && (
                        <div className="auth-error-container mt-4 mt-md-0">
                            <VscError className="icon text-ired" />
                            <span className="ms-2">{error || validationError}</span>
                        </div>
                    )}
                    {switchStep(step)}
                    <button
                        className={`w-100 btn btn-lg btn-ired ${
                            isLoading || auth.isLoading ? 'btn-ired-loading' : ''
                        }`}
                        type="submit"
                    >
                        {!isLoading && !auth.isLoading ? (
                            'Tiếp theo'
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
                        <span>Đã là thành viên?</span>{' '}
                        <Link
                            to={{
                                pathname: '/user/login',
                                state: {
                                    oldLocation:
                                        location.state && location.state.oldLocation
                                            ? location.state.oldLocation
                                            : location.pathname,
                                },
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
