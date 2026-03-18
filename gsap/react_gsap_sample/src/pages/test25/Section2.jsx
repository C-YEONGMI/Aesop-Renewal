import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
    { text: 'Lorem ipsum dolor?', bg: null },
    { text: 'Sit amet consectetur.', bg: null },
    { text: 'Adipiscing elit sed!', bg: null },
];

function Section2() {
    const scrollRef = useRef(null);
    const panelRefs = useRef([]);
    const titleRefs = useRef([]);

    useGSAP(() => {
        const outer = scrollRef.current.parentElement;
        const scrollContainer = scrollRef.current;
        const panels = panelRefs.current.filter(Boolean);
        const titles = titleRefs.current.filter(Boolean);
        if (!scrollContainer || !panels.length || !outer) return;

        // 가로 스크롤 tween
        const scrollTween = gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: outer,
                pin: true,
                scrub: 1,
                end: () => '+=' + outer.offsetWidth * (panels.length - 1),
                snap: {
                    snapTo: 1 / (panels.length - 1),
                    duration: { min: 0.2, max: 0.5 },
                    delay: 0.1,
                    ease: 'power1.inOut',
                },
            },
        });

        // 각 패널 제목 등장 (containerAnimation)
        titles.forEach(title => {
            gsap.from(title, {
                opacity: 0,
                y: -100,
                scrollTrigger: {
                    trigger: title.parentElement,
                    containerAnimation: scrollTween,
                    start: 'left center',
                    toggleActions: 'play none none reverse',
                },
            });
        });
    }, { scope: scrollRef });

    return (
        <div className="con con2">
            <div className="outer">
                <div className="scroll" ref={scrollRef}>
                    {PANELS.map((panel, i) => (
                        <section
                            key={i}
                            className="panel"
                            ref={el => panelRefs.current[i] = el}
                        >
                            <h2 ref={el => titleRefs.current[i] = el}>{panel.text}</h2>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Section2;
