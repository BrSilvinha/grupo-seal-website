/**
 * GRUPO SEAL - MAIN.JS
 * JavaScript principal simplificado
 */

// ===================================
// INICIALIZACIÓN PRINCIPAL
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Grupo SEAL Website...');
    
    // Inicializar aplicación principal si está disponible
    if (window.GrupoSealApp) {
        const app = new window.GrupoSealApp();
        app.init();
        return;
    }

    // Fallback: Funcionalidad básica si components.js no está disponible
    initBasicFunctionality();
});

// ===================================
// FUNCIONALIDAD BÁSICA (FALLBACK)
// ===================================
function initBasicFunctionality() {
    console.log('📦 Cargando funcionalidad básica...');
    
    // Menu móvil básico
    setupBasicMobileMenu();
    
    // Carrusel hero básico
    setupBasicCarousel();
    
    // Scroll animations básicas
    setupBasicScrollAnimations();
    
    // Back to top básico
    setupBasicBackToTop();
    
    // Enlaces smooth scroll básicos
    setupBasicSmoothScroll();
    
    console.log('✅ Funcionalidad básica cargada');
}

// ===================================
// MENU MÓVIL BÁSICO
// ===================================
function setupBasicMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Cerrar menú al hacer click en enlaces
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('show');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// ===================================
// CARRUSEL HERO BÁSICO
// ===================================
function setupBasicCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    if (slides.length <= 1) return;

    function nextSlide() {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Cambiar slide cada 5 segundos
    setInterval(nextSlide, 5000);
}

// ===================================
// ANIMACIONES SCROLL BÁSICAS
// ===================================
function setupBasicScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-reveal, .scroll-animation');
    
    function checkScroll() {
        elements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop <= windowHeight * 0.85) {
                element.classList.add('show');
            }
        });
    }

    // Verificar al cargar
    checkScroll();
    
    // Verificar al hacer scroll
    window.addEventListener('scroll', checkScroll);
}

// ===================================
// BACK TO TOP BÁSICO
// ===================================
function setupBasicBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// SMOOTH SCROLL BÁSICO
// ===================================
function setupBasicSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (header) {
        if (window.pageYOffset > 50) {
            header.style.height = '70px';
            header.style.backgroundColor = 'rgba(10, 37, 60, 0.98)';
        } else {
            header.style.height = '80px';
            header.style.backgroundColor = 'rgba(10, 37, 60, 0.95)';
        }
    }
});

// ===================================
// EFECTOS HOVER BÁSICOS
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Service cards hover
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(10, 37, 60, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(10, 37, 60, 0.1)';
        });
    });

    // Icon hover effects
    const iconHovers = document.querySelectorAll('.icon-hover');
    iconHovers.forEach(function(icon) {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// ===================================
// OPTIMIZACIÓN DE PERFORMANCE
// ===================================

// Lazy loading básico para imágenes
function setupBasicLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(function(img) {
        imageObserver.observe(img);
    });
}

// Llamar lazy loading
if ('IntersectionObserver' in window) {
    setupBasicLazyLoading();
}

// ===================================
// MANEJO DE ERRORES
// ===================================
window.addEventListener('error', function(e) {
    console.error('Error en Grupo SEAL Website:', e.error);
});

// ===================================
// UTILIDADES GLOBALES
// ===================================
window.GrupoSeal = {
    // Función para mostrar/ocultar elementos
    toggle: function(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = element.style.display === 'none' ? 'block' : 'none';
        }
    },
    
    // Función para animar elemento
    animate: function(selector, className) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add(className);
        }
    },
    
    // Función para scroll suave
    scrollTo: function(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

console.log('✨ Grupo SEAL Main.js cargado correctamente');