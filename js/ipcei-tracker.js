// IPCEI Wasserstoff & Batterien - 30. Juni 2026 Deadline
// Website Tracking & Analytics

document.addEventListener('DOMContentLoaded', function() {
    
    // IPCEI Deadline Countdown
    const ipceiDeadline = new Date('2026-06-30T23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = ipceiDeadline - now;
        
        if (distance < 0) {
            document.getElementById('ipcei-countdown').innerHTML = 'Deadline abgelaufen!';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        
        const element = document.getElementById('ipcei-countdown');
        if (element) {
            element.innerHTML = `⏰ Noch ${weeks} Wochen (${days} Tage) bis zur IPCEI Deadline!`;
            element.style.color = weeks <= 4 ? '#dc2626' : '#059669';
        }
    }
    
    // Update countdown every hour
    updateCountdown();
    setInterval(updateCountdown, 3600000);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form validation enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc2626';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Bitte füllen Sie alle erforderlichen Felder aus.');
            }
        });
    });
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Track outbound links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Outbound click:', this.href);
            // Optional: Send to analytics
        });
    });
    
    console.log('IPCEI Tracker initialized - Deadline: 30.06.2026');
});
