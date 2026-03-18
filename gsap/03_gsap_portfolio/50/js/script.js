let tl = gsap.timeline({ delay: 0 });

tl.to('.col', {
    top: '0',
    duration: 3,
    ease: 'power4.inOut',
});

tl.to(
    '.c-1 .item',
    {
        top: '0',
        stagger: 0.25,
        duration: 3,
        ease: 'power4.inOut',
    },
    '-=2'
);

tl.to(
    '.c-2 .item',
    {
        top: '0',
        stagger: -0.25,
        duration: 3,
        ease: 'power4.inOut',
    },
    '-=4'
);

tl.to(
    '.c-3 .item',
    {
        top: '0',
        stagger: 0.25,
        duration: 3,
        ease: 'power4.inOut',
    },
    '-=4'
);

tl.to(
    '.c-4 .item',
    {
        top: '0',
        stagger: -0.25,
        duration: 3,
        ease: 'power4.inOut',
    },
    '-=4'
);

tl.to(
    '.c-5 .item',
    {
        top: '0',
        stagger: 0.25,
        duration: 3,
        ease: 'power4.inOut',
    },
    '-=4'
);

tl.to(
    '.container',
    {
        scale: 6,
        duration: 4,
        ease: 'power4.inOut',
    },
    '-=2'
);

tl.to(
    '.nav-item a, .title p, .slide-num p, .preview img',
    {
        top: 0,
        stagger: 0.075,
        duration: 1,
        ease: 'power3.out',
    },
    '-=1.5'
);

tl.to(
    '.icon ion-icon, .icon-2 ion-icon',
    {
        scale: 1,
        stagger: 0.05,
        ease: 'power3.out',
    },
    '-=1'
);
