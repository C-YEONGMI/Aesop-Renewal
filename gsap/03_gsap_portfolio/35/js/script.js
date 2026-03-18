import { items } from '../api/data.js';

document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis({
        autoRaf: true,
    });

    const con2ListContainer = document.querySelector('.con2-list');
    const awardPreview = document.querySelector('.con2-preview');
    const con2List = document.querySelector('.con2-list');

    const POSITIONS = {
        BOTTOM: 0,
        MIDDLE: -100,
        TOP: -200,
    };

    let lastMousePosition = { x: 0, y: 0 };
    let activeAward = null;
    let ticking = false;
    let mouseTimeout = null;
    let isMouseMoving = false;

    items.forEach((award) => {
        const awardElement = document.createElement('div');
        awardElement.className = 'award';

        awardElement.innerHTML = `
      <div class="award-wrapper">
        <div class="award-name">
          <h1>${award.name}</h1>
          <h1>${award.type}</h1>
        </div>
        <div class="award-project">
          <h1>${award.project}</h1>
          <h1>${award.label}</h1>
        </div>
        <div class="award-name">
          <h1>${award.name}</h1>
          <h1>${award.type}</h1>
        </div>
      </div>
    `;

        con2ListContainer.appendChild(awardElement);
    });

    const con2Elements = document.querySelectorAll('.award');

    const animatePreview = () => {
        const con2ListRect = con2List.getBoundingClientRect();
        if (
            lastMousePosition.x < con2ListRect.left ||
            lastMousePosition.x > con2ListRect.right ||
            lastMousePosition.y < con2ListRect.top ||
            lastMousePosition.y > con2ListRect.bottom
        ) {
            const previewImages = awardPreview.querySelectorAll('img');
            previewImages.forEach((img) => {
                gsap.to(img, {
                    scale: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                    onComplete: () => img.remove(),
                });
            });
        }
    };

    const updatecon2 = () => {
        animatePreview();

        if (activeAward) {
            const rect = activeAward.getBoundingClientRect();
            const isStillOver =
                lastMousePosition.x >= rect.left &&
                lastMousePosition.x <= rect.right &&
                lastMousePosition.y >= rect.top &&
                lastMousePosition.y <= rect.bottom;

            if (!isStillOver) {
                const wrapper = activeAward.querySelector('.award-wrapper');
                const leavingFromTop = lastMousePosition.y < rect.top + rect.height / 2;

                gsap.to(wrapper, {
                    y: leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
                    duration: 0.4,
                    ease: 'power2.out',
                });
                activeAward = null;
            }
        }

        con2Elements.forEach((award, index) => {
            if (award === activeAward) return;

            const rect = award.getBoundingClientRect();
            const isMouseOver =
                lastMousePosition.x >= rect.left &&
                lastMousePosition.x <= rect.right &&
                lastMousePosition.y >= rect.top &&
                lastMousePosition.y <= rect.bottom;

            if (isMouseOver) {
                const wrapper = award.querySelector('.award-wrapper');
                const enterFromTop = lastMousePosition.y < rect.top + rect.height / 2;

                gsap.to(wrapper, {
                    y: POSITIONS.MIDDLE,
                    duration: 0.4,
                    ease: 'power2.out',
                });
                activeAward = award;
            }
        });

        ticking = false;
    };

    document.addEventListener('mousemove', (e) => {
        lastMousePosition.x = e.clientX;
        lastMousePosition.y = e.clientY;

        isMouseMoving = true;
        if (mouseTimeout) {
            clearTimeout(mouseTimeout);
        }

        const con2ListRect = con2List.getBoundingClientRect();
        const isInsidecon2List =
            lastMousePosition.x >= con2ListRect.left &&
            lastMousePosition.x <= con2ListRect.right &&
            lastMousePosition.y >= con2ListRect.top &&
            lastMousePosition.y <= con2ListRect.bottom;

        if (isInsidecon2List) {
            mouseTimeout = setTimeout(() => {
                isMouseMoving = false;
                const images = awardPreview.querySelectorAll('img');
                if (images.length > 1) {
                    const lastImage = images[images.length - 1];
                    images.forEach((img) => {
                        if (img !== lastImage) {
                            gsap.to(img, {
                                scale: 0,
                                duration: 0.4,
                                ease: 'power2.out',
                                onComplete: () => img.remove(),
                            });
                        }
                    });
                }
            }, 2000);
        }

        animatePreview();
    });

    document.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updatecon2();
                });
                ticking = true;
            }
        },
        { passive: true }
    );

    con2Elements.forEach((award, index) => {
        const wrapper = award.querySelector('.award-wrapper');
        let currentPosition = POSITIONS.TOP;

        award.addEventListener('mouseenter', (e) => {
            activeAward = award;
            const rect = award.getBoundingClientRect();
            const enterFromTop = e.clientY < rect.top + rect.height / 2;

            if (enterFromTop || currentPosition === POSITIONS.BOTTOM) {
                currentPosition = POSITIONS.MIDDLE;
                gsap.to(wrapper, {
                    y: POSITIONS.MIDDLE,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            }

            const img = document.createElement('img');
            img.src = `../assets/images/img${index + 1}.jpg`;
            img.style.position = 'absolute';
            img.style.top = 0;
            img.style.left = 0;
            img.style.scale = 0;
            img.style.zIndex = Date.now();

            awardPreview.appendChild(img);

            gsap.to(img, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
            });
        });

        award.addEventListener('mouseleave', (e) => {
            activeAward = null;
            const rect = award.getBoundingClientRect();
            const leavingFromTop = e.clientY < rect.top + rect.height / 2;

            currentPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;
            gsap.to(wrapper, {
                y: currentPosition,
                duration: 0.4,
                ease: 'power2.out',
            });
        });
    });
});
