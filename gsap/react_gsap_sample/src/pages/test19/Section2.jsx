import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const CARDS_DATA = [
    {
        title: 'Lorem Ipsum',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quaerat.',
        img: '/images/img1.jpeg',
        hasMarquee: true,
    },
    {
        title: 'Dolor Sit Amet',
        desc: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        img: '/images/img2.jpeg',
    },
    {
        title: 'Consectetur Adipis',
        desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        img: '/images/img3.jpeg',
    },
    {
        title: 'Sed Do Eiusmod',
        desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        img: '/images/img4.jpeg',
    },
];

const MARQUEE_TEXTS = ['Lorem ipsum dolor sit', 'Amet consectetur adipisicing', 'Elit nostrum quaerat', 'Fugiat voluptate error'];

// 마키 무한 스크롤 애니메이션
function setupMarquee(marqueeEl) {
    const items = gsap.utils.toArray(marqueeEl.querySelectorAll('h1'));
    if (!items.length) return;

    const widths = [];
    const xPercents = [];
    const startX = items[0].offsetLeft;
    const pixelsPerSecond = 100;

    gsap.set(items, {
        xPercent: (i, el) => {
            const w = parseFloat(gsap.getProperty(el, 'width', 'px'));
            widths[i] = w;
            xPercents[i] = (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 + gsap.getProperty(el, 'xPercent');
            return xPercents[i];
        },
    });
    gsap.set(items, { x: 0 });

    const totalWidth =
        items[items.length - 1].offsetLeft +
        (xPercents[items.length - 1] / 100) * widths[items.length - 1] -
        startX +
        items[items.length - 1].offsetWidth * gsap.getProperty(items[items.length - 1], 'scaleX') +
        30;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });

    items.forEach((item, i) => {
        const curX = (xPercents[i] / 100) * widths[i];
        const distanceToStart = item.offsetLeft + curX - startX;
        const distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');

        tl.to(item, {
            xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
            duration: distanceToLoop / pixelsPerSecond,
        }, 0).fromTo(item,
            { xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100 },
            {
                xPercent: xPercents[i],
                duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond,
        );
    });

    tl.progress(1, true).progress(0, true);
}

function Section2() {
    const cardsRef = useRef(null);
    const cardRefs = useRef([]);
    const marqueeRef = useRef(null);
    const contentRevealedRef = useRef({});

    useGSAP(() => {
        if (!cardsRef.current) return;

        const cards = cardRefs.current.filter(Boolean);
        const introCard = cards[0];
        if (!introCard) return;

        // SplitText 적용 (useGSAP 컨텍스트에서 자동 cleanup)
        cards.forEach(card => {
            const titleEl = card.querySelector('.card-title h1');
            if (!titleEl) return;
            const split = new SplitText(titleEl, { type: 'chars', charsClass: 'char', tag: 'div' });
            split.chars.forEach(char => {
                char.innerHTML = `<span>${char.textContent}</span>`;
            });
        });

        // 첫 카드 이미지 초기 상태
        const introImgWrap = introCard.querySelector('.card-img');
        const introImg = introCard.querySelector('.card-img img');
        gsap.set(introImgWrap, { scale: 0.5, borderRadius: '400px' });
        gsap.set(introImg, { scale: 1.5 });

        // 콘텐츠 인/아웃 함수
        const animateIn = (card) => {
            const chars = card.querySelectorAll('.char span');
            const desc = card.querySelector('.card-description');
            gsap.to(chars, { x: '0%', duration: 0.75, ease: 'power4.out' });
            gsap.to(desc, { x: 0, opacity: 1, duration: 0.75, delay: 0.1, ease: 'power4.out' });
        };
        const animateOut = (card) => {
            const chars = card.querySelectorAll('.char span');
            const desc = card.querySelector('.card-description');
            gsap.to(chars, { x: '100%', duration: 0.5, ease: 'power4.out' });
            gsap.to(desc, { x: '40px', opacity: 0, duration: 0.5, ease: 'power4.out' });
        };

        // 1. 첫 카드 이미지 확대 + 마키 페이드아웃 + 텍스트 등장
        const marqueeEl = introCard.querySelector('.card-marquee .marquee');
        ScrollTrigger.create({
            trigger: introCard,
            start: 'top top',
            end: '+=300vh',
            onUpdate: (self) => {
                const progress = self.progress;
                const imgScale = 0.5 + progress * 0.5;
                const borderRadius = 400 - progress * 375;
                const innerImgScale = 1.5 - progress * 0.5;

                gsap.set(introImgWrap, { scale: imgScale, borderRadius: borderRadius + 'px' });
                gsap.set(introImg, { scale: innerImgScale });

                // 마키 페이드아웃 (null 체크 + clamp)
                if (marqueeEl) {
                    const fadeProgress = Math.min(Math.max((imgScale - 0.5) / 0.25, 0), 1);
                    gsap.set(marqueeEl, { opacity: 1 - fadeProgress });
                }

                // 텍스트 등장/숨김
                if (progress >= 1 && !contentRevealedRef.current[0]) {
                    contentRevealedRef.current[0] = true;
                    animateIn(introCard);
                }
                if (progress < 1 && contentRevealedRef.current[0]) {
                    contentRevealedRef.current[0] = false;
                    animateOut(introCard);
                }
            },
        });

        // 2~5. 카드별 ScrollTrigger (한 번의 forEach로 통합)
        cards.forEach((card, i) => {
            const isLast = i === cards.length - 1;

            // pin (스티키)
            ScrollTrigger.create({
                trigger: card,
                start: 'top top',
                end: isLast ? '+=100vh' : 'top top',
                endTrigger: isLast ? null : cards[cards.length - 1],
                pin: true,
                pinSpacing: isLast,
            });

            // 이전 카드 축소/페이드아웃
            if (!isLast) {
                const wrapper = card.querySelector('.card-wrapper');
                ScrollTrigger.create({
                    trigger: cards[i + 1],
                    start: 'top bottom',
                    end: 'top top',
                    onUpdate: (self) => {
                        gsap.set(wrapper, {
                            scale: 1 - self.progress * 0.25,
                            opacity: 1 - self.progress,
                        });
                    },
                });
            }

            // 후속 카드: 이미지 축소 + borderRadius + 텍스트 등장
            if (i > 0) {
                const img = card.querySelector('.card-img img');
                const imgContainer = card.querySelector('.card-img');
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top bottom',
                    end: 'top top',
                    onUpdate: (self) => {
                        gsap.set(img, { scale: 2 - self.progress });
                        gsap.set(imgContainer, { borderRadius: 150 - self.progress * 125 + 'px' });
                    },
                });

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top top',
                    onEnter: () => animateIn(card),
                    onLeaveBack: () => animateOut(card),
                });
            }
        });

        // 6. 마키 애니메이션
        if (marqueeRef.current) {
            setupMarquee(marqueeRef.current);
        }
    }, { scope: cardsRef });

    return (
        <section className="cards" ref={cardsRef}>
            {CARDS_DATA.map((card, i) => (
                <div
                    key={card.title}
                    className="card"
                    ref={el => cardRefs.current[i] = el}
                >
                    {/* 마키 (첫 카드만) */}
                    {card.hasMarquee && (
                        <div className="card-marquee">
                            <div className="marquee" ref={marqueeRef}>
                                {MARQUEE_TEXTS.map(text => (
                                    <h1 key={text}>{text}</h1>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="card-wrapper">
                        <div className="card-content">
                            <div className="card-title">
                                <h1>{card.title}</h1>
                            </div>
                            <div className="card-description">
                                <p>{card.desc}</p>
                            </div>
                        </div>
                        <div className="card-img">
                            <img src={card.img} alt={card.title} />
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Section2;
