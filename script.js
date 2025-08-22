// Main JavaScript for Portfolio Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initStatsCounter();
    initSkillBars();
    initProjectFilters();
    initContactForm();
    initSmoothScrolling();
});

// Loading Screen
function initLoader() {
    const loader = document.querySelector('.loader-container');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    });
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Typing Effect
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'Full-Stack Developer',
        'UI/UX Designer',
        'Problem Solver',
        'Creative Thinker'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();
}

// Scroll Animations
function initScrollAnimations() {
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
    
    // Observe elements that need animation
    const animateElements = document.querySelectorAll(
        '.text-block, .skill-card, .project-card, .contact-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-grid');
    let animated = false;
    
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const increment = target / 100;
            let current = 0;
            
            const updateStat = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateStat();
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        });
    });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');
    let skillsAnimated = false;
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.dataset.width;
            bar.style.width = width;
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                setTimeout(animateSkillBars, 500);
                skillsAnimated = true;
            }
        });
    });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default HTML submit

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');

        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xyzprjok", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                modal.classList.add('show'); // Show success modal
                form.reset();
            } else {
                alert("There was an error sending your message. Please try again.");
            }

        } catch (error) {
            console.error("Formspree error:", error);
            alert("There was an error sending your message. Please try again.");
        } finally {
            submitBtn.classList.remove('loading');
        }
    });
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function for scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation to buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn')) {
        const btn = e.target;
        btn.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('successModal');
        if (modal.classList.contains('show')) {
            closeModal();
        }
        
        // Close mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Handle scroll-dependent animations here if needed
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);