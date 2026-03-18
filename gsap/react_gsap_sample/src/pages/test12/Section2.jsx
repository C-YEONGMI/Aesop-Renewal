import Animated from './Animated';

function Section2() {
    return (
        <section className="copy-section">
            <div className="section-img">
                <img src="/images/img1.jpeg" alt="" />
            </div>
            <Animated
                colorInitial="#333"
                colorAccent="#abff02"
                colorFinal="#ffffff"
            >
                <h2>
                    우리는 단순한 디자인을 넘어, 사용자의 경험을 근본적으로 바꾸는 인터페이스를 만듭니다.
                </h2>
                <p>
                    모든 픽셀에는 목적이 있고, 모든 인터랙션에는 이유가 있습니다.
                    스크롤 하나에도 감동을 담아, 방문자가 머무르고 싶은 공간을 설계합니다.
                    GSAP의 SplitText를 활용한 글자 단위 애니메이션은
                    텍스트에 생동감을 불어넣어 콘텐츠의 몰입도를 극대화합니다.
                </p>
            </Animated>
        </section>
    );
}

export default Section2;
