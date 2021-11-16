import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailUser } from '../../redux/actions/userAction';
import ErrorPage from '../error/ErrorPage';
import UserDetailsLoading from '../../components/loading/UserDetailsLoading';
import { useHistory, useLocation } from 'react-router';
import GenderRadio from '../../components/GenderRadio';
import DateInput from '../../components/DateInput';
import moment from 'moment';

const ProfilePage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoading, userDetails, error } = useSelector((state) => state.user);
    const userAuth = useSelector((state) => state.auth);
    const userInfo = userAuth.userInfo;

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());

    const submitHandler = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        dispatch(detailUser());
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
                                <div className="row align-items-center mt-2">
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
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={isLoading}
                                                value={name && name}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-2">
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
                                                    value={address && address}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-2">
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
                                                    value={phoneNumber && phoneNumber}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-2">
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
                                <div className="row align-items-center mt-2">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">
                                            Giới tính
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
                            </form>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default ProfilePage;
