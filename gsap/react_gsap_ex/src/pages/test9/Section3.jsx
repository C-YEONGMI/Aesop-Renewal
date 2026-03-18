import { useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';

// TextPlugin은 입력 텍스트를 타이핑 치듯 바꿔주는 공식 플러그인
gsap.registerPlugin(TextPlugin);

function Section3() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const cursorRef = useRef(null);

    useGSAP(() => {
        // Typewriter (타자 치는 효과) 구현
        // 문장이 완성되면 지워지고 다른 문장으로 다시 써지는 깔끔한 루프 생성
        const tl = gsap.timeline({ repeat: -1 });

        // .cursor 깜빡임 효과 (스텝 형태로 부드럽지 않고 딱딱 끊어지게 깜빡임)
        gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'steps(1)' // 타자기의 콘솔 커서처럼 제자리 깜빡임
        });

        tl.to(textRef.current, {
            text: { value: "GSAP TextPlugin Action..." },
            duration: 2,
            ease: 'none',
            delay: 0.5
        })
            .to(textRef.current, {
                text: { value: "" }, // 방금 적은 글자를 백스페이스로 지우는 과정
                duration: 1,
                ease: 'none',
                delay: 1.5
            })
            .to(textRef.current, {
                text: { value: "React with GSAP is Awesome!" },
                duration: 2,
                ease: 'none',
                delay: 0.5
            })
            .to(textRef.current, {
                text: { value: "" },
                duration: 1.5,
                ease: 'none',
                delay: 1.5
            });
    }, { scope: sectionRef });

    return (
        <div id="section3" className="con con3" ref={sectionRef}>
            <div className="inner">
                <h2>Test9 - TextPlugin Typewriter</h2>
                <p className="desc">Text 플러그인을 사용하여 콘솔 창처럼 글씨가 순차적으로 타이핑 되었다 지워지는 효과입니다.</p>

                <div style={{ marginTop: '80px', fontSize: '3rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                    {/* Welcome 내용물부터 시작해서 지우고 쓰여집니다. */}
                    <span ref={textRef} className="typing-text">Welcome</span>
                    <span ref={cursorRef} className="cursor" style={{ display: 'inline-block', width: '15px', background: '#e74c3c', marginLeft: '5px' }}>_</span>
                </div>
            </div>
        </div>
    );
}

export default Section3;
