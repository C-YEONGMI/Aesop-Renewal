// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);
// ==== 이미지 초기 상태 세팅 ====
gsap.set('.con2 .item-img img', {
    transformOrigin: 'center center',
    scale: 1.25,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    willChange: 'transform, clip-path',
});

// ==== 각 아이템별 리빌 애니메이션 ====
const items = [...document.querySelectorAll('.con2 .item')];
items.forEach((item) => {
    const img = item.querySelector('.item-img img');
    if (!img) return;

    // 초기 상태를 명확하게 고정
    gsap.set(img, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        willChange: 'clip-path',
    });

    // 스크롤에 따라 열리게
    gsap.to(img, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'none', // scrub이면 ease는 거의 의미 없어서 none 추천
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
            invalidateOnRefresh: true, // 리사이즈/리프레시 대응
        },
    });
});
//

const counterElement = document.querySelector('.counter p');
if (!counterElement) return;

const docHeight = document.documentElement.scrollHeight - window.innerHeight;

function updateScrollPercentage() {
    const scrollPosition = window.scrollY;
    const scrolledPercentage = Math.round((scrollPosition / docHeight) * 100);
    counterElement.textContent = `${scrolledPercentage}`;
}

window.addEventListener('scroll', updateScrollPercentage);
