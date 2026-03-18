/*************************
 * GSAP + Lenis 기본 세팅
 *************************/
gsap.registerPlugin(ScrollTrigger);

// Lenis 스무스 스크롤
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 750);
});
gsap.ticker.lagSmoothing(0);

/*************************
 * 유틸 & 상태
 *************************/
// '01' 같은 텍스트를 자릿수 span으로 분해
function splitTextIntoSpans(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
        const [a, b] = el.innerText;
        el.innerHTML = `
      <div class="digit-wrapper">
        <span class="first">${a}</span><span class="second">${b}</span>
      </div>
    `;
    });
}

// 갤러리 이미지 채우기
function populateGallery() {
    const imagesContainers = document.querySelectorAll('.images');
    imagesContainers.forEach((container) => {
        for (let j = 0; j < imagesPerProject; j++) {
            if (imageIndex > totalImages) imageIndex = 1;
            const box = document.createElement('div');
            box.classList.add('img');

            const img = document.createElement('img');
            img.src = `../assets/imgs/img${imageIndex}.jpg`;
            img.alt = `Project Image ${imageIndex}`;
            box.appendChild(img);

            container.appendChild(box);
            imageIndex++;
        }
    });
}

// 스크롤 속도 (푸시 타이밍 보정)
let lastScrollTop = 0;
let scrollVelocity = 0;
window.addEventListener(
    'scroll',
    () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        scrollVelocity = Math.abs(st - lastScrollTop);
        lastScrollTop = st <= 0 ? 0 : st;
    },
    { passive: true }
);

// 공통 상태
let activeIndex = -1;
const imagesPerProject = 4;
const totalImages = 20;
let imageIndex = 1;

// 초기 준비
splitTextIntoSpans('.mask strong');
populateGallery();

/*************************
 * con3 진입/이탈 시 고정 토글 (project-names + indicator + preview-img + mask)
 *************************/
function setCon3Fixed(isFixed) {
    const names = document.querySelector('.con3 .project-names');
    const indicator = document.querySelector('.con3 .indicator');
    const preview = document.querySelector('.con3 .preview-img');
    const masks = document.querySelectorAll('.con3 .mask');

    if (isFixed) {
        if (names) {
            gsap.set(names, {
                position: 'fixed',
                top: '40vh',
                left: '35%',
                zIndex: 100,
                x: 0,
            });
        }
        if (indicator) {
            gsap.set(indicator, {
                position: 'fixed',
                top: 0,
                right: 0,
                zIndex: 101,
            });
        }
        if (preview) {
            gsap.set(preview, {
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 90,
            });
        }
        // con3 안에서는 mask 그대로 각자 로직에서 fixed 제어
    } else {
        if (names) {
            gsap.set(names, {
                position: 'absolute',
                top: '40vh',
                left: '35%',
                zIndex: 'auto',
                x: 0,
            });
        }
        if (indicator) {
            gsap.set(indicator, {
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 'auto',
            });
        }
        if (preview) {
            gsap.set(preview, {
                position: 'absolute',
                bottom: 20,
                right: 20,
                zIndex: 'auto',
            });
        }
        if (masks) {
            gsap.set(preview, {
                position: 'absolute',
                bottom: 20,
                right: 20,
                zIndex: 'auto',
            });
        }
    }
}

// con3 범위 감시
ScrollTrigger.create({
    trigger: '.con3',
    start: 'top top',
    end: 'bottom bottom',
    onEnter: () => setCon3Fixed(true),
    onEnterBack: () => setCon3Fixed(true),
    onLeave: () => setCon3Fixed(false),
    onLeaveBack: () => setCon3Fixed(false),
    // markers: true
});

/*************************
 * 진행 바 (문서 전체)
 *************************/
ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
        gsap.set('.progress-bar', { scaleY: self.progress });
    },
});

/*************************
 * 미리보기 이미지: 화면 중앙에 들어온 .img의 src로 갱신
 *************************/
const previewImg = document.querySelector('.preview-img img');
const imgElements = document.querySelectorAll('.img img');
imgElements.forEach((img) => {
    ScrollTrigger.create({
        trigger: img,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => (previewImg.src = img.src),
        onEnterBack: () => (previewImg.src = img.src),
    });
});

/*************************
 * 인디케이터 이동 + 프로젝트명 활성화
 *************************/
const indicator = document.querySelector('.indicator');
const indicatorStep = 30;
const names = gsap.utils.toArray('.name');
gsap.set('.indicator', { top: '0px' });

const projects = gsap.utils.toArray('.project');

projects.forEach((project, index) => {
    ScrollTrigger.create({
        trigger: project,
        start: 'top 50%',
        end: 'bottom 50%',

        onEnter: () => {
            gsap.to(indicator, {
                top: Math.max(0, index * indicatorStep) + 'px',
                duration: 0.3,
                ease: 'power2.out',
            });
            names.forEach((name, i) => name.classList.toggle('active', i === index));
        },

        onLeaveBack: () => {
            const target = index - 1 < 0 ? 0 : (index - 1) * indicatorStep;
            gsap.to(indicator, {
                top: target + 'px',
                duration: 0.3,
                ease: 'power2.out',
            });
            names.forEach((name, i) =>
                name.classList.toggle('active', i === (index - 1 < 0 ? 0 : index - 1))
            );
        },
    });
});

/*************************
 * 숫자 마스크 애니메이션(고정/푸시)
 *************************/
projects.forEach((project, i) => {
    const mask = project.querySelector('.mask');
    const digitWrapper = project.querySelector('.digit-wrapper');
    const firstDigit = project.querySelector('.first');
    const secondDigit = project.querySelector('.second');

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
            const velocityAdjustment = Math.min(scrollVelocity * 0.1, 100);
            const pushPoint = window.innerHeight * (0.85 + velocityAdjustment / window.innerHeight);

            // 중앙 통과 시 mask 고정
            if (projectRect.top <= windowCenter) {
                if (!mask.isFixed) {
                    mask.isFixed = true;
                    gsap.set(mask, { position: 'fixed', top: '50vh' });
                }

                // 다음 프로젝트가 푸시 포인트에 닿으면 숫자 넘김
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
                // 중앙에서 벗어나면 고정 해제
                mask.isFixed = false;
                gsap.set(mask, { position: 'absolute', top: 0 });
            }

            // 위로 스크롤 시 되돌리기
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

/*************************
 * 스크롤 속도 추적(전역)
 *************************/
activeIndex = -1;
lastScrollTop = 0;
scrollVelocity = 0;

window.addEventListener(
    'scroll',
    () => {
        const st = window.pageYOffset;
        scrollVelocity = Math.abs(st - lastScrollTop);
        lastScrollTop = st;
    },
    { passive: true }
);
