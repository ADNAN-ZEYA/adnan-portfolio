document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Background Blur
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/80', 'backdrop-blur-md', 'shadow-lg');
        } else {
            navbar.classList.remove('bg-black/80', 'backdrop-blur-md', 'shadow-lg');
        }
    });

    // 2. Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hero-text, .hero-card, .section-fade').forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'ease-out');
        observer.observe(el);
    });
});
