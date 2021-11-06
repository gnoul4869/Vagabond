import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const AddToCartModal = () => {
    return (
        <div className="addToCartModal-container">
            <div className="row text-center">
                <span className="icon fs-1 text-success">
                    <BsFillCheckCircleFill />
                </span>
            </div>
            <div className="row mt-4 text-center mb-2">
                <span className="text-white fs-5">Sản phẩm đã được thêm vào giỏ hàng</span>
            </div>
        </div>
    );
};

export default AddToCartModal;
