import React from 'react';

const PaginationLoading = ({ buttons, selection, category }) => {
    return (
        <>
            <div className="container bg-white p-2">
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
        </>
    );
};

export default PaginationLoading;
