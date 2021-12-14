import React from 'react';
import HomeBanner from '../components/home/HomeBanner';
import HomeCategories from '../components/home/HomeCategories';
import HomeHotProducts from '../components/home/HomeHotProducts';
import HomeRecommendedProducts from '../components/home/HomeRecommendedProducts';

const HomePage = () => {
    return (
        <main>
            <HomeBanner />

            <div className="mt-3">
                <HomeCategories />
            </div>

            <div className="mt-3">
                <HomeHotProducts />
            </div>

            <div className="mt-3">
                <HomeRecommendedProducts />
            </div>
        </main>
    );
};

export default HomePage;
