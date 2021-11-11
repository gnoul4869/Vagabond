import React from 'react';

const EmailVerification = ({ email }) => {
    return (
        <>
            <div className="mb-3 fw-600 fs-5 text-center">Hãy nhập mã OTP để tiếp tục</div>
            <div className="mb-3">
                Hệ thống đã gửi mã xác nhận OTP tới địa chỉ email{' '}
                <span className="fw-600 text-ired">{email}</span>
            </div>

            <button className="w-100 btn btn-lg btn-ired" type="submit">
                Tiếp theo
            </button>
        </>
    );
};

export default EmailVerification;
