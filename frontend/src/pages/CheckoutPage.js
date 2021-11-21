import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

const CheckoutPage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
            history.push({
                pathname: '/user/login',
                state: { oldLocation: location.pathname },
            });
        }
    }, [history, location.pathname, userInfo]);

    return (
        <div className="mt-3 bg-white">
            <div className="post-card-line"></div>
            <div className="container">Checkout</div>
        </div>
    );
};

export default CheckoutPage;
