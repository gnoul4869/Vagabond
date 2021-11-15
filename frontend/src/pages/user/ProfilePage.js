import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailUser } from '../../redux/actions/userAction';
import ErrorPage from '../error/ErrorPage';
import UserDetailsLoading from '../../components/loading/UserDetailsLoading';

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
        <>
            {isLoading ? (
                <UserDetailsLoading />
            ) : (
                userDetails && (
                    <div className="container bg-white mt-3">
                        <div className="profile-title-container container p-3">
                            <span className="fs-4 fw-600">Hồ sơ của tôi</span>
                        </div>
                        <div className="container">
                            <img
                                src="https://cdn.discordapp.com/attachments/848437070229798912/909785212509093908/futaba_02.png"
                                alt={userDetails.name}
                                className="profile-user-image rounded-circle"
                            />
                        </div>
                        <div className="container py-4">
                            <div className="container">
                                <div className="row">
                                    <div className="col text-secondary fw-600">Email</div>
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
