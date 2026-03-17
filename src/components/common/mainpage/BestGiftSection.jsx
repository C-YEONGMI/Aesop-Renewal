import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MoreWhBox from '../btn/MoreWhBox';
import productsData from '../../../data/products.json';
import './BestGiftSection.scss';

gsap.registerPlugin(ScrollTrigger);

const BestGiftSection = () => {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // 임시 하드코딩된 슬라이드 데이터 (시안 텍스트 적용)
    const slideItems = [
        {
            nameEng: 'Resurrection Duet',
            nameKr: '레저렉션 듀엣',
            desc: (
                <>
                    지친 손을 깨끗하게 세정하고 영양을 공급해 부드럽게 가꿔주는<br />
                    핸드 케어 세트
                </>
            ),
            link: '/product/Resurrection%20Duet'
        },
        {
            nameEng: 'Shower Room Serenades',
            nameKr: '샤워 룸 세레나데',
            desc: (
                <>
                    우디, 스파이시, 허브 향이 어우러진 아로마를 공유하는 부드러운 크림<br />
                    타입의 바디 클렌저와 고보습 핸드 밤으로 구성된 듀오
                </>
            ),
            link: '/product/Shower%20Room%20Serenades'
        },
        {
            nameEng: 'Party in the Greenhouse',
            nameKr: '파티 인 더 그린하우스',
            desc: (
                <>
                    상쾌하고 생기 넘치는 그린 아로마를 담은 인기 아이템: 부드러운 바디<br />
                    클렌저, 활력을 더하는 바디 스크럽, 영양 가득한 바디 밤
                </>
            ),
            link: '/product/Party%20in%20the%20Greenhouse'
        }
    ];
    // 3초마다 자동 슬라이드
    useEffect(() => {
        if (slideItems.length <= 1) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slideItems.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [slideItems.length]);

    // 초기 마운트 시 간단한 페이드인 애니메이션
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current.querySelectorAll('.best-gift__left, .best-gift__center, .best-gift__right'),
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.15,
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

    if (!slideItems.length) return null;

    const currentItem = slideItems[activeIndex];
    
    // 현재 인덱스를 01, 02 형식으로 변환
    const currentNum = String(activeIndex + 1).padStart(2, '0');
    const totalNum = String(slideItems.length).padStart(2, '0');

    return (
        <section className="best-gift" ref={sectionRef}>
            <div className="best-gift__inner">

                {/* Left: 슬라이드 인덱스 & 보조 이미지 */}
                <div className="best-gift__left">
                    <div className="best-gift__pagination">
                        <span className="best-gift__current montage-48">{currentNum}</span>
                        <span className="best-gift__slash montage-24">/</span>
                        <span className="best-gift__total montage-24">{totalNum}</span>
                    </div>

                    <div className="best-gift__img-small">
                        {/* 임시 컬러 박스 (추후 이미지로 대체) */}
                        {/* <img src={currentItem.variants[0]?.image} alt={currentItem.name} /> */}
                    </div>
                </div>

                {/* Center: 아치형 메인 이미지 */}
                <div className="best-gift__center">
                    <div className="best-gift__img-arch">
                        {/* 임시 컬러 박스 (추후 이미지로 대체) */}
                        {/* <img src={currentItem.variants[0]?.image} alt={currentItem.name} /> */}
                    </div>
                </div>

                {/* Right: 상품 정보 및 텍스트 */}
                <div className="best-gift__right">
                    {/* 상단 포인트 이미지 */}
                    <div className="best-gift__img-point">
                        {/* 임시 컬러 박스 (추후 이미지로 대체) */}
                    </div>

                    <div className="best-gift__text-box">
                        <h2 className="best-gift__title montage-48">Best Gift</h2>
                        
                        <div className="best-gift__info">
                            <h3 className="best-gift__name-eng montage-24">{currentItem.nameEng}</h3>
                            <p className="best-gift__name-kr suit-24-sb">{currentItem.nameKr}</p>
                        </div>

                        <p className="best-gift__desc suit-16-r">
                            {currentItem.desc}
                        </p>

                        <MoreWhBox to={currentItem.link} />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BestGiftSection;
