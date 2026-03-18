import { items } from '../api/photoData.js';

const common = () => {
    // 메뉴등 공통
};

const mainPage = () => {
    const gallery = document.querySelector('.gallery');

    const itemPositions = [
        { top: '-5%', left: '5%' },
        { top: '40%', left: '-5%' },
        { top: '25%', left: '20%' },
        { top: '60%', left: '40%' },
        { top: '70%', left: '10%' },
        { top: '-10%', left: '65%' },
        { top: '10%', left: '85%' },
        { top: '40%', left: '60%' },
        { top: '80%', left: '70%' },
        { top: '50%', left: '95%' },
    ];

    items.forEach((itemData, index) => {
        const item = document.createElement('div');
        item.classList.add('item');

        const position = itemPositions[index];
        item.style.top = position.top;
        item.style.left = position.left;

        const img = document.createElement('img');
        img.src = itemData.img;
        item.appendChild(img);

        const link = document.createElement('div');
        link.classList.add('link');
        link.innerHTML = `<a href="${itemData.link}" target="_blank">${itemData.icon}</a>`;
        item.appendChild(link);

        gallery.appendChild(item);
    });

    document.addEventListener('mousemove', (e) => {
        gallery.querySelectorAll('.item').forEach((item, index) => {
            const animationFactor = items[index].parllaxSpeed;

            const deltaX = (e.clientX - window.innerWidth / 2) * animationFactor;
            const deltaY = (e.clientY - window.innerHeight / 2) * animationFactor;

            gsap.to(item, { x: deltaX, y: deltaY, duration: 0.75 });
        });
    });
};

const projectsPage = () => {};
const aboutPage = () => {};

const processPage = () => {};

(() => {
    common();
    const path = location.href;
    if (path.includes('index.html')) {
        mainPage();
    } else if (path.includes('process.html')) {
        processPage();
    } else if (path.includes('projects.html')) {
        projectsPage();
    } else if (path.includes('about.html')) {
        aboutPage();
    } else if (path.includes('process.html')) {
        processPage();
    }
})();
