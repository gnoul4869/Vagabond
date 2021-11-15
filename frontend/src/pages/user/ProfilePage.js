import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailUser } from '../../redux/actions/userAction';
import ErrorPage from '../error/ErrorPage';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { isLoading, userDetails, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(detailUser());
    }, [dispatch]);

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <div className="container bg-white mt-3">
            <div className="user-page-container container p-3">
                <span className="fs-4 fw-600">Hồ sơ của tôi</span>
            </div>
            <div className="container">
                <div className="profile-user-image">{/* <img src={image} alt={name} /> */}</div>
            </div>
            <div className="container py-4">
                <div className="container">
                    <div className="row">
                        <div className="col text-secondary fw-600">Email</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
