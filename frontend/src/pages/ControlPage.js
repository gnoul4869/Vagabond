import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { controlLabels } from '../data/controlLabels';
import PurchasePage from './user/PurchasePage';
import brandAlt from '../images/vagabond_brand_alt.png';
import logoAlt from '../images/vagabond_logo_alt.png';
import Sidebar from '../components/Sidebar';
import NotFoundPage from './error/NotFoundPage';

const ControlPage = () => {
    const history = useHistory();
    const location = useLocation();
    const { userInfo } = useSelector((state) => state.auth);

    const [activeID, setActiveID] = useState(0);

    useEffect(() => {
        if (!userInfo) {
            history.push({
                pathname: '/user/login',
                state: { oldLocation: location.pathname },
            });
        }
    }, [history, location.pathname, userInfo]);

    return (
        <>
            {userInfo && userInfo.role !== 'admin' ? (
                <NotFoundPage />
            ) : (
                <div className="container p-0">
                    <div className="row g-0">
                        <Sidebar
                            title={'Quản lý'}
                            labelList={controlLabels}
                            activeID={activeID}
                            setActiveID={setActiveID}
                        />

                        <div className="col">
                            {activeID === 0 && (
                                <div className="container bg-white text-center fsr-3 mt-3 p-3">
                                    <img
                                        src={brandAlt}
                                        alt="vagabond_brand_alt"
                                        className="img-fluid p-5"
                                    />
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        Vitae, optio.
                                    </p>
                                </div>
                            )}

                            {activeID === 1 && <PurchasePage />}

                            {activeID === 2 && (
                                <div className="container bg-white text-center fsr-3 mt-3 p-3">
                                    <img
                                        src={logoAlt}
                                        alt="vagabond_logo_alt"
                                        className="img-fluid w-50 p-5"
                                    />
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Possimus soluta ab cum sequi dignissimos distinctio.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ControlPage;
