// Smooth scrolling for navigation links that start with #
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent menu item click

        // Create a temporary notification
        const notification = document.createElement('div');
        notification.textContent = 'Added to cart!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 600;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove notification after 2 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    });
});

// Enhanced menu item interactions
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Add a subtle bounce effect
        this.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add loading animation class removal after page load
window.addEventListener('load', function() {
    document.body.classList.remove('loading');
});

// Parallax effect for home section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const homeSection = document.getElementById('home');

    if (homeSection) {
        const rate = scrolled * -0.5;
        homeSection.style.backgroundPosition = `center ${rate}px`;
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0) scale(1);
        }
        40%, 43% {
            transform: translate3d(0, -10px, 0) scale(1.1);
        }
        70% {
            transform: translate3d(0, -5px, 0) scale(1.05);
        }
        90% {
            transform: translate3d(0, -2px, 0) scale(1.02);
        }
    }
`;
document.head.appendChild(style);
