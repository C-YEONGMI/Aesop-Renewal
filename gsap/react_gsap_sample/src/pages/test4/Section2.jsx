import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);



function Section2() {
    const marqueeRef = useRef(null);
    const innerRef = useRef(null);
    const partsRef = useRef([]);
    const arrowsRef = useRef([]);

    useGSAP(() => {
        // 불필요한 null 참조를 방지하기 위해 필터링
        const parts = partsRef.current.filter(Boolean);
        const arrows = arrowsRef.current.filter(Boolean);

        gsap.set(innerRef.current, { xPercent: -50 });

        const tween = gsap.to(parts, {
            xPercent: -100,
            repeat: -1,
            duration: 5,
            ease: "linear"
        }).totalProgress(0.5);

        // Vanilla Javascript의 window scroll 이벤트 대신 GSAP ScrollTrigger 활용
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                // self.direction: 1 (스크롤 내림), -1 (스크롤 올림)
                const isScrollingDown = self.direction === 1;

                gsap.to(tween, {
                    timeScale: isScrollingDown ? 1 : -1,
                    overwrite: "auto",
                    duration: 0.3
                });

                // classList.add/remove 대신 GSAP를 이용해 상태 토글 변경 (선언형)
                arrows.forEach((arrow) => {
                    if (isScrollingDown) {
                        gsap.to(arrow, { rotation: 90, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
                    } else {
                        gsap.to(arrow, { rotation: -90, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
                    }
                });
            }
        });
        
    }, { scope: marqueeRef });

    return (
        <section className="marquee" ref={marqueeRef}>
            <div className="marquee__inner" ref={innerRef}>
                {/* 6개의 요소 렌더링 */}
                {[...Array(6)].map((_, i) => (
                    <div className="marquee__part" key={i} ref={el => partsRef.current[i] = el}>
                        modern creative studio
                        <div className="arrow" ref={el => arrowsRef.current[i] = el}>
                            <img src="/images/arrow.svg" alt="arrow" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Section2;
