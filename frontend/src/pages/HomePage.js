import React from 'react';
import HomeBanner from '../components/home/HomeBanner';
import HomeCategories from '../components/home/HomeCategories';

const HomePage = () => {
    return (
        <main>
            <HomeBanner />

            <div className="mt-3">
                <HomeCategories />
            </div>
        </main>
    );
};

export default HomePage;
