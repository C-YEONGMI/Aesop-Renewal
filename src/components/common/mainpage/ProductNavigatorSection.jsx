import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { productNavigatorContent } from '../../../data/mainPageContent';
import './ProductNavigatorSection.scss';

gsap.registerPlugin(ScrollTrigger);

// Product Navigator 섹션
// 홈 하단 실제 탐색 진입점 - 어두운 배경 + "Product" 대형 타이틀 + 카테고리 목록
const ProductNavigatorSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.pnav__title',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );
            gsap.fromTo(
                sectionRef.current.querySelectorAll('.pnav__cat-item'),
                { opacity: 0, y: 16 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.07,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 65%',
                    },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="pnav" ref={sectionRef}>
            <div className="pnav__inner">

                {/* 대형 "Product" 타이틀 */}
                <h2 className="pnav__title montage-220">
                    {productNavigatorContent.title}
                </h2>

                {/* 카테고리 그리드: 좌측 - 중앙 강조 - 우측 */}
                <div className="pnav__cats">
                    {/* 좌측 카테고리 */}
                    <ul className="pnav__cat-list pnav__cat-list--left">
                        {productNavigatorContent.leftCategories.map((cat, i) => (
                            <li key={i} className="pnav__cat-item">
                                <Link to={cat.link} className="montage-30">
                                    {cat.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* 중앙 강조 카테고리 */}
                    <div className="pnav__center">
                        <Link to="/products/skincare" className="pnav__center-cat optima-70">
                            {productNavigatorContent.centerCategory}
                        </Link>
                    </div>

                    {/* 우측 카테고리 */}
                    <ul className="pnav__cat-list pnav__cat-list--right">
                        {productNavigatorContent.rightCategories.map((cat, i) => (
                            <li key={i} className="pnav__cat-item">
                                <Link to={cat.link} className="montage-30">
                                    {cat.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default ProductNavigatorSection;
