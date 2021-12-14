import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import { listProducts } from '../redux/actions/productActions';
import {
    productPaginationButtons,
    productPaginationSelections,
} from '../data/productPaginationData';
import ProductPaginationOptions from '../components/pagination/productPagination/ProductPaginationOptions';
import ProductPaginationPaging from '../components/pagination/productPagination/ProductPaginationPaging';
import ProductsPageLoading from '../components/loading/ProductsPageLoading';
import ProductCards from '../components/product/ProductCards';
import InfoModal from '../components/modals/InfoModal';
import ErrorPage from './error/ErrorPage';
import { addToCart } from '../redux/actions/cartActions';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const cart = useSelector((state) => state.cart);
    const { isLoading, total, products, error } = useSelector((state) => state.productList);

    const [localError, setLocalError] = useState('');

    const searchQuery = queryString.parse(location.search);
    const [search, setSearch] = useState(searchQuery.search ? searchQuery.search : '');
    const [sort, setSort] = useState(searchQuery.sort ? searchQuery.sort : 'relevance');
    const [category, setCategory] = useState(searchQuery.category ? searchQuery.category : '');
    const [page, setPage] = useState(searchQuery.page ? searchQuery.page : 1);
    const limit = 20;

    const [productCategories, setproductCategories] = useState([]);

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const [isModalShown, setIsModalShown] = useState(false);
    const [modalError, setModalError] = useState('');

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
            pathname: '/products',
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
        if (cart.isDone === true) {
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
        let isMounted = true;

        if (isInitialLoad) {
            const getProductCategories = async () => {
                try {
                    const { data } = await axios.get('/api/v1/products/categories');
                    const { categories } = data;

                    if (isMounted) {
                        setproductCategories(categories.sort((a, b) => a.localeCompare(b)));
                    }
                } catch (error) {
                    if (isMounted) {
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
            isMounted = false;
        };
    }, [isInitialLoad]);

    useEffect(() => {
        if (productCategories.length !== 0 && !isLoading) {
            setIsInitialLoad(false);
        }
    }, [isLoading, productCategories.length, products]);

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

            {error || localError ? (
                <ErrorPage error={error || localError} backHome={false} />
            ) : (
                <>
                    <section className="container d-flex flex-wrap p-0 pt-1">
                        {isLoading || !products ? (
                            <ProductsPageLoading />
                        ) : (
                            products &&
                            products.map((item) => {
                                return (
                                    <ProductCards
                                        product={item}
                                        showRatings={true}
                                        showSales={false}
                                        showDate={false}
                                        cartBtnHandler={cartBtnHandler}
                                    />
                                );
                            })
                        )}
                    </section>

                    <ProductPaginationPaging
                        total={total}
                        page={page}
                        queryHandler={queryHandler}
                        limit={limit}
                        isLoading={isLoading}
                    />
                </>
            )}

            {isModalShown && (
                <InfoModal
                    message={modalError ? modalError : 'Sản phẩm đã được thêm vào giỏ hàng'}
                    isError={modalError}
                />
            )}
        </>
    );
};

export default ProductsPage;
