import React, { useState } from 'react';
import { controlLabels } from '../data/controlLabels';

const ControlPage = () => {
    const [activeID, setActiveID] = useState(0);

    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 text-sdark fw-600"
            style={{ width: '280px' }}
        >
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
                <span className="fsr-4">Quản lý</span>
            </div>

            <div className="divider-medium border-steelblue my-2"></div>

            {controlLabels.map((label) => {
                return (
                    <div
                        onClick={() => setActiveID(label.id)}
                        className={`control-label py-1 ${
                            activeID === label.id && 'control-label-active'
                        }`}
                    >
                        {label.icon}
                        {label.name}
                    </div>
                );
            })}
        </div>
    );
};

export default ControlPage;
