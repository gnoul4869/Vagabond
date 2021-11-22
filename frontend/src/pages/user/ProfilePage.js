import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import BarLoader from 'react-spinners/BarLoader';
import { VscError } from 'react-icons/vsc';
import { useHistory, useLocation } from 'react-router';
import ErrorPage from '../error/ErrorPage';
import DateInput from '../../components/DateInput';
import GenderRadio from '../../components/GenderRadio';
import SuccessModal from '../../components/modals/SuccessModal';
import ProfileLoading from '../../components/loading/ProfileLoading';
import { getUserDetails, updateUserDetails } from '../../redux/actions/userAction';
import AddressInput from '../../components/AddressInput';

const ProfilePage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { isLoading, isUpdating, isDone, userDetails, error } = useSelector(
        (state) => state.user
    );

    const [details] = useState(userDetails);

    const [imageFile, setImageFile] = useState(null);
    const [image, setImage] = useState('/images/user_profile_picture.jpg');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [provinceID, setProvinceID] = useState('');
    const [provinceName, setProvinceName] = useState('');
    const [districtID, setDistrictID] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [wardID, setWardID] = useState('');
    const [wardName, setWardName] = useState('');
    const [addressDetails, setAddressDetails] = useState('');

    const [validationError, setValidationError] = useState('');
    const [isModalShown, setIsModalShown] = useState(false);

    const imageInput = useRef();
    const uploadImage = () => {
        imageInput.current.click();
    };
    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1 * 1024 * 1024) {
                return alert('Chỉ cho phép hình ảnh có kích thước tối đa 1 MB');
            }
            setImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    useEffect(() => {
        if (isDone === true) {
            setIsModalShown(true);
        }
        if (isModalShown === true) {
            const modalTimeout = setTimeout(() => setIsModalShown(false), 2000);
            return () => {
                clearTimeout(modalTimeout);
            };
        }
    }, [isDone, isModalShown]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!name) {
            return setValidationError('Hãy nhập tên của bạn');
        }
        if (name.length < 5) {
            return setValidationError('Tên không thể có ít hơn 5 ký tự');
        }
        if (name.length > 40) {
            return setValidationError('Tên không thể có nhiều hơn 40 ký tự');
        }

        if (!phoneNumber) {
            return setValidationError('Hãy nhập số điện thoại của bạn');
        }

        if (phoneNumber.length !== 10) {
            return setValidationError('Số điện thoại của bạn không hợp lệ');
        }

        if (!gender) {
            return setValidationError('Hãy chọn giới tính của bạn');
        }

        if (!birthDate) {
            return setValidationError('Hãy chọn ngày sinh của bạn');
        }

        if (!moment(birthDate).isValid()) {
            return setValidationError('Ngày sinh không hợp lệ');
        }

        var age = moment().diff(birthDate, 'years');
        if (age < 12) {
            return setValidationError('Số tuổi của bạn phải lớn hơn 12');
        }
        if (age > 125) {
            return setValidationError('Số tuổi không hợp lệ');
        }

        if (!provinceID || !provinceName) {
            return setValidationError('Hãy chọn tỉnh/thành phố');
        }

        if (!districtID || !districtName) {
            return setValidationError('Hãy chọn quận/huyện');
        }

        if (!wardID || !wardName) {
            return setValidationError('Hãy chọn phường/xã');
        }

        if (!addressDetails) {
            return setValidationError('Hãy cung cấp địa chỉ cụ thể');
        }

        setValidationError('');
        dispatch(
            updateUserDetails(
                name,
                phoneNumber,
                gender,
                birthDate,
                provinceID,
                provinceName,
                districtID,
                districtName,
                wardID,
                wardName,
                addressDetails,
                imageFile
            )
        );
    };

    console.log(addressDetails);

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch, details]);

    useEffect(() => {
        if (userDetails) {
            setImage(userDetails.image);
            setName(userDetails.name);
            setPhoneNumber(userDetails.phoneNumber);
            setGender(userDetails.gender);
            setBirthDate(moment(userDetails.birthDate).toDate());
            setProvinceID(userDetails.addresses.provinceID);
            setProvinceName(userDetails.addresses.provinceName);
            setDistrictID(userDetails.addresses.districtID);
            setDistrictName(userDetails.addresses.districtName);
            setWardID(userDetails.addresses.wardID);
            setWardName(userDetails.addresses.wardName);
            setAddressDetails(userDetails.addresses.addressDetails);
        }
    }, [userDetails]);

    useEffect(() => {
        if (!userInfo) {
            history.push({
                pathname: '/user/login',
                state: { oldLocation: location.pathname },
            });
        }
    }, [history, location.pathname, userInfo]);

    if (!userDetails && error) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            {isLoading ? (
                <ProfileLoading />
            ) : (
                userDetails && (
                    <div className="container bg-white mt-3">
                        <div className="container text-center py-3">
                            <span className="text-sdark fs-4 fw-600">Hồ sơ của tôi</span>
                        </div>
                        <div className="container">
                            <div className="divider mx-2 mx-md-5 py-4">
                                <div className="d-flex justify-content-center">
                                    <div className="profile-user-image-container">
                                        <div
                                            className="profile-user-image"
                                            style={{ backgroundImage: `url(${image})` }}
                                            onClick={uploadImage}
                                        ></div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        className="d-none"
                                        ref={imageInput}
                                        onChange={imageHandler}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-white"
                                        onClick={uploadImage}
                                        disabled={isUpdating}
                                    >
                                        Chọn ảnh
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="container py-4">
                            <form onSubmit={submitHandler}>
                                <div className="row align-items-center">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">Email</div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="text-sdark text-start">
                                            {userDetails.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-3">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">Tên</div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Tên"
                                                className="form-control"
                                                value={name ? name : ''}
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={isUpdating}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center mt-3">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">
                                            Số điện thoại
                                        </div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="col-md-6">
                                            <div className="fw-600 text-secondary text-start">
                                                <input
                                                    type="tel"
                                                    id="tel"
                                                    placeholder="Số điện thoại"
                                                    className="form-control"
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    disabled={isUpdating}
                                                    value={phoneNumber ? phoneNumber : ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center mt-3">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">
                                            Giới tính
                                        </div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="col-md-6">
                                            <GenderRadio
                                                gender={gender}
                                                setGender={setGender}
                                                isLoading={isUpdating}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center mt-3">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">
                                            Ngày sinh
                                        </div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="col-md-6">
                                            <DateInput
                                                date={birthDate}
                                                setDate={setBirthDate}
                                                isLoading={isUpdating}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center mt-3">
                                    <div className="profile-field-name">
                                        <div className="fw-600 text-secondary text-end">
                                            Địa chỉ
                                        </div>
                                    </div>
                                    <div className="profile-field-value">
                                        <div className="col-md-10">
                                            <AddressInput
                                                isUpdating={isUpdating}
                                                provinceID={provinceID}
                                                setProvinceID={setProvinceID}
                                                provinceName={provinceName}
                                                setProvinceName={setProvinceName}
                                                districtID={districtID}
                                                setDistrictID={setDistrictID}
                                                districtName={districtName}
                                                setDistrictName={setDistrictName}
                                                wardID={wardID}
                                                setWardID={setWardID}
                                                wardName={wardName}
                                                setWardName={setWardName}
                                                addressDetails={addressDetails}
                                                setAddressDetails={setAddressDetails}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        {(error || validationError) && (
                                            <div className="auth-error-container mt-4 mt-md-0">
                                                <VscError className="text-ired" />
                                                <span className="ms-2">
                                                    {error || validationError}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4 col-md-2 col-lg-1">
                                        <button
                                            className={`w-100 btn btn-ired ${
                                                isUpdating && 'btn-ired-loading'
                                            }`}
                                            type="submit"
                                        >
                                            {!isUpdating ? (
                                                'Lưu'
                                            ) : (
                                                <BarLoader
                                                    color="white"
                                                    css="display: inherit; margin-bottom: .25rem;"
                                                    width="3.125rem"
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            )}
            {isModalShown && <SuccessModal message={'Cập nhật hồ sơ thành công'} />}
        </>
    );
};

export default ProfilePage;
