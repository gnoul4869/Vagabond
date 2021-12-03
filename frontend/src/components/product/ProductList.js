import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { listProducts } from '../../redux/actions/productActions';
import PriceFormat from '../PriceFormat';
import ProductListLoading from '../loading/ProductListLoading';
import RatingStars from '../RatingStars';
import ErrorPage from '../../pages/error/ErrorPage';
import { FaCartPlus } from 'react-icons/fa';
import { addToCart } from '../../redux/actions/cartActions';
import InfoModal from '../modals/InfoModal';
import Pagination from '../pagination/Pagination';
import { paginationButtons, paginationSelections } from '../../data/paginationData';
import PaginationLoading from '../loading/PaginationLoading';
import axios from 'axios';

const ProductList = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { isLoading, products, error } = useSelector((state) => state.productList);
    const cart = useSelector((state) => state.cart);

    const [isModalShown, setIsModalShown] = useState(false);
    const [cartError, setCartError] = useState('');
    const [modalError, setModalError] = useState('');
    const [localError, setLocalError] = useState('');

    const search = queryString.parse(location.search);
    const [sort, setSort] = useState(search.sort ? search.sort : 'relevance');
    const [category, setCategory] = useState(search.category ? search.category : '');

    const [productCategories, setproductCategories] = useState([]);

    // const isInitialLoad = true;
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const queryHandler = (sortValue, categoryValue) => {
        if (sortValue) {
            setSort(sortValue);
        }
        if (categoryValue && categoryValue !== 'all') {
            setCategory(categoryValue);
        }

        const query = {};
        if (sortValue || sort) {
            query.sort = sortValue || sort;
        }
        if (categoryValue || category) {
            query.category = categoryValue || category;
        }

        if (categoryValue === 'all') {
            delete query.category;
            setCategory('');
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
        if (isInitialLoad) {
            const getProductCategories = async () => {
                try {
                    const { data } = await axios.get('/api/v1/products/categories');
                    const { categories } = data;

                    setproductCategories(categories.sort((a, b) => a.localeCompare(b)));
                } catch (error) {
                    setLocalError(
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa'
                    );
                }
            };

            getProductCategories();
        }
    }, [isInitialLoad]);

    useEffect(() => {
        if (products) {
            setIsInitialLoad(false);
        }
    }, [products]);

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
        dispatch(listProducts(sort, category));
    }, [category, dispatch, sort]);

    if (error || cartError || localError) {
        return <ErrorPage error={error || cartError || localError} />;
    }

    return (
        <>
            {productCategories.length === 0 || (!products && isInitialLoad) ? (
                <PaginationLoading buttons={paginationButtons} selection={true} category={true} />
            ) : (
                <Pagination
                    buttons={paginationButtons}
                    selections={paginationSelections}
                    categories={productCategories}
                    sort={sort}
                    category={category}
                    queryHandler={queryHandler}
                />
            )}
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
