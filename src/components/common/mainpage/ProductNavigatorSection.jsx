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
import { PRODUCT_CATEGORY_CONFIG } from '../../../data/productCategories';
import './ProductNavigatorSection.scss';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_BREAKPOINT = 1280;
const SCROLL_STEP = 220;
const SECTION_DESCRIPTION =
    '피부와 손길, 향과 공간에 이르기까지, 이솝의 다양한 제품군을 천천히 살펴보세요.';

const CATEGORY_DATA = [
    {
        id: 'skincare',
        label: PRODUCT_CATEGORY_CONFIG.skincare.label,
        centerLabel: PRODUCT_CATEGORY_CONFIG.skincare.label,
        link: '/products/skincare',
        bgImage: pnavSkincare,
    },
    {
        id: 'body',
        label: PRODUCT_CATEGORY_CONFIG.body.label,
        centerLabel: PRODUCT_CATEGORY_CONFIG.body.label,
        link: '/products/body',
        bgImage: pnavHandBody,
    },
    {
        id: 'fragrance',
        label: PRODUCT_CATEGORY_CONFIG.fragrance.label.toUpperCase(),
        centerLabel: PRODUCT_CATEGORY_CONFIG.fragrance.label.toUpperCase(),
        link: '/products/fragrance',
        bgImage: pnavPerfume,
    },
    {
        id: 'home',
        label: PRODUCT_CATEGORY_CONFIG.home.label,
        centerLabel: PRODUCT_CATEGORY_CONFIG.home.label,
        link: '/products/home',
        bgImage: pnavHomeLiving,
    },
    {
        id: 'hair',
        label: PRODUCT_CATEGORY_CONFIG.hair.label,
        centerLabel: PRODUCT_CATEGORY_CONFIG.hair.label,
        link: '/products/hair',
        bgImage: pnavHairShaving,
    },
    {
        id: 'kits',
        label: PRODUCT_CATEGORY_CONFIG.kits.label,
        centerLabel: PRODUCT_CATEGORY_CONFIG.kits.label,
        link: '/products/kits',
        bgImage: pnavKits,
    },
];

const getCategoryButtonClassName = (isActive) =>
    `pnav__cat-btn ${isActive ? 'optima-40 active' : 'optima-20'}`;

const ProductNavigatorSection = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const activeData = CATEGORY_DATA[activeIndex];
    const inactiveCategories = CATEGORY_DATA.filter((_, index) => index !== activeIndex);
    const scrollLength = (CATEGORY_DATA.length - 1) * SCROLL_STEP;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.pnav__header, .pnav__menu, .pnav__center',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    stagger: 0.12,
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
        const mm = gsap.matchMedia();

        mm.add(`(min-width: ${DESKTOP_BREAKPOINT}px)`, () => {
            const maxIndex = CATEGORY_DATA.length - 1;
            const trigger = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.2,
                snap: maxIndex > 0 ? 1 / maxIndex : false,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const nextIndex = Math.round(self.progress * maxIndex);

                    setActiveIndex((currentIndex) =>
                        currentIndex === nextIndex ? currentIndex : nextIndex
                    );
                },
                onLeaveBack: () => {
                    setActiveIndex(0);
                },
            });

            return () => trigger.kill();
        });

        mm.add(`(max-width: ${DESKTOP_BREAKPOINT - 1}px)`, () => {
            setActiveIndex(0);
        });

        return () => mm.revert();
    }, []);

    useEffect(() => {
        gsap.fromTo(
            bgRef.current,
            { opacity: 0.6 },
            { opacity: 1, duration: 0.8, ease: 'power2.out' }
        );
    }, [activeIndex]);

    const handleCategorySelect = (nextIndex) => {
        setActiveIndex(nextIndex);

        if (window.innerWidth < DESKTOP_BREAKPOINT || !sectionRef.current) {
            return;
        }

        const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
        const targetTop = sectionTop + nextIndex * SCROLL_STEP;

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth',
        });
    };

    return (
        <section
            className="pnav"
            ref={sectionRef}
            style={{ '--pnav-scroll-length': `${scrollLength}px` }}
        >
            <div className="pnav__stage">
                <div
                    ref={bgRef}
                    className="pnav__bg"
                    style={{ backgroundImage: `url(${activeData.bgImage})` }}
                />
                <div className="pnav__overlay" />

                <div className="pnav__inner">
                    <div className="pnav__header">
                        <h2 className="pnav__title montage-220">Product</h2>
                        <p className="pnav__desc suit-20-l">{SECTION_DESCRIPTION}</p>
                    </div>

                    <div className="pnav__menu pnav__menu--left">
                        <div className="pnav__menu-active-row">
                            <span className="pnav__diamond" />
                            <button type="button" className={getCategoryButtonClassName(true)}>
                                {activeData.label}
                            </button>
                        </div>

                        <ul className="pnav__cat-list pnav__cat-list--left">
                            {inactiveCategories.map((category) => {
                                const categoryIndex = CATEGORY_DATA.findIndex(
                                    ({ id }) => id === category.id
                                );

                                return (
                                    <li key={`left-${category.id}`} className="pnav__cat-item">
                                        <button
                                            type="button"
                                            className={getCategoryButtonClassName(false)}
                                            onClick={() => handleCategorySelect(categoryIndex)}
                                        >
                                            {category.label}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="pnav__center">
                        <Link to={activeData.link} className="pnav__center-cat optima-70">
                            {activeData.centerLabel}
                        </Link>
                    </div>

                    <div className="pnav__menu pnav__menu--right">
                        <div className="pnav__menu-active-row">
                            <button type="button" className={getCategoryButtonClassName(true)}>
                                {activeData.label}
                            </button>
                            <span className="pnav__diamond" />
                        </div>

                        <ul className="pnav__cat-list pnav__cat-list--right">
                            {inactiveCategories.map((category) => {
                                const categoryIndex = CATEGORY_DATA.findIndex(
                                    ({ id }) => id === category.id
                                );

                                return (
                                    <li key={`right-${category.id}`} className="pnav__cat-item">
                                        <button
                                            type="button"
                                            className={getCategoryButtonClassName(false)}
                                            onClick={() => handleCategorySelect(categoryIndex)}
                                        >
                                            {category.label}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductNavigatorSection;
