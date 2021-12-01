import React, { useEffect, useState } from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

const ProductCarousel = ({ images, name }) => {
    const [imageArray, setImageArray] = useState(5);
    const [imageNo, setImageNo] = useState(0);
    const newImages = images.slice(imageArray - 5, imageArray);
    const [image, setImage] = useState(newImages[imageNo]);

    const imageButtonHandler = (value) => {
        if (value >= 5 && value <= images.length) {
            setImageArray(value + 1);
        } else if (value < 0 && imageArray > 5) {
            setImageArray(imageArray - 1);
        } else {
            setImageNo(value > 0 ? value : 0);
        }
    };

    useEffect(() => {
        setImage(newImages[imageNo]);
    }, [newImages, imageNo]);

    return (
        <div className="container mb-4 mb-lg-0">
            <div className="row justify-content-center">
                <div className="product-carousel-main-img-container">
                    <img src={image} alt={name} className="product-carousel-main-img" />
                </div>
            </div>
            <div
                className={`row justify-content-center align-items-center mt-3 mx-md-2 ${
                    images.length <= 5 && 'px-5'
                }`}
            >
                {images.length > 5 && (
                    <div className="col-auto d-flex justify-content-center p-0 ms-3 fs-4">
                        <button
                            type="button"
                            className="product-carousel-btn p-0"
                            onClick={() => imageButtonHandler(imageNo - 1)}
                        >
                            <MdChevronLeft className="icon" />
                        </button>
                    </div>
                )}

                <div className="col d-flex justify-content-center flex-wrap">
                    {newImages.map((item, index) => {
                        return (
                            <div key={index} className="product-carousel-img-container">
                                <img
                                    src={item}
                                    alt={name}
                                    className={`product-carousel-img-small ${
                                        index === imageNo && `product-carousel-img-small-active`
                                    }`}
                                    onClick={() => setImageNo(index)}
                                />
                            </div>
                        );
                    })}
                </div>
                {images.length > 5 && (
                    <div className="col-auto d-flex justify-content-center p-0 me-3 fs-4">
                        <button
                            type="button"
                            className="product-carousel-btn p-0"
                            onClick={() => imageButtonHandler(imageNo + 1)}
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
