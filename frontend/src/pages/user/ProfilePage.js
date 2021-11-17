import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserDetails } from '../../redux/actions/userAction';
import BarLoader from 'react-spinners/BarLoader';
import ErrorPage from '../error/ErrorPage';
import UserDetailsLoading from '../../components/loading/UserDetailsLoading';
import { useHistory, useLocation } from 'react-router';
import GenderRadio from '../../components/GenderRadio';
import DateInput from '../../components/DateInput';
import moment from 'moment';
import { VscError } from 'react-icons/vsc';

const ProfilePage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { isLoading, userDetails, error } = useSelector((state) => state.user);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [validationError, setValidationError] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        if (!name) {
            return setValidationError('Hãy nhập tên của bạn');
        }
        if (name.length < 5) {
            return setValidationError('Tên không thể có ít hơn 5 ký tự');
        }
        if (name.length > 40) {
            return setValidationError('Tên không thể có nhiều hơn 40 ký tự');
        }

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

        var age = moment().diff(birthDate, 'years');
        if (age < 12) {
            return setValidationError('Số tuổi của bạn phải lớn hơn 12');
        }
        if (age > 125) {
            return setValidationError('Số tuổi không hợp lệ');
        }

        setValidationError('');
        dispatch(updateUserDetails(name, address, phoneNumber, gender, birthDate));
    };

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name);
            setAddress(userDetails.address);
            setPhoneNumber(userDetails.phoneNumber);
            setGender(userDetails.gender);
            setBirthDate(moment(userDetails.birthDate).toDate());
        }
    }, [userDetails]);

    useEffect(() => {
        if (!userInfo) {
            history.push({
                pathname: '/user/login',
                state: { oldLocation: location.pathname },
            });
        }
    }, [history, location.pathname, userInfo]);

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            {isLoading ? (
                <UserDetailsLoading />
            ) : (
                userDetails && (
                    <div className="container bg-white mt-3">
                        <div className="container text-center">
                            <div className="row divider-line mx-5 py-3">
                                <span className="text-sdark fs-4 fw-600">Hồ sơ của tôi</span>
                            </div>
                        </div>
                        <div className="container divider-line d-flex justify-content-center">
                            <img
                                src="https://cdn.discordapp.com/attachments/848437070229798912/909785212509093908/futaba_02.png"
                                alt={userDetails.name}
                                className="profile-user-image rounded-circle my-3"
                            />
                        </div>
                        <div className="container py-4">
                            <form onSubmit={submitHandler}>
                                <div className="row align-items-center">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">Email</div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="text-sdark text-start">
                                            {userDetails.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-3">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">Tên</div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Tên"
                                                className="form-control"
                                                value={name ? name : ''}
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-3">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">
                                            Địa chỉ
                                        </div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="col-md-6">
                                            <div className="fw-600 text-secondary text-start">
                                                <input
                                                    type="text"
                                                    id="address"
                                                    placeholder="Địa chỉ"
                                                    className="form-control"
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    disabled={isLoading}
                                                    value={address ? address : ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-3">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">
                                            Số điện thoại
                                        </div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="col-md-6">
                                            <div className="fw-600 text-secondary text-start">
                                                <input
                                                    type="tel"
                                                    id="tel"
                                                    placeholder="Số điện thoại"
                                                    className="form-control"
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    disabled={isLoading}
                                                    value={phoneNumber ? phoneNumber : ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-3">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">
                                            Giới tính
                                        </div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="col-md-6">
                                            <GenderRadio
                                                gender={gender}
                                                setGender={setGender}
                                                isLoading={isLoading}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-3">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">
                                            Ngày sinh
                                        </div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="col-md-6">
                                            <DateInput
                                                date={birthDate}
                                                setDate={setBirthDate}
                                                isLoading={isLoading}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        {(error || validationError) && (
                                            <div className="auth-error-container mt-4 mt-md-0">
                                                <VscError className="text-ired" />
                                                <span className="ms-2">
                                                    {error || validationError}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-auto">
                                        <button
                                            className={`w-100 btn btn-ired ${
                                                isLoading && 'btn-ired-loading'
                                            }`}
                                            type="submit"
                                        >
                                            {!isLoading ? (
                                                'Lưu'
                                            ) : (
                                                <BarLoader
                                                    color="white"
                                                    css="display: inherit; margin-bottom: .25rem;"
                                                    width="3.125rem"
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default ProfilePage;
