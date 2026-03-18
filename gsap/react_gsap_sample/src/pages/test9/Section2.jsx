import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const cardData = [
    { id: "card-1", title: "Lorem Ipsum", desc: "Dolor sit amet consectetur adipiscing.", img: "/images/img1.jpeg" },
    { id: "card-2", title: "Sed Eiusmod", desc: "Tempor incididunt ut labore et dolore.", img: "/images/img2.jpeg" },
    { id: "card-3", title: "Magna Aliqua", desc: "Ut enim ad minim veniam quis nostrud.", img: "/images/img3.jpeg" },
    { id: "card-4", title: "Exercitation", desc: "Ullamco laboris nisi ut aliquip ex ea.", img: "/images/img5.jpeg" },
];

function Section2() {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    const innerRefs = useRef([]);

    useGSAP(() => {
        const cards = cardRefs.current.filter(Boolean);
        const inners = innerRefs.current.filter(Boolean);
        if (!cards.length) return;

        cards.forEach((card, i) => {
            const isLastCard = i === cards.length - 1;
            const inner = inners[i];

            if (!isLastCard && inner) {
                // CSS 'position: sticky'가 고정 역할을 완벽하게 담당하므로,
                // GSAP pin은 쓰지 않습니다. 대신 다음 카드가 올라올 때 기존 카드가
                // 부드럽게 스케일이 작아지고 살짝 어두워지는 효과(Stacking UI)만 담당합니다.
                gsap.to(inner, {
                    scale: 0.9,       // 점점 작아짐
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top top",         // 이 카드가 상단에 닿을 때 시작
                        endTrigger: cards[i + 1], // 다음 카드가 상단에 닿을 때 끝
                        end: "top top",
                        scrub: 1,                 // 스무스(관성) 값
                    },
                });
            }
        });
    }, { scope: sectionRef });

    return (
        <section className="cards" ref={sectionRef}>
            {cardData.map((data, i) => (
                <div
                    className="card"
                    id={data.id}
                    key={data.id}
                    ref={el => cardRefs.current[i] = el}
                    style={{ paddingTop: `calc(10vh + ${i * 40}px)` }} // 맨 위로 붙을 때 카드마다 약간씩 아래에 스택을 쌓기 위함
                >
                    <div className="card-inner" ref={el => innerRefs.current[i] = el}>
                        <div className="card-content">
                            <h1>{data.title}</h1>
                            <p>{data.desc}</p>
                        </div>
                        <div className="card-img">
                            <img src={data.img} alt={data.title} />
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Section2;
