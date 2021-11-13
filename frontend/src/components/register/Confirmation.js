import React from 'react';
import PasswordStrength from '../PasswordStrength';

const Confirmation = ({
    isLoading,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
}) => {
    return (
        <>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    id="password"
                    placeholder="Tên"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    value={password && password}
                />
                <label htmlFor="input">Mật khẩu</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="name@example.com"
                    className="form-control"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    value={confirmPassword && confirmPassword}
                />
                <label htmlFor="input">Xác nhận mật khẩu</label>
            </div>
            <PasswordStrength password={password} />
        </>
    );
};

export default Confirmation;