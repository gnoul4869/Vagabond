import React from 'react';
import { MdOutlineArrowLeft } from 'react-icons/md';

const Sidebar = ({ title, labelList, activeID, setActiveID }) => {
    return (
        <div className="col-auto me-1 me-md-2">
            <div className="container sticky-top bg-white mt-3 px-1 px-md-3">
                <div className="col fw-600">
                    <div className="fsr-4 text-center text-md-start py-2">{title}</div>

                    <div className="divider-medium-bottom"></div>

                    <div className="container py-3">
                        {labelList.map((label) => {
                            return (
                                <div
                                    key={label.id}
                                    onClick={() => setActiveID(label.id)}
                                    className={`sidebar-label d-flex justify-content-center justify-content-md-start py-2 ${
                                        activeID === label.id && 'sidebar-label-active'
                                    }`}
                                >
                                    {label.icon}
                                    <span className="d-none d-md-block ms-2">{label.name}</span>

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
    );
};

export default Sidebar;
