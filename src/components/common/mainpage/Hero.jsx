import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../../../assets/Hero_MP4.mp4';
import HeroAesop from '../../../assets/Hero_Aesop.svg?react';
import HeroRitual from '../../../assets/Hero_Ritual.svg?react';
import './Hero.scss';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const contentRef = useRef(null);
    const aesopRef = useRef(null);
    const ritualRef = useRef(null);
    const flightRef = useRef(null);

    useLayoutEffect(() => {
        const headerLogo = document.querySelector('[data-header-logo]');

        if (
            !headerLogo ||
            !sectionRef.current ||
            !stageRef.current ||
            !contentRef.current ||
            !aesopRef.current ||
            !ritualRef.current ||
            !flightRef.current
        ) {
            return undefined;
        }

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

            gsap.fromTo(
                contentRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.1, ease: 'power2.out', delay: 0.35 }
            );

            gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                    invalidateOnRefresh: true,
                    onRefreshInit: measureFlightPath,
                    onRefresh: measureFlightPath,
                },
            })
                .to(aesopRef.current, { opacity: 0, duration: 0.12 }, 0)
                .to(flightRef.current, { opacity: 1, duration: 0.12 }, 0)
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
                .to(flightRef.current, { opacity: 0, duration: 0.18 }, 9.7)
                .to(headerLogo, { opacity: 1, duration: 0.24 }, 9.92)
                .to(holdState, { value: 1, duration: 1.4 }, 10.24);
        }, sectionRef);

        return () => {
            gsap.set(headerLogo, { clearProps: 'opacity' });
            ctx.revert();
        };
    }, []);

    return (
        <section className="hero" ref={sectionRef}>
            <div className="hero__stage" ref={stageRef}>
                <div className="hero__bg">
                    <video autoPlay muted loop playsInline className="hero__video">
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

                <div className="hero__wordmark-flight" ref={flightRef} aria-hidden="true">
                    <HeroAesop />
                </div>
            </div>
        </section>
    );
};

export default Hero;
