const common = () => {
    // 메뉴등 공통
};

const mainPage = () => {};

const projectsPage = () => {};
const aboutPage = () => {};
const processPage = () => {
    gsap.set('nav', { y: -100 });
    gsap.set('.letter-wrapper', { y: 400 });
    gsap.set('.item-copy-wrapper p', { y: 50 });

    gsap.defaults({ duration: 1, ease: 'power3.out' });
    const tl = gsap.timeline({ paused: true, delay: 0.5 });

    tl.to('.letter-wrapper', {
        y: 0,
        stagger: 0.1,
    })
        .to('.header-item-1', {
            left: '12vw',
        })
        .to(
            '.header-item-2',
            {
                right: '8vw',
            },
            '<'
        )
        .to(
            '.item-main .item-img img',
            {
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
            },
            '<'
        )
        .to('.header-item-1', {
            left: 0,
            scale: 1,
        })
        .to(
            '.header-item-2',
            {
                right: 0,
                scale: 1,
            },
            '<'
        )
        .to(
            '.item-main .item-img img',
            {
                scale: 1,
            },
            '<'
        )
        .to(
            '.item-side .item-img',
            {
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                stagger: 0.1,
            },
            '<'
        )
        .to(
            '.header',
            {
                bottom: '0',
            },
            '<'
        )
        .to(
            '.item-copy-wrapper p',
            {
                y: 0,
                stagger: 0.05,
            },
            '<'
        )
        .to(
            'nav',
            {
                y: 0,
            },
            '<'
        );

    tl.play();
};

(() => {
    common();
    const currentPath = location.href;

    if (currentPath.includes('index.html') || /\/(index\.html)?$/.test(currentPath)) {
        mainPage();
    } else if (currentPath.includes('process.html')) {
        processPage();
    } else if (currentPath.includes('projects.html')) {
        projectsPage();
    } else if (currentPath.includes('about.html')) {
        aboutPage();
    }
})();
