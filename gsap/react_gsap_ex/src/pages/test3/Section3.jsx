import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section3() {
    const sectionRef = useRef(null);
    const [tl, setTl] = useState(null);

    useGSAP(() => {
        // 타임라인을 변수에 저장하여 컨트롤 가능하게 만듦 (paused: true)
        const animation = gsap.timeline({ paused: true });

        animation.to('.runner', { x: '50vw', duration: 2, ease: 'power1.inOut' })
            .to('.runner', { rotation: 360, duration: 1, ease: 'none' })
            .to('.runner', { scale: 1.5, duration: 0.5, yoyo: true, repeat: 1 });

        setTl(animation);
    }, { scope: sectionRef });

    return (
        <div id="section3" className="con con3" ref={sectionRef}>
            <div className="inner">
                <h2>Test3 - Timeline Playback Controls</h2>
                <p className="desc">타임라인 객체의 play(), pause(), reverse() 등의 메서드 호출</p>

                <div className="controls">
                    <button onClick={() => tl?.play()}>Play</button>
                    <button onClick={() => tl?.pause()}>Pause</button>
                    <button onClick={() => tl?.resume()}>Resume</button>
                    <button onClick={() => tl?.reverse()}>Reverse</button>
                    <button onClick={() => tl?.restart()}>Restart</button>
                </div>

                <div className="track">
                    <div className="box runner">🏃‍♂️</div>
                </div>
            </div>
        </div>
    );
}

export default Section3;
