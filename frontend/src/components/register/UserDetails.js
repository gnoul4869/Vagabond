import React from 'react';

const UserDetails = ({ name, setName, email, setEmail, isLoading }) => {
    return (
        <>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    id="name"
                    placeholder="Tên"
                    className="form-control"
                    value={name && name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                />
                <label htmlFor="input">Tên</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="form-control"
                    value={email && email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
                <label htmlFor="input">Email</label>
            </div>
        </>
    );
};

export default UserDetails;
