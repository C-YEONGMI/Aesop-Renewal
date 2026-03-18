import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section2() {
    const contentRef = useRef(null);

    useGSAP(() => {
        // .logo 텍스트가 큰 크기에서 작게 돌아오는 애니메이션
        ScrollTrigger.create({
            animation: gsap.fromTo('.logo', 
                {
                    scale: 6,
                    transformOrigin: 'center center',
                },
                {
                    scale: 1,
                    ease: 'none',
                }
            ),
            scrub: true,
            trigger: contentRef.current,
            start: 'top bottom',
            endTrigger: contentRef.current,
            end: 'top center',
        });
    }, []);

    return (
        <section className="section2" ref={contentRef}>
            <div className="content">
                <img src="/images/bg1.jpg" alt="Hero Background" />
            </div>
        </section>
    );
}

export default Section2;
