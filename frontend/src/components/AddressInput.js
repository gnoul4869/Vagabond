import {} from 'dotenv/config';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const AddressInput = ({
    isUpdating,
    provinceID,
    setProvinceID,
    setProvinceName,
    districtID,
    setDistrictID,
    setDistrictName,
    wardID,
    setWardID,
    setWardName,
    addressDetails,
    setAddressDetails,
    setComponentError,
}) => {
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const provinceHandler = (id, name) => {
        if (id !== 'DEFAULT') {
            setProvinceID(id);
            setProvinceName(name);
            setDistrictID('');
            setDistrictName('');
            setWardID('');
            setWardName('');
            getDistricts(id);
        }
    };

    const districtHandler = (id, name) => {
        if (id !== 'DEFAULT') {
            setDistrictID(id);
            setDistrictName(name);
            setWardID('');
            setWardName('');
            getWards(id);
        }
    };

    const wardHandler = (id, name) => {
        if (id !== 'DEFAULT') {
            setWardID(id);
            setWardName(name);
        }
    };

    const getDistricts = useCallback(
        async (provinceID) => {
            setIsLoadingAddress(true);
            try {
                const { data } = await axios.get(
                    'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
                    {
                        headers: { token: process.env.REACT_APP_GHN_TOKEN },
                        params: { province_id: provinceID },
                    }
                );

                const sortedDistricts = data.data.sort((a, b) =>
                    a.DistrictName.localeCompare(b.DistricteName)
                );

                setDistricts(sortedDistricts);

                setIsLoadingAddress(false);
            } catch (error) {
                setIsLoadingAddress(false);
                setComponentError('Đã có lỗi xảy ra, hãy thử lại sau');
            }
        },
        [setComponentError]
    );

    const getWards = useCallback(
        async (districtID) => {
            setIsLoadingAddress(true);
            try {
                const { data } = await axios.get(
                    'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward',
                    {
                        headers: { token: process.env.REACT_APP_GHN_TOKEN },
                        params: { district_id: districtID },
                    }
                );

                const sortedWards = data.data.sort((a, b) => a.WardName.localeCompare(b.WardName));

                setWards(sortedWards);

                setIsLoadingAddress(false);
            } catch (error) {
                setIsLoadingAddress(false);
                setComponentError('Đã có lỗi xảy ra, hãy thử lại sau');
            }
        },
        [setComponentError]
    );

    useEffect(() => {
        let mounted = true;

        const getProvinces = async () => {
            if (mounted) {
                setIsLoadingAddress(true);
            }
            try {
                const { data } = await axios.get(
                    'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
                    {
                        headers: { token: process.env.REACT_APP_GHN_TOKEN },
                    }
                );

                if (mounted) {
                    const sortedProvinces = data.data.sort((a, b) =>
                        a.ProvinceName.localeCompare(b.ProvinceName)
                    );
                    setProvinces(sortedProvinces);
                    setIsLoadingAddress(false);
                }
            } catch (error) {
                if (mounted) {
                    setIsLoadingAddress(false);
                    setComponentError('Đã có lỗi xảy ra, hãy thử lại sau');
                }
            }
        };

        getProvinces();

        return () => {
            mounted = false;
        };
    }, [setComponentError]);

    useEffect(() => {
        if (provinceID) {
            getDistricts(provinceID);
        }
        if (districtID) {
            getWards(districtID);
        }
    }, [districtID, getDistricts, getWards, provinceID]);

    return (
        <>
            <div className="row m-0">
                <div className="col-12 p-0 me-2">
                    <label className="text-secondary ms-2">Tỉnh/Thành phố</label>
                    <select
                        value={provinceID || 'DEFAULT'}
                        onChange={(e) =>
                            provinceHandler(e.target.value, e.target.selectedOptions[0].text)
                        }
                        disabled={isLoadingAddress || isUpdating}
                        className="form-select fsr-2"
                    >
                        <option value="DEFAULT" disabled>
                            ---
                        </option>
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
                    <label className="text-secondary ms-2">Quận/Huyện</label>
                    <select
                        value={districtID || 'DEFAULT'}
                        onChange={(e) =>
                            districtHandler(e.target.value, e.target.selectedOptions[0].text)
                        }
                        disabled={districts.length === 0 || isLoadingAddress || isUpdating}
                        className="form-select fsr-2"
                    >
                        <option value="DEFAULT" disabled>
                            ---
                        </option>
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
                    <label className="text-secondary ms-2">Phường/Xã</label>
                    <select
                        value={wardID || 'DEFAULT'}
                        onChange={(e) =>
                            wardHandler(e.target.value, e.target.selectedOptions[0].text)
                        }
                        disabled={wards.length === 0 || isLoadingAddress || isUpdating}
                        className="form-select fsr-2"
                    >
                        <option value="DEFAULT" disabled>
                            ---
                        </option>
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
                    className="form-control fsr-2"
                    value={addressDetails}
                    onChange={(e) => setAddressDetails(e.target.value)}
                    disabled={isUpdating}
                />
                <label htmlFor="input">Địa chỉ cụ thể</label>
            </div>
        </>
    );
};

export default AddressInput;
