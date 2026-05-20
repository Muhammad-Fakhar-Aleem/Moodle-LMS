// ============================================
// Form Validation and Submission
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!validateForm(formData)) {
                return;
            }

            // Provide immediate debug feedback and prevent double submits
            console.log('Contact form submit triggered', formData);
            showAlert('Sending message...', 'success');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.dataset.originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
            }

            // Submit form (in a real application, this would send to a server)
            submitForm(formData, submitBtn);
        });
    }
});

// Form Validation Function
function validateForm(data) {
    // Check required fields
    if (!data.name.trim()) {
        showAlert('Please enter your name', 'error');
        return false;
    }

    if (!data.email.trim()) {
        showAlert('Please enter your email', 'error');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showAlert('Please enter a valid email address', 'error');
        return false;
    }

    if (!data.service) {
        showAlert('Please select a service', 'error');
        return false;
    }

    if (!data.message.trim()) {
        showAlert('Please enter your message', 'error');
        return false;
    }

    return true;
}

// Google Apps Script URL for form submission
// 1) Create a Google Sheet
// 2) Add Apps Script with a doPost(e) handler
// 3) Deploy as Web App and copy the URL below
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwKq7--yGnZpNsYLFpxVsCINocL956DYDD18R0f0F4K8BB1yT6_3IlzoBL2n0rTQ2E/exec';
// Optional fallback endpoint (e.g. Formspree). If you have a Formspree endpoint, paste it here.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdajeowk';

// Form Submission Function
function submitForm(data, submitBtn) {
    console.log('submitForm() starting', data);
    if (!GOOGLE_SHEETS_WEB_APP_URL) {
        showAlert('Form submission is not configured yet. Add your Google Apps Script URL in js/script.js', 'error');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || 'Send Message';
        }
        return;
    }

    fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
            showAlert('Thank you! Your message was sent successfully.', 'success');
            document.getElementById('contactForm').reset();
        } else {
            showAlert('Something went wrong while sending your message. Please try again later.', 'error');
            console.error('Google Sheets submission failed:', result);
        }
    })
    .catch(error => {
        console.error('Submission error (primary):', error);
        // Try fallback to Formspree if configured
        if (FORMSPREE_ENDPOINT) {
            console.log('Attempting fallback POST to Formspree endpoint');
            const fallbackData = new FormData();
            fallbackData.append('name', data.name);
            fallbackData.append('email', data.email);
            fallbackData.append('phone', data.phone);
            fallbackData.append('service', data.service);
            fallbackData.append('message', data.message);

            fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: fallbackData
            })
            .then(fbResp => {
                if (fbResp.ok) {
                    return fbResp.json().then(() => {
                        showAlert('Thank you! Your message was sent successfully (fallback).', 'success');
                        document.getElementById('contactForm').reset();
                    });
                } else {
                    return fbResp.json().then(errJson => {
                        showAlert('Unable to send message. Please try again later.', 'error');
                        console.error('Formspree fallback failed:', errJson);
                    }).catch(() => {
                        showAlert('Unable to send message. Please try again later.', 'error');
                        console.error('Formspree fallback failed with non-json response:', fbResp);
                    });
                }
            })
            .catch(fbErr => {
                showAlert('Unable to send message. Please try again later.', 'error');
                console.error('Fallback submission error:', fbErr);
            });
        } else {
            showAlert('Unable to send message. Please try again later.', 'error');
        }
    })
    .finally(() => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || 'Send Message';
        }
    });
}

// Alert Function
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Make sure alert is visible on top of all content
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translateX(-50%)';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.style.maxWidth = '90%';

    // Insert alert at the top of the body
    document.body.insertBefore(alertDiv, document.body.firstChild);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
    console.log('Alert shown:', message, type);
}

// ============================================
// Smooth Scrolling Navigation
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// Navbar Active State
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ============================================
// Animate Elements on Scroll
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Animate feature boxes
document.querySelectorAll('.feature-box').forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
    box.style.transition = 'all 0.6s ease';
    observer.observe(box);
});

// Animate pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ============================================
// Counter Animation (Optional)
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const range = target - start;
    const increment = range / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ============================================
// Mobile Menu Collapse on Link Click
// ============================================
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.navbar-collapse a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: true
            });
        }
    });
});

// ============================================
// Service Card Click Handler
// ============================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        console.log('Service selected:', title);
    });
});

// ============================================
// Pricing Card Highlight (Featured)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const featuredCard = document.querySelector('.pricing-card.featured');
    if (featuredCard) {
        // Add badge or highlight
        const badge = document.createElement('span');
        badge.className = 'badge bg-primary position-absolute top-0 start-50 translate-middle-x';
        badge.textContent = 'MOST POPULAR';
        badge.style.marginTop = '-12px';
        featuredCard.style.position = 'relative';
        featuredCard.appendChild(badge);
    }
});

// ============================================
// Toggle Button Animation
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ============================================
// Lazy Load Images (Optional)
// ============================================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                imageObserver.unobserve(entry.target);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// Console Message
// ============================================
console.log('%cWelcome to MoodleExperts!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cYour trusted partner for all Moodle solutions.', 'color: #764ba2; font-size: 14px;');
