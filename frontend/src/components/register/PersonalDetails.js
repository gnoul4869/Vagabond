import React from 'react';
import DateInput from '../DateInput';
import GenderRadio from '../GenderRadio';

const PersonalDetails = ({
    isLoading,
    address,
    setAddress,
    phoneNumber,
    setPhoneNumber,
    gender,
    setGender,
    birthDate,
    setBirthDate,
}) => {
    return (
        <>
            <div className="form-floating mt-4 mt-md-0 mb-3">
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
            <div className="mb-3">
                <GenderRadio gender={gender} setGender={setGender} />
            </div>
            <div className="row justify-content-start align-items-center mb-3 g-0">
                <div className="col-auto me-2">Ngày sinh</div>
                <div className="col">
                    <DateInput date={birthDate} setDate={setBirthDate} />
                </div>
            </div>
        </>
    );
};

export default PersonalDetails;
