import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section3() {
    const sectionRef = useRef(null);
    const boxRefs = useRef([]);

    // 자식 요소들의 ref를 수집하기 위한 함수
    const addToRefs = (el) => {
        if (el && !boxRefs.current.includes(el)) {
            boxRefs.current.push(el);
        }
    };

    useGSAP(() => {
        // 초기에 안 보이도록 세팅 (autoAlpha는 opacity와 visibility를 동시에 제어)
        gsap.set(boxRefs.current, { autoAlpha: 0, y: 60 });

        // ScrollTrigger.batch - 여러 요소가 화면에 들어올 때 한꺼번에 처리 (리스트 등장 애니메이션에 유용)
        ScrollTrigger.batch(boxRefs.current, {
            interval: 0.1, // 카드 간 지연시간
            onEnter: (elements) => {
                gsap.to(elements, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    overwrite: true, // 이전 애니메이션이 있다면 덮어쓰기
                });
            },
            onLeaveBack: (elements) => {
                gsap.set(elements, { autoAlpha: 0, y: 60 }); // 스크롤 올려서 안 보이게 되면 다시 초기상태로 숨김
                gsap.killTweensOf(elements);               // 다시 진입할 때를 위해 정리
            },
            start: 'top 85%',
            markers: true, // 배치 확인용 마커
        });

    }, { scope: sectionRef });

    return (
        <div id="section3" className="con con3" ref={sectionRef}>
            <div className="inner">
                <h2>Test5 - ScrollTrigger Batch</h2>
                <p className="desc">화면에 진입하는 요소들을 배열로 받아 일괄(Batch) 애니메이션을 처리합니다.</p>
                <div className="grid-container">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="card" ref={addToRefs} style={{ visibility: 'hidden', opacity: 0 }}>Card {i + 1}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Section3;
