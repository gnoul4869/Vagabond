import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import ProductCards from '../product/ProductCards';

const RecommendedProducts = ({ title }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const { userInterests } = useSelector((state) => state.interest);

    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            setIsLoading(true);
        }

        const getRecommendedProducts = async () => {
            try {
                const params = {};
                if (userInfo?.id) {
                    params.userID = userInfo.id;
                } else if (userInterests) {
                    params.userInterests = JSON.stringify(userInterests);
                }

                const { data } = await axios.get(
                    `${process.env.REACT_APP_MAIN_SERVER}/api/v1/products/recommend`,
                    { params }
                );

                const products = data.products;

                if (isMounted) {
                    setRecommendedProducts(products);
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

        getRecommendedProducts();

        return () => {
            isMounted = false;
        };
    }, [userInfo?.id, userInterests]);

    return (
        <section>
            <div className="fw-600 fsr-4 text-secondary">{title}</div>

            <div className="d-flex flex-wrap mt-2 mt-md-3">
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
                    recommendedProducts.length !== 0 &&
                    recommendedProducts.map((item) => {
                        return (
                            <ProductCards
                                key={item.id}
                                product={item}
                                isAlt={true}
                                showRatings={true}
                                showSales={false}
                                showDate={false}
                                cartBtnHandler={false}
                            />
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default RecommendedProducts;
