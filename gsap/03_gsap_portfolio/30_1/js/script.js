const common = () => {
    // 메뉴등 공통
};

const mainPage = () => {
    document.querySelectorAll('.item').forEach((item) => {
        item.addEventListener('mouseenter', function () {
            gsap.set(this.querySelectorAll('span'), { opacity: 0 });
            gsap.to(this.querySelectorAll('span'), {
                opacity: 1,
                duration: 0.075,
                stagger: {
                    from: 'random',
                    each: 0.02,
                },
                ease: 'power2.out',
            });
        });

        item.addEventListener('mouseleave', function () {
            gsap.to(this.querySelectorAll('span'), {
                opacity: 0,
                duration: 0.075,
                stagger: {
                    from: 'random',
                    each: 0.02,
                },
                ease: 'power2.in',
            });
        });
    });
};

const projectsPage = () => {};
const aboutPage = () => {};

const processPage = () => {};

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
