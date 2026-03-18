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

const CARD_GAP = 350;

function Section2() {
    const stickyRef = useRef(null);
    const headerRef = useRef(null);
    const cardRefs = useRef([]);
    const descRefs = useRef([]);

    useGSAP(() => {
        const section = stickyRef.current;
        const header = headerRef.current;
        const cards = cardRefs.current.filter(Boolean);
        const descs = descRefs.current.filter(Boolean);
        if (!section || !header || !cards.length) return;

        const stickyHeight = window.innerHeight * 5;

        // 카드 초기 위치
        cards.forEach((card, i) => {
            gsap.set(card, {
                left: `calc(100% + ${i * CARD_GAP}px)`,
                top: '50%',
                yPercent: -50,
                opacity: 1,
            });
        });

        // description 초기 상태: 아래로 숨김 (yPercent: 100 → 카드 밖)
        descs.forEach(desc => {
            gsap.set(desc, { yPercent: 100 });
        });

        const totalTravel = window.innerWidth + cards.length * CARD_GAP + 100;

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

                // 카드 가로 이동
                cards.forEach((card, i) => {
                    gsap.set(card, { x: -progress * totalTravel });

                    // 각 카드의 description 슬라이드 업
                    const desc = descs[i];
                    if (desc) {
                        // 카드가 화면 중앙 근처에 올 때 description 올라옴
                        const cardDelay = (i * CARD_GAP) / totalTravel;
                        const showStart = cardDelay + 0.15;
                        const showEnd = showStart + 0.1;
                        const descProgress = Math.min(Math.max((progress - showStart) / (showEnd - showStart), 0), 1);
                        gsap.set(desc, { yPercent: 100 - descProgress * 100 });
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
                    </div>
                    <div
                        className="card-description"
                        ref={el => descRefs.current[i] = el}
                    >
                        <p>{card.desc}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Section2;
