import { useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(Flip);

function Section2() {
    const sectionRef = useRef(null);
    const [isRow, setIsRow] = useState(true);
    // React 리렌더링과 상관없이 Flip 상태를 일시적으로 담아둘 ref
    const flipState = useRef();

    useGSAP(() => {
        // 첫 렌더링 시 등장하는 애니메이션 (최초 1회만 실행됨)
        gsap.from('.flip-box', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.5)',
        });
    }, { scope: sectionRef }); // dependencies 배열 생략하여 초기화 시 1번 실행

    const toggleLayout = () => {
        // 1. 레이아웃(FlexDirection)이 변하기 '직전'에 요소들의 현 위치/크기 상태를 스크랩
        flipState.current = Flip.getState('.flip-box');
        
        // 2. CSS 클래스나 인라인 속성을 변경하여 리렌더링 유발 (React 상태 변경)
        setIsRow(!isRow);
    };

    useGSAP(() => {
        // 3. React가 가상 DOM 변경을 마치고 실제 DOM에 flex-direction 변경이 적용된 직후 발생
        if (flipState.current) {
            Flip.from(flipState.current, {
                duration: 0.6,
                ease: 'power2.inOut',
                absolute: true, // 크기 변환과 동시에 위치 변경 중 빈 공간이 얽히지 않게 강제 absolute 제어
            });
            // 일회성 재생 후 비워줌
            flipState.current = null;
        }
    }, { scope: sectionRef, dependencies: [isRow] }); // isRow값이 업데이트 될 때마다 트리거됨

    return (
        <div id="section2" className="con con2" ref={sectionRef}>
            <div className="inner">
                <h2>Test9 - 레이아웃 변경 토글 (GSAP Flip)</h2>
                <p className="desc">GSAP Flip 플러그인을 사용하여 CSS flex-direction 변경만으로도 위치 이동을 완벽하고 부드럽게 연결해 줍니다.</p>

                <button
                    onClick={toggleLayout}
                    style={{ padding: '10px 20px', fontSize: '1.2rem', cursor: 'pointer', marginBottom: '30px', fontWeight: 'bold' }}
                >
                    Toggle Layout: {isRow ? 'Row' : 'Column'}
                </button>

                <div
                    className="flip-container"
                    style={{
                        display: 'flex',
                        flexDirection: isRow ? 'row' : 'column',
                        gap: '20px',
                        // CSS Transition(all 0.5s ease 등)이 걸려 있으면 GSAP Flip과 충돌하므로 제거해야 합니다.
                    }}
                >
                    <div className="flip-box box">1</div>
                    <div className="flip-box box">2</div>
                    <div className="flip-box box">3</div>
                </div>
            </div>
        </div>
    );
}

export default Section2;
