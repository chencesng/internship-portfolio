document.addEventListener('DOMContentLoaded', () => {

    // --- Responsive Mobile Navigation Control System ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMobileMenu = () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('mobile-active');
        document.body.classList.toggle('overflow-hidden');
    };

    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('mobile-active')) {
                toggleMobileMenu();
            }
        });
    });

    // --- Dynamic Header Styling on Viewport Scroll ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Intersection Observer for Scroll-Reveal Animations ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => revealObserver.observe(element));

    // --- Precise Scroll-Spy System for Tracking Navigation Active State ---
    const sections = document.querySelectorAll('section[id]');

    const scrollSpyActiveState = () => {
        const currentScrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 90; // Tailored tracking window to match shorter offsets
            const sectionId = section.getAttribute('id');
            const targetNavLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (targetNavLink) {
                if (currentScrollY > sectionTop && currentScrollY <= sectionTop + sectionHeight) {
                    targetNavLink.classList.add('active');
                } else {
                    targetNavLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollSpyActiveState);
});