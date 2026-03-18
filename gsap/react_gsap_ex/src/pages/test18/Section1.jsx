import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section1() {
    const sectionRef = useRef(null);
    const boxRef = useRef(null);

    useGSAP(() => {
        // ScrollTrigger.create: 애니메이션 없이 스크롤 위치 기반 콜백만 실행할 때 사용
        ScrollTrigger.create({
            trigger: boxRef.current, start: 'top 80%', end: 'top 20%', markers: true,
            onEnter: () => gsap.to(boxRef.current, { backgroundColor: '#2ecc71', duration: 0.5 }),      // 아래로 스크롤하여 요소가 화면에 들어올 때
            onLeave: () => gsap.to(boxRef.current, { backgroundColor: '#e74c3c', duration: 0.5 }),      // 아래로 스크롤하여 요소가 화면 밖으로 나갈 때
            onEnterBack: () => gsap.to(boxRef.current, { backgroundColor: '#3498db', duration: 0.5 }),  // 위로 스크롤하여 요소가 다시 화면에 들어올 때
            onLeaveBack: () => gsap.to(boxRef.current, { backgroundColor: '#9b59b6', duration: 0.5 }), // 위로 스크롤하여 요소가 화면 밖으로 나갈 때
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test18 - ScrollTrigger Callbacks</h2>
                <p className="desc">onEnter, onLeave 콜백</p>
                <div style={{ height: '60vh' }}></div>
                <div ref={boxRef} className="box">Callbacks</div>
                <div style={{ height: '100vh' }}></div>
            </div>
        </div>
    );
}

export default Section1;
