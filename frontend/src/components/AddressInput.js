import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddressInput = ({ isLoading, address, setAddress }) => {
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [provinceID, setProvinceID] = useState('');

    const [districts, setDistricts] = useState([]);
    const [districtID, setDistrictID] = useState('');

    const [wards, setWards] = useState([]);
    const [wardID, setWardID] = useState('');

    const provinceHandler = (value) => {
        setProvinceID(value);
        getDistricts(value);
    };

    const districtHandler = (value) => {
        setDistrictID(value);
        getWards(value);
    };

    useEffect(() => {
        const getProvinces = async () => {
            setIsLoadingAddress(true);
            try {
                const { data } = await axios.get(
                    'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
                    { headers: { token: 'removed' } }
                );

                const sortedProvinces = data.data.sort((a, b) =>
                    a.ProvinceName.localeCompare(b.ProvinceName)
                );

                setProvinces(sortedProvinces);

                setProvinceID(sortedProvinces[0].ProvinceID);

                setIsLoadingAddress(false);
            } catch (error) {
                console.log(error.response.data.message);
                setIsLoadingAddress(true);
            }
        };
        getProvinces();
    }, []);

    const getDistricts = async (provinceID) => {
        setIsLoadingAddress(true);
        try {
            const { data } = await axios.get(
                'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
                {
                    headers: { token: 'removed' },
                    params: { province_id: provinceID },
                }
            );

            const sortedDistricts = data.data.sort((a, b) =>
                a.DistrictName.localeCompare(b.DistricteName)
            );

            setDistricts(sortedDistricts);

            setDistrictID(sortedDistricts[0].DistrictID);

            setIsLoadingAddress(false);
        } catch (error) {
            console.log(error.response.data.message);
            setIsLoadingAddress(false);
        }
    };

    const getWards = async (districtID) => {
        setIsLoadingAddress(true);
        try {
            const { data } = await axios.get(
                'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward',
                {
                    headers: { token: 'removed' },
                    params: { district_id: districtID },
                }
            );

            const sortedWards = data.data.sort((a, b) => a.WardName.localeCompare(b.WardName));

            setWards(sortedWards);

            setWardID(sortedWards[0].WardCode);

            setIsLoadingAddress(false);
        } catch (error) {
            console.log(error.response.data.message);
            setIsLoadingAddress(false);
        }
    };

    console.log(provinceID, districtID, wardID);

    return (
        <>
            <div className="row m-0">
                <div className="col p-0 me-2">
                    <label className="text-secondary">Tỉnh/Thành phố</label>
                    <select
                        value={provinceID}
                        onChange={(e) => provinceHandler(e.target.value)}
                        disabled={isLoadingAddress}
                        className="form-select"
                    >
                        {provinces.map((item) => {
                            return (
                                <option key={item.ProvinceID} value={item.ProvinceID}>
                                    {item.ProvinceName}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="col p-0 me-2">
                    <label className="text-secondary">Quận/Huyện</label>
                    <select
                        value={districtID}
                        onChange={(e) => districtHandler(e.target.value)}
                        disabled={districts.length === 0 || isLoadingAddress}
                        className="form-select"
                    >
                        {districts.map((item) => {
                            return (
                                <option key={item.DistrictID} value={item.DistrictID}>
                                    {item.DistrictName}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="col p-0">
                    <label className="text-secondary">Phường/Xã</label>
                    <select
                        value={wardID}
                        onChange={(e) => setWardID(e.target.value)}
                        disabled={wards.length === 0 || isLoadingAddress}
                        className="form-select"
                    >
                        {wards.map((item) => {
                            return (
                                <option key={item.WardCode} value={item.WardCode}>
                                    {item.WardName}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="form-floating mt-2">
                <input
                    type="text"
                    id="address"
                    placeholder="Địa chỉ cụ thể"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={isLoading}
                />
                <label htmlFor="input">Địa chỉ cụ thể</label>
            </div>
        </>
    );
};

export default AddressInput;
