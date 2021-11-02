import React, { useEffect, useState } from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

const ProductCarousel = ({ images, name }) => {
    const [imageArray, setImageArray] = useState(5);
    const [imageNo, setImageNo] = useState(0);
    const newImages = images.slice(imageArray - 5, imageArray);
    const [image, setImage] = useState(newImages[imageNo]);

    const imageButtonHandler = (value) => {
        if (value >= 5 && value <= images.length) {
            setImageArray(value);
        }
    };

    useEffect(() => {
        setImage(newImages[imageNo]);
        console.log('test');
    }, [newImages, imageNo]);

    return (
        <div className="container mb-4 mb-lg-0">
            <div className="row">
                <img src={image} alt={name} className="product-carousel-img-big" />
            </div>
            <div className="row mt-3 justify-content-center">
                {images.length > 5 && (
                    <div className="col-auto d-flex justify-content-center p-0 ms-3 mb-2 fs-4">
                        <button
                            type="button"
                            className="product-carousel-btn p-0"
                            onClick={() => imageButtonHandler(imageArray - 1)}
                        >
                            <MdChevronLeft className="icon" />
                        </button>
                    </div>
                )}

                <div className="product-carousel-img-container col d-flex justify-content-center flex-wrap">
                    {newImages.map((item, index) => {
                        return (
                            <img
                                key={index}
                                src={item}
                                alt={name}
                                className={`product-carousel-img-small me-1 mb-2 ${
                                    index === imageNo && `product-carousel-img-small-active`
                                }`}
                                onClick={() => setImageNo(index)}
                            />
                        );
                    })}
                </div>
                {images.length > 5 && (
                    <div className="col-auto d-flex justify-content-center p-0 me-3 mb-2 fs-4">
                        <button
                            type="button"
                            className="product-carousel-btn p-0"
                            onClick={() => imageButtonHandler(imageArray + 1)}
                        >
                            <MdChevronRight className="icon" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCarousel;
