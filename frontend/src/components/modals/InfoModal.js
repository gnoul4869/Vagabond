import React from 'react';
import { MdCancel } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const InfoModal = ({ message, isError }) => {
    return (
        <div className="modal-container">
            <div className="row text-center">
                <span className="icon fs-1">
                    {isError ? (
                        <MdCancel className="text-danger" />
                    ) : (
                        <BsFillCheckCircleFill className="text-success" />
                    )}
                </span>
            </div>
            <div className="row mt-4 text-center mb-2">
                <span className="text-white fsr-4">{message}</span>
            </div>
        </div>
    );
};

export default InfoModal;
