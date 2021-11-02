import React from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const ProductCarousel = ({ images, name }) => {
    const newImages = images.slice(0, 5);

    return (
        <div className="container mb-4 mb-lg-0">
            <div className="row">
                <img src={images[0]} alt={name} className="product-carousel-img-big" />
            </div>
            <div className="row mt-3">
                <div className="col-auto d-flex justify-content-center p-0 ms-3 mb-2">
                    <button type="button" className="product-carousel-btn-prev">
                        <GrFormPrevious className="icon" />
                    </button>
                </div>
                <div className="col d-flex justify-content-center flex-wrap">
                    {newImages.map((image, index) => {
                        return (
                            <img
                                key={index}
                                src={image}
                                alt={name}
                                className="product-carousel-img-small me-1 mb-2"
                            />
                        );
                    })}
                </div>
                <div className="col-auto d-flex justify-content-center p-0 me-3 mb-2">
                    <button type="button" className="product-carousel-btn-next">
                        <GrFormNext className="icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;
