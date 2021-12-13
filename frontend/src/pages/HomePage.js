import React, { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { banners } from '../data/banners';
import textureGrid from '../images/texture_grid.png';
import { categories } from '../data/categories';

const HomePage = () => {
    const bannerRef = useRef(null);
    const indexRef = useRef(0);

    const updateBannerIndex = useCallback(() => {
        let index = Math.floor(Math.random() * banners.length);

        while (index === indexRef.current) {
            index = Math.floor(Math.random() * banners.length);
        }

        const image = new Image();
        image.onload = () => {
            bannerRef.current.style.backgroundImage = `url(${textureGrid}), url(${banners[index].banner})`;
        };
        image.src = banners[index].banner;

        indexRef.current = index;
    }, []);

    useEffect(() => {
        const bannerInterval = setInterval(() => updateBannerIndex(), 5000);
        return () => {
            clearInterval(bannerInterval);
        };
    }, [updateBannerIndex]);

    return (
        <main>
            <div className="container p-0 m-0">
                <div className="banner" ref={bannerRef}>
                    <img src={banners[0].banner} alt="vagabond_banner" className="img-fluid" />
                </div>
            </div>

            <section className="container bg-white mt-3 p-3">
                <div className="fw-600 fsr-4">Danh mục</div>

                <div className="d-flex flex-wrap mt-3">
                    {categories.map((item) => {
                        return (
                            <div key={item.id} className="category-wrapper">
                                <div className="category-container">
                                    <Link to={item.url} className="link-inherit">
                                        <div className="category">
                                            <div className="category-image-container">
                                                <img
                                                    src={item.icon}
                                                    alt={item.name}
                                                    className="category-image"
                                                />
                                            </div>
                                            <div className="category-name line-clamp-2 text-center fsr-2">
                                                {item.name}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
};

export default HomePage;
