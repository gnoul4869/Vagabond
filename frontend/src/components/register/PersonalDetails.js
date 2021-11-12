import React from 'react';

const PersonalDetails = ({ name, setName, email, setEmail, isLoading }) => {
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
                    value={name && name}
                />
                <label htmlFor="input">Địa chỉ</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    value={email && email}
                />
                <label htmlFor="input">Số điện thoại</label>
            </div>
        </>
    );
};

export default PersonalDetails;
