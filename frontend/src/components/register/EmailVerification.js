import React from 'react';
import OtpInput from 'react-otp-input';

const EmailVerification = ({ email, message, otp, setOtp }) => {
    const inputHandler = (value) => {
        setOtp(value);
    };

    return (
        <>
            <div className="mb-3 fw-600 fs-5 text-center">Hãy nhập mã OTP để tiếp tục</div>
            <div className="mb-3">
                <p className="text-break">{message}</p>
            </div>
            <OtpInput
                value={otp}
                onChange={inputHandler}
                numInputs={6}
                isInputNum={true}
                shouldAutoFocus={true}
                containerStyle="d-flex justify-content-evenly mb-3"
                inputStyle="auth-otp-input"
            />

            <button className="w-100 btn btn-lg btn-ired" type="submit">
                Tiếp theo
            </button>
        </>
    );
};

export default EmailVerification;
