import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { FaCartPlus } from 'react-icons/fa';
import { listProducts } from '../../redux/actions/productActions';
import PriceFormat from '../PriceFormat';
import RatingStars from '../RatingStars';
import { addToCart } from '../../redux/actions/cartActions';
import InfoModal from '../modals/InfoModal';
import PaginationOptions from '../pagination/PaginationOptions';
import PaginationPaging from '../pagination/PaginationPaging';
import { paginationButtons, paginationSelections } from '../../data/paginationData';
import ProductListLoading from '../loading/ProductListLoading';
import ErrorPage from '../../pages/error/ErrorPage';

const ProductList = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { isLoading, total, products, error } = useSelector((state) => state.productList);
    const cart = useSelector((state) => state.cart);

    const [isModalShown, setIsModalShown] = useState(false);
    const [cartError, setCartError] = useState('');
    const [modalError, setModalError] = useState('');
    const [localError, setLocalError] = useState('');

    const search = queryString.parse(location.search);
    const [sort, setSort] = useState(search.sort ? search.sort : 'relevance');
    const [category, setCategory] = useState(search.category ? search.category : '');
    const [page, setPage] = useState(search.page ? search.page : 1);
    const limit = 15;

    const [productCategories, setproductCategories] = useState([]);

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const queryHandler = (sortValue, categoryValue, pageValue) => {
        if (sortValue) {
            setSort(sortValue);
        }
        if (categoryValue && categoryValue !== 'all') {
            setCategory(categoryValue);
        }
        if (pageValue) {
            setPage(pageValue);
        }

        const query = {};
        if (sortValue || sort) {
            query.sort = sortValue || sort;
        }
        if (categoryValue || category) {
            query.category = categoryValue || category;
        }
        if (pageValue || page) {
            query.page = pageValue || page;
        }

        if (categoryValue === 'all') {
            delete query.category;
            setCategory('');
        }

        if (sortValue || categoryValue) {
            delete query.page;
            setPage(1);
        }

        history.push({
            pathname: '/',
            search: queryString.stringify(query),
        });
    };

    const cartBtnHandler = (productID) => {
        if (!cart.isLoading) {
            dispatch(addToCart(productID, 1));
        }
    };

    useEffect(() => {
        if (!search.sort) {
            setSort('relevance');
        }
        if (!search.category) {
            setCategory('');
        }
        if (!search.page) {
            setPage(1);
        }
    }, [search]);

    useEffect(() => {
        let mounted = true;

        if (isInitialLoad) {
            const getProductCategories = async () => {
                try {
                    const { data } = await axios.get('/api/v1/products/categories');
                    const { categories } = data;

                    if (mounted) {
                        setproductCategories(categories.sort((a, b) => a.localeCompare(b)));
                    }
                } catch (error) {
                    if (mounted) {
                        setLocalError(
                            error.response && error.response.data.message
                                ? error.response.data.message
                                : 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa'
                        );
                    }
                }
            };

            getProductCategories();
        }

        return () => {
            mounted = false;
        };
    }, [isInitialLoad]);

    useEffect(() => {
        if (productCategories.length !== 0 && !isLoading) {
            setIsInitialLoad(false);
        }
    }, [isLoading, productCategories.length, products]);

    useEffect(() => {
        if (cart.isDone === true) {
            setCartError(cart.error);
            setIsModalShown(true);
            setModalError(cart.modalError);
        }
        if (isModalShown === true) {
            const modalTimeout = setTimeout(() => setIsModalShown(false), 2000);
            return () => {
                clearTimeout(modalTimeout);
            };
        }
    }, [cart.error, cart.isDone, cart.modalError, isModalShown]);

    useEffect(() => {
        dispatch(listProducts(sort, category, page, limit));
    }, [category, dispatch, page, sort]);

    if (error || cartError || localError) {
        return <ErrorPage error={error || cartError || localError} />;
    }

    return (
        <>
            <PaginationOptions
                buttons={paginationButtons}
                selections={paginationSelections}
                categories={productCategories}
                sort={sort}
                category={category}
                queryHandler={queryHandler}
                isLoading={isLoading}
            />

            <section className="container d-flex flex-wrap p-0 pt-1">
                {isLoading || !products ? (
                    <ProductListLoading />
                ) : (
                    products &&
                    products.map((item) => {
                        return (
                            <div key={item.id} className="product-wrapper">
                                <div className="product-container">
                                    <Link to={`/product/${item.id}`} className="link-inherit">
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
                                            <div className="product-rating">
                                                <RatingStars
                                                    rating={item.rating}
                                                    numReviews={item.numReviews}
                                                />
                                                <span className="text-secondary">
                                                    | {`${item.numReviews} lượt đánh giá`}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="product-cart-btn"
                                            onClick={() => cartBtnHandler(item.id)}
                                        >
                                            <FaCartPlus className="icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </section>

            <PaginationPaging
                total={total}
                page={page}
                queryHandler={queryHandler}
                limit={limit}
                isLoading={isLoading}
            />

            {isModalShown && (
                <InfoModal
                    message={modalError ? modalError : 'Sản phẩm đã được thêm vào giỏ hàng'}
                    isError={modalError}
                />
            )}
        </>
    );
};

export default ProductList;
