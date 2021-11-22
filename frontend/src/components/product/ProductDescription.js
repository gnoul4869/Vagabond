import React from 'react';

const ProductDescription = ({ category, brand, weight, description }) => {
    return (
        <>
            <div className="container bg-white mt-3 p-3">
                <div className="bg-label container rounded mb-3">
                    <div className="product-description-label fs-4">Chi tiết sản phẩm</div>
                </div>
                <div className="container p-3">
                    <div className="row">
                        <div className="col-4 col-md-3 col-lg-2 text-secondary product-description-label">
                            <span>Danh mục</span>
                        </div>
                        <div className="col p-0">
                            <span>{category}</span>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 col-md-3 col-lg-2 text-secondary product-description-label">
                            <span>Thương hiệu</span>
                        </div>
                        <div className="col p-0">
                            <span>{brand}</span>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4 col-md-3 col-lg-2 text-secondary product-description-label">
                            <span>Khối lượng</span>
                        </div>
                        <div className="col p-0">
                            <span>{weight / 1000} Kg</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container bg-white mt-3 p-3">
                <div className="bg-label container rounded mb-3">
                    <div className="product-description-label fs-4">Mô tả sản phẩm</div>
                </div>
                <p className="container p-3">{description}</p>
            </div>
        </>
    );
};

export default ProductDescription;
