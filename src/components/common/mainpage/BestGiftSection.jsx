import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bestGiftContent } from '../../../data/mainPageContent';
import productsData from '../../../data/products.json';
import './BestGiftSection.scss';

gsap.registerPlugin(ScrollTrigger);

// Best Gift 섹션
// 선물 구매자에게 가장 빠른 확신을 주는 핵심 구간
// 짙은 브라운 배경 + 중앙 대형 이미지 + 좌우 보조 이미지
const BestGiftSection = () => {
    const sectionRef = useRef(null);

    // Best 배지 상품에서 이미지 가져오기
    const bestProducts = productsData.filter(p => p.badge.includes('Best'));
    const centerProduct = bestProducts[0];
    const leftProduct = bestProducts[1];
    const rightProduct = bestProducts[2];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current.querySelectorAll('.gift__center, .gift__side'),
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.15,
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
        <section className="gift" ref={sectionRef}>
            <div className="gift__inner">

                {/* 좌측 보조 이미지 + 텍스트 */}
                <div className="gift__side gift__side--left">
                    {leftProduct && (
                        <div className="gift__side-img">
                            <img src={leftProduct.variants[0]?.image} alt={leftProduct.name} />
                        </div>
                    )}
                    <div className="gift__side-text">
                        <span className="gift__label suit-14-m">{bestGiftContent.label}</span>
                        <p className="gift__side-desc suit-16-r">{bestGiftContent.subDescription.split('\n')[0]}</p>
                    </div>
                </div>

                {/* 중앙 메인 이미지 + 타이틀 */}
                <div className="gift__center">
                    <div className="gift__center-text">
                        <h2 className="gift__title montage-80">{bestGiftContent.title}</h2>
                        <p className="gift__subtitle optima-20">
                            {bestGiftContent.description.split('\n').map((line, i) => (
                                <span key={i}>{line}<br /></span>
                            ))}
                        </p>
                    </div>
                    {centerProduct && (
                        <div className="gift__center-img">
                            <img src={centerProduct.variants[0]?.image} alt={centerProduct.name} />
                        </div>
                    )}
                    <Link to={bestGiftContent.ctaLink} className="gift__cta">
                        {bestGiftContent.ctaText}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M4 14h15M19 14l-6-6" />
                        </svg>
                    </Link>
                </div>

                {/* 우측 보조 이미지 */}
                <div className="gift__side gift__side--right">
                    {rightProduct && (
                        <div className="gift__side-img">
                            <img src={rightProduct.variants[0]?.image} alt={rightProduct.name} />
                        </div>
                    )}
                    <p className="gift__side-desc suit-16-r">
                        {bestGiftContent.subDescription.split('\n')[1]}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default BestGiftSection;
