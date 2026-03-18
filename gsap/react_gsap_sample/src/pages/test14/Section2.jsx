import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SVG_PATH_D =
    "M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5";

function Section2() {
    const sectionRef = useRef(null);
    const pathRef = useRef(null);

    useGSAP(() => {
        const path = pathRef.current;
        if (!path) return;

        // SVG가 렌더된 후 pathLength를 정확히 계산하기 위해 rAF 사용
        requestAnimationFrame(() => {
            const pathLength = path.getTotalLength();
            if (pathLength === 0) return;

            gsap.set(path, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength,
            });

            gsap.to(path, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 2,
                },
            });
        });
    }, { scope: sectionRef });

    return (
        <section className="spotlight" ref={sectionRef}>
            {/* Row 1: 이미지 */}
            <div className="row">
                <div className="img">
                    <img src="/images/img3.jpeg" alt="" />
                </div>
            </div>

            {/* Row 2: 카드 + 이미지 */}
            <div className="row">
                <div className="col">
                    <div className="card">
                        <h2>업데이트를 깔끔하게 처리 </h2>
                        <p>
                            모든 메시지나 알림을 즉시 표시하는 대신,
                            관련 항목을 그룹화하여 정리된 패널로 보여줍니다.

                        </p>
                    </div>
                </div>
                <div className="col">
                    <div className="img">
                        <img src="/images/img4.jpeg" alt="" />
                    </div>
                </div>
            </div>

            {/* Row 3: 이미지 + 카드 */}
            <div className="row">
                <div className="col">
                    <div className="img">
                        <img src="/images/img5.jpeg" alt="" />
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <h2>증가하는 정보 수요  설계</h2>
                        <p>
                            파일, 노트, 수신 메시지 등 항목을 자동으로 정렬하고
                            우선순위를 지정합니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* Row 4: 이미지 */}
            <div className="row">
                <div className="img">
                    <img src="/images/img6.jpeg" alt="" />
                </div>
            </div>

            {/* SVG Path (배경 stroke) */}
            <div className="svg-path">
                <svg
                    viewBox="0 0 1378 2760"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMin meet"
                >
                    <path
                        ref={pathRef}
                        d={SVG_PATH_D}
                        stroke="#FF5F0A"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </section>
    );
}

export default Section2;
