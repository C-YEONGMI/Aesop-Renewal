import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import configurationBodyCleanser from '../assets/Configuration_bodycleanser.png';
import configurationGiftCard from '../assets/Configuration_GiftCard.png';
import configurationHandCream from '../assets/Configuration_HandCream.png';
import configurationPerfume from '../assets/Configuration_Perfume.png';
import configurationSoap from '../assets/Configuration_soap.png';
import configurationWovenLeft from '../assets/Configuration_WovenL.png';
import configurationWovenRight from '../assets/Configuration_WovenR.png';
import giftCardBackground from '../assets/Korea Exclusive_GiftCardBG.png';
import koreaExclusiveEndBackground from '../assets/KoreaExclusive_EndBG.png';
import koreaExclusiveHeroBackground from '../assets/KoreaExclusive_MainBG.png';
import packagingMainImage from '../assets/KoreaExclusive_PackagingMain.png';
import packagingUseImageOne from '../assets/KoreaExclusive_PackagingUse1.png';
import packagingUseImageTwo from '../assets/KoreaExclusive_PackagingUse2.png';
import overviewLeftImage from '../assets/KoreaExclusive_L.png';
import overviewRightTopImage from '../assets/KoreaExclusive_R1.png';
import overviewRightBottomImage from '../assets/KoreaExclusive_R2.png';
import packagingSideView from '../assets/Gemini_Generated_Image_265ghz265ghz265g 1.png';
import packagingTopView from '../assets/cc8c57de-8599-450d-9bfd-0677252d2955-2026-03-13 2 1.png';
import packagingFrontView from '../assets/product보자기-누끼 2.png';
import './KrExclusiveBenefits.scss';

gsap.registerPlugin(ScrollTrigger);

const HERO = {
    eyebrow: '결: 한국의 유산',
    englishLabel: 'Woven Heritage',
    titleLines: ['Korea', 'Exclusive'],
    backgroundSrc: koreaExclusiveEndBackground,
};

const CONFIGURATION = {
    title: 'Configuration',
    description: [
        '한국의 미감과 이솝의 무드를 하나의 구성 안에 담아낸 한국 온라인몰 단독 기획으로,',
        '한국의 정서를 담은 쑥과 흑임자의 향, 그리고 정성그럽게 구성된 패키지 경험을 만나볼 수 있습니다.',
    ],
    items: [
        {
            key: 'body-wash',
            label: '바디워시',
            src: configurationBodyCleanser,
            alt: '바디워시 제품 이미지',
        },
        {
            key: 'fragrance',
            label: '향수',
            src: configurationPerfume,
            alt: '향수 제품 이미지',
        },
        {
            key: 'body-soap',
            label: '바디솝',
            src: configurationSoap,
            alt: '바디솝 제품 이미지',
        },
        {
            key: 'hand-balm',
            label: '핸드밤',
            src: configurationHandCream,
            alt: '핸드밤 제품 이미지',
        },
        {
            key: 'gift-card',
            label: '기프트카드 (선택)',
            src: configurationGiftCard,
            alt: '기프트카드 이미지',
        },
    ],
};

const HERITAGE = {
    title: 'Woven Heritage',
    description: [
        '이른 새벽 안개 낀 숲을 거니는 듯한 쑥의 쌉싸름하고 청량한 흙내음이 흩어진 감각을 맑게 깨우고,',
        '그 사이에서 피어오르는 흑임자의 짙고 고요한 잔향이 피부 위를 따뜻하게 감싸 안으며 깊은 안도감을 부여합니다.',
        '바쁘게 흘러가는 시간 속에서, 자연이 일궈낸 고유한 향취를 통해 온전한 나를 마주하는 고요한 의식(Ritual)으로 여러분을 초대합니다.',
    ],
    leftImage: {
        src: configurationWovenLeft,
        alt: '웅장한 향수 병 이미지',
    },
    rightImage: {
        src: configurationWovenRight,
        alt: '쑥과 흑임자 원료 이미지',
        quoteLines: [
            '오랜 세월 한국의 땅과 바람을 묵묵히 견뎌낸 쑥의 푸른 생명력,',
            '그리고 대지의 기운을 온전히 응축한 흑임자의 묵직한 지혜',
        ],
    },
};

const GIFT_CARD = {
    title: 'Gift Card',
    description: [
        '섬세한 선으로 그려낸 전통 궁궐의 위엄 있는 자태,',
        '그리고 그 가장자리에 새겨진 단청의 아름다움.',
        '이번 기프트 카드는 여백의 미를 살린 고요한 배경 위 한국 고유 색채를 얹어, 절제되면서도 한국적인 기품 있는 미학을 완성했습니다.',
    ],
    tipTitle: '[Gifting Tip]',
    tips: [
        '명절이나 특별한 기념일, 혹은 한국의 아름다움과 쉼을 전하고 싶은 소중한 분께 이 특별한 카드를 함께 건네어 보세요.',
        '뒷면의 여백 위 정성스레 남긴 한 줄의 메시지는 선물에 깊은 여운을 더해줍니다.',
    ],
    backgroundSrc: giftCardBackground,
};

const PACKAGING = {
    title: 'Packaging',
    description: [
        '한 번 사용하고 버려지는 것 대신 간직되는 것을 택했습니다.',
        '보자기의 유연한 재사용성은 이솝이 추구하는 지속 가능성과 맞닿아 있습니다.',
    ],
    views: [
        {
            key: 'side',
            label: '옆모습',
            src: packagingSideView,
            alt: '패키지 옆모습 이미지',
        },
        {
            key: 'front',
            label: '정면',
            src: packagingFrontView,
            alt: '패키지 정면 이미지',
        },
        {
            key: 'top',
            label: '윗모습',
            src: packagingTopView,
            alt: '패키지 윗모습 이미지',
        },
    ],
    gallery: {
        featured: {
            src: packagingMainImage,
            alt: '보자기 패키지 메인 이미지',
        },
        detailTop: {
            src: packagingUseImageOne,
            alt: '꽃병으로 재사용한 보자기 패키지 이미지',
        },
        detailBottom: {
            src: packagingUseImageTwo,
            alt: '장바구니처럼 활용한 보자기 패키지 이미지',
        },
    },
};

const OVERVIEW = {
    eyebrow: '결: 한국의 유산',
    englishLabel: 'Woven Heritage',
    title: 'Korea Exclusive',
    description:
        '시대를 초월하는 전통의 미학과 식물학적 지혜가 만나 고요한 감각의 여정을 선사합니다. 정성스레 묶어낸 보자기의 질감, 단청의 위엄을 담은 카드에 적힌 다정한 문장, 그리고 쑥과 흑임자가 빚어내는 대지의 향취까지. 이 세심한 컬렉션은 소중한 이의 지친 일상에 자연의 평온과 깊은 안도감을 선물합니다.',
    collage: [
        {
            key: 'top-right',
            src: overviewRightTopImage,
            alt: '기프트카드 이미지',
        },
        {
            key: 'bottom-right',
            src: overviewRightBottomImage,
            alt: '디지털 화면 속 제품 이미지',
        },
        {
            key: 'bottom-left',
            src: overviewLeftImage,
            alt: '패키지와 제품 구성 이미지',
        },
    ],
};

const OUTRO = {
    backgroundSrc: koreaExclusiveHeroBackground,
    alt: '한국 익스클루시브 세트 이미지',
};

// Section-level animation recipes are kept together so timing and targets stay easy to tweak later.
const SECTION_REVEAL_RECIPES = [
    {
        trigger: '.kr-exclusive-configuration',
        selectors: [
            '.kr-exclusive-configuration .kr-exclusive-page__section-title',
            '.kr-exclusive-configuration .kr-exclusive-page__section-copy',
        ],
        from: { autoAlpha: 0, y: 36 },
        to: { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
    },
    {
        trigger: '.kr-exclusive-configuration__products',
        selectors: ['.kr-exclusive-configuration__product'],
        from: { autoAlpha: 0, y: 56 },
        to: { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
        start: 'top 78%',
    },
    {
        trigger: '.kr-exclusive-heritage',
        selectors: [
            '.kr-exclusive-heritage .kr-exclusive-page__section-title',
            '.kr-exclusive-heritage .kr-exclusive-page__section-body',
        ],
        from: { autoAlpha: 0, y: 36 },
        to: { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
    },
    {
        trigger: '.kr-exclusive-heritage__gallery',
        selectors: ['.kr-exclusive-heritage__panel--left', '.kr-exclusive-heritage__panel--right'],
        from: { autoAlpha: 0, y: 60, scale: 0.96 },
        to: { autoAlpha: 1, y: 0, scale: 1, duration: 1, stagger: 0.14, ease: 'power3.out' },
        start: 'top 78%',
    },
    {
        trigger: '.kr-exclusive-heritage__panel--right',
        selectors: ['.kr-exclusive-heritage__quote'],
        from: { autoAlpha: 0, y: 28 },
        to: { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        start: 'top 72%',
    },
    {
        trigger: '.kr-exclusive-gift-card',
        selectors: ['.kr-exclusive-gift-card__content > *'],
        from: { autoAlpha: 0, x: 40 },
        to: { autoAlpha: 1, x: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out' },
    },
    {
        trigger: '.kr-exclusive-packaging',
        selectors: [
            '.kr-exclusive-packaging .kr-exclusive-page__section-title',
            '.kr-exclusive-packaging .kr-exclusive-page__section-copy',
        ],
        from: { autoAlpha: 0, y: 36 },
        to: { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
    },
    {
        trigger: '.kr-exclusive-packaging__views',
        selectors: ['.kr-exclusive-packaging__view'],
        from: { autoAlpha: 0, y: 42 },
        to: { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out' },
        start: 'top 80%',
    },
    {
        trigger: '.kr-exclusive-packaging__gallery',
        selectors: ['.kr-exclusive-packaging__feature', '.kr-exclusive-packaging__detail'],
        from: { autoAlpha: 0, y: 56, scale: 0.97 },
        to: { autoAlpha: 1, y: 0, scale: 1, duration: 0.95, stagger: 0.12, ease: 'power3.out' },
        start: 'top 78%',
    },
    {
        trigger: '.kr-exclusive-overview',
        selectors: ['.kr-exclusive-overview__copy > *'],
        from: { autoAlpha: 0, y: 36 },
        to: { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
    },
    {
        trigger: '.kr-exclusive-overview__collage',
        selectors: ['.kr-exclusive-overview__visual'],
        from: { autoAlpha: 0, y: 64, scale: 0.94 },
        to: { autoAlpha: 1, y: 0, scale: 1, duration: 1, stagger: 0.12, ease: 'power3.out' },
        start: 'top 78%',
    },
    {
        trigger: '.kr-exclusive-outro',
        selectors: ['.kr-exclusive-outro__background'],
        from: { autoAlpha: 0, scale: 1.04 },
        to: { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        start: 'top 85%',
    },
];

const DESKTOP_SCRUB_RECIPES = [
    {
        trigger: '.kr-exclusive-hero',
        selectors: ['.kr-exclusive-hero__background'],
        vars: { yPercent: 6, scale: 1.04 },
        start: 'top top',
        end: 'bottom top',
    },
    {
        trigger: '.kr-exclusive-packaging',
        selectors: ['.kr-exclusive-packaging__feature img'],
        vars: { yPercent: -6, scale: 1.08 },
    },
    {
        trigger: '.kr-exclusive-packaging',
        selectors: ['.kr-exclusive-packaging__detail img'],
        vars: { yPercent: -4, scale: 1.06 },
    },
];

const renderTextBlock = (lines) => lines.join('\n');

const getScopedElements = (scope, selectors) =>
    selectors.flatMap((selector) => Array.from(scope.querySelectorAll(selector)));

const createSectionReveal = (scope, recipe) => {
    const targets = getScopedElements(scope, recipe.selectors);
    const trigger = scope.querySelector(recipe.trigger);

    if (!targets.length || !trigger) {
        return;
    }

    gsap.fromTo(targets, recipe.from, {
        ...recipe.to,
        scrollTrigger: {
            trigger,
            start: recipe.start ?? 'top 72%',
            once: recipe.once ?? true,
        },
    });
};

const createScrubAnimation = (scope, recipe) => {
    const targets = getScopedElements(scope, recipe.selectors);
    const trigger = scope.querySelector(recipe.trigger);

    if (!targets.length || !trigger) {
        return;
    }

    gsap.to(targets, {
        ...recipe.vars,
        ease: 'none',
        scrollTrigger: {
            trigger,
            start: recipe.start ?? 'top bottom',
            end: recipe.end ?? 'bottom top',
            scrub: true,
        },
    });
};

const ConfigurationProduct = ({ item }) => (
    <article className={`kr-exclusive-configuration__product kr-exclusive-configuration__product--${item.key}`}>
        <figure className="kr-exclusive-configuration__figure">
            <div className="kr-exclusive-configuration__media-frame">
                <img
                    className={`kr-exclusive-configuration__media kr-exclusive-configuration__media--${item.key}`}
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                />
            </div>
            <figcaption className="kr-exclusive-configuration__caption suit-16-r">
                {item.label}
            </figcaption>
        </figure>
    </article>
);

const PackagingView = ({ view }) => (
    <figure className={`kr-exclusive-packaging__view kr-exclusive-packaging__view--${view.key}`}>
        <div className="kr-exclusive-packaging__view-media">
            <img src={view.src} alt={view.alt} loading="lazy" />
        </div>
        <figcaption className="kr-exclusive-packaging__view-label suit-18-r">
            {view.label}
        </figcaption>
    </figure>
);

const KrExclusiveBenefits = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        const pageElement = pageRef.current;

        if (!pageElement) {
            return undefined;
        }

        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const heroCopyTargets = getScopedElements(pageElement, [
                    '.kr-exclusive-hero__copy .kr-exclusive-hero__title span',
                    '.kr-exclusive-hero__copy .kr-exclusive-page__eyebrow',
                    '.kr-exclusive-hero__copy .kr-exclusive-page__english-label',
                ]);
                const heroBackground = pageElement.querySelector('.kr-exclusive-hero__background');

                if (heroBackground || heroCopyTargets.length) {
                    const heroTimeline = gsap.timeline({
                        defaults: { ease: 'power3.out' },
                    });

                    if (heroBackground) {
                        heroTimeline.fromTo(
                            heroBackground,
                            { autoAlpha: 0, scale: 1.08 },
                            { autoAlpha: 1, scale: 1, duration: 1.25 },
                            0
                        );
                    }

                    if (heroCopyTargets.length) {
                        heroTimeline.fromTo(
                            heroCopyTargets,
                            { autoAlpha: 0, y: 40 },
                            { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
                            0.18
                        );
                    }
                }

                SECTION_REVEAL_RECIPES.forEach((recipe) => {
                    createSectionReveal(pageElement, recipe);
                });
            });

            mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
                DESKTOP_SCRUB_RECIPES.forEach((recipe) => {
                    createScrubAnimation(pageElement, recipe);
                });
            });
        }, pageElement);

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    return (
        <div className="kr-exclusive-page" ref={pageRef}>
            <div className="kr-exclusive-page__header-space" />

            <section className="kr-exclusive-hero" aria-labelledby="kr-exclusive-hero-title">
                <div className="kr-exclusive-page__wide-frame kr-exclusive-hero__stage">
                    <img
                        className="kr-exclusive-hero__background"
                        src={HERO.backgroundSrc}
                        alt=""
                        aria-hidden="true"
                    />

                    <div className="kr-exclusive-page__inner kr-exclusive-hero__inner">
                        <div className="kr-exclusive-hero__copy">
                            <h1 className="kr-exclusive-hero__title montage-100" id="kr-exclusive-hero-title">
                                {HERO.titleLines.map((line) => (
                                    <span key={line}>{line}</span>
                                ))}
                            </h1>
                            <p className="kr-exclusive-page__eyebrow suit-26-sb">{HERO.eyebrow}</p>
                            <p className="kr-exclusive-page__english-label optima-20">
                                {HERO.englishLabel}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="kr-exclusive-configuration"
                aria-labelledby="kr-exclusive-configuration-title"
            >
                <div className="kr-exclusive-page__inner">
                    <header className="kr-exclusive-page__section-header kr-exclusive-page__section-header--center">
                        <h2 className="kr-exclusive-page__section-title montage-80" id="kr-exclusive-configuration-title">
                            {CONFIGURATION.title}
                        </h2>
                        <div className="kr-exclusive-page__section-copy suit-20-m">
                            {renderTextBlock(CONFIGURATION.description)}
                        </div>
                    </header>

                    <div className="kr-exclusive-configuration__products">
                        {CONFIGURATION.items.map((item) => (
                            <ConfigurationProduct key={item.key} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="kr-exclusive-heritage" aria-labelledby="kr-exclusive-heritage-title">
                <div className="kr-exclusive-page__inner">
                    <header className="kr-exclusive-page__section-header kr-exclusive-page__section-header--center">
                        <h2 className="kr-exclusive-page__section-title montage-80" id="kr-exclusive-heritage-title">
                            {HERITAGE.title}
                        </h2>
                        <div className="kr-exclusive-page__section-body suit-20-m">
                            {renderTextBlock(HERITAGE.description)}
                        </div>
                    </header>

                    <div className="kr-exclusive-heritage__gallery">
                        <figure className="kr-exclusive-heritage__panel kr-exclusive-heritage__panel--left">
                            <img src={HERITAGE.leftImage.src} alt={HERITAGE.leftImage.alt} loading="lazy" />
                        </figure>

                        <figure className="kr-exclusive-heritage__panel kr-exclusive-heritage__panel--right">
                            <img src={HERITAGE.rightImage.src} alt={HERITAGE.rightImage.alt} loading="lazy" />
                            <figcaption className="kr-exclusive-heritage__quote suit-24-r">
                                <p className="kr-exclusive-heritage__quote-text">
                                    {HERITAGE.rightImage.quoteLines.join('\n')}
                                </p>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            <section className="kr-exclusive-gift-card" aria-labelledby="kr-exclusive-gift-card-title">
                <div className="kr-exclusive-page__wide-frame kr-exclusive-gift-card__stage">
                    <img
                        className="kr-exclusive-gift-card__background"
                        src={GIFT_CARD.backgroundSrc}
                        alt=""
                        aria-hidden="true"
                    />

                    <div className="kr-exclusive-page__inner kr-exclusive-gift-card__inner">
                        <article className="kr-exclusive-gift-card__content">
                            <h2 className="kr-exclusive-page__section-title montage-80" id="kr-exclusive-gift-card-title">
                                {GIFT_CARD.title}
                            </h2>
                            <div className="kr-exclusive-gift-card__body suit-24-r">
                                {renderTextBlock(GIFT_CARD.description)}
                            </div>

                            <div className="kr-exclusive-gift-card__tip suit-12-r">
                                <p className="kr-exclusive-gift-card__tip-title">{GIFT_CARD.tipTitle}</p>
                                {GIFT_CARD.tips.map((tip) => (
                                    <p key={tip}>{tip}</p>
                                ))}
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="kr-exclusive-packaging" aria-labelledby="kr-exclusive-packaging-title">
                <div className="kr-exclusive-page__inner">
                    <header className="kr-exclusive-page__section-header kr-exclusive-page__section-header--center kr-exclusive-page__section-header--light">
                        <h2 className="kr-exclusive-page__section-title montage-80" id="kr-exclusive-packaging-title">
                            {PACKAGING.title}
                        </h2>
                        <div className="kr-exclusive-page__section-copy suit-24-r">
                            {renderTextBlock(PACKAGING.description)}
                        </div>
                    </header>

                    <div className="kr-exclusive-packaging__views">
                        {PACKAGING.views.map((view) => (
                            <PackagingView key={view.key} view={view} />
                        ))}
                    </div>

                    <div className="kr-exclusive-packaging__gallery">
                        <figure className="kr-exclusive-packaging__feature">
                            <img src={PACKAGING.gallery.featured.src} alt={PACKAGING.gallery.featured.alt} loading="lazy" />
                        </figure>

                        <div className="kr-exclusive-packaging__details">
                            <figure className="kr-exclusive-packaging__detail">
                                <img src={PACKAGING.gallery.detailTop.src} alt={PACKAGING.gallery.detailTop.alt} loading="lazy" />
                            </figure>

                            <figure className="kr-exclusive-packaging__detail">
                                <img src={PACKAGING.gallery.detailBottom.src} alt={PACKAGING.gallery.detailBottom.alt} loading="lazy" />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>

            <section className="kr-exclusive-overview" aria-labelledby="kr-exclusive-overview-title">
                <div className="kr-exclusive-page__wide-frame">
                    <div className="kr-exclusive-page__inner kr-exclusive-overview__inner">
                        <article className="kr-exclusive-overview__copy">
                            <h2 className="kr-exclusive-overview__title montage-100" id="kr-exclusive-overview-title">
                                {OVERVIEW.title}
                            </h2>
                            <p className="kr-exclusive-page__eyebrow suit-26-sb">{OVERVIEW.eyebrow}</p>
                            <p className="kr-exclusive-page__english-label optima-20">
                                {OVERVIEW.englishLabel}
                            </p>
                            <p className="kr-exclusive-overview__body suit-20-l">
                                {OVERVIEW.description}
                            </p>
                        </article>

                        <div className="kr-exclusive-overview__collage" aria-label="Korea Exclusive collage">
                            {OVERVIEW.collage.map((item) => (
                                <figure
                                    key={item.key}
                                    className={`kr-exclusive-overview__visual kr-exclusive-overview__visual--${item.key}`}
                                >
                                    <img src={item.src} alt={item.alt} loading="lazy" />
                                </figure>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="kr-exclusive-outro" aria-label="Korea Exclusive outro">
                <div className="kr-exclusive-page__wide-frame kr-exclusive-outro__stage">
                    <img className="kr-exclusive-outro__background" src={OUTRO.backgroundSrc} alt={OUTRO.alt} />
                </div>
            </section>
        </div>
    );
};

export default KrExclusiveBenefits;
