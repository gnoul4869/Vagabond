import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import ProductCards from './ProductCards';

const ProductSimilars = ({ product, showEmpty }) => {
    const [similarProducts, setSimilarProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            setIsLoading(true);
        }

        const getSimilarProducts = async () => {
            const multiplier =
                product.price >= 10000000
                    ? 2
                    : product.price >= 5000000
                    ? 2.5
                    : product.price >= 1000000
                    ? 3
                    : product.price >= 500000
                    ? 3.5
                    : product.price >= 100000
                    ? 4
                    : product.price >= 50000
                    ? 5
                    : 10;

            try {
                const { data } = await axios.get('/api/v1/products', {
                    params: {
                        excludeIDs: product.id,
                        search: '',
                        sort: 'sales',
                        category: product.category,
                        maxPrice: product.price * multiplier,
                        minPrice: product.price / multiplier,
                        page: 1,
                        limit: 5,
                    },
                });

                const { products } = data;

                if (isMounted) {
                    setSimilarProducts(products);
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
                    setIsShown(showEmpty);
                }
            }
        };

        getSimilarProducts();

        return () => {
            isMounted = false;
        };
    }, [product.category, product.id, product.price, showEmpty]);

    return (
        <>
            {isShown && (
                <section className="container p-0">
                    <div className="fw-600 fsr-4 text-secondary">Sản phẩm tương tự</div>

                    <div className="d-flex flex-wrap mt-1 mt-md-3">
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
                            similarProducts.length !== 0 &&
                            similarProducts.map((item) => {
                                return (
                                    <ProductCards
                                        key={item.id}
                                        product={item}
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
            )}
        </>
    );
};

export default ProductSimilars;
