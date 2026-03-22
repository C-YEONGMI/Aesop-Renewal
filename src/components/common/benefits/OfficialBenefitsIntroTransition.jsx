import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './OfficialBenefitsIntroTransition.scss';

gsap.registerPlugin(ScrollTrigger);

const OfficialBenefitsIntroTransition = ({
    heroTitleLines,
    secondaryTitleLines,
    productImage,
    productAlt,
}) => {
    const introRef = useRef(null);
    const surfaceRef = useRef(null);
    const gridRef = useRef(null);
    const lightLayerRef = useRef(null);
    const heroTitleRef = useRef(null);
    const topLineRef = useRef(null);
    const bottomLineRef = useRef(null);
    const productWrapRef = useRef(null);
    const productGlowRef = useRef(null);
    const productImageRef = useRef(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            const rootStyle = getComputedStyle(introRef.current);
            const darkColor = rootStyle.getPropertyValue('--intro-bg-dark').trim() || '#191610';
            const lightColor =
                rootStyle.getPropertyValue('--intro-bg-light').trim() || '#f3ede2';

            mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
                // Tuning: increase this for a slower, more luxurious inversion.
                const pinDistance = '+=170%';

                gsap.set(surfaceRef.current, { backgroundColor: darkColor });
                gsap.set(lightLayerRef.current, {
                    autoAlpha: 1,
                    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                });
                gsap.set([topLineRef.current, bottomLineRef.current], {
                    autoAlpha: 0,
                    filter: 'blur(10px)',
                });
                gsap.set(topLineRef.current, { y: 84 });
                gsap.set(bottomLineRef.current, { y: 116 });
                gsap.set(productWrapRef.current, { scale: 0.92, yPercent: 0 });
                gsap.set(productGlowRef.current, { autoAlpha: 0.08, scale: 0.84 });
                gsap.set(productImageRef.current, {
                    filter: 'brightness(0.42) saturate(0.74) contrast(1.04) drop-shadow(0 56px 80px rgba(0, 0, 0, 0.36))',
                });

                gsap.timeline({
                    scrollTrigger: {
                        trigger: introRef.current,
                        start: 'top top',
                        end: pinDistance,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(
                        surfaceRef.current,
                        {
                            backgroundColor: lightColor,
                            duration: 0.74,
                            ease: 'none',
                        },
                        0.06
                    )
                    .to(
                        gridRef.current,
                        {
                            autoAlpha: 0,
                            duration: 0.34,
                            ease: 'none',
                        },
                        0.1
                    )
                    .to(
                        heroTitleRef.current,
                        {
                            y: -132,
                            autoAlpha: 0,
                            filter: 'blur(10px)',
                            duration: 0.42,
                            ease: 'power2.inOut',
                        },
                        0
                    )
                    .to(
                        lightLayerRef.current,
                        {
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                            duration: 0.68,
                            ease: 'power2.out',
                        },
                        0.18
                    )
                    .to(
                        productWrapRef.current,
                        {
                            scale: 1.02,
                            yPercent: -3,
                            duration: 0.7,
                            ease: 'power2.out',
                        },
                        0.2
                    )
                    .to(
                        productGlowRef.current,
                        {
                            autoAlpha: 0.78,
                            scale: 1,
                            duration: 0.72,
                            ease: 'power2.out',
                        },
                        0.24
                    )
                    .to(
                        productImageRef.current,
                        {
                            filter: 'brightness(1.04) saturate(1.02) contrast(1.02) drop-shadow(0 34px 48px rgba(44, 31, 19, 0.18))',
                            duration: 0.72,
                            ease: 'power2.out',
                        },
                        0.22
                    )
                    .to(
                        topLineRef.current,
                        {
                            autoAlpha: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            duration: 0.38,
                            ease: 'power2.out',
                        },
                        0.5
                    )
                    .to(
                        bottomLineRef.current,
                        {
                            autoAlpha: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            duration: 0.42,
                            ease: 'power2.out',
                        },
                        0.58
                    );
            });

            mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
                gsap.set(lightLayerRef.current, {
                    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                });
                gsap.set([topLineRef.current, bottomLineRef.current], {
                    autoAlpha: 0,
                    filter: 'blur(6px)',
                });
                gsap.set(topLineRef.current, { y: 44 });
                gsap.set(bottomLineRef.current, { y: 56 });
                gsap.set(productImageRef.current, {
                    filter: 'brightness(0.6) saturate(0.82) contrast(1.03)',
                });

                gsap.timeline({
                    scrollTrigger: {
                        trigger: introRef.current,
                        start: 'top 76%',
                        end: 'bottom 18%',
                        scrub: 0.8,
                    },
                })
                    .to(
                        surfaceRef.current,
                        {
                            backgroundColor: lightColor,
                            ease: 'none',
                        },
                        0
                    )
                    .to(
                        gridRef.current,
                        {
                            autoAlpha: 0,
                            ease: 'none',
                        },
                        0.02
                    )
                    .to(
                        heroTitleRef.current,
                        {
                            y: -56,
                            autoAlpha: 0,
                            filter: 'blur(8px)',
                            ease: 'power2.inOut',
                        },
                        0
                    )
                    .to(
                        lightLayerRef.current,
                        {
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                            ease: 'power2.out',
                        },
                        0.14
                    )
                    .to(
                        productImageRef.current,
                        {
                            filter: 'brightness(1.02) saturate(1.02) contrast(1.02)',
                            ease: 'power2.out',
                        },
                        0.2
                    )
                    .to(
                        [topLineRef.current, bottomLineRef.current],
                        {
                            autoAlpha: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            stagger: 0.08,
                            ease: 'power2.out',
                        },
                        0.34
                    );
            });
        }, introRef);

        return () => {
            ctx.revert();
            mm.revert();
        };
    }, []);

    return (
        <section className="official-benefits-intro" ref={introRef}>
            <div className="official-benefits-intro__pin">
                <div className="official-benefits-intro__surface" ref={surfaceRef}>
                    <div className="official-benefits-intro__grid" ref={gridRef} aria-hidden="true" />
                    <div
                        className="official-benefits-intro__light-layer"
                        ref={lightLayerRef}
                        aria-hidden="true"
                    />

                    <div className="official-benefits-intro__hero-copy" data-node-id="1056:573">
                        <h2 className="official-benefits-intro__hero-title" ref={heroTitleRef}>
                            {heroTitleLines.map((line) => (
                                <span key={line}>{line}</span>
                            ))}
                        </h2>
                    </div>

                    <div className="official-benefits-intro__secondary-copy" data-node-id="1056:684">
                        <p
                            className="official-benefits-intro__secondary-line official-benefits-intro__secondary-line--top"
                            ref={topLineRef}
                        >
                            {secondaryTitleLines[0]}
                        </p>
                        <p
                            className="official-benefits-intro__secondary-line official-benefits-intro__secondary-line--bottom"
                            ref={bottomLineRef}
                        >
                            {secondaryTitleLines[1]}
                        </p>
                    </div>

                    <div className="official-benefits-intro__product-wrap" ref={productWrapRef}>
                        <div
                            className="official-benefits-intro__product-glow"
                            ref={productGlowRef}
                            aria-hidden="true"
                        />
                        <img
                            className="official-benefits-intro__product-image"
                            ref={productImageRef}
                            src={productImage}
                            alt={productAlt}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfficialBenefitsIntroTransition;
