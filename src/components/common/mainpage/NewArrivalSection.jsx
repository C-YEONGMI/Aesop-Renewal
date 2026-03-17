import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import More from '../btn/more';
import './NewArrivalSection.scss';

gsap.registerPlugin(ScrollTrigger);

const NewArrivalSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.new-arrival__left-box',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );
            gsap.fromTo(
                '.new-arrival__right-img',
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="new-arrival" ref={sectionRef}>
            <div className="new-arrival__inner">

                {/* Left Area */}
                <div className="new-arrival__left">
                    <div className="new-arrival__header">
                        <h2 className="new-arrival__title montage-48">New Arrival</h2>
                        <div className="new-arrival__more-wrapper">
                            <More text="more" to="/product/Above%20Us%20Steorra" />
                        </div>
                    </div>

                    <div className="new-arrival__images-small">
                        {/* 350x350 Placeholder 1 */}
                        <div className="new-arrival__img-sm new-arrival__img-sm--1"></div>
                        {/* 350x350 Placeholder 2 */}
                        <div className="new-arrival__img-sm new-arrival__img-sm--2"></div>
                    </div>

                    <div className="new-arrival__info">
                        <h3 className="new-arrival__name montage-30">Above Us, Steorra</h3>
                        <p className="new-arrival__type montage-24">Eau de Parfum</p>
                        <p className="new-arrival__desc suit-18-r">
                            프랑킨센스, 라다넘, 바닐라 빈이 어우러져 앰버의 깊고 풍부한 향을<br />
                            완성하고, 상쾌하고 시트러스에 가까운 스파이스 향을 지닌 과감한<br />
                            카디멈의 궤적이 조화롭게 어우러지는 향수
                        </p>
                    </div>
                </div>

                {/* Right Area */}
                <div className="new-arrival__right">
                    {/* 847x847 Placeholder */}
                    <div className="new-arrival__img-lg"></div>
                </div>

            </div>
        </section>
    );
};

export default NewArrivalSection;
