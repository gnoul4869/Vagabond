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
import ProductPaginationOptions from '../pagination/productPagination/ProductPaginationOptions';
import PaginationPaging from '../pagination/productPagination/ProductPaginationPaging';
import {
    productPaginationButtons,
    productPaginationSelections,
} from '../../data/productPaginationData';
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

    const searchQuery = queryString.parse(location.search);
    const [search, setSearch] = useState(searchQuery.search ? searchQuery.search : '');
    const [sort, setSort] = useState(searchQuery.sort ? searchQuery.sort : 'relevance');
    const [category, setCategory] = useState(searchQuery.category ? searchQuery.category : '');
    const [page, setPage] = useState(searchQuery.page ? searchQuery.page : 1);
    const limit = 20;

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

        if (search) {
            query.search = search;
        } else {
            delete query.search;
        }

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
        setSearch(searchQuery.search ? searchQuery.search : '');

        if (!searchQuery.sort) {
            setSort('relevance');
        }
        if (!searchQuery.category) {
            setCategory('');
        }
        if (!searchQuery.page) {
            setPage(1);
        }
    }, [searchQuery]);

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
        dispatch(listProducts(search, sort, category, page, limit));
    }, [dispatch, search, sort, category, page]);

    return (
        <>
            <ProductPaginationOptions
                buttons={productPaginationButtons}
                selections={productPaginationSelections}
                categories={productCategories}
                sort={sort}
                category={category}
                queryHandler={queryHandler}
                isLoading={isInitialLoad}
            />

            {error || cartError || localError ? (
                <ErrorPage error={error || cartError || localError} backHome={false} />
            ) : (
                <>
                    <section className="container d-flex flex-wrap p-0 pt-1">
                        {isLoading || !products ? (
                            <ProductListLoading />
                        ) : (
                            products &&
                            products.map((item) => {
                                return (
                                    <div key={item.id} className="product-wrapper">
                                        <div className="product-container">
                                            <Link
                                                to={`/product/${item.id}`}
                                                className="link-inherit"
                                            >
                                                <div className="product-image-container">
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        className="product-image"
                                                    />
                                                </div>
                                                <div className="product-name line-clamp-2">
                                                    {item.name}
                                                </div>
                                            </Link>

                                            <div className="product-bottom">
                                                <div className="product-info-container">
                                                    <div className="product-price">
                                                        <PriceFormat price={item.price} />
                                                    </div>
                                                    <div className="product-rating d-flex flex-column d-md-inline fsr-1">
                                                        <div className="d-inline-flex icon">
                                                            <RatingStars
                                                                rating={item.rating}
                                                                css={'text-ystar'}
                                                            />
                                                        </div>
                                                        <span className="separator-gray d-none d-md-inline"></span>
                                                        <span className="text-secondary mt-1 mt-md-0">
                                                            {`${item.numReviews} lượt đánh giá`}
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
            )}
        </>
    );
};

export default ProductList;
