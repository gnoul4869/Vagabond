import React from 'react';

const UserDetails = ({ setName, setEmail, isLoading }) => {
    return (
        <>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    id="name"
                    placeholder="Nguyễn Văn A"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                />
                <label htmlFor="input">Họ tên</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
                <label htmlFor="input">Email</label>
            </div>
            <button className="w-100 btn btn-lg btn-ired" type="submit" disabled={isLoading}>
                Tiếp theo
            </button>
        </>
    );
};

export default UserDetails;
