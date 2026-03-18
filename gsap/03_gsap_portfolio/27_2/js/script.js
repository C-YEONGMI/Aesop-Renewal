import { items } from './../api/projectData.js';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Lenis 스무스 스크롤 (옵션)
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

const common = () => {
    // 메뉴 등 공통 처리
};

const mainPage = () => {
    const con2 = document.querySelector('.con2');
    if (!con2) return;

    const itemsContainer = con2.querySelector('.con2 .items');
    const itemsCols = con2.querySelectorAll('.con2 .items-col');
    const filters = con2.querySelectorAll('.con2 .filter');

    const defaultFontSize = '75px';
    const activeFontSize = '250px';

    /** h1 텍스트를 문자 단위 span으로 분할 */
    function splitTextIntoSpans(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            const text = element.innerText;
            element.innerHTML = text
                .split('')
                .map((char) => `<span>${char}</span>`)
                .join('');
        });
    }

    /** 필터 타이틀 폰트 사이즈 애니메이션 */
    function animateFontSize(target, fontSize) {
        if (!target) return;
        const spans = target.querySelectorAll('.con2  span');
        gsap.to(spans, {
            fontSize,
            stagger: 0.025,
            duration: 0.5,
            ease: 'power2.out',
        });
    }

    /** 아이템 비우기 */
    function clearItems() {
        itemsCols.forEach((col) => (col.innerHTML = ''));
    }

    /** 아이템 추가 (2열 교차 배치) */
    function addItemsToCols(filter = 'all') {
        let colIndex = 0;
        const filteredItems = items.filter((item) => filter === 'all' || item.tag.includes(filter));

        filteredItems.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
        <div class="item-img">
          <img src="${item.img}" alt="${item.title}">
        </div>
        <div class="item-copy"><p>${item.title}</p></div>
      `;
            itemsCols[colIndex % itemsCols.length].appendChild(itemElement);
            colIndex++;
        });
    }

    /** 아이템 교체 애니메이션 + 높이 갱신 */
    function animateItems(filter) {
        gsap.to(itemsContainer, {
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
                clearItems();
                addItemsToCols(filter);
                gsap.to(itemsContainer, {
                    opacity: 1,
                    duration: 0.25,
                    onComplete: () => {
                        setCon2Height();
                        ScrollTrigger.refresh();
                    },
                });
            },
        });
    }

    /** con2 높이를 items 실제 콘텐츠에 맞춰 강제 */
    function setCon2Height() {
        const itemsEl = con2.querySelector('.items');
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const contentH = itemsEl ? itemsEl.scrollHeight : 0;
        con2.style.height = Math.max(vh, contentH) + 'px';
    }

    // === 초기 세팅 ===
    splitTextIntoSpans('.con2 .filter h1');
    const activeH1 = con2.querySelector('.filter.active h1');
    if (activeH1) animateFontSize(activeH1, activeFontSize);
    addItemsToCols();
    setCon2Height();

    // 필터 클릭 이벤트
    filters.forEach((filterBtn) => {
        filterBtn.addEventListener('click', function () {
            if (this.classList.contains('active')) return;

            // 👉 클릭 시 con2 최상단으로 스크롤 이동 후 아이템 교체
            gsap.to(window, {
                scrollTo: { y: con2, offsetY: 0 },
                duration: 0.6,
                ease: 'power2.inOut',
                onComplete: () => {
                    // 이전 활성 필터 축소
                    const prevActiveH1 = con2.querySelector('.filter.active h1');
                    if (prevActiveH1) animateFontSize(prevActiveH1, defaultFontSize);

                    // 활성 토글
                    filters.forEach((f) => f.classList.remove('active'));
                    this.classList.add('active');

                    // 새 활성 필터 확대
                    const newActiveH1 = this.querySelector('h1');
                    animateFontSize(newActiveH1, activeFontSize);

                    // 목록 교체
                    const filterValue = this.getAttribute('data-filter') || 'all';
                    animateItems(filterValue);
                },
            });
        });
    });

    // === filters pin 설정 ===
    ScrollTrigger.create({
        id: 'pin-filters',
        trigger: con2,
        start: 'top top',
        end: () => {
            const itemsEl = con2.querySelector('.con2 .items');
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const contentH = itemsEl ? itemsEl.scrollHeight : 0;
            return `+=${Math.max(0, contentH - vh)}`;
        },
        pin: '.con2 .filters', // 👉 필터만 pin
        pinSpacing: false,
        anticipatePin: 1,
        // markers: true,
    });

    // 리사이즈/로드 대응
    window.addEventListener('load', () => {
        setCon2Height();
        ScrollTrigger.refresh();
    });
    window.addEventListener('resize', () => {
        setCon2Height();
        ScrollTrigger.refresh();
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
