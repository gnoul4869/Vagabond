import React, { useState } from 'react';
import { MdOutlineArrowLeft } from 'react-icons/md';
import { controlLabels } from '../data/controlLabels';
import PurchasePage from './user/PurchasePage';
import brandAlt from '../images/vagabond_brand_alt.png';
import logoAlt from '../images/vagabond_logo_alt.png';

const ControlPage = () => {
    const [activeID, setActiveID] = useState(0);

    return (
        <>
            <div className="container p-0">
                <div className="row g-0">
                    <div className="col-2 me-1 me-md-2">
                        <div className="container bg-white mt-3 p-0 p-md-3">
                            <div className="col fw-600">
                                <div className="fsr-4 text-center text-md-start py-2">Quản lý</div>

                                <div className="divider-medium-bottom"></div>

                                <div className="container py-3">
                                    {controlLabels.map((label) => {
                                        return (
                                            <div
                                                onClick={() => setActiveID(label.id)}
                                                className={`control-label d-flex justify-content-center justify-content-md-start py-2 ${
                                                    activeID === label.id && 'control-label-active'
                                                }`}
                                            >
                                                {label.icon}
                                                <span className="d-none d-md-block ms-2">
                                                    {label.name}
                                                </span>

                                                {activeID === label.id && (
                                                    <MdOutlineArrowLeft className="d-block d-md-none" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        {(activeID === 0 || activeID === 2) && (
                            <div className="container bg-white text-center fsr-3 mt-3 p-3">
                                <img
                                    src={brandAlt}
                                    alt="vagabond_brand_alt"
                                    className="img-fluid p-5"
                                />
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                                    optio.
                                </p>
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
                        {activeID === 1 && <PurchasePage />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ControlPage;
