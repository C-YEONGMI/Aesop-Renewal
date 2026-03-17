import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MoreBox from '../btn/MoreBox';
import GNB_Logo from '../../../assets/GNB_Logo.svg?react';
import './OfficialExclusiveSection.scss';

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
    {
        frameClass: 'official-exclusive__img official-exclusive__img--1',
        mediaClass: 'official-exclusive__media official-exclusive__media--1',
        src: 'https://www.figma.com/api/mcp/asset/0a176888-70f6-4590-a04c-6f75d5d0a17d',
        alt: 'Aesop product visual 1',
    },
    {
        frameClass: 'official-exclusive__img official-exclusive__img--2',
        mediaClass: 'official-exclusive__media official-exclusive__media--2',
        src: 'https://www.figma.com/api/mcp/asset/da8d1fd1-5cee-475f-96ba-4425218a7e73',
        alt: 'Aesop product visual 2',
    },
    {
        frameClass: 'official-exclusive__img official-exclusive__img--3',
        mediaClass: 'official-exclusive__media official-exclusive__media--3',
        src: 'https://www.figma.com/api/mcp/asset/ef17e9a5-4374-4870-8020-1d3ca8cf4f0e',
        alt: 'Aesop product visual 3',
    },
    {
        frameClass: 'official-exclusive__img official-exclusive__img--4',
        mediaClass: 'official-exclusive__media official-exclusive__media--4',
        src: 'https://www.figma.com/api/mcp/asset/91a8179a-e801-481b-aa4e-e62b8416ad7b',
        alt: 'Aesop product visual 4',
    },
    {
        frameClass: 'official-exclusive__img official-exclusive__img--5',
        mediaClass: 'official-exclusive__media official-exclusive__media--5',
        src: 'https://www.figma.com/api/mcp/asset/cd3585f7-c3c5-44b5-b7d8-35ddf27deac1',
        alt: 'Aesop product visual 5',
    },
    {
        frameClass: 'official-exclusive__img official-exclusive__img--6',
        mediaClass: 'official-exclusive__media official-exclusive__media--6',
        src: 'https://www.figma.com/api/mcp/asset/141d03de-9901-4fa8-8ed2-b31df335cb3f',
        alt: 'Aesop product visual 6',
    },
];

const COPY = {
    title: 'Official Online Exclusive',
    headline: '\uACF5\uC2DD \uC628\uB77C\uC778 \uBAB0\uB9CC\uC758 \uD2B9\uBCC4\uD55C \uC11C\uBE44\uC2A4',
    meta: '\uBB34\uB8CC \uBC30\uC1A1 \uBC0F \uBC18\uD488 \u00B7 \uC2DC\uADF8\uB2C8\uCC98 \uCF54\uD2BC\uBC31 \uD3EC\uC7A5 \u00B7 \uB9DE\uCDA4\uD615 \uC0D8\uD50C',
    body: '\uBB34\uB8CC \uBC30\uC1A1\uACFC \uBC18\uD488, \uC0D8\uD50C \uC99D\uC815, \uAE30\uD504\uD2B8 \uD3EC\uC7A5 \uC11C\uBE44\uC2A4\uAE4C\uC9C0\n\uACF5\uC2DD\uBAB0\uC5D0\uC11C\uB9CC \uACBD\uD5D8\uD560 \uC218 \uC788\uB294 \uC138\uC2EC\uD55C \uBC30\uB824\uB97C \uB9CC\uB098\uBCF4\uC138\uC694.',
};

const OfficialExclusiveSection = () => {
    const sectionRef = useRef(null);
    const imgRefs = useRef([]);

    imgRefs.current = [];

    const addToRefs = (element) => {
        if (element && !imgRefs.current.includes(element)) {
            imgRefs.current.push(element);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imgRefs.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.1,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 65%',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="official-exclusive" ref={sectionRef}>
            <div className="official-exclusive__bg-logo" aria-hidden="true">
                <GNB_Logo />
            </div>

            <div className="official-exclusive__inner">
                {HERO_IMAGES.map((image) => (
                    <div className={image.frameClass} key={image.frameClass} ref={addToRefs}>
                        <img className={image.mediaClass} src={image.src} alt={image.alt} />
                    </div>
                ))}

                <div className="official-exclusive__content">
                    <div className="official-exclusive__copy">
                        <h2 className="official-exclusive__title montage-48">{COPY.title}</h2>

                        <div className="official-exclusive__text-block">
                            <div className="official-exclusive__headline-block">
                                <p className="official-exclusive__subtitle suit-24-r">{COPY.headline}</p>
                                <p className="official-exclusive__meta suit-12-r">{COPY.meta}</p>
                            </div>

                            <p className="official-exclusive__desc suit-16-r">
                                {COPY.body.split('\n').map((line, index) => (
                                    <React.Fragment key={line}>
                                        {line}
                                        {index < COPY.body.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className="official-exclusive__btn-wrapper">
                        <MoreBox to="/benefits/official" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfficialExclusiveSection;
