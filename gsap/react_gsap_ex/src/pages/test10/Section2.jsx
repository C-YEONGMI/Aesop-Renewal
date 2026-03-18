import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section2() {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    useGSAP(() => {
        // 스크롤 방향에 따라 카드가 나타나는 애니메이션
        gsap.from(cardRefs.current, {
            y: 150,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'back.out(1.5)',
            scrollTrigger: {
                trigger: sectionRef.current, // ref로 명시
                start: 'top 70%',
                toggleActions: 'play none none reverse', // 들어올 때 플레이, 뒤로 돌아갈 때 리버스
            }
        });
    }, { scope: sectionRef });

    return (
        <div id="section2" className="con con2" ref={sectionRef}>
            <div className="inner">
                <h2>Test10 - ToggleActions (Play & Reverse)</h2>
                <p className="desc">스크롤을 올리면 카드가 다시 초기 상태로 되돌아갑니다. (Reverse)</p>
                <div className="card-container">
                    <div ref={addToRefs} className="info-card">Service 1</div>
                    <div ref={addToRefs} className="info-card">Service 2</div>
                    <div ref={addToRefs} className="info-card">Service 3</div>
                </div>
            </div>
        </div>
    );
}

export default Section2;
