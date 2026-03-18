import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);
    const circleRef = useRef(null);

    useGSAP(() => {
        // 커서 따라다니는 마우스 애니메이션
        // GSAP 공식 권장: 실시간 마우스 연동에는 quickTo()가 훨씬 빠르고 최적화됨!
        const xTo = gsap.quickTo(circleRef.current, 'x', { duration: 0.5, ease: 'power3.out' });
        const yTo = gsap.quickTo(circleRef.current, 'y', { duration: 0.5, ease: 'power3.out' });

        const onMouseMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', onMouseMove);
        
        // Return 구문을 사용해 컴포넌트 마운트 해제 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            {/* 마우스 커서 원형 표시 (useRef 연동) */}
            <div ref={circleRef} className="cursor-follower"></div>
            
            <div className="inner">
                <h2>Test6 - 마우스 따라다니기</h2>
                <p className="desc">부드럽게 마우스 표적을 쫓아다니는 원형 커서 애니메이션을 확인해 보세요.</p>
            </div>
        </div>
    );
}

export default Section1;
