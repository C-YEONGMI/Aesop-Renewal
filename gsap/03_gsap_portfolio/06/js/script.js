// 페이지 전환 애니메이션
const pageTransition = () => {
    const tl = gsap.timeline();

    tl.to('.transition', {
        duration: 1,
        scaleY: 1,
        transformOrigin: 'bottom',
        ease: 'power4.inOut',
    });

    tl.to('.transition', {
        duration: 1,
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'power4.inOut',
        delay: 0.2,
    });
};

// 콘텐츠 진입 애니메이션
const contentAnimation = () => {
    const tl = gsap.timeline();

    tl.to('h1', {
        top: 0,
        duration: 1,
        ease: 'power3.inOut',
        delay: 0.75,
    });
};

// 딜레이 유틸
const delay = (n = 0) =>
    new Promise((resolve) => {
        setTimeout(resolve, n);
    });

// Barba 설정
barba.init({
    sync: true,
    transitions: [
        {
            async leave(data) {
                const done = this.async();

                pageTransition();
                await delay(1000);
                done();
            },

            async enter(data) {
                contentAnimation();
            },

            async once(data) {
                contentAnimation();
            },
        },
    ],
});
