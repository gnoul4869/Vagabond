import React from 'react';
import { MdPlace } from 'react-icons/md';

const ShippingDetails = ({
    name,
    phoneNumber,
    provinceName,
    districtName,
    wardName,
    addressDetails,
}) => {
    return (
        <div className="bg-white">
            <div className="postcard-border"></div>
            <div className="container p-2 p-md-4">
                <div className="text-ired fw-600 fsr-3">
                    <MdPlace className="icon me-1" />
                    Thông tin đặt hàng
                </div>
                <div className="container px-0 px-md-4 fsr-2">
                    <div className="row mt-3">
                        <div className="col-12 col-md">
                            <div className="row">
                                <div className="col-4 col-md-3 col-lg-4 text-secondary">
                                    <span className="d-none d-md-flex">Tên người nhận</span>
                                    <span className="d-flex d-md-none">Tên</span>
                                </div>
                                <div className="col p-0">
                                    <span className="text-sdark">{name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md mt-3 mt-md-0">
                            <div className="row">
                                <div className="col-4 col-md-3 col-lg-4 text-secondary">
                                    <span className="d-none d-md-flex">Số điện thoại</span>
                                    <span className="d-flex d-md-none">Sđt</span>
                                </div>
                                <div className="col p-0">
                                    <span className="text-sdark">{phoneNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 col-md-3 col-lg-2 text-secondary">
                            <span className="d-none d-md-flex">Địa chỉ giao hàng</span>
                            <span className="d-flex d-md-none">Giao tới</span>
                        </div>
                        <div className="col p-0">
                            <span className="text-sdark">
                                {wardName}, {districtName}, {provinceName}
                            </span>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 col-md-3 col-lg-2 text-secondary">
                            <span className="d-none d-md-flex">Địa chỉ chi tiết</span>
                            <span className="d-flex d-md-none">Đ.chỉ chi tiết</span>
                        </div>
                        <div className="col p-0">
                            <span className="text-sdark">{addressDetails}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingDetails;
