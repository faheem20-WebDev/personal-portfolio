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
