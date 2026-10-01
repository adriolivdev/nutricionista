/* ==========================================
   NUTRIÇÃO CONSCIENTE - JAVASCRIPT COMPLETO
   ========================================== */

/* ==========================================
   MENU HAMBURGER
   ========================================== */

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Fechar menu ao clicar em um link
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

/* ==========================================
   WHATSAPP WIDGET INTERATIVO
   ========================================== */

const whatsappToggle = document.getElementById('whatsappToggle');
const whatsappWidget = document.getElementById('whatsappWidget');
const whatsappMenu = document.querySelector('.whatsapp-menu');

whatsappToggle.addEventListener('click', () => {
    whatsappMenu.classList.toggle('active');
});

// Fechar widget ao clicar em qualquer outro lugar
document.addEventListener('click', (e) => {
    if (!whatsappWidget.contains(e.target)) {
        whatsappMenu.classList.remove('active');
    }
});

/* ==========================================
   FAQ ACCORDION
   ========================================== */

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item, index) => {
    const button = item.querySelector('.faq-question');
    
    // Abrir primeiro item por padrão
    if (index === 0) {
        item.classList.add('active');
    }
    
    button.addEventListener('click', () => {
        // Fechar outros itens
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle item atual
        item.classList.toggle('active');
    });
});

/* ==========================================
   INTERSECTION OBSERVER - FADE IN
   ========================================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observer em elementos
document.querySelectorAll('.servico-card, .abordagem-item, .beneficio, .avaliacao').forEach(el => {
    observer.observe(el);
});

/* ==========================================
   LAZY LOADING
   ========================================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ==========================================
   SMOOTH SCROLL
   ========================================== */

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const top = element.offsetTop - 80;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

// Links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            smoothScroll(href);
        }
    });
});

/* ==========================================
   BOTÕES CTA
   ========================================== */

const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-header, .btn-light');

buttons.forEach(btn => {
    if (btn.textContent.toLowerCase().includes('agendar') || 
        btn.textContent.toLowerCase().includes('conheça') ||
        btn.textContent.toLowerCase().includes('conhecer')) {
        
        btn.addEventListener('click', (e) => {
            if (!btn.hasAttribute('href')) {
                e.preventDefault();
                smoothScroll('#contato');
            }
        });
    }
});

/* ==========================================
   VIEWPORT HEIGHT FIX (Mobile)
   ========================================== */

function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

/* ==========================================
   SCROLL TO TOP
   ========================================== */

let scrollToTopBtn = null;

function createScrollToTopBtn() {
    const btn = document.createElement('button');
    btn.className = 'scroll-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Voltar ao topo');
    btn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        z-index: 990;
        background-color: rgba(45, 90, 61, 0.9);
        color: white;
        border: none;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(btn);
    return btn;
}

window.addEventListener('scroll', () => {
    if (!scrollToTopBtn) {
        scrollToTopBtn = createScrollToTopBtn();
    }
    
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('scroll-to-top')) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

/* ==========================================
   TRACKING / ANALYTICS
   ========================================== */

function trackEvent(category, action, label) {
    if (window.gtag) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Tracking de CTAs
document.querySelectorAll('.btn-primary, .cta-header, .btn-light').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        trackEvent('engagement', 'cta_click', text);
    });
});

// Tracking de WhatsApp
whatsappToggle.addEventListener('click', () => {
    trackEvent('engagement', 'whatsapp_widget_toggle', 'Nutritionist');
});

// Tracking de links externos
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        trackEvent('engagement', 'external_link', href);
    });
});

/* ==========================================
   KEYBOARD NAVIGATION
   ========================================== */

document.addEventListener('keydown', (e) => {
    // Escape para fechar menu
    if (e.key === 'Escape') {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        whatsappMenu.classList.remove('active');
    }
    
    // Alt + H para ir para home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        smoothScroll('#inicio');
    }
});

/* ==========================================
   MOBILE MENU - CLOSE ON ORIENTATION CHANGE
   ========================================== */

window.addEventListener('orientationchange', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
});

/* ==========================================
   WHATSAPP QUICK REPLY
   ========================================== */

const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        trackEvent('engagement', 'whatsapp_start_conversation', 'Nutritionist');
    });
}

/* ==========================================
   POLYFILL - SMOOTH SCROLL
   ========================================== */

if (!('scrollBehavior' in document.documentElement.style)) {
    function smoothScrollPolyfill(top, behavior = 'smooth') {
        if (behavior === 'auto') {
            window.scrollTo(0, top);
            return;
        }
        
        const start = window.scrollY;
        const distance = top - start;
        const duration = 1000;
        const startTime = performance.now();
        
        function ease(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        
        function scroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease_progress = ease(progress);
            window.scrollTo(0, start + distance * ease_progress);
            
            if (elapsed < duration) {
                requestAnimationFrame(scroll);
            }
        }
        
        requestAnimationFrame(scroll);
    }
    
    window.scrollTo = function(options) {
        if (typeof options === 'object') {
            smoothScrollPolyfill(options.top, options.behavior);
        }
    };
}

/* ==========================================
   COLOR SCHEME SUPPORT
   ========================================== */

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkScheme.matches) {
    // Dark mode styles podem ser adicionados aqui
}

/* ==========================================
   PERFORMANCE - IMAGE OPTIMIZATION
   ========================================== */

document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
        img.style.aspectRatio = 'auto';
    }
});

/* ==========================================
   CORE WEB VITALS OPTIMIZATION
   ========================================== */

function preloadResources() {
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect);
}

window.addEventListener('load', preloadResources);

/* ==========================================
   DEBOUNCE & THROTTLE UTILITIES
   ========================================== */

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

/* ==========================================
   RESPONSIVE BEHAVIOR
   ========================================== */

const debouncedResize = debounce(() => {
    if (window.innerWidth > 768) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        whatsappMenu.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', debouncedResize);

/* ==========================================
   ERROR HANDLING
   ========================================== */

window.addEventListener('error', (e) => {
    if (e.target !== window) {
        console.warn('Erro ao carregar recurso:', e.target.src || e.target);
    }
});

/* ==========================================
   INICIALIZAÇÃO
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Aplicar fade-in aos elementos visíveis
    const visibleElements = document.querySelectorAll('.servico-card, .abordagem-item, .beneficio, .avaliacao');
    
    visibleElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('fade-in');
        }
    });
    
    // Adicionar data attributes para tracking
    document.querySelectorAll('[href^="#"]').forEach(link => {
        const target = link.getAttribute('href');
        link.setAttribute('data-section', target);
    });
    
    console.log('Nutrição Consciente - Site carregado com sucesso!');
});

/* ==========================================
   FINAL - PAGE READY
   ========================================== */

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM pronto - Nutrição Consciente');
    });
} else {
    console.log('Nutrição Consciente - Página totalmente carregada');
}
