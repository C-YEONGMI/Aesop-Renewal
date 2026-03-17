import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { newArrivalContent } from '../../../data/mainPageContent';
import productsData from '../../../data/products.json';
import './NewArrivalSection.scss';

gsap.registerPlugin(ScrollTrigger);

// New Arrival 섹션
// 좌측 텍스트 + 서브 이미지, 우측 대형 제품 비주얼
const NewArrivalSection = () => {
    const sectionRef = useRef(null);

    // New 배지 상품에서 가져오기
    const newProducts = productsData.filter(p => p.badge.includes('New'));
    // mainPageContent에서 지정한 신제품
    const mainProduct = productsData.find(p => p.name === newArrivalContent.productName)
        || newProducts[0];
    const subProduct = newProducts.find(p => p.name !== mainProduct?.name) || newProducts[1];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current.querySelectorAll('.new-arrival__text, .new-arrival__sub-img'),
                { opacity: 0, x: -24 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );
            gsap.fromTo(
                '.new-arrival__main-img',
                { opacity: 0, x: 24 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
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
        <section className="new-arrival" ref={sectionRef}>
            <div className="new-arrival__inner">

                {/* 좌측 영역: 텍스트 + 서브 이미지 */}
                <div className="new-arrival__left">
                    <div className="new-arrival__text">
                        <span className="new-arrival__label suit-14-m">{newArrivalContent.label}</span>
                        <h2 className="new-arrival__title montage-48">
                            {newArrivalContent.title.split('\n').map((line, i) => (
                                <span key={i}>{line}<br /></span>
                            ))}
                        </h2>
                        <p className="new-arrival__desc suit-18-r">
                            {newArrivalContent.description.split('\n').map((line, i) => (
                                <span key={i}>{line}<br /></span>
                            ))}
                        </p>
                        <Link to={newArrivalContent.ctaLink} className="new-arrival__cta">
                            {newArrivalContent.ctaText}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M4 14h15M19 14l-6-6" />
                            </svg>
                        </Link>
                    </div>

                    {/* 서브 이미지 */}
                    {subProduct && (
                        <div className="new-arrival__sub-img">
                            <img src={subProduct.variants[0]?.image} alt={subProduct.name} />
                        </div>
                    )}
                </div>

                {/* 우측 대형 제품 이미지 */}
                <div className="new-arrival__right">
                    {mainProduct && (
                        <div className="new-arrival__main-img">
                            <img src={mainProduct.variants[0]?.image} alt={mainProduct.name} />
                            <div className="new-arrival__main-info">
                                <span className="suit-14-m new-arrival__new-badge">NEW</span>
                                <p className="suit-18-m">{mainProduct.name}</p>
                                <p className="suit-16-r">{mainProduct.variants[0]?.capacity}</p>
                                <p className="suit-16-r">
                                    {mainProduct.variants[0]?.price?.toLocaleString()}원
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default NewArrivalSection;
