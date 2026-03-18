import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section2() {
    const sectionRef = useRef(null);
    const boxRefs = useRef([]);

    // 자식 요소들의 ref를 수집하기 위한 함수
    const addToRefs = (el) => {
        if (el && !boxRefs.current.includes(el)) {
            boxRefs.current.push(el);
        }
    };

    useGSAP(() => {
        // Section2 요소에 도달했을 때(top 80%) 아래에서 위로(y축) 이동하며 나타나는 등장 애니메이션
        gsap.from(boxRefs.current, {
            y: 200, // 처음에 아래로 200px 내려간 상태에서
            opacity: 0, // 투명한 상태
            duration: 1,
            stagger: 0.3, // 0.3초 간격으로 차례대로 등장!
            ease: 'back.out(1.2)', // 살짝 튕기는 효과
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%', // Section2의 맨 위부분이 화면의 80% 정도(아래쪽)에 왔을 때 시작
                toggleActions: 'play none none reverse', // 들어올 때 실행, 뒤로가면 다시 역재생
            },
        });
    }, { scope: sectionRef });

    return (
        <div id="section2" className="con con2" ref={sectionRef}>
            <div className="inner">
                <h2>Test5 - 스크롤 도달 시 순차적 등장</h2>
                <p className="desc">스크롤을 내려서 이 영역에 도착하면, 박스들이 순서대로 Y축으로 통통 튀어 올라옵니다.</p>
                <div className="gallery-container">
                    <div className="img-box" ref={addToRefs}>1번 박스</div>
                    <div className="img-box item-2" ref={addToRefs}>2번 박스</div>
                    <div className="img-box item-3" ref={addToRefs}>3번 박스</div>
                </div>
            </div>
        </div>
    );
}

export default Section2;
