/* ===== MENU SHOW/HIDE ===== */
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        overlay = document.getElementById('nav-overlay'),
        navToggle = document.getElementById(toggleId),
        toggleIcon = toggle ? toggle.querySelector('i') : null;

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            // Update overlay visibility
            if (overlay) {
                overlay.classList.toggle('show');
            }
            // Update aria-expanded for accessibility
            const isExpanded = nav.classList.contains('show');
            navToggle.setAttribute('aria-expanded', isExpanded);

            // Toggle hamburger icon to X icon
            if (toggleIcon) {
                if (isExpanded) {
                    toggleIcon.classList.remove('fa-bars');
                    toggleIcon.classList.add('fa-times');
                } else {
                    toggleIcon.classList.remove('fa-times');
                    toggleIcon.classList.add('fa-bars');
                }
            }

            // Prevent body scroll when menu is open
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on overlay
        if (overlay) {
            overlay.addEventListener('click', () => {
                nav.classList.remove('show');
                overlay.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-times');
                    toggleIcon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            });
        }
    }
}
showMenu('nav-toggle', 'nav-menu');

/* ===== REMOVE MENU MOBILE ===== */
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const overlay = document.getElementById('nav-overlay');
    const toggleIcon = navToggle ? navToggle.querySelector('i') : null;
    // When we click on each nav__link, we remove the show class
    navMenu.classList.remove('show');
    if (overlay) {
        overlay.classList.remove('show');
    }
    navToggle.setAttribute('aria-expanded', 'false');
    // Reset icon to hamburger
    if (toggleIcon) {
        toggleIcon.classList.remove('fa-times');
        toggleIcon.classList.add('fa-bars');
    }
    document.body.style.overflow = '';
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ===== SCROLL SECTIONS ACTIVE LINK ===== */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 80,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ===== SCROLL REVEAL ANIMATION ===== */
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1500,
    delay: 200,
    reset: false,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
});



/* ===== MICRO-INTERACTION 1: BUTTON HOVER GLOW EFFECT ===== */
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    // Add ripple effect on click
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);

        this.appendChild(ripple);
    });

    // Add magnetic hover effect
    button.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Subtle magnetic effect
        this.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translate(0, 0)';
    });
});

// === MOBILE NAV TOGGLE ===
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu   = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks  = document.querySelectorAll('.nav__link');

    if (!navToggle || !navMenu) return;

    const openMenu = () => {
        navMenu.classList.add('show-menu');
        navOverlay && navOverlay.classList.add('show-overlay');
        navToggle.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        navMenu.classList.remove('show-menu');
        navOverlay && navOverlay.classList.remove('show-overlay');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
        if (navMenu.classList.contains('show-menu')) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    navToggle.addEventListener('click', toggleMenu);

    // Linke tıklayınca menüyü kapat
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Overlay’e tıklayınca kapat
    navOverlay && navOverlay.addEventListener('click', closeMenu);
});

/* ===== MICRO-INTERACTION 3: SMOOTH SCROLL TO SECTIONS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerHeight = document.querySelector('.l-header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===== MICRO-INTERACTION 4: PROJECT CARD HOVER EFFECT ===== */
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const thumbnail = card.querySelector('.project-card__thumbnail');

    if (thumbnail) {
        thumbnail.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        thumbnail.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
});

/* ===== NAVBAR SCROLL EFFECT ===== */
let lastScroll = 0;
const header = document.querySelector('.l-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
    }

    lastScroll = currentScroll;
});

/* ===== FADE IN ON SCROLL (Fallback if ScrollReveal fails) ===== */
const fadeInElements = document.querySelectorAll('.fade-in-up');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeInElements.forEach(element => {
    fadeInObserver.observe(element);
});

/* ===== PERFORMANCE: Lazy load images ===== */
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

/* ===== ACCESSIBILITY: Skip to main content ===== */
document.addEventListener('keydown', (e) => {
    // Skip to main content with Tab key
    if (e.key === 'Tab' && document.activeElement === document.body) {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
        }
    }
});

/* ===== CONTACT FORM VALIDATION & SUBMISSION ===== */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitButton = contactForm.querySelector('.button--submit');
    const formMessage = document.getElementById('form-message');

    // Error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    // Validation functions
    const validateName = (name) => {
        if (!name.trim()) {
            return 'Ad soyad gereklidir';
        }
        if (name.trim().length < 2) {
            return 'Ad soyad en az 2 karakter olmalıdır';
        }
        return '';
    };

    const validateEmail = (email) => {
        if (!email.trim()) {
            return 'E-posta adresi gereklidir';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Geçerli bir e-posta adresi giriniz';
        }
        return '';
    };

    const validateSubject = (subject) => {
        if (!subject.trim()) {
            return 'Konu gereklidir';
        }
        if (subject.trim().length < 3) {
            return 'Konu en az 3 karakter olmalıdır';
        }
        return '';
    };

    const validateMessage = (message) => {
        if (!message.trim()) {
            return 'Mesaj gereklidir';
        }
        if (message.trim().length < 10) {
            return 'Mesaj en az 10 karakter olmalıdır';
        }
        return '';
    };

    // Show error function
    const showError = (input, errorElement, errorMessage) => {
        input.style.borderColor = 'var(--error)';
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    };

    // Clear error function
    const clearError = (input, errorElement) => {
        input.style.borderColor = '';
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    };

    // Show success message
    const showMessage = (message, type = 'success') => {
        formMessage.textContent = message;
        formMessage.className = `contact__form-message ${type} show`;
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    };

    // Real-time validation
    nameInput.addEventListener('blur', () => {
        const error = validateName(nameInput.value);
        if (error) {
            showError(nameInput, nameError, error);
        } else {
            clearError(nameInput, nameError);
        }
    });

    emailInput.addEventListener('blur', () => {
        const error = validateEmail(emailInput.value);
        if (error) {
            showError(emailInput, emailError, error);
        } else {
            clearError(emailInput, emailError);
        }
    });

    subjectInput.addEventListener('blur', () => {
        const error = validateSubject(subjectInput.value);
        if (error) {
            showError(subjectInput, subjectError, error);
        } else {
            clearError(subjectInput, subjectError);
        }
    });

    messageInput.addEventListener('blur', () => {
        const error = validateMessage(messageInput.value);
        if (error) {
            showError(messageInput, messageError, error);
        } else {
            clearError(messageInput, messageError);
        }
    });

    // Clear errors on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            const errorElement = document.getElementById(`${input.id}-error`);
            if (input.style.borderColor === 'var(--error)' || input.style.borderColor === 'rgb(239, 68, 68)') {
                const error =
                    input.id === 'name' ? validateName(input.value) :
                        input.id === 'email' ? validateEmail(input.value) :
                            input.id === 'subject' ? validateSubject(input.value) :
                                validateMessage(input.value);

                if (!error) {
                    clearError(input, errorElement);
                }
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        const nameErrorMsg = validateName(nameInput.value);
        const emailErrorMsg = validateEmail(emailInput.value);
        const subjectErrorMsg = validateSubject(subjectInput.value);
        const messageErrorMsg = validateMessage(messageInput.value);

        // Show errors if any
        if (nameErrorMsg) showError(nameInput, nameError, nameErrorMsg);
        else clearError(nameInput, nameError);

        if (emailErrorMsg) showError(emailInput, emailError, emailErrorMsg);
        else clearError(emailInput, emailError);

        if (subjectErrorMsg) showError(subjectInput, subjectError, subjectErrorMsg);
        else clearError(subjectInput, subjectError);

        if (messageErrorMsg) showError(messageInput, messageError, messageErrorMsg);
        else clearError(messageInput, messageError);

        // If no errors, submit form
        if (!nameErrorMsg && !emailErrorMsg && !subjectErrorMsg && !messageErrorMsg) {
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.querySelector('.button__text').textContent = 'Gönderiliyor';

            // Simulate form submission (replace with actual API call)
            try {
                // Here you would normally send data to your backend
                // const formData = new FormData(contactForm);
                // const response = await fetch('/api/contact', {
                //     method: 'POST',
                //     body: formData
                // });

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Success
                showMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');
                contactForm.reset();

                // Clear all errors
                [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                    const errorElement = document.getElementById(`${input.id}-error`);
                    clearError(input, errorElement);
                });

            } catch (error) {
                // Error
                showMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.', 'error');
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.querySelector('.button__text').textContent = 'Mesajı Gönder';
            }
        }
    });
}

/* ===== GLASSMORPHISM CARD HOVER EFFECTS ===== */
const glassCards = document.querySelectorAll('.glass-card');

glassCards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

console.log('%c🎨 Portfolio Modernized!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cDark Mode • Glassmorphism • Modern Typography • Micro-interactions • SEO Optimized', 'color: #94a3b8; font-size: 12px;');
