import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailUser } from '../../redux/actions/userAction';
import ErrorPage from '../error/ErrorPage';
import UserDetailsLoading from '../../components/loading/UserDetailsLoading';
import { useHistory, useLocation } from 'react-router';
import GenderRadio from '../../components/GenderRadio';

const ProfilePage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoading, userDetails, error } = useSelector((state) => state.user);
    const userAuth = useSelector((state) => state.auth);
    const userInfo = userAuth.userInfo;

    const [gender, setGender] = useState('');

    useEffect(() => {
        dispatch(detailUser());
    }, [dispatch]);

    useEffect(() => {
        if (userDetails) {
            setGender(userDetails.gender);
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
                            <div className="row">
                                <div className="col">
                                    <div className="text-secondary fw-600 text-end">Email</div>
                                    <div className="text-secondary fw-600 text-end">Tên</div>
                                    <div className="text-secondary fw-600 text-end">Địa chỉ</div>
                                    <div className="text-secondary fw-600 text-end">
                                        Số điện thoại
                                    </div>
                                    <div className="text-secondary fw-600 text-end">Giới tính</div>
                                    <div className="text-secondary fw-600 text-end">Ngày sinh</div>
                                </div>
                                <div className="col">
                                    <div className="text-sdark fw-600 text-start">
                                        {userDetails.email}
                                    </div>
                                    <div className="text-sdark fw-600 text-start">
                                        {userDetails.name}
                                    </div>
                                    <div className="text-sdark fw-600 text-start">
                                        {userDetails.address}
                                    </div>
                                    <div className="text-sdark fw-600 text-start">
                                        {userDetails.phoneNumber}
                                    </div>
                                    <GenderRadio gender={gender} setGender={setGender} />
                                    <div className="text-sdark fw-600 text-start">
                                        {userDetails.birthDate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default ProfilePage;
