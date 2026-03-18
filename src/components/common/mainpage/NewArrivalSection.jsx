import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NewArrivalGif from '../../../assets/New_R.gif';
import NewArrivalThumb1 from '../../../assets/New_S1.png';
import NewArrivalThumb2 from '../../../assets/New_S2.png';
import More from '../btn/more';
import './NewArrivalSection.scss';

gsap.registerPlugin(ScrollTrigger);

const NewArrivalSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const visualRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 42 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 72%',
                    },
                }
            );

            gsap.fromTo(
                visualRef.current,
                { opacity: 0, scale: 0.96 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 72%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="new-arrival" ref={sectionRef} data-name="new arrival" data-node-id="530:1772">
            <div className="new-arrival__inner">
                <div className="new-arrival__content" ref={contentRef}>
                    <div className="new-arrival__header" data-node-id="530:1783">
                        <h2 className="new-arrival__title montage-48" data-node-id="530:1784">
                            New Arrival
                        </h2>
                        <div className="new-arrival__more-wrapper" data-node-id="530:1785">
                            <More text="more" to="/product/Above%20Us%20Steorra" />
                        </div>
                    </div>

                    <div className="new-arrival__thumb-strip" data-node-id="530:1775">
                        <div className="new-arrival__thumb" data-node-id="530:1776">
                            <img
                                src={NewArrivalThumb1}
                                alt="Above Us, Steorra bottle detail"
                                className="new-arrival__thumb-image"
                            />
                        </div>
                        <div className="new-arrival__thumb" data-node-id="530:1777">
                            <img
                                src={NewArrivalThumb2}
                                alt="Above Us, Steorra in-situ fragrance image"
                                className="new-arrival__thumb-image"
                            />
                        </div>
                    </div>

                    <div className="new-arrival__info" data-node-id="530:1778">
                        <div className="new-arrival__info-head" data-node-id="530:1779">
                            <h3 className="new-arrival__name montage-30" data-node-id="530:1780">
                                Above Us, Steorra
                            </h3>
                            <p className="new-arrival__type montage-24" data-node-id="530:1781">
                                Eau de Parfum
                            </p>
                        </div>
                        <p className="new-arrival__desc suit-18-r" data-node-id="530:1782">
                            프랑킨센스, 라다넘, 바닐라 빈이 어우러져 앰버의 깊고 풍부한 향을 완성하고, 상쾌하고 시트러스에 가까운 스파이스 향을 지닌 과감한
                            <br />
                            카다멈의 궤적이 조화롭게 어우러지는 향수
                        </p>
                    </div>
                </div>

                <div className="new-arrival__visual" ref={visualRef} data-node-id="530:1773">
                    <img
                        src={NewArrivalGif}
                        alt="Above Us, Steorra fragrance campaign animation"
                        className="new-arrival__visual-media"
                    />
                </div>
            </div>
        </section>
    );
};

export default NewArrivalSection;
