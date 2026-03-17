import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { koreaExclusiveContent } from '../../../data/mainPageContent';
import productsData from '../../../data/products.json';
import './KoreaExclusiveSection.scss';

gsap.registerPlugin(ScrollTrigger);

// Korea Exclusive 섹션
// 지역성·한정성·차별성을 조용하게 보여주는 섹션
// 레이아웃: 좌측 텍스트 - 중앙 대표 이미지 - 우측 보조 이미지
const KoreaExclusiveSection = () => {
    const sectionRef = useRef(null);

    // New 배지 상품 중에서 선택
    const products = productsData.filter(p => p.badge.includes('New'));
    const mainProduct = products[0];
    const subProduct = products[1];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current.querySelectorAll('.korea__text, .korea__img-main, .korea__img-sub'),
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="korea" ref={sectionRef}>
            <div className="korea__inner">

                {/* 좌측 텍스트 */}
                <div className="korea__text">
                    <span className="korea__label suit-14-m">{koreaExclusiveContent.label}</span>
                    <h2 className="korea__title montage-48">{koreaExclusiveContent.title}</h2>
                    <p className="korea__desc suit-18-r">
                        {koreaExclusiveContent.description.split('\n').map((line, i) => (
                            <span key={i}>{line}<br /></span>
                        ))}
                    </p>
                    <Link to={koreaExclusiveContent.ctaLink} className="korea__cta">
                        {koreaExclusiveContent.ctaText}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M4 14h15M19 14l-6-6" />
                        </svg>
                    </Link>
                </div>

                {/* 중앙 대표 이미지 */}
                <div className="korea__img-main">
                    {mainProduct && (
                        <img src={mainProduct.variants[0]?.image} alt={mainProduct.name} />
                    )}
                </div>

                {/* 우측 보조 이미지 */}
                <div className="korea__img-sub">
                    {subProduct && (
                        <img src={subProduct.variants[0]?.image} alt={subProduct.name} />
                    )}
                </div>

            </div>
        </section>
    );
};

export default KoreaExclusiveSection;
