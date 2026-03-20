import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CenterImage from '../../../assets/about_texture.png';
import ParallaxOne from '../../../assets/Configuration_bodycleanser.png';
import ParallaxTwo from '../../../assets/pnav_home_living.png';
import ParallaxThree from '../../../assets/Configuration_Perfume.png';
import ParallaxFour from '../../../assets/Configuration_HandCream.png';
import './RitualNotesSection.scss';

gsap.registerPlugin(ScrollTrigger);

const SECTION_SCROLL_DISTANCE = 1800;
const PARALLAX_ITEMS = [
    {
        src: ParallaxOne,
        alt: 'Aesop body cleanser ritual',
        modifier: 'left-top',
        startY: 320,
        endY: -48,
        startScale: 0.88,
        rotate: -8,
    },
    {
        src: ParallaxTwo,
        alt: 'Aesop home ritual',
        modifier: 'right-top',
        startY: 360,
        endY: -72,
        startScale: 0.84,
        rotate: 7,
    },
    {
        src: ParallaxThree,
        alt: 'Aesop fragrance ritual',
        modifier: 'left-bottom',
        startY: 420,
        endY: -82,
        startScale: 0.9,
        rotate: -6,
    },
    {
        src: ParallaxFour,
        alt: 'Aesop hand care ritual',
        modifier: 'right-bottom',
        startY: 460,
        endY: -96,
        startScale: 0.86,
        rotate: 9,
    },
];

const RitualNotesSection = () => {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const centerFrameRef = useRef(null);
    const centerImageRef = useRef(null);
    const cardRefs = useRef([]);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            const cards = cardRefs.current.filter(Boolean);

            if (!cards.length || !centerFrameRef.current || !centerImageRef.current) {
                return;
            }

            const resetState = () => {
                gsap.set(centerFrameRef.current, {
                    scale: 0.68,
                    borderRadius: 24,
                    transformOrigin: 'center center',
                    force3D: true,
                });
                gsap.set(centerImageRef.current, {
                    scale: 1.18,
                    transformOrigin: 'center center',
                    force3D: true,
                });

                cards.forEach((card) => {
                    gsap.set(card, {
                        y: Number(card.dataset.startY),
                        opacity: 0,
                        scale: Number(card.dataset.startScale),
                        rotation: Number(card.dataset.rotate),
                        force3D: true,
                    });
                });
            };

            const createTimeline = (centerScale) => {
                resetState();

                return gsap
                    .timeline({
                        defaults: { ease: 'none' },
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top top',
                            end: `+=${SECTION_SCROLL_DISTANCE}`,
                            scrub: 0.9,
                            pin: stageRef.current,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                            onRefreshInit: resetState,
                        },
                    })
                    .to(
                        centerFrameRef.current,
                        {
                            scale: centerScale,
                            borderRadius: 0,
                            duration: 1,
                        },
                        0
                    )
                    .to(
                        centerImageRef.current,
                        {
                            scale: 1,
                            duration: 1,
                        },
                        0
                    )
                    .to(
                        cards,
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            rotation: 0,
                            stagger: 0.08,
                            duration: 0.62,
                        },
                        0.16
                    )
                    .to(
                        cards,
                        {
                            y: (_, target) => Number(target.dataset.endY),
                            stagger: 0.05,
                            duration: 0.38,
                        },
                        0.62
                    );
            };

            mm.add('(min-width: 768px)', () => {
                const timeline = createTimeline(2.15);
                return () => timeline.kill();
            });

            mm.add('(max-width: 767px)', () => {
                const timeline = createTimeline(1.55);
                return () => timeline.kill();
            });
        }, sectionRef);

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    return (
        <section className="ritual-notes" ref={sectionRef}>
            <div className="ritual-notes__stage" ref={stageRef}>
                <div className="ritual-notes__backdrop" aria-hidden="true" />

                <div className="ritual-notes__center-shell">
                    <figure className="ritual-notes__center-frame" ref={centerFrameRef}>
                        <img
                            src={CenterImage}
                            alt="Aesop editorial ritual visual"
                            className="ritual-notes__center-image"
                            ref={centerImageRef}
                        />
                    </figure>
                </div>

                <div className="ritual-notes__gallery" aria-hidden="true">
                    {PARALLAX_ITEMS.map((item, index) => (
                        <figure
                            key={item.alt}
                            className={`ritual-notes__card ritual-notes__card--${item.modifier}`}
                            ref={(node) => {
                                cardRefs.current[index] = node;
                            }}
                            data-start-y={item.startY}
                            data-end-y={item.endY}
                            data-start-scale={item.startScale}
                            data-rotate={item.rotate}
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="ritual-notes__card-image"
                            />
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RitualNotesSection;
