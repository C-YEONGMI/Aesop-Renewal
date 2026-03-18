import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import storeImage from '../../../assets/Main_store.png';
import './StoreVisualSection.scss';

gsap.registerPlugin(ScrollTrigger);

// Full-Bleed 매장 비주얼 섹션
// 인터렉션이 추가될 수 있도록 gsap + ScrollTrigger를 미리 구성
const StoreVisualSection = () => {
    const sectionRef = useRef(null);
    const imageWrapRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageWrapRef.current,
                {
                    clipPath: 'inset(8% 5% 8% 5%)',
                },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.25,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 78%',
                    },
                }
            );

            // 패럴랙스 스크롤 효과 (인터렉션 영역)
            gsap.fromTo(
                imageRef.current,
                {
                    scale: 1.16,
                    yPercent: -8,
                },
                {
                    scale: 1.02,
                    yPercent: 8,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="store-visual" ref={sectionRef}>
            <div className="store-visual__image-wrap" ref={imageWrapRef}>
                <img
                    ref={imageRef}
                    className="store-visual__image"
                    src={storeImage}
                    alt="Aesop 매장 전경"
                />
            </div>
        </section>
    );
};

export default StoreVisualSection;
