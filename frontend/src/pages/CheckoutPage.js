import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import ShippingDetails from '../components/checkout/ShippingDetails';
import CheckoutLoading from '../components/loading/CheckoutLoading';
import { getUserDetails } from '../redux/actions/userAction';

const CheckoutPage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { isLoading, isUpdating, isDone, userDetails, error } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

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
            {isLoading ? (
                <CheckoutLoading />
            ) : (
                userDetails && (
                    <ShippingDetails
                        name={userDetails.name}
                        address={userDetails.address}
                        phoneNumber={userDetails.phoneNumber}
                    />
                )
            )}
        </>
    );
};

export default CheckoutPage;
