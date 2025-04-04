// Animation on scroll initialization
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element is in view
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('animate');
                }
                
                // Specific animations for sections
                if (entry.target.id === 'classes') {
                    animateClassCards();
                } else if (entry.target.id === 'members') {
                    animateMemberCards();
                }
                
                // Stop observing after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Observe main sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Animate class cards sequentially
function animateClassCards() {
    const cards = document.querySelectorAll('.class-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
            card.style.opacity = '1';
        }, index * 150);
    });
}

// Animate member cards with stagger
function animateMemberCards() {
    const members = document.querySelectorAll('.member-card');
    members.forEach((member, index) => {
        setTimeout(() => {
            member.style.transform = 'translateY(0)';
            member.style.opacity = '1';
        }, index * 100);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    
    // Hero section text animation
    setTimeout(() => {
        document.querySelector('.hero-content h1').style.opacity = '1';
        document.querySelector('.hero-content h1').style.transform = 'translateY(0)';
        
        setTimeout(() => {
            document.querySelector('.hero-content p').style.opacity = '1';
            document.querySelector('.hero-content p').style.transform = 'translateY(0)';
            
            setTimeout(() => {
                document.querySelector('.hero-content .btn').style.opacity = '1';
            }, 300);
        }, 300);
    }, 500);
    
    // Dumbbell loader animation
    const leftWeight = document.querySelector('.weight.left');
    const rightWeight = document.querySelector('.weight.right');
    
    function animateDumbbell() {
        leftWeight.style.animation = 'leftWeight 1.5s infinite ease-in-out';
        rightWeight.style.animation = 'rightWeight 1.5s infinite ease-in-out';
    }
    
    animateDumbbell();
});