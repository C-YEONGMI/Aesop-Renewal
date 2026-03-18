import { data } from '../api/data.js';

const common = () => {
    const tl = gsap.timeline({ paused: true });
    function openNav() {
        animateOpenNav();
        const navBtn = document.getElementById('menu-toggle-btn');
        navBtn.onclick = function (e) {
            navBtn.classList.toggle('active');
            tl.reversed(!tl.reversed());
        };
    }

    openNav();

    function animateOpenNav() {
        tl.to('#nav-container', 0.2, {
            autoAlpha: 1,
        });

        tl.to('.site-logo', 0.2, {
            color: '#fff',
        });

        tl.from('.flex > div', 0.4, {
            opacity: 0,
            y: 10,
            stagger: {
                amount: 0.04,
            },
        });

        tl.to(
            '.nav-link > a',
            0.8,
            {
                opacity: 1,
                top: 0,
                ease: 'power2.inOut',
                stagger: {
                    amount: 0.1,
                },
            },
            '<'
        );

        tl.from('.nav-footer', 0.3, {
            opacity: 0,
        }).reverse();
    }
};
// projects
const projectsPage = () => {
    const overlay = document.querySelector('.projects-overlay');
    const closeBtn = document.querySelector('.projects-overlay #close-btn');

    const tl2 = gsap.timeline({ paused: true, overwrite: 'auto' });
    tl2.to(overlay, {
        duration: 0.5,
        bottom: '0px',
        rotation: 0,
        transformOrigin: 'bottom center',
        ease: 'power2.out',
    });
    const items = document.querySelectorAll('.projects .items .item');
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            tl2.play();

            updateOverlay(data[index]);
        });
    });

    closeBtn.addEventListener('click', () => {
        tl2.reverse();
    });

    function updateOverlay(dataItem) {
        const itemName = document.querySelector(
            '.projects-overlay #item-category'
        ).previousElementSibling;
        const itemCategory = document.querySelector('.projects-overlay #item-category');
        const itemLink = document.querySelector('.projects-overlay #item-link');
        const itemCopy = document.querySelector('.projects-overlay #item-copy');
        const itemImg = document.querySelector('.projects-overlay #item-img');
        const itemSpan = document.querySelector('.projects-overlay .item-copy + span');

        itemName.textContent = dataItem.itemName;
        itemCategory.textContent = dataItem.itemCategory;
        itemLink.href = dataItem.itemLink;
        itemCopy.textContent = dataItem.itemCopy;
        itemImg.src = dataItem.itemImg;
        itemSpan.textContent = dataItem.contribution;
    }

    document.addEventListener('click', (e) => {
        if (!overlay.contains(e.target) && !isItem(e.target)) {
            tl2.reverse();
        }
    });

    function isItem(target) {
        return target.closest('.projects  .items .item');
    }
};

const processPage = () => {};
const aboutPage = () => {};

(() => {
    common();
    const path = location.href;
    if (path.includes('process.html')) {
        processPage();
    } else if (path.includes('projects.html')) {
        projectsPage();
    } else if (path.includes('about.html')) {
        projecaboutPagetsPage();
    }
})();
