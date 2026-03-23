import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import officialProductImage from '../../../assets/official_product.png';
import bodyCleanserImage from '../../../assets/Configuration_bodycleanser.png';
import perfumeImage from '../../../assets/Configuration_Perfume.png';
import handCreamImage from '../../../assets/Configuration_HandCream.png';
import soapImage from '../../../assets/Configuration_soap.png';
import giftCardImage from '../../../assets/Configuration_GiftCard.png';
import OfficialBenefitsIntroTransition from './OfficialBenefitsIntroTransition';
import './OfficialBenefitsSequence.scss';

gsap.registerPlugin(ScrollTrigger);

const BENEFIT_CARDS = [
    {
        id: '01',
        title: 'DELIVERY & RETURNS',
        lines: [
            '주문하신 제품은 영업일 기준 3~5일 이내에 무료 배송되며,',
            '보다 편안한 온라인 경험을 위해 미개봉 제품은 구매 후 7일 이내 무료 반품이 가능합니다.',
        ],
        image: bodyCleanserImage,
        imageAlt: '배송 및 반품 혜택을 상징하는 이솝 보틀 이미지',
        theme: 'dark',
    },
    {
        id: '02',
        title: 'SAMPLE EXPERIENCE',
        lines: [
            '주문과 함께 샘플을 선택해 새로운 제품을 집에서도 경험할 수 있습니다.',
            '아직 만나보지 못한 제품까지 경험해 보세요.',
        ],
        image: handCreamImage,
        imageAlt: '샘플 경험을 상징하는 이솝 핸드 케어 이미지',
        theme: 'sand',
    },
    {
        id: '03',
        title: 'CORPORATE GIFTING',
        lines: [
            '기업과 팀, 그리고 중요한 자리를 위한 기프트 제안을 제공합니다.',
            '목적과 규모에 맞는 구성을 통해 보다 정돈된 선물 경험을 완성할 수 있습니다.',
        ],
        image: giftCardImage,
        imageAlt: '기업 기프트 서비스를 상징하는 기프트 카드 이미지',
        theme: 'oatmeal',
    },
    {
        id: '04',
        title: 'Gift Guide',
        lines: [
            '제품과 주문에 관한 도움은 물론, 선물 선택에 필요한 제안까지 집에서도 받아보실 수 있습니다.',
            '공식 온라인 몰에서만 이어지는 배려를 원하는 방식으로 경험해보세요.',
        ],
        image: soapImage,
        imageAlt: '기프트 가이드를 상징하는 이솝 솝 이미지',
        theme: 'sand',
    },
    {
        id: '05',
        title: 'CONSULT WITH US',
        lines: [
            '제품이나 선물 선택이 고민될 때 온라인에서도 상담을 받아볼 수 있습니다.',
            '매장에서 이어지던 세심한 안내를 디지털 환경에서도 경험할 수 있도록 했습니다.',
        ],
        image: perfumeImage,
        imageAlt: '온라인 상담을 상징하는 이솝 향수 이미지',
        theme: 'oatmeal',
    },
];

const OfficialBenefitsSequence = () => {
    const rootRef = useRef(null);
    const reelSectionRef = useRef(null);
    const reelTrackRef = useRef(null);
    const summaryRef = useRef(null);
    const summaryCopyRef = useRef(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
                const reelTrack = reelTrackRef.current;
                const reelSection = reelSectionRef.current;
                const summary = summaryRef.current;
                const summaryCards = gsap.utils.toArray(
                    '.official-benefits-sequence__summary-card',
                    summary
                );
                const slides = gsap.utils.toArray('.official-benefits-sequence__slide', reelTrack);

                const getTravelDistance = () =>
                    Math.max(0, reelTrack.scrollWidth - reelSection.clientWidth);

                gsap.set(summary, { autoAlpha: 0, y: 56 });
                gsap.set(summaryCards, { autoAlpha: 0, y: 24, scale: 1.03 });
                gsap.set(summaryCopyRef.current, { autoAlpha: 0, y: 36 });

                const slideMotionStart = 0.05;
                const slideMotionDuration = 2.15;
                const reelExitStart = 2.32;
                const summaryStart = 2.38;
                const summaryCardsStart = 2.42;
                const summaryCopyStart = 2.48;

                const reelTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: reelSection,
                        start: 'top top',
                        end: () => `+=${getTravelDistance() + window.innerWidth * 1.15}`,
                        pin: true,
                        scrub: 1,
                        snap: {
                            snapTo: 'labelsDirectional',
                            duration: { min: 0.24, max: 0.52 },
                            delay: 0.04,
                            ease: 'power3.out',
                        },
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                reelTimeline.addLabel('reel-start', 0);
                slides.forEach((_, index) => {
                    const stopTime =
                        slideMotionStart +
                        (slideMotionDuration * index) / Math.max(slides.length - 1, 1);
                    reelTimeline.addLabel(`card-${index + 1}`, stopTime);
                });
                reelTimeline.addLabel('reel-summary', summaryStart);

                reelTimeline
                    .fromTo(
                        slides,
                        { autoAlpha: 0.4, y: 26 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.34,
                            stagger: 0.05,
                            ease: 'power2.out',
                        },
                        0
                    )
                    .to(
                        reelTrack,
                        {
                            x: () => -getTravelDistance(),
                            duration: 2.15,
                            ease: 'none',
                        },
                        0.05
                    )
                    .to(
                        reelTrack,
                        {
                            autoAlpha: 0,
                            scale: 0.9,
                            y: -56,
                            duration: 0.32,
                            ease: 'power2.inOut',
                        },
                        reelExitStart
                    )
                    .to(
                        summary,
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.28,
                            ease: 'power2.out',
                        },
                        summaryStart
                    )
                    .to(
                        summaryCards,
                        {
                            autoAlpha: 1,
                            y: 0,
                            scale: 1,
                            stagger: 0.04,
                            duration: 0.22,
                            ease: 'power2.out',
                        },
                        summaryCardsStart
                    )
                    .to(
                        summaryCopyRef.current,
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.24,
                            ease: 'power2.out',
                        },
                        summaryCopyStart
                    );
            });

            mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
                gsap.utils.toArray('.official-benefits-sequence__slide').forEach((slide) => {
                    gsap.fromTo(
                        slide,
                        { autoAlpha: 0, y: 28 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.7,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: slide,
                                start: 'top 84%',
                                once: true,
                            },
                        }
                    );
                });

                gsap.fromTo(
                    summaryRef.current,
                    { autoAlpha: 0, y: 36 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.72,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: summaryRef.current,
                            start: 'top 84%',
                            once: true,
                        },
                    }
                );
            });
        }, rootRef);

        return () => {
            ctx.revert();
            mm.revert();
        };
    }, []);

    return (
        <div className="official-benefits-sequence" ref={rootRef}>
            <OfficialBenefitsIntroTransition
                heroTitleLines={['Exclusive Services at the', 'Official Online Store']}
                secondaryTitleLines={[
                    'The official online store extends',
                    "Aesop's thoughtful service online.",
                ]}
                productImage={officialProductImage}
                productAlt="공식 온라인 몰 혜택을 상징하는 이솝 보틀 이미지"
            />

            <section className="official-benefits-sequence__reel" ref={reelSectionRef}>
                <div className="official-benefits-sequence__reel-pin">
                    <div className="official-benefits-sequence__track-shell">
                        <div className="official-benefits-sequence__track" ref={reelTrackRef}>
                            {BENEFIT_CARDS.map((card) => (
                                <article
                                    className={`official-benefits-sequence__slide official-benefits-sequence__slide--${card.theme}`}
                                    key={card.id}
                                >
                                    <div className="official-benefits-sequence__slide-visual">
                                        <div className="official-benefits-sequence__visual-board">
                                            <img
                                                className="official-benefits-sequence__visual-product"
                                                src={card.image}
                                                alt={card.imageAlt}
                                            />
                                        </div>
                                    </div>

                                    <div className="official-benefits-sequence__slide-copy">
                                        <div className="official-benefits-sequence__slide-heading">
                                            <h3 className="official-benefits-sequence__slide-title optima-48">
                                                {card.title}
                                            </h3>
                                            <span className="official-benefits-sequence__slide-rule" />
                                        </div>

                                        <p className="official-benefits-sequence__slide-index optima-16">
                                            {card.id} — 05
                                        </p>

                                        <div className="official-benefits-sequence__slide-body suit-18-r">
                                            {card.lines.map((line) => (
                                                <p key={line}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="official-benefits-sequence__summary" ref={summaryRef}>
                        <div className="official-benefits-sequence__summary-row">
                            {BENEFIT_CARDS.map((card) => (
                                <article
                                    className="official-benefits-sequence__summary-card"
                                    key={`summary-${card.id}`}
                                >
                                    <span className="official-benefits-sequence__summary-index optima-16">
                                        {card.id}
                                    </span>
                                    <p className="official-benefits-sequence__summary-title suit-14-m">
                                        {card.title}
                                    </p>
                                </article>
                            ))}
                        </div>

                        <div className="official-benefits-sequence__summary-copy" ref={summaryCopyRef}>
                            <h2 className="official-benefits-sequence__summary-heading optima-70">
                                <span>Aesop&apos;s thoughtful service,</span>
                                <span>now online</span>
                            </h2>
                            <p className="official-benefits-sequence__summary-body suit-18-r">
                                이솝의 세심한 서비스는 온라인까지 이어집니다.
                            </p>
                            <p className="official-benefits-sequence__summary-note suit-14-m">
                                공식 온라인 몰에서만 경험할 수 있는 혜택을 차분한 흐름 안에서
                                살펴보세요.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OfficialBenefitsSequence;
