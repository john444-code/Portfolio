// script.js - JavaScript functionality for the portfolio

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.display = 'none';
    mobileMenuToggle.style.background = 'none';
    mobileMenuToggle.style.border = 'none';
    mobileMenuToggle.style.fontSize = '1.5rem';
    mobileMenuToggle.style.cursor = 'pointer';
    mobileMenuToggle.style.color = '#333';

    const navbar = document.querySelector('.navbar .container');
    navbar.appendChild(mobileMenuToggle);

    const navLinksContainer = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', function() {
        navLinksContainer.classList.toggle('mobile-menu-open');
    });

    // Show/hide mobile menu button based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            navLinksContainer.classList.add('mobile-menu');
        } else {
            mobileMenuToggle.style.display = 'none';
            navLinksContainer.classList.remove('mobile-menu', 'mobile-menu-open');
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');

            let isValid = true;
            let errors = [];

            // Validate name
            if (!nameInput.value.trim()) {
                errors.push('Name is required');
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                errors.push('Email is required');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }

            // Validate message
            if (!messageInput.value.trim()) {
                errors.push('Message is required');
                isValid = false;
            }

            // Show validation results
            const existingErrorDiv = this.querySelector('.form-errors');
            if (existingErrorDiv) {
                existingErrorDiv.remove();
            }

            if (!isValid) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-errors';
                errorDiv.style.color = 'red';
                errorDiv.style.marginBottom = '1rem';
                errorDiv.innerHTML = '<ul>' + errors.map(error => `<li>${error}</li>`).join('') + '</ul>';
                this.insertBefore(errorDiv, this.firstChild);
            } else {
                // Form is valid - you could submit it here
                const successDiv = document.createElement('div');
                successDiv.className = 'form-success';
                successDiv.style.color = 'green';
                successDiv.style.marginBottom = '1rem';
                successDiv.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                this.insertBefore(successDiv, this.firstChild);

                // Clear form
                this.reset();

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successDiv.remove();
                }, 5000);
            }
        });
    }

    // Scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '2rem';
    backToTopButton.style.right = '2rem';
    backToTopButton.style.backgroundColor = '#0066cc';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.width = '3rem';
    backToTopButton.style.height = '3rem';
    backToTopButton.style.fontSize = '1.5rem';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.opacity = '0';
    backToTopButton.style.transition = 'opacity 0.3s';
    backToTopButton.style.zIndex = '1000';
    backToTopButton.style.display = 'none';

    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
            setTimeout(() => {
                backToTopButton.style.opacity = '1';
            }, 10);
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                backToTopButton.style.display = 'none';
            }, 300);
        }
    });

    // Typing animation for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }
});