import React from 'react';

const PersonalDetails = ({
    isLoading,
    address,
    setAddress,
    phoneNumber,
    setPhoneNumber,
    setGender,
}) => {
    return (
        <>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    id="address"
                    placeholder="Z-City"
                    className="form-control"
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={isLoading}
                    value={address && address}
                />
                <label htmlFor="input">Địa chỉ</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="tel"
                    id="tel"
                    placeholder="XXX-XXX-XXX"
                    className="form-control"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isLoading}
                    value={phoneNumber && phoneNumber}
                />
                <label htmlFor="input">Số điện thoại</label>
            </div>
            <div className="form-check-inline mb-3">
                <input
                    type="radio"
                    value="Nam"
                    id="male"
                    name="gender"
                    class="form-check-input"
                    onChange={(e) => setGender(e.target.value)}
                />
                <label class="form-check-label ms-2" htmlFor="male">
                    Nam
                </label>
            </div>
            <div className="form-check-inline mb-3">
                <input
                    type="radio"
                    value="Nữ"
                    id="female"
                    name="gender"
                    class="form-check-input"
                    onChange={(e) => setGender(e.target.value)}
                />
                <label class="form-check-label ms-2" htmlFor="female">
                    Nữ
                </label>
            </div>
            <div className="form-check-inline mb-3">
                <input
                    type="radio"
                    value="Khác"
                    id="other"
                    name="gender"
                    class="form-check-input"
                    onChange={(e) => setGender(e.target.value)}
                />
                <label class="form-check-label ms-2" htmlFor="other">
                    Khác
                </label>
            </div>
        </>
    );
};

export default PersonalDetails;
