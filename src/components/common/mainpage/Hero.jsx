import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../../../assets/Hero_MP4.mp4';
import HeroAesop from '../../../assets/Hero_Aesop.svg?react';
import HeroRitual from '../../../assets/Hero_Ritual.svg?react';
import HeaderLogo from '../../../assets/GNB_Logo.svg?react';
import './Hero.scss';

gsap.registerPlugin(ScrollTrigger);

const HERO_INTRO_STORAGE_KEY = 'aesop-hero-intro-video-complete-v1';
const HERO_INTRO_VIDEO_PATH = '/Hero-intro.mp4';
const HERO_INTRO_PORTAL_POINT = { x: 0.77, y: 0.46 };
const HERO_INTRO_PORTAL_SCALE = 2.2;

const getInitialIntroVisibility = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const hasSeenIntro = window.sessionStorage.getItem(HERO_INTRO_STORAGE_KEY) === 'true';

    return !prefersReducedMotion && !hasSeenIntro;
};

const Hero = () => {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const bgRef = useRef(null);
    const overlayRef = useRef(null);
    const heroVideoRef = useRef(null);
    const contentRef = useRef(null);
    const aesopRef = useRef(null);
    const ritualRef = useRef(null);
    const flightRef = useRef(null);
    const flightShellRef = useRef(null);
    const flightAesopRef = useRef(null);
    const flightLogoRef = useRef(null);
    const introRef = useRef(null);
    const introVideoRef = useRef(null);
    const introBloomRef = useRef(null);
    const introTintRef = useRef(null);
    const hasCompletedLogoHandoffRef = useRef(false);
    const collapseDistanceRef = useRef(0);
    const hasStartedIntroExitRef = useRef(false);
    const initialIntroVisibleRef = useRef(getInitialIntroVisibility());
    const shouldWaitForHeroInteractionRef = useRef(initialIntroVisibleRef.current);
    const [isHandoffComplete, setIsHandoffComplete] = useState(false);
    const [isIntroVisible, setIsIntroVisible] = useState(initialIntroVisibleRef.current);
    const [isIntroTransitioning, setIsIntroTransitioning] = useState(false);
    const [introVideoSource, setIntroVideoSource] = useState(HERO_INTRO_VIDEO_PATH);

    const pauseHeroVideo = useCallback(() => {
        heroVideoRef.current?.pause();
    }, []);

    const playHeroVideo = useCallback(() => {
        const videoElement = heroVideoRef.current;

        if (!videoElement) {
            return;
        }

        const playPromise = videoElement.play();
        playPromise?.catch(() => {});
    }, []);

    const hideIntroImmediately = useCallback((markAsSeen = true) => {
        if (markAsSeen && typeof window !== 'undefined') {
            window.sessionStorage.setItem(HERO_INTRO_STORAGE_KEY, 'true');
        }

        shouldWaitForHeroInteractionRef.current = markAsSeen;

        hasStartedIntroExitRef.current = true;
        setIsIntroTransitioning(false);
        setIsIntroVisible(false);
    }, []);

    const completeIntro = useCallback(() => {
        if (hasStartedIntroExitRef.current) {
            return;
        }

        hasStartedIntroExitRef.current = true;

        if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(HERO_INTRO_STORAGE_KEY, 'true');
        }

        shouldWaitForHeroInteractionRef.current = false;

        if (!introRef.current) {
            setIsIntroVisible(false);
            setIsIntroTransitioning(false);
            return;
        }

        setIsIntroTransitioning(true);

        const introElement = introRef.current;
        const introBloomElement = introBloomRef.current;
        const introTintElement = introTintRef.current;
        const introVideoElement = introVideoRef.current;
        const bgElement = bgRef.current;
        const overlayElement = overlayRef.current;
        const contentElement = contentRef.current;
        const introRect = introElement.getBoundingClientRect();
        const targetScale = HERO_INTRO_PORTAL_SCALE;
        const targetX = -((HERO_INTRO_PORTAL_POINT.x - 0.5) * introRect.width * targetScale);
        const targetY = -((HERO_INTRO_PORTAL_POINT.y - 0.5) * introRect.height * targetScale);

        gsap.killTweensOf([
            introElement,
            introBloomElement,
            introTintElement,
            introVideoElement,
            bgElement,
            overlayElement,
            contentElement,
        ]);

        gsap.timeline({
            defaults: { ease: 'power3.inOut' },
            onComplete: () => {
                setIsIntroVisible(false);
                setIsIntroTransitioning(false);
                gsap.set([introElement, introBloomElement, introTintElement, introVideoElement, overlayElement], {
                    clearProps: 'all',
                });

                if (bgElement) {
                    gsap.set(bgElement, { clearProps: 'transform' });
                }
            },
        })
            .set(introElement, {
                transformOrigin: '50% 50%',
                willChange: 'transform, opacity',
            })
            .set(introVideoElement, { willChange: 'transform' })
            .set(contentElement, { willChange: 'transform, opacity' })
            .set(introTintElement, { willChange: 'opacity' })
            .set(overlayElement, { willChange: 'opacity' })
            .to(
                introElement,
                {
                    scale: targetScale,
                    x: targetX,
                    y: targetY,
                    duration: 1.34,
                    ease: 'power4.inOut',
                },
                0
            )
            .to(
                introVideoElement,
                {
                    scale: 1.1,
                    duration: 1.34,
                    ease: 'power4.inOut',
                },
                0
            )
            .fromTo(
                overlayElement,
                { opacity: 0.74 },
                {
                    opacity: 1,
                    duration: 1.12,
                    ease: 'power2.out',
                },
                0.02
            )
            .to(
                bgElement,
                {
                    scale: 1,
                    duration: 1.18,
                    ease: 'power3.out',
                },
                0.06
            )
            .to(
                introTintElement,
                {
                    opacity: 0,
                    duration: 0.72,
                    ease: 'power2.out',
                },
                0.42
            )
            .fromTo(
                contentElement,
                { y: 28, opacity: 0.16 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.96,
                    ease: 'power2.out',
                },
                0.3
            )
            .to(
                introBloomElement,
                {
                    opacity: 0.78,
                    duration: 0.66,
                    ease: 'power2.out',
                },
                0.18
            )
            .to(
                introElement,
                {
                    opacity: 0,
                    duration: 0.58,
                    ease: 'power2.out',
                },
                0.72
            )
            .to(
                introBloomElement,
                {
                    opacity: 0,
                    duration: 0.46,
                    ease: 'power2.out',
                },
                0.94
            );
    }, []);

    const handleSkipIntro = useCallback((event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();

        introVideoRef.current?.pause();
        completeIntro();
    }, [completeIntro]);

    const handleIntroVideoError = useCallback(() => {
        if (introVideoSource !== heroVideo) {
            setIntroVideoSource(heroVideo);
            return;
        }

        hideIntroImmediately();
    }, [hideIntroImmediately, introVideoSource]);

    useEffect(() => {
        if (!isIntroVisible) {
            return undefined;
        }

        const html = document.documentElement;
        const body = document.body;
        const previous = {
            htmlOverflow: html.style.overflow,
            bodyOverflow: body.style.overflow,
            htmlOverscroll: html.style.overscrollBehavior,
            bodyOverscroll: body.style.overscrollBehavior,
            bodyTouchAction: body.style.touchAction,
        };

        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        html.style.overscrollBehavior = 'none';
        body.style.overscrollBehavior = 'none';
        body.style.touchAction = 'none';

        return () => {
            html.style.overflow = previous.htmlOverflow;
            body.style.overflow = previous.bodyOverflow;
            html.style.overscrollBehavior = previous.htmlOverscroll;
            body.style.overscrollBehavior = previous.bodyOverscroll;
            body.style.touchAction = previous.bodyTouchAction;
        };
    }, [isIntroVisible]);

    useEffect(() => {
        if (!isIntroVisible || !introVideoRef.current) {
            return undefined;
        }

        pauseHeroVideo();
        hasStartedIntroExitRef.current = false;

        if (bgRef.current) {
            gsap.set(bgRef.current, {
                scale: 1.06,
                transformOrigin: '50% 50%',
            });
        }

        const videoElement = introVideoRef.current;
        const playPromise = videoElement.play();

        if (playPromise?.catch) {
            playPromise.catch(() => {
                hideIntroImmediately(false);
            });
        }

        return () => {
            if (bgRef.current) {
                gsap.set(bgRef.current, { clearProps: 'transform' });
            }
        };
    }, [hideIntroImmediately, isIntroVisible, introVideoSource, pauseHeroVideo]);

    useEffect(() => {
        if (isIntroVisible || isIntroTransitioning) {
            pauseHeroVideo();
            return undefined;
        }

        if (!shouldWaitForHeroInteractionRef.current) {
            playHeroVideo();
            return undefined;
        }

        pauseHeroVideo();

        const stageElement = stageRef.current;
        let hasActivated = false;

        const activateHeroVideo = () => {
            if (hasActivated) {
                return;
            }

            const sectionRect = sectionRef.current?.getBoundingClientRect();

            if (
                !sectionRect ||
                sectionRect.bottom <= 0 ||
                sectionRect.top >= window.innerHeight
            ) {
                return;
            }

            hasActivated = true;
            shouldWaitForHeroInteractionRef.current = false;
            playHeroVideo();
        };

        stageElement?.addEventListener('pointerdown', activateHeroVideo, { passive: true });
        stageElement?.addEventListener('touchstart', activateHeroVideo, { passive: true });
        stageElement?.addEventListener('wheel', activateHeroVideo, { passive: true });
        window.addEventListener('scroll', activateHeroVideo, { passive: true });

        return () => {
            stageElement?.removeEventListener('pointerdown', activateHeroVideo);
            stageElement?.removeEventListener('touchstart', activateHeroVideo);
            stageElement?.removeEventListener('wheel', activateHeroVideo);
            window.removeEventListener('scroll', activateHeroVideo);
        };
    }, [isIntroTransitioning, isIntroVisible, pauseHeroVideo, playHeroVideo]);

    useEffect(
        () => () => {
            pauseHeroVideo();
        },
        [pauseHeroVideo]
    );

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

    return (
        <section
            className={`hero${isHandoffComplete ? ' hero--handoff-complete' : ''}`}
            ref={sectionRef}
        >
            <div className="hero__stage" ref={stageRef}>
                <div className="hero__bg" ref={bgRef}>
                    <video ref={heroVideoRef} muted loop playsInline preload="metadata" className="hero__video">
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    <div className="hero__overlay" ref={overlayRef} />
                </div>

                {isIntroVisible && (
                    <div
                        className={`hero__intro${isIntroTransitioning ? ' hero__intro--transitioning' : ''}`}
                    >
                        <div className="hero__intro-shell" ref={introRef}>
                            <video
                                autoPlay
                                muted
                                playsInline
                                preload="auto"
                                key={introVideoSource}
                                className="hero__intro-video"
                                ref={introVideoRef}
                                onEnded={completeIntro}
                                onError={handleIntroVideoError}
                            >
                                <source src={introVideoSource} type="video/mp4" />
                            </video>
                            <div className="hero__intro-tint" ref={introTintRef} />
                        </div>
                        <div className="hero__intro-bloom" ref={introBloomRef} />
                        <button
                            type="button"
                            className="hero__intro-skip"
                            onClick={handleSkipIntro}
                        >
                            Skip
                        </button>
                    </div>
                )}

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

                <div className="hero__wordmark-flight" ref={flightRef} aria-hidden="true">
                    <div className="hero__wordmark-flight-shell" ref={flightShellRef}>
                        <span className="hero__wordmark-flight-mark" ref={flightAesopRef}>
                            <HeroAesop />
                        </span>
                        <span className="hero__wordmark-flight-mark hero__wordmark-flight-mark--logo" ref={flightLogoRef}>
                            <HeaderLogo />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
