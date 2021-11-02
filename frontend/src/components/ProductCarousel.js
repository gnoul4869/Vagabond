import React, { useEffect, useState } from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

const ProductCarousel = ({ images, name }) => {
    const newImages = images.slice(0, 5);
    const [imageNo, setImageNo] = useState(0);
    const [image, setImage] = useState(newImages[imageNo]);

    // console.log(newImages[imageNo]);
    // console.log(image);

    useEffect(() => {
        setImage(newImages[imageNo]);
    }, [newImages, imageNo]);

    return (
        <div className="container mb-4 mb-lg-0">
            <div className="row">
                <img src={image} alt={name} className="product-carousel-img-big" />
            </div>
            <div className="row mt-3 justify-content-center">
                <div className="col-auto d-flex justify-content-center p-0 ms-3 mb-2 fs-4">
                    <button type="button" className="product-carousel-btn p-0">
                        <MdChevronLeft className="icon" />
                    </button>
                </div>
                <div className="product-carousel-img-container col d-flex justify-content-center flex-wrap">
                    {newImages.map((item, index) => {
                        return (
                            <img
                                key={index}
                                src={item}
                                alt={name}
                                onClick={() => setImageNo(index)}
                                className={`product-carousel-img-small me-1 mb-2 ${
                                    index === imageNo && `product-carousel-img-small-active`
                                }`}
                            />
                        );
                    })}
                </div>
                <div className="col-auto d-flex justify-content-center p-0 me-3 mb-2 fs-4">
                    <button type="button" className="product-carousel-btn p-0">
                        <MdChevronRight className="icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;
