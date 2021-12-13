import React, { useCallback, useEffect, useRef } from 'react';
import { banners } from '../data/banners';
import textureGrid from '../images/texture_grid.png';

const HomePage = () => {
    const bannerRef = useRef(null);

    const updateBannerIndex = useCallback(() => {
        const index = Math.floor(Math.random() * banners.length);

        const image = new Image();
        image.onload = () => {
            bannerRef.current.style.backgroundImage = `url(${textureGrid}), url(${banners[index].banner})`;
        };
        image.src = banners[index].banner;
    }, []);

    useEffect(() => {
        const bgInterval = setInterval(() => updateBannerIndex(), 5000);
        return () => {
            clearInterval(bgInterval);
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
                <div className="bg-label container rounded mb-3">
                    <div className="fw-600 fsr-4">Danh mục</div>
                </div>
                <div className="container fsr-2 p-3">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eaque
                        quam soluta maiores cumque modi sequi odit quae adipisci placeat consequatur
                        voluptatem esse rerum quis molestias obcaecati voluptatum, reiciendis ipsum.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
