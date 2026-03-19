import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './KrExclusiveBenefits.scss';
import { krExclusiveBenefitsContent } from '../data/krExclusiveBenefitsContent';

gsap.registerPlugin(ScrollTrigger);

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

const renderTextLines = (lines) => lines.map((line) => <p key={line}>{line}</p>);

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
    <article
        className={`kr-exclusive-configuration__product kr-exclusive-configuration__product--${item.key}`}
        data-node-id={item.nodeId}
    >
        <figure className="kr-exclusive-configuration__figure">
            <div className="kr-exclusive-configuration__media-frame">
                {item.frames.map((frame) => (
                    <img
                        key={frame.key}
                        className={`kr-exclusive-configuration__media kr-exclusive-configuration__media--${item.key} kr-exclusive-configuration__media--${frame.key}`}
                        src={frame.src}
                        alt={frame.alt}
                        loading="lazy"
                    />
                ))}
            </div>
            <figcaption className="kr-exclusive-configuration__caption suit-16-r">
                {item.label}
            </figcaption>
        </figure>
    </article>
);

const PackagingView = ({ view }) => (
    <figure
        className={`kr-exclusive-packaging__view kr-exclusive-packaging__view--${view.key}`}
        data-node-id={view.nodeId}
    >
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
    const { hero, configuration, heritage, giftCard, packaging, overview, outro } =
        krExclusiveBenefitsContent;

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

            <section
                className="kr-exclusive-hero"
                aria-labelledby="kr-exclusive-hero-title"
                data-node-id="754:2132"
            >
                <div className="kr-exclusive-page__wide-frame kr-exclusive-hero__stage">
                    <img
                        className="kr-exclusive-hero__background"
                        src={hero.backgroundSrc}
                        alt=""
                        aria-hidden="true"
                        data-node-id="754:2133"
                    />

                    <div className="kr-exclusive-page__inner kr-exclusive-hero__inner">
                        <div className="kr-exclusive-hero__copy">
                            <h1
                                className="kr-exclusive-hero__title montage-100"
                                id="kr-exclusive-hero-title"
                                data-node-id="754:2136"
                            >
                                {hero.titleLines.map((line) => (
                                    <span key={line}>{line}</span>
                                ))}
                            </h1>
                            <p
                                className="kr-exclusive-page__eyebrow suit-26-sb"
                                data-node-id="754:2134"
                            >
                                {hero.eyebrow}
                            </p>
                            <p
                                className="kr-exclusive-page__english-label optima-20"
                                data-node-id="754:2135"
                            >
                                {hero.englishLabel}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="kr-exclusive-configuration"
                aria-labelledby="kr-exclusive-configuration-title"
                data-node-id="746:2049"
            >
                <div className="kr-exclusive-page__inner">
                    <header className="kr-exclusive-page__section-header kr-exclusive-page__section-header--center">
                        <h2
                            className="kr-exclusive-page__section-title montage-80"
                            id="kr-exclusive-configuration-title"
                            data-node-id="746:2050"
                        >
                            {configuration.title}
                        </h2>
                        <div
                            className="kr-exclusive-page__section-copy suit-20-m"
                            data-node-id="746:2051"
                        >
                            {renderTextLines(configuration.description)}
                        </div>
                    </header>

                    <div className="kr-exclusive-configuration__products">
                        {configuration.items.map((item) => (
                            <ConfigurationProduct key={item.key} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="kr-exclusive-heritage"
                aria-labelledby="kr-exclusive-heritage-title"
                data-node-id="746:2064"
            >
                <div className="kr-exclusive-page__inner">
                    <header className="kr-exclusive-page__section-header kr-exclusive-page__section-header--center">
                        <h2
                            className="kr-exclusive-page__section-title montage-80"
                            id="kr-exclusive-heritage-title"
                            data-node-id="746:2072"
                        >
                            {heritage.title}
                        </h2>
                        <div
                            className="kr-exclusive-page__section-body suit-20-m"
                            data-node-id="746:2073"
                        >
                            {renderTextLines(heritage.description)}
                        </div>
                    </header>

                    <div className="kr-exclusive-heritage__gallery">
                        <figure
                            className="kr-exclusive-heritage__panel kr-exclusive-heritage__panel--left"
                            data-node-id="746:2065"
                        >
                            <img
                                src={heritage.leftImage.src}
                                alt={heritage.leftImage.alt}
                                loading="lazy"
                            />
                        </figure>

                        <figure
                            className="kr-exclusive-heritage__panel kr-exclusive-heritage__panel--right"
                            data-node-id="746:2068"
                        >
                            <img
                                src={heritage.rightImage.src}
                                alt={heritage.rightImage.alt}
                                loading="lazy"
                            />
                            <figcaption
                                className="kr-exclusive-heritage__quote suit-24-r"
                                data-node-id="746:2071"
                            >
                                {renderTextLines(heritage.rightImage.quoteLines)}
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            <section
                className="kr-exclusive-gift-card"
                aria-labelledby="kr-exclusive-gift-card-title"
                data-node-id="746:2074"
            >
                <div className="kr-exclusive-page__wide-frame kr-exclusive-gift-card__stage">
                    <img
                        className="kr-exclusive-gift-card__background"
                        src={giftCard.backgroundSrc}
                        alt=""
                        aria-hidden="true"
                        data-node-id="746:2075"
                    />

                    <div className="kr-exclusive-page__inner kr-exclusive-gift-card__inner">
                        <article className="kr-exclusive-gift-card__content">
                            <h2
                                className="kr-exclusive-page__section-title montage-80"
                                id="kr-exclusive-gift-card-title"
                                data-node-id="746:2077"
                            >
                                {giftCard.title}
                            </h2>
                            <div
                                className="kr-exclusive-gift-card__body suit-24-r"
                                data-node-id="746:2076"
                            >
                                {renderTextLines(giftCard.description)}
                            </div>

                            <div
                                className="kr-exclusive-gift-card__tip suit-12-r"
                                data-node-id="746:2078"
                            >
                                <p className="kr-exclusive-gift-card__tip-title">
                                    {giftCard.tipTitle}
                                </p>
                                {giftCard.tips.map((tip) => (
                                    <p key={tip}>{tip}</p>
                                ))}
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section
                className="kr-exclusive-packaging"
                aria-labelledby="kr-exclusive-packaging-title"
                data-node-id="746:2093"
            >
                <div className="kr-exclusive-page__inner">
                    <header className="kr-exclusive-page__section-header kr-exclusive-page__section-header--center kr-exclusive-page__section-header--light">
                        <h2
                            className="kr-exclusive-page__section-title montage-80"
                            id="kr-exclusive-packaging-title"
                            data-node-id="746:2103"
                        >
                            {packaging.title}
                        </h2>
                        <div
                            className="kr-exclusive-page__section-copy suit-24-r"
                            data-node-id="746:2096"
                        >
                            {renderTextLines(packaging.description)}
                        </div>
                    </header>

                    <div className="kr-exclusive-packaging__views">
                        {packaging.views.map((view) => (
                            <PackagingView key={view.key} view={view} />
                        ))}
                    </div>

                    <div className="kr-exclusive-packaging__gallery">
                        <figure
                            className="kr-exclusive-packaging__feature"
                            data-node-id={packaging.gallery.featured.nodeId}
                        >
                            <img
                                src={packaging.gallery.featured.src}
                                alt={packaging.gallery.featured.alt}
                                loading="lazy"
                            />
                        </figure>

                        <div className="kr-exclusive-packaging__details">
                            <figure
                                className="kr-exclusive-packaging__detail"
                                data-node-id={packaging.gallery.detailTop.nodeId}
                            >
                                <img
                                    src={packaging.gallery.detailTop.src}
                                    alt={packaging.gallery.detailTop.alt}
                                    loading="lazy"
                                />
                            </figure>

                            <figure
                                className="kr-exclusive-packaging__detail"
                                data-node-id={packaging.gallery.detailBottom.nodeId}
                            >
                                <img
                                    src={packaging.gallery.detailBottom.src}
                                    alt={packaging.gallery.detailBottom.alt}
                                    loading="lazy"
                                />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="kr-exclusive-overview"
                aria-labelledby="kr-exclusive-overview-title"
                data-node-id="746:2079"
            >
                <div className="kr-exclusive-page__wide-frame">
                    <div className="kr-exclusive-page__inner kr-exclusive-overview__inner">
                        <article className="kr-exclusive-overview__copy">
                            <h2
                                className="kr-exclusive-overview__title montage-100"
                                id="kr-exclusive-overview-title"
                                data-node-id="746:2091"
                            >
                                {overview.title}
                            </h2>
                            <p
                                className="kr-exclusive-page__eyebrow suit-26-sb"
                                data-node-id="746:2089"
                            >
                                {overview.eyebrow}
                            </p>
                            <p
                                className="kr-exclusive-page__english-label optima-20"
                                data-node-id="746:2090"
                            >
                                {overview.englishLabel}
                            </p>
                            <p
                                className="kr-exclusive-overview__body suit-20-l"
                                data-node-id="746:2092"
                            >
                                {overview.description}
                            </p>
                        </article>

                        <div
                            className="kr-exclusive-overview__collage"
                            aria-label="Korea Exclusive collage"
                        >
                            {overview.collage.map((item) => (
                                <figure
                                    key={item.key}
                                    className={`kr-exclusive-overview__visual kr-exclusive-overview__visual--${item.key}`}
                                    data-node-id={item.nodeId}
                                >
                                    <img src={item.src} alt={item.alt} loading="lazy" />
                                </figure>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="kr-exclusive-outro"
                aria-label="Korea Exclusive outro"
                data-node-id="746:2113"
            >
                <div className="kr-exclusive-page__wide-frame kr-exclusive-outro__stage">
                    <img
                        className="kr-exclusive-outro__background"
                        src={outro.backgroundSrc}
                        alt={outro.alt}
                        data-node-id={outro.nodeId}
                    />
                </div>
            </section>
        </div>
    );
};

export default KrExclusiveBenefits;
