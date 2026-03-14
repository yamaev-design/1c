// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('active');
    });
}

// Mobile dropdown toggle functionality
document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        content.classList.toggle('hidden');
        if (content.classList.contains('hidden')) {
            icon.style.transform = 'rotate(0deg)';
        } else {
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu?.classList.add('hidden');
            mobileMenu?.classList.remove('active');
        }
    });
});

// FAQ Toggle functionality
document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('i');
        
        answer.classList.toggle('hidden');
        icon.style.transform = answer.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    });
});

// Set offer dates
const setOfferDates = () => {
    const today = new Date();
    const offerEndDate = new Date(today);
    offerEndDate.setDate(today.getDate() + 14);
    
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = offerEndDate.toLocaleDateString('ru-RU', options);
    
    const offerDateEl = document.getElementById('offer-date');
    const offerEndDateEl = document.getElementById('offer-end-date');
    
    if (offerDateEl) offerDateEl.textContent = formattedDate;
    if (offerEndDateEl) offerEndDateEl.textContent = formattedDate;
};

// Countdown Timer
const startCountdown = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);
    
    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };
    
    updateTimer();
    setInterval(updateTimer, 1000);
};

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start).toLocaleString('ru-RU') + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('ru-RU') + (element.dataset.suffix || '');
        }
    };
    updateCounter();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            if (target) {
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

// Initialize counters
document.addEventListener('DOMContentLoaded', () => {
    // Set offer dates
    setOfferDates();
    
    // Start countdown timer
    startCountdown();
    
    // Setup stat counters
    const stats = [
        { id: 'stat-1', target: 500, suffix: '+' },
        { id: 'stat-2', target: 2400000, suffix: '', format: '2.4M' },
        { id: 'stat-3', target: 99.9, suffix: '%' },
        { id: 'stat-4', target: 24, suffix: '/7' }
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            if (stat.format) {
                element.textContent = stat.format;
            } else {
                element.dataset.target = stat.target;
                element.dataset.suffix = stat.suffix;
                counterObserver.observe(element);
            }
        }
    });

    // Add parallax effect to floating elements
    document.addEventListener('mousemove', (e) => {
        const floatingElements = document.querySelectorAll('.animate-float, .animate-float-delayed');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 10;
            const x = mouseX * speed;
            const y = mouseY * speed;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Intersection Observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe elements with animation classes
    document.querySelectorAll('.group').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // Initialize all groups to visible after a short delay for hydration
    setTimeout(() => {
        document.querySelectorAll('.group').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
    
    // Contact form handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="flex items-center gap-2"><svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg> Отправка...</span>';
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('send-mail.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(formData).toString()
                });
                
                const result = await response.json();
                
                if (result.status === 'success') {
                    alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
                    contactForm.reset();
                } else {
                    alert(result.message || 'Ошибка при отправке. Попробуйте позже.');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке. Проверьте подключение к интернету.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                lucide.createIcons();
            }
        });
    }
});

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav?.classList.add('shadow-lg');
        nav?.classList.add('bg-navy-900/95');
    } else {
        nav?.classList.remove('shadow-lg');
        nav?.classList.remove('bg-navy-900/95');
    }
    
    lastScroll = currentScroll;
});

// Add loading state to CTA buttons
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Попробовать') || button.textContent.includes('Получить')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const originalContent = this.innerHTML;
            
            this.innerHTML = '<div class="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin"></div>';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<span class="flex items-center gap-2"><i data-lucide="check" class="w-5 h-5"></i>Заявка отправлена!</span>';
                lucide.createIcons();
                this.classList.remove('from-gold-400', 'to-gold-600');
                this.classList.add('from-green-400', 'to-green-600');
                
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.disabled = false;
                    this.classList.add('from-gold-400', 'to-gold-600');
                    this.classList.remove('from-green-400', 'to-green-600');
                    lucide.createIcons();
                }, 2000);
            }, 1500);
        });
    }
});

// Form validation helper (if forms are added later)
const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

// Console greeting
console.log('%c🤖 AI Seller 1C', 'font-size: 24px; font-weight: bold; color: #fbbf24;');
console.log('%cЛендинг загружен успешно!', 'font-size: 14px; color: #60a5fa;');

// Modal functionality for trial signup
const openModal = () => {
    const modal = document.getElementById('trial-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        lucide.createIcons();
    }
};

const closeModal = () => {
    const modal = document.getElementById('trial-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

// Add click handlers to all CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.trial-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Modal close handlers
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeSuccess = document.getElementById('close-success');

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (closeSuccess) closeSuccess.addEventListener('click', closeModal);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Form submission handler - отправка через AJAX на send-mail.php
    const trialForm = document.getElementById('trial-form');
    const formContent = document.getElementById('form-content');
    const successContent = document.getElementById('form-success');

    if (trialForm) {
        trialForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = trialForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="flex items-center gap-2"><svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg> Отправка...</span>';
            
            // Сбор данных формы
            const formData = new FormData(trialForm);
            
            try {
                // Отправка на PHP-обработчик
                const response = await fetch('send-mail.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(formData).toString()
                });
                
                const result = await response.json();
                
                if (result.status === 'success') {
                    // Показываем экран успеха
                    formContent.classList.add('hidden');
                    successContent.classList.remove('hidden');
                    
                    // Сброс формы
                    trialForm.reset();
                    
                    // Возврат кнопки через 3 секунды и закрытие модального окна
                    setTimeout(() => {
                        closeModal();
                        setTimeout(() => {
                            formContent.classList.remove('hidden');
                            successContent.classList.add('hidden');
                        }, 300);
                    }, 2000);
                } else {
                    alert(result.message || 'Ошибка при отправке. Попробуйте позже.');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке. Проверьте подключение к интернету.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
        
        // Добавляем обработчик для кнопки закрытия окна успеха
        const closeSuccess = document.getElementById('close-success');
        if (closeSuccess) {
            closeSuccess.addEventListener('click', closeModal);
        }
    }
});