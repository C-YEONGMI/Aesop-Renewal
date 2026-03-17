import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutTeaserContent } from '../../../data/mainPageContent';
import './AboutTeaserSection.scss';

gsap.registerPlugin(ScrollTrigger);

// About Teaser 섹션
// 제품 흐름에서 브랜드 서사로 넘어가는 완충 구간
// 어두운 배경 + 대형 "About" 워드마크 + 정보 최소화
const AboutTeaserSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.about-teaser__wordmark',
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );
            gsap.fromTo(
                '.about-teaser__text',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power2.out',
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="about-teaser" ref={sectionRef}>
            {/* 어두운 배경 이미지 영역 (임시 gradient - 실제 이미지로 교체) */}
            <div className="about-teaser__bg" />

            <div className="about-teaser__inner">
                {/* 대형 "About" 워드마크 */}
                <h2 className="about-teaser__wordmark montage-220">
                    {aboutTeaserContent.wordmark}
                </h2>

                {/* 우측 텍스트 + CTA */}
                <div className="about-teaser__text">
                    <p className="about-teaser__desc optima-20">
                        {aboutTeaserContent.description.split('\n').map((line, i) => (
                            <span key={i}>{line}<br /></span>
                        ))}
                    </p>
                    <Link to={aboutTeaserContent.ctaLink} className="about-teaser__cta">
                        {aboutTeaserContent.ctaText}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M4 14h15M19 14l-6-6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutTeaserSection;
