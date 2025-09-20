// Ensure smooth animations on page load
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '1';
});

// Mobile Menu Toggle
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    document.getElementById('mainNav').classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Highlight the course card if it's a course link
            if (target.classList.contains('course-card')) {
                // Remove any existing highlights
                document.querySelectorAll('.course-card').forEach(card => {
                    card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                });
                
                // Add highlight to the target course
                target.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.3)';
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }, 3000);
            }
        }
        
        // Close mobile menu if open
        document.getElementById('mainNav').classList.remove('active');
    });
});

// Footer link handling
document.querySelectorAll('.course-link, .support-link, .legal-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const linkType = this.classList.contains('course-link') ? 'course' : 
                       this.classList.contains('support-link') ? 'support' : 'legal';
        const page = this.getAttribute('data-page');
        
        // Show a message that the page would be loaded
        alert(`The ${page} ${linkType} page would be loaded here`);
    });
});

// Header Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Animation on Scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-card, .course-card, .about-image, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.querySelectorAll('.btn-primary, .btn-outline, .social-link, .course-card').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}
