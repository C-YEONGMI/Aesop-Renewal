import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    { title: 'Lorem Ipsum Dolor', desc: 'Sit amet consectetur.', img: '/images/img2.jpeg' },
    { title: 'Adipiscing Elit Sed', desc: 'Do eiusmod tempor.', img: '/images/img3.jpeg' },
    { title: 'Tempor Incididunt Ut', desc: 'Labore et dolore.', img: '/images/img4.jpeg' },
    { title: 'Magna Aliqua Enim', desc: 'Ad minim veniam.', img: '/images/img5.jpeg' },
    { title: 'Quis Nostrud Exerc', desc: 'Ullamco laboris nisi.', img: '/images/img6.jpeg' },
];

// 각 카드의 [y 키프레임 4개], [rotation 키프레임 4개]
const TRANSFORMS = [
    [[10, 50, -10, 10], [20, -10, -45, 20]],
    [[0, 47.5, -10, 15], [-25, 15, -45, 30]],
    [[0, 52.5, -10, 5], [15, -5, -40, 60]],
    [[0, 50, 30, -80], [20, -10, 60, 5]],
    [[0, 55, -15, 30], [25, -15, 60, 95]],
];

function Section2() {
    const stickyRef = useRef(null);
    const headerRef = useRef(null);
    const cardRefs = useRef([]);

    useGSAP(() => {
        const section = stickyRef.current;
        const header = headerRef.current;
        const cards = cardRefs.current.filter(Boolean);
        if (!section || !header || !cards.length) return;

        const stickyHeight = window.innerHeight * 5;

        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: `+=${stickyHeight}px`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // 배경 텍스트 가로 스크롤
                const maxTranslate = header.offsetWidth - window.innerWidth;
                gsap.set(header, { x: -progress * maxTranslate });

                // 카드 회전 + 이동
                cards.forEach((card, i) => {
                    const delay = i * 0.1125;
                    const cardProgress = Math.max(0, Math.min((progress - delay) * 2, 1));

                    if (cardProgress > 0) {
                        const yPos = TRANSFORMS[i][0];
                        const rotations = TRANSFORMS[i][1];

                        const cardX = gsap.utils.interpolate(25, -650, cardProgress);

                        const yProgress = cardProgress * 3;
                        const yIndex = Math.min(Math.floor(yProgress), yPos.length - 2);
                        const yLerp = yProgress - yIndex;
                        const cardY = gsap.utils.interpolate(yPos[yIndex], yPos[yIndex + 1], yLerp);
                        const cardRotation = gsap.utils.interpolate(rotations[yIndex], rotations[yIndex + 1], yLerp);

                        gsap.set(card, {
                            xPercent: cardX,
                            yPercent: cardY,
                            rotation: cardRotation,
                            opacity: 1,
                        });
                    } else {
                        gsap.set(card, { opacity: 0 });
                    }
                });
            },
        });
    }, { scope: stickyRef });

    return (
        <section className="sticky" ref={stickyRef}>
            <div className="sticky-header" ref={headerRef}>
                <h1>Lorem ipsum dolor sit.</h1>
            </div>

            {CARDS.map((card, i) => (
                <div
                    key={card.title}
                    className="card"
                    ref={el => cardRefs.current[i] = el}
                >
                    <div className="card-img">
                        <img src={card.img} alt={card.title} />
                    </div>
                    <div className="card-content">
                        <div className="card-title"><h2>{card.title}</h2></div>
                        <div className="card-description"><p>{card.desc}</p></div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Section2;
