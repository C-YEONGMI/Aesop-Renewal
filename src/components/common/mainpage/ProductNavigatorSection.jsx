import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import pnavHairShaving from '../../../assets/pnav_hair_shaving.png';
import pnavHandBody from '../../../assets/pnav_hand_body.png';
import pnavHomeLiving from '../../../assets/pnav_home_living.png';
import pnavKits from '../../../assets/pnav_kits.png';
import pnavPerfume from '../../../assets/pnav_perfume.png';
import pnavSkincare from '../../../assets/pnav_skincare.png';
import './ProductNavigatorSection.scss';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_DATA = [
    {
        id: 'skincare',
        label: 'Skincare',
        centerLabel: 'Skincare',
        link: '/products/skincare',
        bgImage: pnavSkincare,
    },
    {
        id: 'body',
        label: 'Hand · Body',
        centerLabel: 'Hand · Body',
        link: '/products/body',
        bgImage: pnavHandBody,
    },
    {
        id: 'fragrance',
        label: 'Perfume',
        centerLabel: 'Perfume',
        link: '/products/fragrance',
        bgImage: pnavPerfume,
    },
    {
        id: 'home',
        label: 'Home · Living',
        centerLabel: 'Home · Living',
        link: '/products/home',
        bgImage: pnavHomeLiving,
    },
    {
        id: 'hair',
        label: 'Hair · Shaving',
        centerLabel: 'Hair · Shaving',
        link: '/products/hair',
        bgImage: pnavHairShaving,
    },
    {
        id: 'kits',
        label: 'Kits',
        centerLabel: 'Kits',
        link: '/products/kits',
        bgImage: pnavKits,
    },
];

const ProductNavigatorSection = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const activeData = CATEGORY_DATA[activeIndex];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.pnav__header, .pnav__cats',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        gsap.fromTo(
            bgRef.current,
            { opacity: 0.6 },
            { opacity: 1, duration: 0.8, ease: 'power2.out' }
        );
    }, [activeIndex]);

    return (
        <section className="pnav" ref={sectionRef}>
            <div
                ref={bgRef}
                className="pnav__bg"
                style={{ backgroundImage: `url(${activeData.bgImage})` }}
            />
            <div className="pnav__overlay" />

            <div className="pnav__inner">
                <div className="pnav__header">
                    <h2 className="pnav__title montage-220">Product</h2>
                    <p className="pnav__desc suit-20-r">
                        피부와 손길, 향과 공간에 이르기까지, 이솝의 다양한 제품군을 천천히
                        살펴보세요.
                    </p>
                </div>

                <div className="pnav__cats">
                    <ul className="pnav__cat-list pnav__cat-list--left">
                        {CATEGORY_DATA.map((cat, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <li key={`left-${cat.id}`} className="pnav__cat-item">
                                    {isActive && <span className="pnav__diamond" />}
                                    <button
                                        type="button"
                                        className={`optima-40 ${isActive ? 'active' : ''}`}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {cat.label}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="pnav__center">
                        <Link to={activeData.link} className="pnav__center-cat montage-100">
                            {activeData.centerLabel}
                        </Link>
                    </div>

                    <ul className="pnav__cat-list pnav__cat-list--right">
                        {CATEGORY_DATA.map((cat, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <li key={`right-${cat.id}`} className="pnav__cat-item">
                                    <button
                                        type="button"
                                        className={`optima-40 ${isActive ? 'active' : ''}`}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {cat.label}
                                    </button>
                                    {isActive && <span className="pnav__diamond" />}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProductNavigatorSection;
