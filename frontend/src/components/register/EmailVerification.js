import React, { useEffect } from 'react';
import OtpInput from 'react-otp-input';

const EmailVerification = ({ email, status, otp, setOtp, error, isVerified }) => {
    const inputHandler = (value) => {
        setOtp(value);
    };

    useEffect(() => {
        setOtp('');
    }, [email, setOtp]);

    return (
        <>
            {!isVerified ? (
                <>
                    <div className="mb-3 fw-600 fs-5 text-center">Hãy nhập mã OTP để tiếp tục</div>
                    <div className="mb-3">
                        {status === 'EMAIL_SENT' ? (
                            <p className="text-break">
                                Hệ thống đã gửi mã xác nhận OTP tới địa chỉ email
                                <span className="text-ired fw-600"> {email}</span>
                            </p>
                        ) : status === 'EMAIL_ALREADY_SENT' ? (
                            <p className="text-break">
                                Mã xác nhận OTP đã được gửi tới địa chỉ email
                                <span className="text-ired fw-600"> {email}</span>. Bạn vui lòng
                                kiểm tra email hoặc thử lại sau ít phút nữa
                            </p>
                        ) : (
                            <p className="text-break text-center">
                                Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa
                            </p>
                        )}
                    </div>
                    <OtpInput
                        value={otp}
                        onChange={inputHandler}
                        numInputs={6}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        hasErrored={error && true}
                        containerStyle="d-flex justify-content-evenly mb-3"
                        inputStyle="auth-otp-input"
                        errorStyle="auth-otp-error"
                    />{' '}
                </>
            ) : (
                <>
                    <div className="mb-3 fw-600 fs-5 text-center">
                        Đã xác nhận mã OTP thành công
                    </div>
                    <div className="mb-3">
                        <p className="text-break">
                            Bạn đã xác thực mã OTP thành công. Nhấn tiếp tục để hoàn tất đăng ký tài
                            khoản
                        </p>
                    </div>
                </>
            )}
        </>
    );
};

export default EmailVerification;
