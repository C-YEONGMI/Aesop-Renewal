document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
        'hop',
        'M0,0 C0.091,0.543 0.148,0.662 0.277,0.786 0.405,0.909 0.596,0.979 1,1 '
    );

    const menuOpen = document.querySelector('.menu-open');
    const menuClose = document.querySelector('.menu-close');
    const menu = document.querySelector('.menu');
    const menuItems = document.querySelectorAll('.menu-item');
    let isMenuOpen = false;

    function splitTextIntoSpans(selector) {
        let elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            let text = element.innerText;
            let splitText = text
                .split('')
                .map(function (char) {
                    return `<span>${char === ' ' ? '&nbsp;&nbsp;' : char}</span>`;
                })
                .join('');
            element.innerHTML = splitText;
        });
    }

    splitTextIntoSpans('.menu-link p');

    gsap.set('.menu-close p', { y: 40 });
    gsap.set('.menu-link p span', { y: 250 });

    const handleMenu = () => {
        gsap.to(menu, {
            width: isMenuOpen ? '20vw' : '100vw',
            duration: 1,
            ease: 'hop',
        });

        gsap.to('.menu-item', {
            justifyContent: isMenuOpen ? 'center' : 'flex-start',
            duration: 1,
            ease: 'power3.out',
        });

        gsap.to('.menu-item-index', {
            alignItems: isMenuOpen ? 'center' : 'flex-start',
            duration: 1,
            ease: 'power3.out',
            onComplete: () => {
                isMenuOpen = !isMenuOpen;
                menuItems.forEach((menuItem) => {
                    if (isMenuOpen) {
                        menuItem.classList.add('menu-opened');
                    } else {
                        menuItem.classList.remove('menu-opened');
                    }
                });
            },
        });

        gsap.to('.menu-close p', {
            y: isMenuOpen ? 40 : 0,
            duration: 1,
            ease: 'power3.out',
        });

        gsap.to('.menu-open p', {
            y: isMenuOpen ? 0 : -40,
            duration: 1,
            ease: 'power3.out',
        });

        menuItems.forEach((menuItem) => {
            const menuItemLetters = menuItem.querySelectorAll('.menu-link p span');
            gsap.to(menuItemLetters, {
                delay: isMenuOpen ? 0 : 0.25,
                y: isMenuOpen ? 250 : 0,
                duration: 1,
                stagger: isMenuOpen ? -0.075 : 0.075,
                ease: 'power3.out',
            });
        });
    };

    menuOpen.addEventListener('click', handleMenu);
    menuClose.addEventListener('click', handleMenu);
});
