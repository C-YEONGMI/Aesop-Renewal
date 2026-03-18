import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section3() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    useGSAP(() => {
        // 무한 롤링 텍스트 (Marquee)
        gsap.to(trackRef.current, {
            xPercent: -50, // 내용이 두 번 반복되어 있으므로 절반(50%)만 이동하여 무한루프 느낌 구현
            ease: 'none',
            duration: 10,
            repeat: -1,
        });
    }, { scope: sectionRef });

    return (
        <div id="section3" className="con con3" ref={sectionRef}>
            <div className="inner">
                <h2>Test6 - 무한 흘러가는 글자</h2>
                <p className="desc">텍스트가 끊김 없이 부드럽게 무한으로 흘러갑니다.</p>
            </div>

            <div className="marquee-wrapper">
                {/* 문자열의 절반이 이동하도록 컨테이너 ref 연동 */}
                <div className="marquee-track" ref={trackRef}>
                    {/* 부드러운 순환을 위해 텍스트를 두 개 배치합니다. */}
                    <div className="marquee-content">
                        끝없이 흘러가는 재미있는 효과! • 끊김 없는 마퀴(Marquee) 애니메이션 • 끝없이 흘러가는 재미있는 효과! • 끊김 없는 마퀴(Marquee) 애니메이션 •
                    </div>
                    {/* 접근성을 위해 뒷부분 텍스트는 보이스오버 방지 (aria-hidden) */}
                    <div className="marquee-content" aria-hidden="true">
                        끝없이 흘러가는 재미있는 효과! • 끊김 없는 마퀴(Marquee) 애니메이션 • 끝없이 흘러가는 재미있는 효과! • 끊김 없는 마퀴(Marquee) 애니메이션 •
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section3;
