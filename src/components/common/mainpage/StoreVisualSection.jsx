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
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 패럴랙스 스크롤 효과 (인터렉션 영역)
            gsap.fromTo(
                imageRef.current,
                { scale: 1.08 },
                {
                    scale: 1,
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
            <div className="store-visual__image-wrap">
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
