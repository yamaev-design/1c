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