import Animated from './Animated';

function Section3() {
    return (
        <>
            <section className="copy-section">
                <div className="section-img">
                    <img src="/images/img2.jpeg" alt="" />
                </div>
                <Animated
                    colorInitial="#333"
                    colorAccent="#ff6b6b"
                    colorFinal="#ffffff"
                    triggerStart="top 95%"
                    triggerEnd="top 30%"
                >
                    <h2>
                        기술과 예술의 경계에서, 우리만의 언어로 이야기합니다.
                    </h2>
                    <p>
                        React 컴포넌트 기반의 모듈형 설계로 재사용성을 높이고,
                        useGSAP 훅을 통해 안전하고 효율적인 애니메이션 라이프사이클을 관리합니다.
                        ScrollTrigger와 결합된 텍스트 컬러 전환 효과는
                        사용자의 스크롤 행위 자체를 하나의 인터랙티브 경험으로 승화시킵니다.
                    </p>
                </Animated>
            </section>
            <div className="footer-spacer" />
        </>
    );
}

export default Section3;
