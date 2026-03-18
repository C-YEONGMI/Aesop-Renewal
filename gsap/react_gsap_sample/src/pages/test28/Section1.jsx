import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

function Section1() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // 타이틀 SplitText 애니메이션
        const titleSplit = new SplitText('h2', {
            type: 'chars, words',
        });

        gsap.from(titleSplit.chars, {
            yPercent: 120,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.04,
        });

        // 서브타이틀 라인 애니메이션
        const subtitleSplit = new SplitText('.subtitle', {
            type: 'lines',
        });

        gsap.from(subtitleSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.08,
            delay: 0.6,
        });

        // 이미지 카드 등장 애니메이션
        gsap.from('.hero-img', {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
            delay: 1,
        });

        // 스크롤 힌트 반복 애니메이션
        gsap.to('.arrow-down', {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 0.8,
            ease: 'power1.inOut',
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Main Title</h2>
                <p className="subtitle">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, exercitationem ullam! Vitae iste
                </p>

                <div className="hero-images">
                    <div className="hero-img">
                        <img src="/images/img1.jpeg" alt="cocktail 1" />
                    </div>
                    <div className="hero-img">
                        <img src="/images/img2.jpeg" alt="cocktail 2" />
                    </div>
                    <div className="hero-img">
                        <img src="/images/img3.jpeg" alt="cocktail 3" />
                    </div>
                    <div className="hero-img">
                        <img src="/images/img5.jpeg" alt="cocktail 4" />
                    </div>
                </div>

                <div className="scroll-hint">
                    <span>Scroll Down</span>
                    <div className="arrow-down"></div>
                </div>
            </div>
        </div>
    );
}

export default Section1;
