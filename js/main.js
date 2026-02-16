/**
 * Förderungen Mair - Main JavaScript
 * Modernes, interaktives JavaScript für die Website
 */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initScrollProgress();
    initScrollToTop();
    initMobileMenu();
    initCookieBanner();
    initFormHandling();
    initSmoothScroll();
    initCounterAnimations();
});

/**
 * Navigation
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Scroll Animations with Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('visible'));
    }
}

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;

    window.addEventListener('scroll', function() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (window.scrollY / scrollHeight) * 100;
        scrollProgress.style.width = Math.min(scrollPercentage, 100) + '%';
    });
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

/**
 * Cookie Banner
 */
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');

    if (!cookieBanner || !cookieAccept) return;

    // Check if already accepted
    if (localStorage.getItem('cookiesAccepted')) {
        return;
    }

    // Show banner with delay
    setTimeout(() => {
        cookieBanner.classList.add('visible');
    }, 1000);

    // Accept button
    cookieAccept.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('visible');
    });
}

/**
 * Form Handling
 */
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '#e2e8f0';
                }
            });

            if (isValid) {
                // Show success message
                alert('Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir werden uns innerhalb von 48 Stunden bei Ihnen melden.');
                form.reset();
            }
        });
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Counter Animations for Stats
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.hero-stat-number, .stat-number');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }
}

function animateCounter(element) {
    const text = element.textContent;
    const hasEuro = text.includes('€');
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    
    let targetValue = parseFloat(text.replace(/[^0-9.]/g, ''));
    
    if (isNaN(targetValue)) return;

    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + (targetValue - startValue) * easeOutQuart;

        let displayValue = Math.floor(currentValue);
        if (targetValue % 1 !== 0) {
            displayValue = currentValue.toFixed(1);
        }

        let displayText = displayValue.toString();
        if (hasEuro) displayText = '€' + displayText;
        if (displayValue >= 1000 && hasEuro) {
            displayText = '€' + (displayValue / 1000).toFixed(0) + 'Mio';
        }
        if (hasPercent) displayText += '%';
        if (hasPlus) displayText += '+';

        element.textContent = displayText;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = text; // Ensure final value matches
        }
    }

    requestAnimationFrame(updateCounter);
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

/**
 * Debounce Function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle Function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Initialize all features
 */
function initAll() {
    initNavigation();
    initScrollAnimations();
    initScrollProgress();
    initScrollToTop();
    initMobileMenu();
    initCookieBanner();
    initFormHandling();
    initSmoothScroll();
    initCounterAnimations();
    initAnchorScroll();
    initParallax();
    initTiltEffect();
}

/**
 * Anchor scroll with offset
 */
function initAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax effect for hero section
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    }, 10));
}

/**
 * Tilt effect for cards
 */
function initTiltEffect() {
    const cards = document.querySelectorAll('.card, .branchen-card, .program-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/**
 * Preload critical resources
 */
function preloadResources() {
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
    ];
    
    criticalFonts.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
