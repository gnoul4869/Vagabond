import React from 'react';

const ProfileLoading = () => {
    return (
        <div className="container bg-white mt-3">
            <div className="container py-3">
                <div className="col-3 mx-auto">
                    <div className="bg-loading rounded-pill"></div>
                </div>
            </div>
            <div className="container">
                <div className="divider mx-2 mx-md-5 py-4">
                    <div className="d-flex justify-content-center">
                        <div className="profile-user-image-container">
                            <div className="profile-user-image-loading bg-loading"></div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4 col-md-2 col-lg-1 mt-4">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <form>
                    <div className="row align-items-center">
                        <div className="profile-field-name">
                            <div className="col-md-2 ms-auto">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                        <div className="profile-field-value">
                            <div className="col-md-4">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center mt-3">
                        <div className="profile-field-name">
                            <div className="col-md-3 ms-auto">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                        <div className="profile-field-value">
                            <div className="col-md-6">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center mt-3">
                        <div className="profile-field-name">
                            <div className="col-md-4 ms-auto">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                        <div className="profile-field-value">
                            <div className="col-md-6">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center mt-3">
                        <div className="profile-field-name">
                            <div className="col-md-2 ms-auto">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                        <div className="profile-field-value">
                            <div className="row">
                                <div className="col-2">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                                <div className="col-2">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                                <div className="col-2">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center mt-3">
                        <div className="profile-field-name">
                            <div className="col-md-2 ms-auto">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                        <div className="profile-field-value">
                            <div className="col-md-6">
                                <div className="bg-loading rounded-pill w-45"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center mt-3">
                        <div className="profile-field-name">
                            <div className="col-md-2 ms-auto">
                                <div className="bg-loading rounded-pill"></div>
                            </div>
                        </div>
                        <div className="profile-field-value">
                            <div className="col-md-10">
                                <div className="row m-0">
                                    <div className="col p-0 me-2">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                    <div className="col p-0 me-2">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                    <div className="col p-0">
                                        <div className="bg-loading rounded-pill"></div>
                                    </div>
                                </div>
                                <div className="form-floating mt-2">
                                    <div className="bg-loading rounded-pill"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-4 col-md-2 col-lg-1 mt-5">
                            <div className="bg-loading rounded-pill"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileLoading;
