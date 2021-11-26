import React from 'react';
import { MdCancel } from 'react-icons/md';

const ErrorModal = ({ message }) => {
    return (
        <div className="modal-container">
            <div className="row text-center">
                <span className="icon fs-1 text-danger">
                    <MdCancel />
                </span>
            </div>
            <div className="row mt-4 text-center mb-2">
                <span className="text-white fs-5">{message}</span>
            </div>
        </div>
    );
};

export default ErrorModal;
