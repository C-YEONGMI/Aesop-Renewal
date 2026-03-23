import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../../../assets/Hero_MP4.mp4';
import HeroAesop from '../../../assets/Hero_Aesop.svg?react';
import HeroRitual from '../../../assets/Hero_Ritual.svg?react';
import HeaderLogo from '../../../assets/GNB_Logo.svg?react';
import './Hero.scss';
import HeroIntroFlipBook from './hero-intro/HeroIntroFlipBook';
import {
    HERO_INTRO_ASSETS,
    HERO_INTRO_DURATION_SECONDS,
    HERO_INTRO_PORTAL,
    HERO_INTRO_SEGMENTS,
    HERO_INTRO_SESSION_KEY,
    clamp01,
    easeInOutCubic,
    easeOutCubic,
    progressBetween,
} from './hero-intro/heroIntroConfig';

gsap.registerPlugin(ScrollTrigger);

const getInitialIntroState = () => {
    if (typeof window === 'undefined') {
        return {
            introComplete: false,
            reducedMotion: false,
        };
    }

    const reducedMotion =
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const sessionComplete =
        window.sessionStorage.getItem(HERO_INTRO_SESSION_KEY) === 'true';

    return {
        introComplete: reducedMotion || sessionComplete,
        reducedMotion,
    };
};

const supportsWebGL = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    try {
        const testCanvas = document.createElement('canvas');
        return Boolean(
            testCanvas.getContext('webgl') ||
                testCanvas.getContext('experimental-webgl')
        );
    } catch {
        return false;
    }
};

const Hero = () => {
    const initialIntroStateRef = useRef(getInitialIntroState());
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const heroVideoRef = useRef(null);
    const contentRef = useRef(null);
    const aesopRef = useRef(null);
    const ritualRef = useRef(null);
    const flightRef = useRef(null);
    const flightShellRef = useRef(null);
    const flightAesopRef = useRef(null);
    const flightLogoRef = useRef(null);
    const introCanvasRef = useRef(null);
    const introSpreadRef = useRef(null);
    const introSceneRef = useRef(null);
    const introFlipBookRef = useRef(null);
    const hasCompletedLogoHandoffRef = useRef(false);
    const collapseDistanceRef = useRef(0);
    const introCompletionRef = useRef(initialIntroStateRef.current.introComplete);
    const progressRef = useRef(
        initialIntroStateRef.current.introComplete ? 1 : 0
    );
    const introTweenRef = useRef(null);
    const [isHandoffComplete, setIsHandoffComplete] = useState(false);
    const [isIntroComplete, setIsIntroComplete] = useState(
        initialIntroStateRef.current.introComplete
    );
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        initialIntroStateRef.current.reducedMotion
    );
    const [isIntroFallback, setIsIntroFallback] = useState(false);
    const [isIntroSceneReady, setIsIntroSceneReady] = useState(false);

    const isIntroActive = !isIntroComplete && !prefersReducedMotion;

    const syncIntroVisuals = (nextProgress) => {
        const introHost = sectionRef.current;

        if (!introHost) {
            return;
        }

        const progress = clamp01(nextProgress);
        const coverProgress = easeOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.cover)
        );
        const hingeProgress = easeInOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.hinge)
        );
        const riffleProgress = easeInOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.pageRiffle)
        );
        const settleProgress = easeOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.spreadSettle)
        );
        const portalProgress = easeInOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.portal)
        );
        const coverLiftProgress = easeInOutCubic(progressBetween(progress, 0.06, 0.42));
        const pageFanProgress = easeOutCubic(progressBetween(progress, 0.28, 0.74));
        const primaryPageTurnProgress = easeInOutCubic(
            progressBetween(progress, 0.32, 0.6)
        );
        const secondaryPageTurnProgress = easeInOutCubic(
            progressBetween(progress, 0.42, 0.72)
        );
        const spreadSettleProgress = easeOutCubic(
            progressBetween(progress, 0.56, 0.9)
        );
        const spreadWidth = introSpreadRef.current?.offsetWidth ?? 0;
        const spreadHeight = introSpreadRef.current?.offsetHeight ?? 0;
        const portalOffsetX =
            spreadWidth *
            (HERO_INTRO_PORTAL.left + HERO_INTRO_PORTAL.width * 0.5 - 0.5);
        const portalOffsetY =
            spreadHeight *
            (HERO_INTRO_PORTAL.top + HERO_INTRO_PORTAL.height * 0.5 - 0.5);
        const zoomScale = 1 + portalProgress * 2.45;

        introHost.style.setProperty('--hero-intro-progress', progress.toFixed(4));
        introHost.style.setProperty(
            '--hero-intro-cover-progress',
            coverProgress.toFixed(4)
        );
        introHost.style.setProperty(
            '--hero-intro-opening-progress',
            hingeProgress.toFixed(4)
        );
        introHost.style.setProperty(
            '--hero-intro-botanical-progress',
            riffleProgress.toFixed(4)
        );
        introHost.style.setProperty(
            '--hero-intro-hold-progress',
            settleProgress.toFixed(4)
        );
        introHost.style.setProperty('--hero-intro-exit-progress', portalProgress.toFixed(4));
        introHost.style.setProperty(
            '--hero-intro-cover-lift-progress',
            coverLiftProgress.toFixed(4)
        );
        introHost.style.setProperty(
            '--hero-intro-page-fan-progress',
            pageFanProgress.toFixed(4)
        );
        introHost.style.setProperty(
            '--hero-intro-page-turn-primary',
            primaryPageTurnProgress.toFixed(4)
        );
        introHost.style.setProperty(
            '--hero-intro-page-turn-secondary',
            secondaryPageTurnProgress.toFixed(4)
        );
        introHost.style.setProperty(
            '--hero-intro-spread-settle-progress',
            spreadSettleProgress.toFixed(4)
        );
        introHost.style.setProperty(
            '--hero-intro-scene-visibility',
            Math.max(hingeProgress * 0.8, riffleProgress * 0.9, settleProgress * 0.95).toFixed(
                4
            )
        );
        introHost.style.setProperty('--hero-intro-zoom-scale', zoomScale.toFixed(4));
        introHost.style.setProperty(
            '--hero-intro-exit-x',
            `${(-portalOffsetX * portalProgress * zoomScale).toFixed(2)}px`
        );
        introHost.style.setProperty(
            '--hero-intro-exit-y',
            `${(-portalOffsetY * portalProgress * zoomScale).toFixed(2)}px`
        );

        introSceneRef.current?.setProgress(progress);
        introFlipBookRef.current?.syncToProgress(progress);
    };

    const finalizeIntro = ({ persistSession = true } = {}) => {
        if (introCompletionRef.current) {
            return;
        }

        introCompletionRef.current = true;
        progressRef.current = 1;
        introTweenRef.current?.kill();
        introTweenRef.current = null;
        syncIntroVisuals(1);
        introSceneRef.current?.setActive(false);
        setIsIntroComplete(true);

        if (persistSession && typeof window !== 'undefined') {
            window.sessionStorage.setItem(HERO_INTRO_SESSION_KEY, 'true');
        }

        window.requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
    };

    const applyIntroProgress = (nextProgress) => {
        const progress = clamp01(nextProgress);
        progressRef.current = progress;
        syncIntroVisuals(progress);

        if (progress >= 0.998 && !introCompletionRef.current) {
            finalizeIntro();
        }
    };

    useLayoutEffect(() => {
        if (!isHandoffComplete) {
            return undefined;
        }

        const collapseDistance = collapseDistanceRef.current;

        if (collapseDistance > 0) {
            window.scrollTo({
                top: Math.max(window.scrollY - collapseDistance, 0),
                left: 0,
                behavior: 'auto',
            });
        }

        ScrollTrigger.refresh();
        collapseDistanceRef.current = 0;

        return undefined;
    }, [isHandoffComplete]);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return undefined;
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleChange = (event) => {
            setPrefersReducedMotion(event.matches);

            if (event.matches && !introCompletionRef.current) {
                finalizeIntro({ persistSession: false });
            }
        };

        setPrefersReducedMotion(mediaQuery.matches);

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);

            return () => {
                mediaQuery.removeEventListener('change', handleChange);
            };
        }

        mediaQuery.addListener(handleChange);

        return () => {
            mediaQuery.removeListener(handleChange);
        };
    }, []);

    useEffect(() => {
        if (!isIntroActive) {
            return undefined;
        }

        const html = document.documentElement;
        const body = document.body;
        const previousHtmlOverflow = html.style.overflow;
        const previousBodyOverflow = body.style.overflow;
        const previousHtmlOverscroll = html.style.overscrollBehavior;
        const previousBodyOverscroll = body.style.overscrollBehavior;

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        html.style.overscrollBehavior = 'none';
        body.style.overscrollBehavior = 'none';

        return () => {
            html.style.overflow = previousHtmlOverflow;
            body.style.overflow = previousBodyOverflow;
            html.style.overscrollBehavior = previousHtmlOverscroll;
            body.style.overscrollBehavior = previousBodyOverscroll;
        };
    }, [isIntroActive]);

    useEffect(() => {
        if (!isIntroActive) {
            return undefined;
        }

        if (!supportsWebGL()) {
            setIsIntroFallback(true);
            setIsIntroSceneReady(false);
            return undefined;
        }

        let isCancelled = false;
        let localScene = null;

        const loadScene = async () => {
            try {
                const { createHeroIntroScene } = await import(
                    './hero-intro/createHeroIntroScene.js'
                );

                if (isCancelled || !introCanvasRef.current) {
                    return;
                }

                localScene = await createHeroIntroScene({
                    canvas: introCanvasRef.current,
                });

                if (isCancelled) {
                    localScene.destroy();
                    return;
                }

                introSceneRef.current = localScene;
                introSceneRef.current.setProgress(progressRef.current);
                introSceneRef.current.setActive(true);
                setIsIntroSceneReady(true);
                setIsIntroFallback(false);
            } catch (error) {
                if (!isCancelled) {
                    console.error('Hero intro scene failed to initialize.', error);
                    setIsIntroSceneReady(false);
                    setIsIntroFallback(true);
                }
            }
        };

        setIsIntroSceneReady(false);
        loadScene();

        return () => {
            isCancelled = true;
            localScene?.destroy();

            if (introSceneRef.current === localScene) {
                introSceneRef.current = null;
            }
        };
    }, [isIntroActive]);

    useEffect(() => {
        if (!isIntroActive) {
            introSceneRef.current?.setActive(false);
            return undefined;
        }

        const tweenState = { value: progressRef.current };

        introTweenRef.current?.kill();
        syncIntroVisuals(progressRef.current);
        introTweenRef.current = gsap.to(tweenState, {
            value: 1,
            duration: HERO_INTRO_DURATION_SECONDS,
            ease: 'none',
            onUpdate: () => {
                applyIntroProgress(tweenState.value);
            },
            onComplete: () => {
                finalizeIntro();
            },
        });

        return () => {
            introTweenRef.current?.kill();
            introTweenRef.current = null;
        };
    }, [isIntroActive]);

    useEffect(() => {
        const videoElement = heroVideoRef.current;

        if (!videoElement) {
            return undefined;
        }

        if (isIntroActive) {
            videoElement.pause();
            videoElement.currentTime = 0;
            return undefined;
        }

        const playPromise = videoElement.play();
        playPromise?.catch(() => {});

        return undefined;
    }, [isIntroActive]);

    useEffect(() => {
        if (!isIntroActive) {
            return undefined;
        }

        const handleResize = () => {
            introSceneRef.current?.resize();
            syncIntroVisuals(progressRef.current);
            ScrollTrigger.refresh();
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isIntroActive]);

    useLayoutEffect(() => {
        const headerElement = document.querySelector('#header');
        const headerLogo = document.querySelector('[data-header-logo]');

        if (
            !headerElement ||
            !headerLogo ||
            !sectionRef.current ||
            !stageRef.current ||
            !contentRef.current ||
            !aesopRef.current ||
            !ritualRef.current ||
            !flightRef.current ||
            !flightShellRef.current ||
            !flightAesopRef.current ||
            !flightLogoRef.current
        ) {
            return undefined;
        }

        headerElement.removeAttribute('data-hero-logo-visible');

        let metrics = {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
        };

        const measureFlightPath = () => {
            const stageRect = stageRef.current.getBoundingClientRect();
            const sourceRect = aesopRef.current.getBoundingClientRect();
            const targetRect = headerLogo.getBoundingClientRect();

            if (
                !sourceRect.width ||
                !sourceRect.height ||
                !targetRect.width ||
                !targetRect.height
            ) {
                return;
            }

            metrics = {
                top: sourceRect.top - stageRect.top,
                left: sourceRect.left - stageRect.left,
                width: sourceRect.width,
                height: sourceRect.height,
                x: targetRect.left - sourceRect.left,
                y: targetRect.top - sourceRect.top,
                scaleX: targetRect.width / sourceRect.width,
                scaleY: targetRect.height / sourceRect.height,
            };

            gsap.set(flightRef.current, {
                top: metrics.top,
                left: metrics.left,
                width: metrics.width,
                height: metrics.height,
            });
        };

        const ctx = gsap.context(() => {
            const holdState = { value: 0 };
            let heroFlightTimeline;

            measureFlightPath();

            gsap.set(headerLogo, { opacity: 0 });
            gsap.set(flightRef.current, {
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                opacity: 0,
                transformOrigin: 'top left',
                force3D: true,
            });
            gsap.set(flightShellRef.current, {
                borderRadius: 0,
                overflow: 'hidden',
            });
            gsap.set(flightAesopRef.current, {
                scale: 1,
                xPercent: 0,
                transformOrigin: 'center center',
                force3D: true,
            });
            gsap.set(flightLogoRef.current, {
                autoAlpha: 0,
                clipPath: 'inset(30% 46% 30% 46% round 999px)',
                scale: 0.92,
                xPercent: 2.5,
                transformOrigin: 'center center',
                force3D: true,
            });

            gsap.fromTo(
                contentRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.1, ease: 'power2.out', delay: 0.35 }
            );

            const finalizeLogoHandoff = () => {
                if (hasCompletedLogoHandoffRef.current) {
                    return;
                }

                hasCompletedLogoHandoffRef.current = true;
                collapseDistanceRef.current = Math.max(
                    sectionRef.current.offsetHeight - stageRef.current.offsetHeight,
                    0
                );
                heroFlightTimeline?.scrollTrigger?.kill();
                heroFlightTimeline?.kill();

                headerElement.setAttribute('data-hero-logo-visible', 'true');
                gsap.set(headerLogo, { clearProps: 'opacity' });
                gsap.set(aesopRef.current, { autoAlpha: 0 });
                gsap.set(ritualRef.current, { autoAlpha: 0 });
                gsap.set(flightRef.current, {
                    x: 0,
                    y: 0,
                    scaleX: 1,
                    scaleY: 1,
                    opacity: 0,
                });
                gsap.set(flightShellRef.current, { clearProps: 'borderRadius' });
                gsap.set(flightAesopRef.current, {
                    clearProps: 'scale,xPercent',
                });
                gsap.set(flightLogoRef.current, {
                    autoAlpha: 0,
                    clipPath: 'inset(30% 46% 30% 46% round 999px)',
                    scale: 0.92,
                    xPercent: 2.5,
                });
                setIsHandoffComplete(true);
            };

            heroFlightTimeline = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                    invalidateOnRefresh: true,
                    onRefreshInit: measureFlightPath,
                    onRefresh: measureFlightPath,
                    onLeave: finalizeLogoHandoff,
                },
            })
                .set(aesopRef.current, { opacity: 0 }, 0)
                .set(flightRef.current, { opacity: 1 }, 0)
                .to(
                    flightRef.current,
                    {
                        x: () => metrics.x,
                        y: () => metrics.y,
                        scaleX: () => metrics.scaleX,
                        scaleY: () => metrics.scaleY,
                        duration: 9.6,
                        ease: 'none',
                        force3D: true,
                    },
                    0.06
                )
                .to(
                    ritualRef.current,
                    {
                        opacity: 0,
                        duration: 9.86,
                        ease: 'none',
                    },
                    0.06
                )
                .to(
                    flightShellRef.current,
                    {
                        borderRadius: 999,
                        duration: 0.52,
                        ease: 'power2.inOut',
                    },
                    9.02
                )
                .to(
                    flightAesopRef.current,
                    {
                        scale: 0.985,
                        xPercent: -0.8,
                        duration: 0.46,
                        ease: 'power2.inOut',
                    },
                    9.04
                )
                .set(flightLogoRef.current, { autoAlpha: 1 }, 9.58)
                .to(
                    flightLogoRef.current,
                    {
                        clipPath: 'inset(0% 0% 0% 0% round 999px)',
                        scale: 1,
                        xPercent: 0,
                        duration: 0.16,
                        ease: 'power2.inOut',
                    },
                    9.58
                )
                .set(headerLogo, { opacity: 1 }, 9.74)
                .set(flightRef.current, { opacity: 0 }, 9.74)
                .to(holdState, { value: 1, duration: 1.4 }, 10.24);
        }, sectionRef);

        return () => {
            headerElement.removeAttribute('data-hero-logo-visible');
            gsap.set(headerLogo, { clearProps: 'opacity' });
            ctx.revert();
        };
    }, []);

    const handleSkipIntro = () => {
        if (!isIntroActive) {
            return;
        }

        introTweenRef.current?.kill();

        const tweenState = {
            value: progressRef.current,
        };

        introTweenRef.current = gsap.to(tweenState, {
            value: 1,
            duration: 0.66,
            ease: 'power3.inOut',
            onUpdate: () => {
                applyIntroProgress(tweenState.value);
            },
            onComplete: () => {
                finalizeIntro();
            },
        });
    };

    return (
        <section
            className={`hero${isHandoffComplete ? ' hero--handoff-complete' : ''}${isIntroActive ? ' hero--intro-active' : ''}`}
            ref={sectionRef}
        >
            <div className="hero__stage" ref={stageRef}>
                <div className="hero__bg">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        ref={heroVideoRef}
                        className="hero__video"
                    >
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    <div className="hero__overlay" />
                </div>

                <div className="hero__content" ref={contentRef}>
                    <div className="hero__wordmark">
                        <span className="hero__wordmark-aesop" ref={aesopRef}>
                            <HeroAesop aria-label="Aesop" />
                        </span>
                        <span className="hero__wordmark-ritual" ref={ritualRef}>
                            <HeroRitual aria-label="Ritual" />
                        </span>
                    </div>
                </div>

                {isIntroActive ? (
                    <div
                        className={`hero__intro${isIntroFallback ? ' hero__intro--fallback' : ''}${isIntroSceneReady ? ' hero__intro--ready' : ''}`}
                    >
                        <div className="hero__intro-atmosphere" aria-hidden="true" />
                        <div className="hero__intro-grain" aria-hidden="true" />

                        <div className="hero__intro-head">
                            <div className="hero__intro-copy">
                                <span className="hero__intro-eyebrow">
                                    Aesop Botanical Archive
                                </span>
                                <p className="hero__intro-instruction">
                                    Opening the botanical folio.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="hero__intro-skip"
                                onClick={handleSkipIntro}
                            >
                                Skip
                            </button>
                        </div>

                        <div className="hero__intro-progress" aria-hidden="true">
                            <span className="hero__intro-progress-track" />
                            <span className="hero__intro-progress-fill" />
                        </div>

                        <div className="hero__intro-viewport">
                            <div className="hero__intro-scene" aria-hidden="true">
                                <canvas ref={introCanvasRef} className="hero__intro-canvas" />
                                {isIntroFallback ? (
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        poster={HERO_INTRO_ASSETS.cover}
                                        className="hero__intro-fallback-video"
                                    >
                                        <source
                                            src={HERO_INTRO_ASSETS.fallbackVideo}
                                            type="video/mp4"
                                        />
                                    </video>
                                ) : null}
                            </div>

                            <div className="hero__intro-cover-shell" aria-hidden="true">
                                <div className="hero__intro-cover-frame">
                                    <img
                                        src={HERO_INTRO_ASSETS.cover}
                                        alt=""
                                        className="hero__intro-cover-image"
                                        draggable="false"
                                        onError={(event) => {
                                            event.currentTarget.style.opacity = '0';
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="hero__intro-spread-shell" ref={introSpreadRef} aria-hidden="true">
                                <div className="hero__intro-spread-frame">
                                    <HeroIntroFlipBook
                                        ref={introFlipBookRef}
                                        heroVideoSrc={heroVideo}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="hero__wordmark-flight" ref={flightRef} aria-hidden="true">
                    <div className="hero__wordmark-flight-shell" ref={flightShellRef}>
                        <span className="hero__wordmark-flight-mark" ref={flightAesopRef}>
                            <HeroAesop />
                        </span>
                        <span
                            className="hero__wordmark-flight-mark hero__wordmark-flight-mark--logo"
                            ref={flightLogoRef}
                        >
                            <HeaderLogo />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
