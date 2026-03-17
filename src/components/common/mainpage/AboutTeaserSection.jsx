import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutTeaserVideo from '../../../assets/AboutTeaser.mp4';
import MainAboutSvg from '../../../assets/Main_About.svg?react';
import './AboutTeaserSection.scss';

gsap.registerPlugin(ScrollTrigger);

const AboutTeaserSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.about-teaser__video-box',
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                    },
                }
            );
            gsap.fromTo(
                '.about-teaser__logo',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
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
            <div className="about-teaser__inner">
                {/* 중앙 비디오 영역 (850*478) */}
                <div className="about-teaser__video-box">
                    <video 
                        src={AboutTeaserVideo} 
                        className="about-teaser__video"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>

                {/* 좌측 하단 About SVG 로고 */}
                <div className="about-teaser__logo">
                    <MainAboutSvg />
                </div>
            </div>
        </section>
    );
};

export default AboutTeaserSection;
