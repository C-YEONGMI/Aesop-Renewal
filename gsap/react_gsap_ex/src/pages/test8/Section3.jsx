import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section3() {
    const sectionRef = useRef(null);
    const fillTextRef = useRef(null);

    useGSAP(() => {
        // 텍스트 이미지/fill 애니메이션 (background-position 움직임 활용)
        gsap.to(fillTextRef.current, {
            backgroundPosition: '200% center', // 배경 위치를 이동시켜 이미지가 흘러가는 효과
            duration: 8, // 너무 빠르지 않게
            ease: 'none', // 등속 운동
            repeat: -1,
        });
    }, { scope: sectionRef });

    return (
        <div id="section3" className="con con3" ref={sectionRef}>
            <div className="inner">
                <h2>Test8 - 텍스트 Background Fill 애니메이션</h2>
                <p className="desc">텍스트 마스킹(background-clip: text) 기능과 GSAP backgroundPosition 애니메이션을 결합하여 글자 안에 이미지가 흘러가게 합니다.</p>
                
                <div style={{ marginTop: '50px', textAlign: 'center' }}>
                    <h1 ref={fillTextRef} className="fill-text" style={{ 
                        fontSize: '6vw', 
                        fontWeight: 900, 
                        // 그라데이션 대신 배경 이미지를 텍스트 안에 넣습니다.
                        backgroundImage: 'url(/images/img1.jpeg)', 
                        backgroundSize: '200% auto', 
                        // 필수 속성: 글자 안쪽만 배경이 남도록 자르고(clip), 글자 자체의 색깔은 투명하게 만듦
                        color: 'transparent',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        BACKGROUND TEXT FLOW
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Section3;
