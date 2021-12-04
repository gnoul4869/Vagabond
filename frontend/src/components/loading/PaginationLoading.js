import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

const PaginationLoading = ({ buttons, selection, category }) => {
    return (
        <>
            <div className="container bg-white d-none d-md-flex p-2">
                <div className="container">
                    <div className="row">
                        {buttons.map((item, index) => {
                            return (
                                <div key={index} className={`col-1 ${index === 0 && 'offset-1'}`}>
                                    <div className="bg-loading rounded py-3"></div>
                                </div>
                            );
                        })}

                        {selection && (
                            <div className="col-2">
                                <div className="bg-loading rounded py-3"></div>
                            </div>
                        )}

                        {category && (
                            <div className="col-2 offset-4">
                                <div className="bg-loading rounded py-3"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container d-flex d-md-none p-3">
                <PulseLoader
                    color="#c73434"
                    css="display: inherit; margin: 0 auto;"
                    width="3.125rem"
                    speedMultiplier={0.9}
                />
            </div>
        </>
    );
};

export default PaginationLoading;
