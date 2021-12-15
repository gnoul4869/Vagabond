import React from 'react';
import HomeBanner from '../components/HomeBanner';
import ProductCategories from '../components/sections/ProductCategories';
import HotProducts from '../components/sections/HotProducts';
import NewestProducts from '../components/sections/NewestProducts';
import RecommendedProducts from '../components/sections/RecommendedProducts';

const HomePage = () => {
    return (
        <main>
            <HomeBanner />

            <div className="container bg-white p-3 mt-3">
                <ProductCategories />
            </div>

            <div className="container bg-white p-3 mt-3">
                <HotProducts />
            </div>

            <div className="container bg-white p-3 mt-3">
                <RecommendedProducts />
            </div>

            <div className="container bg-white p-3 mt-3">
                <NewestProducts />
            </div>
        </main>
    );
};

export default HomePage;
