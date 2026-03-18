document
    .querySelector('#def-1')
    .setAttribute('d', document.querySelector('#path-1').getAttribute('d'));

document
    .querySelector('#def-2')
    .setAttribute('d', document.querySelector('#path-2').getAttribute('d'));

gsap.to('#Text1', 6, {
    attr: { startOffset: '100%' },
    ease: 'linear',
    repeat: -1,
});

gsap.to('#Text2', 6, {
    attr: { startOffset: '100%' },
    ease: 'linear',
    repeat: -1,
    delay: 2,
});

gsap.to('#Text3', 6, {
    attr: { startOffset: '100%' },
    ease: 'linear',
    delay: 4,
    repeat: -1,
});

gsap.to('.disk', {
    rotate: 360,
    duration: 2,
    repeat: -1,
    ease: 'linear',
});
