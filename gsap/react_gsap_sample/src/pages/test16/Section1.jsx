import AnimateText from './AnimateText';

function Section1() {
    return (
        <>
            <section className="hero">
                <div className="hero-img">
                    <img src="/images/img7.jpeg" alt="" />
                </div>
            </section>

            <section className="about">
                <AnimateText>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, quaerat. Voluptate error
                </AnimateText>
            </section>
        </>
    );
}

export default Section1;
