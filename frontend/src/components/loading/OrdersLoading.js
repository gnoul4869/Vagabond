import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const OrdersLoading = () => {
    return (
        <div className="container d-flex justify-content-center">
            <HashLoader
                color="#c73434"
                css="display: inherit; margin-top: 15rem; margin-bottom: 30rem;"
                width="3.125rem"
            />
        </div>
    );
};

export default OrdersLoading;
