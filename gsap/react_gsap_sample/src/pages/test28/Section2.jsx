import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section2() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);

    useGSAP(() => {
        const video = videoRef.current;
        if (!video) return;

        // 비디오 메타데이터 로드 후 스크롤 스크럽 설정
        const onLoaded = () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=3000',
                    scrub: true,
                    pin: true,
                },
            });

            tl.to(video, {
                currentTime: video.duration,
                ease: 'none',
            });
        };

        // 비디오가 이미 로드되었는지 확인
        if (video.readyState >= 1) {
            onLoaded();
        } else {
            video.addEventListener('loadedmetadata', onLoaded);
        }

        return () => {
            video.removeEventListener('loadedmetadata', onLoaded);
        };
    }, { scope: sectionRef });

    return (
        <div id="section2" className="con con2" ref={sectionRef}>
            <div className="inner">
                <div className="video-container">
                    <video
                        ref={videoRef}
                        muted
                        playsInline
                        preload="auto"
                        src="/videos/output.mp4"
                    />
                    <div className="video-overlay">
                        <h2> Exercitationem ullam!  </h2>
                        <p> ipsum dolor sit amet consectetur adipisicing elit !</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section2;
