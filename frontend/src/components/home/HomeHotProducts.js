import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import PriceFormat from '../PriceFormat';

const HomeHotProducts = () => {
    const [hotProducts, setHotProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            setIsLoading(true);
        }

        const getHotProducts = async () => {
            try {
                const { data } = await axios.get('/api/v1/products', {
                    params: { search: '', sort: 'sales', category: '', page: 1, limit: 5 },
                });

                const { products } = data;

                if (isMounted) {
                    setHotProducts(products);
                    setError('');
                    setIsLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setError(
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa'
                    );
                    setIsLoading(false);
                }
            }
        };

        getHotProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="container bg-white p-3">
            <div className="fw-600 fsr-4 text-secondary">Sản phẩm bán chạy</div>

            <div className="d-flex flex-wrap mt-3">
                {isLoading ? (
                    <PulseLoader
                        color="#c73434"
                        css="display: inherit; margin: 10rem auto;"
                        width="3.125rem"
                        speedMultiplier={0.9}
                    />
                ) : error ? (
                    <div className="text-pinker fsr-5 mx-auto py-5">{error}</div>
                ) : (
                    hotProducts.length !== 0 &&
                    hotProducts.map((item) => {
                        return (
                            <div key={item.id} className="product-wrapper">
                                <div className="product-container">
                                    <Link to={`/products/${item.id}`} className="link-inherit">
                                        <div className="product-image-container">
                                            <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="product-image"
                                            />
                                        </div>
                                        <div className="product-name line-clamp-2">{item.name}</div>
                                    </Link>

                                    <div className="product-bottom">
                                        <div className="product-info-container">
                                            <div className="product-price">
                                                <PriceFormat price={item.price} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-inline text-center bg-ired text-white fw-600 fsr-1 mt-1">
                                        <span className="me-2">Đã bán</span>
                                        <span>{item.numSales}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default HomeHotProducts;
