import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// 컴포넌트 밖에 데이터 배열 정의 (React 방식) -> 유지보수 간결화
const imagesData = [
    { src: '/images/img1.jpeg', initRot: 5, phase1: 0, phase2: 0.5, final: [-140, -140] },
    { src: '/images/img2.jpeg', initRot: -3, phase1: 0.1, phase2: 0.55, final: [40, -130] },
    { src: '/images/img3.jpeg', initRot: 3.5, phase1: 0.2, phase2: 0.6, final: [-160, 40] },
    { src: '/images/img4.jpeg', initRot: -1, phase1: 0.3, phase2: 0.65, final: [20, 30] },
];

function Section2() {
    const sectionRef = useRef(null);
    const imgRefs = useRef([]); // querySelectorAll 대신 Ref 매핑 사용

    useGSAP(() => {
        // Vanilla JS의 수동 progress 계산과 문자열을 버리고, 진정한 GSAP Timeline 기반으로 작성!
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${window.innerHeight * 6}px`,
                pin: true,
                pinSpacing: true,
                scrub: 1, // 스크럽 모드
            }
        });

        // 마스터 타임라인 길이를 정규화 (1초 꽉 채움 = progress 0~1)
        tl.to({}, { duration: 1 }, 0);

        imgRefs.current.forEach((img, index) => {
            if (!img) return;
            const data = imagesData[index];

            // 1. 초기값 세팅
            gsap.set(img, {
                xPercent: -50,
                yPercent: 200,
                rotation: data.initRot
            });

            // Phase 1 : 밑에서부터 올라오는 모션
            const phase1Start = data.phase1;
            const phase1End = Math.min(phase1Start + (0.45 - phase1Start) * 0.9, 0.45);
            const p1Duration = phase1End - Math.max(phase1Start, 0);

            // 기존 Math.pow(x, 3) === GSAP의 power2.out 이징타입
            tl.to(img, {
                yPercent: -50,
                ease: "power2.out",
                duration: p1Duration
            }, phase1Start);

            // Phase 2 : 모서리로 흩어지며 회전 풀기
            const phase2Start = data.phase2;
            const phase2End = Math.min(phase2Start + (0.95 - phase2Start) * 0.9, 0.95);
            const p2Duration = phase2End - Math.max(phase2Start, 0);

            tl.to(img, {
                xPercent: data.final[0],
                yPercent: data.final[1],
                rotation: 0,
                ease: "power2.out",
                duration: p2Duration
            }, phase2Start);
        });

    }, { scope: sectionRef });

    return (
        <section className="spotlight" ref={sectionRef}>
            <div className="spotlight-header">
                <h1>Test6 두번째  </h1>
            </div>

            <div className="spotlight-images">
                {/* 데이터 맵핑으로 React스러운 렌더링. 하드코딩 탈피! */}
                {imagesData.map((data, idx) => (
                    <div
                        className="spotlight-img"
                        key={idx}
                        ref={el => imgRefs.current[idx] = el}
                    >
                        <img src={data.src} alt={`spotlight-${idx + 1}`} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Section2;
