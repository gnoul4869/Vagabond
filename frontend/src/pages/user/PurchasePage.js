import React, { useState } from 'react';
import { purchaseLabels } from '../../data/purchaseLabels';

const PurchasePage = () => {
    const [activeID, setActiveID] = useState(0);

    return (
        <div className="container bg-white mt-3 mx-auto">
            <div className="row fsr-2 text-sdark">
                {purchaseLabels.map((item) => {
                    return (
                        <div
                            key={item.id}
                            onClick={() => setActiveID(item.id)}
                            className={`purchase-label col py-3 ${
                                activeID === item.id && 'purchase-label-active'
                            }`}
                        >
                            {item.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PurchasePage;
