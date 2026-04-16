// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light-mode'
const currentTheme = localStorage.getItem('theme') || 'light-mode';
document.body.className = currentTheme;
updateThemeIcon();

function toggleTheme() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    
    const newTheme = isDarkMode ? 'light-mode' : 'dark-mode';
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

function updateThemeIcon() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const iconClass = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    const label = isDarkMode ? 'Light Mode' : 'Dark Mode';
    
    // Update desktop toggle icon
    const desktopIcon = themeToggle.querySelector('i');
    desktopIcon.className = iconClass;
    
    // Update mobile toggle icon and label
    const mobileIcon = themeToggleMobile.querySelector('i');
    const mobileLabel = themeToggleMobile.querySelector('.toggle-label');
    mobileIcon.className = iconClass;
    mobileLabel.textContent = label;
}

// ==================== NAVBAR STICKY SCROLL ====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.style.transform = navLinks.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.style.transform = 'rotate(0deg)';
    });
});

// Close menu when theme toggle is clicked on mobile
themeToggleMobile.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.style.transform = 'rotate(0deg)';
});

// ==================== SCROLL TO SECTION ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== HERO CAROUSEL (3 SECTIONS CYCLING) ====================
let currentHeroSection = 1; // Active hero section (1, 2, or 3)
const totalHeroSections = 3;

let heroSlide1 = 0, heroSlide2 = 0, heroSlide3 = 0;
const heroTotal = 5;
let heroInterval, heroSectionInterval;

// Initialize all 3 hero carousels
function initAllHeroCarousels() {
    initHeroCarouselDots(1, 'heroDots');
    initHeroCarouselDots(2, 'heroDots2');
    initHeroCarouselDots(3, 'heroDots3');
}

function initHeroCarouselDots(sectionNum, dotsId) {
    const dotsContainer = document.getElementById(dotsId);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < heroTotal; i++) {
        const dot = document.createElement('div');
        dot.className = `hero-dot ${i === 0 ? 'active' : ''}`;
        dot.textContent = i + 1;
        dot.onclick = () => goToHeroSlide(sectionNum, i);
        dotsContainer.appendChild(dot);
    }
}

// Show specific hero section
function showHeroSection(sectionNum) {
    document.getElementById('home').style.display = sectionNum === 1 ? 'flex' : 'none';
    document.getElementById('hero2').style.display = sectionNum === 2 ? 'flex' : 'none';
    document.getElementById('hero3').style.display = sectionNum === 3 ? 'flex' : 'none';
    currentHeroSection = sectionNum;
}

// Show slide within a hero section
function showHeroSlide(sectionNum, n) {
    const carouselId = sectionNum === 1 ? 'heroCarousel' : sectionNum === 2 ? 'heroCarousel2' : 'heroCarousel3';
    const carousel = document.getElementById(carouselId);
    
    // Reset animation classes on all slides
    carousel.querySelectorAll('.hero-slide-content').forEach(content => {
        content.classList.remove('active');
    });

    if (sectionNum === 1) {
        heroSlide1 = (n + heroTotal) % heroTotal;
        carousel.style.transform = `translateX(-${heroSlide1 * 100}%)`;
        updateHeroDots(1, 'heroDots');
        // Trigger animations on new active slide
        setTimeout(() => {
            carousel.querySelectorAll('.hero-slide')[heroSlide1].querySelector('.hero-slide-content').classList.add('active');
        }, 50);
    } else if (sectionNum === 2) {
        heroSlide2 = (n + heroTotal) % heroTotal;
        carousel.style.transform = `translateX(-${heroSlide2 * 100}%)`;
        updateHeroDots(2, 'heroDots2');
        setTimeout(() => {
            carousel.querySelectorAll('.hero-slide')[heroSlide2].querySelector('.hero-slide-content').classList.add('active');
        }, 50);
    } else if (sectionNum === 3) {
        heroSlide3 = (n + heroTotal) % heroTotal;
        carousel.style.transform = `translateX(-${heroSlide3 * 100}%)`;
        updateHeroDots(3, 'heroDots3');
        setTimeout(() => {
            carousel.querySelectorAll('.hero-slide')[heroSlide3].querySelector('.hero-slide-content').classList.add('active');
        }, 50);
    }
}

// Next slide within current section
function nextHeroSlide() {
    if (currentHeroSection === 1) {
        showHeroSlide(1, heroSlide1 + 1);
    } else if (currentHeroSection === 2) {
        showHeroSlide(2, heroSlide2 + 1);
    } else if (currentHeroSection === 3) {
        showHeroSlide(3, heroSlide3 + 1);
    }
}

// Go to specific slide
function goToHeroSlide(sectionNum, slideNum) {
    showHeroSlide(sectionNum, slideNum);
    resetHeroInterval();
}

// Update dots for active slide
function updateHeroDots(sectionNum, dotsId) {
    const dots = document.querySelectorAll(`#${dotsId} .hero-dot`);
    const activeSlide = sectionNum === 1 ? heroSlide1 : sectionNum === 2 ? heroSlide2 : heroSlide3;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeSlide);
    });
}

// Cycle to next hero section
function nextHeroSection() {
    const nextSection = (currentHeroSection % totalHeroSections) + 1;
    showHeroSection(nextSection);
}

// Start auto-sliding within current section
function startHeroAutoSlide() {
    heroInterval = setInterval(nextHeroSlide, 6000);
}

// Cycle to next hero section every 30 seconds
function startHeroSectionRotation() {
    heroSectionInterval = setInterval(nextHeroSection, 30000);
}

// Reset intervals
function resetHeroInterval() {
    clearInterval(heroInterval);
    startHeroAutoSlide();
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initAllHeroCarousels();
    showHeroSection(1);
    
    // Initialize first slide with animations
    setTimeout(() => {
        document.querySelector('#heroCarousel .hero-slide-content').classList.add('active');
        document.querySelector('#heroCarousel2 .hero-slide-content').classList.add('active');
        document.querySelector('#heroCarousel3 .hero-slide-content').classList.add('active');
    }, 100);
    
    startHeroAutoSlide();
    startHeroSectionRotation();

    // Pause on hover
    const heroBanners = document.querySelectorAll('.hero');
    heroBanners.forEach(banner => {
        banner.addEventListener('mouseenter', () => {
            clearInterval(heroInterval);
            clearInterval(heroSectionInterval);
        });
        banner.addEventListener('mouseleave', () => {
            startHeroAutoSlide();
            startHeroSectionRotation();
        });
    });
});

// ==================== DOCTORS CAROUSEL ====================
let doctorSlide = 0;
const doctorTotal = 3;
let doctorInterval;

function showDoctorSlide(n) {
    const carousel = document.getElementById('doctorsCarousel');
    doctorSlide = (n + doctorTotal) % doctorTotal;
    carousel.style.transform = `translateX(-${doctorSlide * 100}%)`;
    updateDoctorDots();
}

function nextDoctor() {
    showDoctorSlide(doctorSlide + 1);
}

function previousDoctor() {
    showDoctorSlide(doctorSlide - 1);
}

function updateDoctorDots() {
    const dotsContainer = document.getElementById('doctorDots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < doctorTotal; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === doctorSlide ? 'active' : ''}`;
        dot.onclick = () => showDoctorSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Auto-slide doctors
doctorInterval = setInterval(nextDoctor, 3000);

const doctorsSection = document.querySelector('.doctors');
if (doctorsSection) {
    doctorsSection.addEventListener('mouseenter', () => clearInterval(doctorInterval));
    doctorsSection.addEventListener('mouseleave', () => {
        doctorInterval = setInterval(nextDoctor, 3000);
    });
}

updateDoctorDots();

// ==================== TESTIMONIALS CAROUSEL ====================
let testimonialSlide = 0;
const testimonialTotal = 4;
let testimonialInterval;

function showTestimonialSlide(n) {
    const carousel = document.getElementById('testimonialsCarousel');
    testimonialSlide = (n + testimonialTotal) % testimonialTotal;
    carousel.style.transform = `translateX(-${testimonialSlide * 100}%)`;
    updateTestimonialDots();
}

function nextTestimonial() {
    showTestimonialSlide(testimonialSlide + 1);
}

function previousTestimonial() {
    showTestimonialSlide(testimonialSlide - 1);
}

function updateTestimonialDots() {
    const dotsContainer = document.getElementById('testimonialDots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < testimonialTotal; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === testimonialSlide ? 'active' : ''}`;
        dot.onclick = () => showTestimonialSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Auto-slide testimonials
testimonialInterval = setInterval(nextTestimonial, 3000);

const testimonialsSection = document.querySelector('.testimonials');
if (testimonialsSection) {
    testimonialsSection.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    testimonialsSection.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 3000);
    });
}

updateTestimonialDots();

// ==================== FORM VALIDATION ====================
const form = document.getElementById('appointmentForm');

function validateForm() {
    let isValid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const department = document.getElementById('department').value;

    // Validate name
    if (name.length < 3) {
        showError('name', 'Name must be at least 3 characters');
        isValid = false;
    } else {
        clearError('name');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    } else {
        clearError('email');
    }

    // Validate phone
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    } else {
        clearError('phone');
    }

    // Validate date
    if (!date) {
        showError('date', 'Please select a date');
        isValid = false;
    } else {
        clearError('date');
    }

    // Validate department
    if (!department) {
        showError('department', 'Please select a department');
        isValid = false;
    } else {
        clearError('department');
    }

    return isValid;
}

function showError(fieldName, message) {
    const error = document.querySelector(`[data-error="${fieldName}"]`);
    if (error) {
        error.textContent = message;
        error.classList.add('show');
    }
}

function clearError(fieldName) {
    const error = document.querySelector(`[data-error="${fieldName}"]`);
    if (error) {
        error.textContent = '';
        error.classList.remove('show');
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
        alert('Appointment booked successfully! We will contact you soon.');
        form.reset();
    }
}

// ==================== SCROLL TO TOP ====================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== HERO BOUNCE ANIMATION ====================
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-slide-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('bounce-animation');
        }, 3000);
    }
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
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

// Observe all cards and elements for scroll animation
document.querySelectorAll('.service-card, .doctor-card, .gallery-item, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
