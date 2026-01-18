// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navbar = document.getElementById('navbar');

function toggleMenu() {
    mobileMenu.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
}

menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('translate-x-full')) {
            toggleMenu();
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-navy-900/90', 'backdrop-blur-md', 'shadow-lg');
    } else {
        navbar.classList.remove('bg-navy-900/90', 'backdrop-blur-md', 'shadow-lg');
    }
});

// Reveal Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(section);
});