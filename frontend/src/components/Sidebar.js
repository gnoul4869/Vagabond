import React, { useState } from 'react';
import { controlLabels } from '../data/controlLabels';

const Sidebar = () => {
    const [activeID, setActiveID] = useState(0);

    return (
        <div className="container sidebar">
            <div className="container p-3">
                <div className="fsr-4">Quản lý</div>

                <div className="divider-medium-bottom mt-3 mb-4"></div>

                {controlLabels.map((label) => {
                    return (
                        <div
                            onClick={() => setActiveID(label.id)}
                            className={`control-label py-1 ${
                                activeID === label.id && 'control-label-active'
                            }`}
                        >
                            {label.icon}
                            <span className="d-none d-md-inline-block">{label.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
