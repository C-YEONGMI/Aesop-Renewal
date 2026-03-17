import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { officialExclusiveContent } from '../../../data/mainPageContent';
import productsData from '../../../data/products.json';
import './OfficialExclusiveSection.scss';

gsap.registerPlugin(ScrollTrigger);

// Official Online Exclusive 섹션
// "왜 공식몰에서 사야 하는가"를 에디토리얼 콜라주 레이아웃으로 전달
const OfficialExclusiveSection = () => {
    const sectionRef = useRef(null);

    // Exclusive 배지 상품에서 이미지 3개 가져오기
    const exclusiveProducts = productsData
        .filter(p => p.badge.includes('Exclusive'))
        .slice(0, 3);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current.querySelectorAll('.official__text-block, .official__item-img'),
                { opacity: 0, y: 20 },
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
        <section className="official" ref={sectionRef}>
            <div className="official__inner">

                {/* 좌측 소형 이미지 */}
                <div className="official__col-left">
                    {exclusiveProducts[0] && (
                        <div className="official__item-img official__item-img--sm">
                            <img
                                src={exclusiveProducts[0].variants[0]?.image}
                                alt={exclusiveProducts[0].name}
                            />
                        </div>
                    )}
                    {exclusiveProducts[1] && (
                        <div className="official__item-img official__item-img--md">
                            <img
                                src={exclusiveProducts[1].variants[0]?.image}
                                alt={exclusiveProducts[1].name}
                            />
                        </div>
                    )}
                </div>

                {/* 중앙 텍스트 블록 */}
                <div className="official__text-block">
                    <span className="official__label suit-14-m">공식몰 단독</span>
                    <h2 className="official__title montage-48">
                        {officialExclusiveContent.title.split(' ').map((word, i) => (
                            <span key={i} className="official__title-word">{word} </span>
                        ))}
                    </h2>
                    <p className="official__desc suit-18-r">
                        {officialExclusiveContent.description.split('\n').map((line, i) => (
                            <span key={i}>{line}<br /></span>
                        ))}
                    </p>
                    <ul className="official__benefits">
                        {officialExclusiveContent.items.map((item, i) => (
                            <li key={i} className="suit-16-r">· {item}</li>
                        ))}
                    </ul>
                    <Link to="/benefits/official" className="official__cta">
                        혜택 자세히 보기
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M4 14h15M19 14l-6-6" />
                        </svg>
                    </Link>
                </div>

                {/* 우측 소형 이미지 */}
                <div className="official__col-right">
                    {exclusiveProducts[2] && (
                        <div className="official__item-img official__item-img--md">
                            <img
                                src={exclusiveProducts[2].variants[0]?.image}
                                alt={exclusiveProducts[2].name}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default OfficialExclusiveSection;
