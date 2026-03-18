const common = () => {
    // 메뉴등 공통
};

const mainPage = () => {};

const projectsPage = () => {};
const aboutPage = () => {};
const processPage = () => {
    const imagesContainer = document.querySelector('.images');
    const preview = document.querySelector('.preview');
    const minimap = document.querySelector('.minimap');

    function getElementTop(element) {
        let top = 0;
        while (element) {
            top += element.offsetTop;
            element = element.offsetParent;
        }
        return top;
    }

    const imagesStart = getElementTop(imagesContainer);
    const imagesEnd = imagesStart + imagesContainer.offsetHeight;
    const viewportHeight = window.innerHeight;
    const previewHeight = preview.offsetHeight;
    const previewMaxTranslate = (minimap.offsetHeight - previewHeight) * 2.84;

    function handleScroll() {
        const scrollPosition = window.scrollY;
        const scrollRange = imagesEnd - imagesStart - viewportHeight;
        const previewScrollRange = Math.min(previewMaxTranslate, scrollRange);

        if (scrollPosition >= imagesStart && scrollPosition <= imagesEnd - viewportHeight) {
            let scrollFraction = (scrollPosition - imagesStart) / scrollRange;
            let previewTranslateY = scrollFraction * previewScrollRange;
            preview.style.transform = `translateX(-50%) translateY(${previewTranslateY}px)`;
        } else if (scrollPosition < imagesStart) {
            preview.style.transform = 'translateX(-50%) translateY(0px)';
        } else {
            preview.style.transform = `translateX(-50%) translateY(${previewMaxTranslate}px)`;
        }
    }

    window.addEventListener('scroll', handleScroll);

    const togglePoint = window.innerHeight * 4;
    const wrapper = document.querySelector('.wrapper');

    function checkScroll() {
        if (window.scrollY >= togglePoint) {
            wrapper.classList.add('dark-theme');
        } else {
            wrapper.classList.remove('dark-theme');
        }
    }

    window.addEventListener('scroll', checkScroll);
};

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
