import React from 'react';

const GenderRadio = ({ gender, setGender }) => {
    return (
        <>
            <div className="form-check-inline">
                <input
                    type="radio"
                    value="Nam"
                    id="male"
                    name="gender"
                    className="form-check-input"
                    checked={gender === 'Nam' ? true : false}
                    onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label ms-2 fw-600" htmlFor="male">
                    Nam
                </label>
            </div>
            <div className="form-check-inline">
                <input
                    type="radio"
                    value="Nữ"
                    id="female"
                    name="gender"
                    className="form-check-input"
                    checked={gender === 'Nữ' ? true : false}
                    onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label ms-2 fw-600" htmlFor="female">
                    Nữ
                </label>
            </div>
            <div className="form-check-inline fw-600">
                <input
                    type="radio"
                    value="Khác"
                    id="other"
                    name="gender"
                    className="form-check-input"
                    checked={gender === 'Khác' ? true : false}
                    onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label ms-2" htmlFor="other">
                    Khác
                </label>
            </div>
        </>
    );
};

export default GenderRadio;
