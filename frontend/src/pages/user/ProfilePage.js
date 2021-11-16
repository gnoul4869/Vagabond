import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailUser } from '../../redux/actions/userAction';
import ErrorPage from '../error/ErrorPage';
import UserDetailsLoading from '../../components/loading/UserDetailsLoading';
import { useHistory, useLocation } from 'react-router';

const ProfilePage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoading, userDetails, error } = useSelector((state) => state.user);
    const userAuth = useSelector((state) => state.auth);
    const userInfo = userAuth.userInfo;

    useEffect(() => {
        dispatch(detailUser());
    }, [dispatch]);

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
                        <div className="container py-4 bg-info">
                            <div className="row justify-content-center mx-auto">
                                <div className="col-1 text-secondary fw-600 ">Email</div>
                                <div className="col-5 text-sdark ms-3 ">{userDetails.email}</div>
                            </div>
                            <div className="row justify-content-center mx-auto">
                                <div className="col-1 text-secondary fw-600 text-end">Tên</div>
                                <div className="col-5 text-sdark ms-3">{userDetails.name}</div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default ProfilePage;
