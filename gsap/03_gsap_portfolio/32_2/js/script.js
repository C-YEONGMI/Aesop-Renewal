gsap.registerPlugin(ScrollTrigger);

// ===== Lenis =====
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 750);
});
gsap.ticker.lagSmoothing(0);

// ===== 먼저 선언/초기화 (TDZ 회피) =====
let activeIndex = -1;
let lastScrollTop = window.pageYOffset || 0;
let scrollVelocity = 0;

// 스크롤 속도(px/frame 기준) 추적
window.addEventListener(
    'scroll',
    () => {
        const st = window.pageYOffset;
        scrollVelocity = Math.abs(st - lastScrollTop);
        lastScrollTop = st;
    },
    { passive: true }
);

// ===== Helper =====
function splitTextIntoSpans(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        const txt = (element.innerText || '').trim();
        const firstDigit = txt[0] ?? '';
        const secondDigit = txt[1] ?? '';
        element.innerHTML = `
      <div class="digit-wrapper">
        <span class="first">${firstDigit}</span><span class="second">${secondDigit}</span>
      </div>
    `;
    });
}

function populateGallery() {
    const imagesContainers = document.querySelectorAll('.images');
    imagesContainers.forEach((container) => {
        for (let j = 0; j < imagesPerProject; j++) {
            if (imageIndex > totalImages) imageIndex = 1;
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img');

            const img = document.createElement('img');
            img.src = `../assets/imgs/img${imageIndex}.jpg`;
            img.alt = `Project Image ${imageIndex}`;
            imgContainer.appendChild(img);

            container.appendChild(imgContainer);
            imageIndex++;
        }
    });
}

// ===== Init =====
splitTextIntoSpans('.mask h1');

const imagesPerProject = 4;
const totalImages = 20;
let imageIndex = 1;
populateGallery();

// ===== Progress bar =====
ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => gsap.set('.progress-bar', { scaleY: self.progress }),
});

// ===== Preview image sync =====
const previewImg = document.querySelector('.preview-img img');
const imgElements = document.querySelectorAll('.img img');
imgElements.forEach((img) => {
    ScrollTrigger.create({
        trigger: img,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
            if (previewImg) previewImg.src = img.src;
        },
        onEnterBack: () => {
            if (previewImg) previewImg.src = img.src;
        },
    });
});

// ===== Indicator & names =====
const indicator = document.querySelector('.indicator');
const indicatorStep = 30;
const names = gsap.utils.toArray('.name');
if (indicator) gsap.set(indicator, { top: '0px' });

const projects = gsap.utils.toArray('.project');
projects.forEach((project, index) => {
    ScrollTrigger.create({
        trigger: project,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
            if (indicator) {
                gsap.to(indicator, {
                    top: Math.max(0, index * indicatorStep) + 'px',
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
            names.forEach((name, i) => name.classList.toggle('active', i === index));
        },
        onLeaveBack: () => {
            const targetPosition = index - 1 < 0 ? 0 : (index - 1) * indicatorStep;
            if (indicator) {
                gsap.to(indicator, {
                    top: targetPosition + 'px',
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
            names.forEach((name, i) =>
                name.classList.toggle('active', i === (index - 1 < 0 ? 0 : index - 1))
            );
        },
    });
});

// ===== Mask animation per project =====
projects.forEach((project, i) => {
    const mask = project.querySelector('.mask');
    const digitWrapper = project.querySelector('.digit-wrapper');
    const firstDigit = project.querySelector('.first');
    const secondDigit = project.querySelector('.second');

    if (!mask) return;

    gsap.set([mask, digitWrapper, firstDigit, secondDigit], { y: 0 });
    gsap.set(mask, { position: 'absolute', top: 0 });

    ScrollTrigger.create({
        trigger: project,
        start: 'top bottom',
        end: 'bottom top',
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
            const projectRect = project.getBoundingClientRect();
            const windowCenter = window.innerHeight / 2;
            const nextProject = projects[i + 1];

            // 속도 보정치는 절댓값 사용
            const velocityAdjustment = Math.min(Math.abs(scrollVelocity) * 0.1, 100);
            const pushPoint = window.innerHeight * (0.85 + velocityAdjustment / window.innerHeight);

            if (projectRect.top <= windowCenter) {
                if (!mask.isFixed) {
                    mask.isFixed = true;
                    gsap.set(mask, { position: 'fixed', top: '50vh' });
                }

                if (nextProject) {
                    const nextRect = nextProject.getBoundingClientRect();
                    if (nextRect.top <= pushPoint && activeIndex !== i + 1) {
                        gsap.killTweensOf([mask, digitWrapper, firstDigit, secondDigit]);

                        activeIndex = i + 1;
                        gsap.to(mask, {
                            y: -80,
                            duration: 0.3,
                            ease: 'power2.out',
                            overwrite: true,
                        });
                        gsap.to(digitWrapper, {
                            y: -80,
                            duration: 0.5,
                            delay: 0.5,
                            ease: 'power2.out',
                            overwrite: true,
                        });
                        gsap.to(firstDigit, {
                            y: -80,
                            duration: 0.75,
                            ease: 'power2.out',
                            overwrite: true,
                        });
                        gsap.to(secondDigit, {
                            y: -80,
                            duration: 0.75,
                            delay: 0.1,
                            ease: 'power2.out',
                            overwrite: true,
                        });
                    }
                }
            } else {
                mask.isFixed = false;
                gsap.set(mask, { position: 'absolute', top: 0 });
            }

            if (self.direction === -1 && projectRect.top > windowCenter) {
                mask.isFixed = false;
                gsap.set(mask, { position: 'absolute', top: 0 });

                if (i > 0 && activeIndex === i) {
                    const prevProject = projects[i - 1];
                    if (prevProject) {
                        const prevMask = prevProject.querySelector('.mask');
                        const prevWrapper = prevProject.querySelector('.digit-wrapper');
                        const prevFirst = prevProject.querySelector('.first');
                        const prevSecond = prevProject.querySelector('.second');

                        gsap.killTweensOf([prevMask, prevWrapper, prevFirst, prevSecond]);

                        activeIndex = i - 1;
                        gsap.to([prevMask, prevWrapper], {
                            y: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                            overwrite: true,
                        });
                        gsap.to(prevFirst, {
                            y: 0,
                            duration: 0.75,
                            ease: 'power2.out',
                            overwrite: true,
                        });
                        gsap.to(prevSecond, {
                            y: 0,
                            duration: 0.75,
                            delay: 0.1,
                            ease: 'power2.out',
                            overwrite: true,
                        });
                    }
                }
            }
        },
        onEnter: () => {
            if (i === 0) activeIndex = 0;
        },
    });
});
