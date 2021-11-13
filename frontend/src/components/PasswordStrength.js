import React from 'react';

const PasswordStrength = ({ password }) => {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    const mediumRegex = new RegExp(
        '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );

    return (
        <div className="row justify-content-evenly mb-3 px-4 g-2">
            <div className="col-4">
                <div
                    className={`password-strength-bar ${
                        password &&
                        (strongRegex.test(password)
                            ? 'password-strong'
                            : mediumRegex.test(password)
                            ? 'password-medium'
                            : 'password-weak')
                    } `}
                ></div>
            </div>
            <div className="col-4">
                <div
                    className={`password-strength-bar ${
                        password &&
                        (strongRegex.test(password)
                            ? 'password-strong'
                            : mediumRegex.test(password) && 'password-medium')
                    } `}
                ></div>
            </div>
            <div className="col-4">
                <div
                    className={`password-strength-bar ${
                        password && strongRegex.test(password) && 'password-strong'
                    } `}
                ></div>
            </div>
        </div>
    );
};

export default PasswordStrength;
