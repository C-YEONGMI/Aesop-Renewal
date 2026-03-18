const innerTexts = document.querySelectorAll('.con1 .menu__item-innertext');
const menuItems = document.querySelectorAll('.con1 .menu__item');
const tl = gsap.timeline();

tl.set('.con1 .menu', { autoAlpha: 1 });
tl.from('.con1 .menu__item-innertext', {
    delay: 1,
    duration: 1,
    xPercent: 100,
    yPercent: 125,
    stagger: 0.095,
    skewY: gsap.utils.wrap([-8, 8]),
    ease: 'expo.out',
});
tl.set('.con1 .menu', { pointerEvents: 'all' });

gsap.defaults({ duration: 0.55, ease: 'expo.out' });

menuItems.forEach((item) => {
    const imgWrapper = item.querySelector('.con1 .menu__item-image_wrapper');
    const imgWrapperBounds = imgWrapper.getBoundingClientRect();
    let itemBounds = item.getBoundingClientRect();

    const onMouseEnter = () => {
        gsap.set(imgWrapper, { scale: 0.8, xPercent: 25, yPercent: 50, rotation: -15 });
        gsap.to(imgWrapper, { opacity: 1, scale: 1, xPercent: 0, yPercent: 0, rotation: 0 });
    };

    const onMouseLeave = () => {
        gsap.to(imgWrapper, { opacity: 0, scale: 0.8, xPercent: 25, yPercent: 50, rotation: -15 });
    };

    const onMouseMove = ({ x, y }) => {
        let yOffset = itemBounds.top / imgWrapperBounds.height;
        yOffset = gsap.utils.mapRange(0, 1.5, -150, 150, yOffset);
        gsap.to(imgWrapper, {
            duration: 1.25,
            x: Math.abs(x - itemBounds.left) - imgWrapperBounds.width / 1.55,
            y: Math.abs(y - itemBounds.top) - imgWrapperBounds.height / 2 - yOffset,
        });

        console.log(`x: ${Math.abs(x - itemBounds.left) - imgWrapperBounds.width / 0.55}`);
        console.log(`y: ${Math.abs(y - itemBounds.top) - imgWrapperBounds.height / 2 - yOffset}`);
    };

    item.addEventListener('mouseenter', onMouseEnter);
    item.addEventListener('mouseleave', onMouseLeave);
    item.addEventListener('mousemove', onMouseMove);

    window.addEventListener('resize', () => {
        itemBounds = item.getBoundingClientRect();
    });
});
