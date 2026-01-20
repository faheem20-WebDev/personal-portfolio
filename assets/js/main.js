// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navbar = document.getElementById('navbar');

function toggleMenu() {
    const isClosed = mobileMenu.classList.contains('translate-x-full');
    
    if (isClosed) {
        // Open Menu
        mobileMenu.classList.remove('translate-x-full');
        mobileOverlay.classList.remove('hidden');
        setTimeout(() => mobileOverlay.classList.remove('opacity-0'), 10); // Fade in
        document.body.classList.add('overflow-hidden');
    } else {
        // Close Menu
        mobileMenu.classList.add('translate-x-full');
        mobileOverlay.classList.add('opacity-0');
        setTimeout(() => mobileOverlay.classList.add('hidden'), 300); // Wait for fade out
        document.body.classList.remove('overflow-hidden');
    }
}

menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
mobileOverlay.addEventListener('click', toggleMenu); // Close when clicking outside

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Navbar Scroll Effect & Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top-btn');

window.addEventListener('scroll', () => {
    // Navbar effect
    if (window.scrollY > 50) {
        navbar.classList.add('bg-navy-900/90', 'backdrop-blur-md', 'shadow-lg');
    } else {
        navbar.classList.remove('bg-navy-900/90', 'backdrop-blur-md', 'shadow-lg');
    }

    // Scroll to Top visibility
    if (window.scrollY > 500) {
        scrollTopBtn.classList.remove('translate-y-20', 'opacity-0');
    } else {
        scrollTopBtn.classList.add('translate-y-20', 'opacity-0');
    }
});

// Scroll to Top Action
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

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

// Contact Form Handling (AJAX)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const data = new FormData(contactForm);
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="ph ph-spinner animate-spin"></i>';
        
        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.innerHTML = 'Thanks for your message! I will get back to you soon.';
                formStatus.className = 'text-center text-sm font-medium mt-4 text-green-400';
                contactForm.reset();
            } else {
                const jsonData = await response.json();
                if (Object.hasOwn(jsonData, 'errors')) {
                    formStatus.innerHTML = jsonData.errors.map(error => error.message).join(", ");
                } else {
                    formStatus.innerHTML = "Oops! There was a problem submitting your form.";
                }
                formStatus.className = 'text-center text-sm font-medium mt-4 text-red-400';
            }
        } catch (error) {
            formStatus.innerHTML = "Oops! There was a problem submitting your form.";
            formStatus.className = 'text-center text-sm font-medium mt-4 text-red-400';
        }

        formStatus.classList.remove('hidden');
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="ph ph-paper-plane-right group-hover:translate-x-1 transition-transform"></i>';
    });
}