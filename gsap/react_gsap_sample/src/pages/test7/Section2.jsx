import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section2() {
    const conRef = useRef(null);
    const circleRef = useRef(null);

    useGSAP(() => {
        const circle = circleRef.current;
        if (!circle) return;

        gsap.timeline({
            scrollTrigger: {
                trigger: conRef.current,
                start: '0% 50%',
                end: '30% 0%',
                scrub: 1,
            },
        }).fromTo(circle,
            { width: '0', height: '0', top: '3%', opacity: 0 },
            { width: '2200px', height: '2200px', top: '30%', opacity: 1, duration: 10, ease: 'elastic' },
            0
        );
    }, { scope: conRef });

    return (
        <>
            <div className="con con2">
                <div className="inner">
                    <h2>Sit amet consectetur</h2>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>

            <div className="con con3" ref={conRef}>
                <div className="inner">
                    <h2>Adipiscing elit sed</h2>
                    <span className="circle" ref={circleRef}></span>
                    <div className="text-box">
                        <h3>
                            <span>LOREM IPSUM</span>
                            <span>DOLOR SIT</span>
                            <span>AMET CONSECTETUR</span>
                        </h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Section2;
