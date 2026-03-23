import React, {
    forwardRef,
    useImperativeHandle,
    useMemo,
    useRef,
} from 'react';
import {
    HERO_INTRO_PAGES,
    HERO_INTRO_PORTAL,
    HERO_INTRO_RIFFLE_LAYER_COUNT,
    HERO_INTRO_SEGMENTS,
    clamp01,
    easeInOutCubic,
    easeOutCubic,
    progressBetween,
} from './heroIntroConfig';

const PAGE_ASSIGNMENTS = [0, 1, 0, 2, 1, 2];

const RIFFLE_POSITIONS = [
    '52% 24%',
    'center 18%',
    '46% center',
    '42% 20%',
    '56% center',
    '48% 26%',
];

const safeImageStyle = (event) => {
    event.currentTarget.style.opacity = '0';
};

const createLayerConfig = (pages) =>
    new Array(HERO_INTRO_RIFFLE_LAYER_COUNT).fill(null).map((_, index) => ({
        key: `riffle-layer-${index + 1}`,
        src: pages[PAGE_ASSIGNMENTS[index] % pages.length] ?? null,
        isBackface: index % 2 === 1,
        objectPosition: RIFFLE_POSITIONS[index % RIFFLE_POSITIONS.length],
        folio: `Folio ${String(index + 1).padStart(2, '0')}`,
        pageNumber: String(18 + index * 2).padStart(3, '0'),
    }));

const HeroIntroFlipBook = forwardRef(function HeroIntroFlipBook(
    { heroVideoSrc },
    ref
) {
    const rootRef = useRef(null);
    const stackRef = useRef(null);
    const finalSpreadRef = useRef(null);
    const portalPlateRef = useRef(null);
    const layerRefs = useRef([]);
    const pageSources = useMemo(
        () => HERO_INTRO_PAGES.filter(Boolean),
        []
    );
    const layerConfig = useMemo(
        () => createLayerConfig(pageSources.length ? pageSources : [null]),
        [pageSources]
    );
    const finalLeftPage = pageSources[0] ?? null;
    const finalRightPage = pageSources[1] ?? pageSources[0] ?? null;

    useImperativeHandle(ref, () => ({
        syncToProgress(progress) {
            const root = rootRef.current;

            if (!root) {
                return;
            }

            const clampedProgress = clamp01(progress);
            const coverProgress = easeOutCubic(
                progressBetween(clampedProgress, ...HERO_INTRO_SEGMENTS.cover)
            );
            const hingeProgress = easeInOutCubic(
                progressBetween(clampedProgress, ...HERO_INTRO_SEGMENTS.hinge)
            );
            const riffleProgress = easeInOutCubic(
                progressBetween(clampedProgress, ...HERO_INTRO_SEGMENTS.pageRiffle)
            );
            const settleProgress = easeOutCubic(
                progressBetween(clampedProgress, ...HERO_INTRO_SEGMENTS.spreadSettle)
            );
            const portalProgress = easeInOutCubic(
                progressBetween(clampedProgress, ...HERO_INTRO_SEGMENTS.portal)
            );
            const spreadRevealProgress = easeOutCubic(
                progressBetween(clampedProgress, 0.5, 0.84)
            );
            const portalTranslateX = -HERO_INTRO_PORTAL.left * 380 * portalProgress;
            const portalTranslateY = -HERO_INTRO_PORTAL.top * 220 * portalProgress;

            root.style.setProperty('--hero-intro-cover-progress', coverProgress.toFixed(4));
            root.style.setProperty('--hero-intro-hinge-progress', hingeProgress.toFixed(4));
            root.style.setProperty('--hero-intro-riffle-progress', riffleProgress.toFixed(4));
            root.style.setProperty('--hero-intro-settle-progress', settleProgress.toFixed(4));
            root.style.setProperty('--hero-intro-portal-progress', portalProgress.toFixed(4));

            layerRefs.current.forEach((layer, index) => {
                if (!layer) {
                    return;
                }

                const staggerStart = index * 0.055;
                const localProgress = easeOutCubic(
                    clamp01((riffleProgress - staggerStart) / 0.46)
                );
                const settleLift = easeOutCubic(
                    clamp01((spreadRevealProgress - index * 0.025) / 0.78)
                );
                const liftProgress = easeOutCubic(clamp01(localProgress / 0.22));
                const fanProgress = easeOutCubic(
                    clamp01((localProgress - 0.12) / 0.34)
                );
                const sweepProgress = easeInOutCubic(
                    clamp01((localProgress - 0.32) / 0.38)
                );
                const releaseProgress = easeOutCubic(
                    clamp01((localProgress - 0.72) / 0.22)
                );
                const curlProgress = Math.max(
                    liftProgress * 0.36 +
                        fanProgress * 0.84 +
                        sweepProgress * 0.92 -
                        releaseProgress * 0.42,
                    0
                );
                const paperBaseRotateX = 1.4 * liftProgress - 2.8 * fanProgress + 1.2 * releaseProgress;
                const paperBaseRotateY = -4 * fanProgress - 8 * sweepProgress + 3.6 * releaseProgress;
                const paperBaseSkew = -1.8 * fanProgress - 2.8 * sweepProgress + 1.6 * releaseProgress;
                const paperScaleX = 1 - fanProgress * 0.02 - sweepProgress * 0.012 + releaseProgress * 0.008;
                const paperScaleY = 1 + liftProgress * 0.014 - sweepProgress * 0.018;
                const wingRotateY = -18 * fanProgress - 36 * sweepProgress + 18 * releaseProgress;
                const wingRotateX = 2.6 * liftProgress - 7.4 * fanProgress + 3.4 * releaseProgress;
                const wingRotateZ = 1.2 * fanProgress + 2.6 * sweepProgress - 1.1 * releaseProgress;
                const wingShiftX = curlProgress * 10;
                const wingShiftY = -curlProgress * 6 + releaseProgress * 2;
                const rotateY =
                    -12 * liftProgress -
                    (60 + index * 4) * fanProgress -
                    (54 + index * 3) * sweepProgress +
                    18 * releaseProgress;
                const rotateX = 1.8 * liftProgress - 3.2 * fanProgress + 1.2 * releaseProgress;
                const translateX =
                    -1 +
                    liftProgress * 1.2 -
                    fanProgress * (5 + index * 0.9) -
                    sweepProgress * (18 + index * 2.1) +
                    releaseProgress * (7 + index * 0.7) +
                    settleLift * 1.8;
                const translateZ =
                    8 +
                    liftProgress * 10 +
                    fanProgress * (34 - index * 2) -
                    sweepProgress * (14 + index * 2.2) -
                    releaseProgress * 14;
                const translateY =
                    (1 - liftProgress) * 10 +
                    fanProgress * (index * 0.6) -
                    releaseProgress * 3;
                const skewY = -1.6 * liftProgress - 4.6 * fanProgress + 2.8 * releaseProgress;
                const scaleX = 0.986 + fanProgress * 0.012 - releaseProgress * 0.006;
                const opacity = Math.max(0, 1 - releaseProgress * 1.02);
                const shadow = 0.07 + fanProgress * 0.08 + sweepProgress * 0.06;
                const blur = sweepProgress > 0.56 ? (sweepProgress - 0.56) * 6.5 : 0;

                layer.style.transform =
                    `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) ` +
                    `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) skewY(${skewY.toFixed(2)}deg) scaleX(${scaleX.toFixed(4)})`;
                layer.style.opacity = opacity.toFixed(4);
                layer.style.filter = `blur(${blur.toFixed(2)}px)`;
                layer.style.boxShadow = `0 18px 36px rgba(70, 43, 21, ${shadow.toFixed(3)})`;
                layer.style.zIndex = String(40 - index);
                layer.style.setProperty('--hero-intro-paper-curl', curlProgress.toFixed(4));
                layer.style.setProperty('--hero-intro-paper-base-skew', `${paperBaseSkew.toFixed(2)}deg`);
                layer.style.setProperty('--hero-intro-paper-base-rotate-x', `${paperBaseRotateX.toFixed(2)}deg`);
                layer.style.setProperty('--hero-intro-paper-base-rotate-y', `${paperBaseRotateY.toFixed(2)}deg`);
                layer.style.setProperty('--hero-intro-paper-scale-x', paperScaleX.toFixed(4));
                layer.style.setProperty('--hero-intro-paper-scale-y', paperScaleY.toFixed(4));
                layer.style.setProperty('--hero-intro-paper-wing-rotate-x', `${wingRotateX.toFixed(2)}deg`);
                layer.style.setProperty('--hero-intro-paper-wing-rotate-y', `${wingRotateY.toFixed(2)}deg`);
                layer.style.setProperty('--hero-intro-paper-wing-rotate-z', `${wingRotateZ.toFixed(2)}deg`);
                layer.style.setProperty('--hero-intro-paper-wing-shift-x', `${wingShiftX.toFixed(2)}px`);
                layer.style.setProperty('--hero-intro-paper-wing-shift-y', `${wingShiftY.toFixed(2)}px`);
            });

            if (stackRef.current) {
                stackRef.current.style.opacity = Math.max(
                    0,
                    1 - portalProgress * 0.12
                ).toFixed(4);
                stackRef.current.style.transform =
                    `translate3d(${(settleProgress * 28).toFixed(2)}px, ${(
                        (1 - hingeProgress) * 12 - settleProgress * 2
                    ).toFixed(2)}px, ${(22 - settleProgress * 12).toFixed(2)}px) ` +
                    `scale(${(0.988 + spreadRevealProgress * 0.01 + settleProgress * 0.006).toFixed(4)})`;
            }

            if (finalSpreadRef.current) {
                finalSpreadRef.current.style.opacity = '1';
                finalSpreadRef.current.style.transform =
                    `translate3d(${portalTranslateX.toFixed(2)}px, ${(
                        1 - settleProgress + portalTranslateY
                    ).toFixed(2)}px, ${(
                        12 + settleProgress * 12
                    ).toFixed(2)}px) ` +
                    `scale(${(0.988 + settleProgress * 0.022 + portalProgress * 0.05).toFixed(4)})`;
            }

            if (portalPlateRef.current) {
                portalPlateRef.current.style.opacity = (portalProgress * 0.94).toFixed(4);
            }
        },
    }));

    return (
        <div className="hero__intro-book-shell" ref={rootRef} aria-hidden="true">
            <div className="hero__intro-spread-underlay">
                <div className="hero__intro-spread-underlay-page hero__intro-spread-underlay-page--left">
                    {finalLeftPage ? (
                        <img
                            src={finalLeftPage}
                            alt=""
                            draggable="false"
                            className="hero__intro-spread-underlay-image"
                            onError={safeImageStyle}
                        />
                    ) : null}
                </div>
                <div className="hero__intro-spread-underlay-page hero__intro-spread-underlay-page--right">
                    {finalRightPage ? (
                        <img
                            src={finalRightPage}
                            alt=""
                            draggable="false"
                            className="hero__intro-spread-underlay-image"
                            style={{ objectPosition: 'center 18%' }}
                            onError={safeImageStyle}
                        />
                    ) : null}
                </div>
            </div>

            <div className="hero__intro-riffle-stack" ref={stackRef}>
                {layerConfig.map((layer, index) => (
                    <div
                        className="hero__intro-riffle-layer"
                        key={layer.key}
                        ref={(node) => {
                            layerRefs.current[index] = node;
                        }}
                    >
                        <div
                            className={`hero__intro-riffle-paper${layer.isBackface ? ' hero__intro-riffle-paper--backface' : ''}`}
                        >
                            <div className="hero__intro-riffle-sheet">
                                <div className="hero__intro-riffle-segment hero__intro-riffle-segment--base">
                                    {layer.src ? (
                                        <img
                                            src={layer.src}
                                            alt=""
                                            draggable="false"
                                            className="hero__intro-riffle-image hero__intro-riffle-image--base"
                                            style={{ objectPosition: layer.objectPosition }}
                                            onError={safeImageStyle}
                                        />
                                    ) : null}
                                </div>

                                <div className="hero__intro-riffle-segment hero__intro-riffle-segment--wing">
                                    {layer.src ? (
                                        <img
                                            src={layer.src}
                                            alt=""
                                            draggable="false"
                                            className="hero__intro-riffle-image hero__intro-riffle-image--wing"
                                            style={{ objectPosition: layer.objectPosition }}
                                            onError={safeImageStyle}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <span className="hero__intro-riffle-folio">{layer.folio}</span>
                            <span className="hero__intro-riffle-page">{layer.pageNumber}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hero__intro-final-spread" ref={finalSpreadRef}>
                <div className="hero__intro-final-page hero__intro-final-page--left">
                    <div className="hero__intro-final-print">
                        {finalLeftPage ? (
                            <img
                                src={finalLeftPage}
                                alt=""
                                draggable="false"
                                className="hero__intro-final-image"
                                onError={safeImageStyle}
                            />
                        ) : null}
                        <span className="hero__intro-final-folio">Compendium Botanicum</span>
                        <span className="hero__intro-final-page-no">072</span>
                    </div>
                </div>

                <div className="hero__intro-final-page hero__intro-final-page--right">
                    <div className="hero__intro-final-print">
                        {finalRightPage ? (
                            <img
                                src={finalRightPage}
                                alt=""
                                draggable="false"
                                className="hero__intro-final-image"
                                style={{ objectPosition: 'center 18%' }}
                                onError={safeImageStyle}
                            />
                        ) : null}
                        <span className="hero__intro-final-folio hero__intro-final-folio--right">
                            Herbarium Plate
                        </span>
                        <span className="hero__intro-final-page-no">073</span>
                        <div className="hero__intro-final-stamp">Aesop</div>
                        <div className="hero__intro-final-portal-plate" ref={portalPlateRef}>
                            {heroVideoSrc ? (
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    className="hero__intro-final-portal-video"
                                >
                                    <source src={heroVideoSrc} type="video/mp4" />
                                </video>
                            ) : null}
                            <div className="hero__intro-final-portal-overlay" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default HeroIntroFlipBook;
