import React from 'react';

const ProfilePage = () => {
    return (
        <div className="container bg-white mt-3">
            <div className="user-page-container container p-3">
                <span className="fs-4 fw-600">Hồ sơ của tôi</span>
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
