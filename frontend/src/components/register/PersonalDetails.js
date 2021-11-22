import React from 'react';
import AddressInput from '../AddressInput';
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
            <div className="form-floating mb-3">
                <input
                    type="tel"
                    id="tel"
                    placeholder="Số điện thoại"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isLoading}
                />
                <label htmlFor="input">Số điện thoại</label>
            </div>

            <div className="mb-3">
                <GenderRadio gender={gender} setGender={setGender} isLoading={isLoading} />
            </div>

            <div className="row justify-content-start align-items-center mb-3 g-0">
                <div className="col-auto me-2">Ngày sinh</div>
                <div className="col">
                    <DateInput date={birthDate} setDate={setBirthDate} isLoading={isLoading} />
                </div>
            </div>

            <label htmlFor="input">Địa chỉ</label>
            <div className="mt-4 mt-md-0 mb-3">
                {/* <input
                    type="text"
                    id="address"
                    placeholder="Địa chỉ"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={isLoading}
                /> */}

                <AddressInput isLoading={isLoading} address={address} setAddress={setAddress} />
            </div>
        </>
    );
};

export default PersonalDetails;
