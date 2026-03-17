import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import heroVideo from '../../../assets/Hero_MP4.mp4';
import HeroAesop from '../../../assets/Hero_Aesop.svg?react';
import HeroRitual from '../../../assets/Hero_Ritual.svg?react';
import './Hero.scss';

// Hero 섹션: 첫 화면 전체 배경 영상 + 대형 워드마크
const Hero = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        // 진입 애니메이션 - 부드러운 fade-up
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.6 }
            );
            gsap.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1.0 }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="hero">
            {/* 배경 영상 */}
            <div className="hero__bg">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero__video"
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>
                {/* 어두운 그라디언트 오버레이 */}
                <div className="hero__overlay" />
            </div>

            {/* 하단 워드마크 영역 */}
            <div className="hero__content" ref={titleRef}>
                <div className="hero__wordmark">
                    {/* Aesop 워드마크 SVG */}
                    <span className="hero__wordmark-aesop">
                        <HeroAesop aria-label="Aesop" />
                    </span>
                    {/* Ritual 워드마크 SVG */}
                    <span className="hero__wordmark-ritual">
                        <HeroRitual aria-label="Ritual" />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
