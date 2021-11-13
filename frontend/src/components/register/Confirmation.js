import React from 'react';

const Confirmation = ({
    isLoading,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
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
                    id="passwordConfirm"
                    placeholder="name@example.com"
                    className="form-control"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    disabled={isLoading}
                    value={passwordConfirm && passwordConfirm}
                />
                <label htmlFor="input">Xác nhận mật khẩu</label>
            </div>
        </>
    );
};

export default Confirmation;
