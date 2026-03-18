import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section1() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        // 가로 스크롤 애니메이션
        // containerRef 안의 자식 요소들을 패널 배열로 수집
        const panels = gsap.utils.toArray(containerRef.current.children);

        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,           // 섹션을 화면에 고정
                scrub: 1,            // 마우스 휠과 부드럽게 동기화
                snap: 1 / (panels.length - 1), // 패널 단위로 스냅
                // end를 패널 수만큼 길게 주어 스크롤 여유 확보
                end: () => '+=' + containerRef.current.offsetWidth
            }
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef} style={{ overflowX: 'hidden' }}>
            {/* 가로로 움직일 긴 컨테이너 */}
            <div className="h-container" ref={containerRef} style={{ display: 'flex', width: '300vw', height: '100vh' }}>
                <div className="h-panel p1 flex-center">
                    <h2>Test10 - 가로 스크롤(Horizontal Scroll)</h2>
                    <p className="desc">첫번째 패널</p>
                </div>
                <div className="h-panel p2 flex-center">
                    <h2>두 번째 패널</h2>
                </div>
                <div className="h-panel p3 flex-center">
                    <h2>세 번째 패널</h2>
                </div>
            </div>
        </div>
    );
}

export default Section1;
