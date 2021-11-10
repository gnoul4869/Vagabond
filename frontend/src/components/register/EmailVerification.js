import React from 'react';

const EmailVerification = ({ setEmail, setPassword, setName }) => {
    return (
        <>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    id="input"
                    placeholder="name@example.com"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="input">Họ tên</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    id="input"
                    placeholder="name@example.com"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="input">Email</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Mật khẩu</label>
            </div>
            <button className="w-100 btn btn-lg btn-ired" type="submit">
                Tiếp theo
            </button>
        </>
    );
};

export default EmailVerification;
