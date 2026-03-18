import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimateText from './AnimateText';

gsap.registerPlugin(ScrollTrigger);

function Section2() {
    const servicesRef = useRef(null);
    const headerRefs = useRef([]);

    useGSAP(() => {
        if (!servicesRef.current) return;

        const headers = headerRefs.current;

        // 1. 헤더가 좌우에서 슬라이드인
        ScrollTrigger.create({
            trigger: servicesRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            onUpdate: (self) => {
                const p = self.progress;
                if (headers[0]) gsap.set(headers[0], { x: `${100 - p * 100}%` });
                if (headers[1]) gsap.set(headers[1], { x: `${-100 + p * 100}%` });
                if (headers[2]) gsap.set(headers[2], { x: `${100 - p * 100}%` });
            },
        });

        // 2. pin 고정 → 위아래 분리 → 축소
        ScrollTrigger.create({
            trigger: servicesRef.current,
            start: 'top top',
            end: `+=${window.innerHeight * 2}`,
            pin: true,
            scrub: 1,
            pinSpacing: false,
            onUpdate: (self) => {
                const progress = self.progress;

                if (progress <= 0.5) {
                    // 0~50%: 1번↓ 3번↑ 분리
                    const yp = progress / 0.5;
                    if (headers[0]) gsap.set(headers[0], { y: `${yp * 100}%` });
                    if (headers[2]) gsap.set(headers[2], { y: `${yp * -100}%` });
                } else {
                    if (headers[0]) gsap.set(headers[0], { y: '100%' });
                    if (headers[2]) gsap.set(headers[2], { y: '-100%' });

                    // 50~100%: 전체 축소
                    const sp = (progress - 0.5) / 0.5;
                    const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
                    const scale = 1 - sp * (1 - minScale);
                    headers.forEach(h => {
                        if (h) gsap.set(h, { scale });
                    });
                }
            },
        });
    }, { scope: servicesRef });

    return (
        <>
            <section className="services" ref={servicesRef}>
                {['WHAT I DO', 'WHAT I DO', 'WHAT I DO'].map((text, i) => (
                    <div
                        key={i}
                        className="services-header"
                        ref={el => headerRefs.current[i] = el}
                    >
                        <h2>{text}</h2>
                    </div>
                ))}
            </section>

            <section className="services-copy">
                <AnimateText>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, quaerat. Voluptate error
                </AnimateText>
            </section>
        </>
    );
}

export default Section2;
