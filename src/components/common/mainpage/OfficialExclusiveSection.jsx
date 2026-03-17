import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MoreBox from '../btn/MoreBox';
import GNB_Logo from '../../../assets/GNB_Logo.svg?react';
import './OfficialExclusiveSection.scss';

gsap.registerPlugin(ScrollTrigger);

const OfficialExclusiveSection = () => {
    const sectionRef = useRef(null);

    // 추후 인터렉션을 위해 이미지(박스) 참조 배열 생성
    const imgRefs = useRef([]);
    imgRefs.current = [];

    const addToRefs = (el) => {
        if (el && !imgRefs.current.includes(el)) {
            imgRefs.current.push(el);
        }
    };

    useEffect(() => {
        // 기본 페이드 인 & 패럴랙스 준비
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imgRefs.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                    },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="official-exclusive" ref={sectionRef}>
            {/* 배경 로고 */}
            <div className="official-exclusive__bg-logo">
                <GNB_Logo />
            </div>

            <div className="official-exclusive__inner">
                {/* 흩뿌려진 이미지 플레이스홀더들 (임시 색상 박스) */}
                <div className="official-exclusive__img official-exclusive__img--1" ref={addToRefs}></div>
                <div className="official-exclusive__img official-exclusive__img--2" ref={addToRefs}></div>
                <div className="official-exclusive__img official-exclusive__img--3" ref={addToRefs}></div>
                <div className="official-exclusive__img official-exclusive__img--4" ref={addToRefs}></div>
                <div className="official-exclusive__img official-exclusive__img--5" ref={addToRefs}></div>
                <div className="official-exclusive__img official-exclusive__img--6" ref={addToRefs}></div>

                {/* 중앙 텍스트 콘텐츠 */}
                <div className="official-exclusive__content">
                    <h2 className="official-exclusive__title montage-48">
                        Official Online Exclusive
                    </h2>
                    
                    <p className="official-exclusive__subtitle suit-24-r">
                        공식 온라인 몰만의 특별한 서비스
                    </p>

                    <p className="official-exclusive__badges suit-12-r">
                        무료 배송 및 반품 · 시그니처 코튼백 포장 · 맞춤형 샘플
                    </p>

                    <p className="official-exclusive__desc suit-16-r">
                        무료 배송과 반품, 샘플 증정, 기프트 포장 서비스까지<br/>
                        공식몰에서만 경험할 수 있는 세심한 배려를 만나보세요.
                    </p>

                    <div className="official-exclusive__btn-wrapper">
                        <MoreBox to="/benefits/official" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfficialExclusiveSection;
