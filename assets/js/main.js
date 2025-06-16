/**
 * GRUPO SEAL - MAIN.JS CORREGIDO
 * JavaScript principal con carrusel y menú funcional
 */

// ===================================
// INICIALIZACIÓN PRINCIPAL
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Grupo SEAL Website...');
    
    // Marcar que main.js se ha cargado
    window.mainJsLoaded = true;
    
    // Inicializar aplicación principal si está disponible
    if (window.GrupoSealApp) {
        const app = new window.GrupoSealApp();
        app.init();
        return;
    }

    // Fallback: Funcionalidad básica
    initBasicFunctionality();
});

// ===================================
// FUNCIONALIDAD BÁSICA
// ===================================
function initBasicFunctionality() {
    console.log('📦 Cargando funcionalidad básica...');
    
    // 1. Menu móvil básico
    setupBasicMobileMenu();
    
    // 2. Carrusel hero CORREGIDO
    initializeHeroCarousel();
    
    // 3. Scroll animations básicas
    setupBasicScrollAnimations();
    
    // 4. Back to top básico
    setupBasicBackToTop();
    
    // 5. Enlaces smooth scroll básicos
    setupBasicSmoothScroll();
    
    // 6. Header scroll effect
    setupHeaderScrollEffect();
    
    // 7. Efectos hover básicos
    setupBasicHoverEffects();
    
    console.log('✅ Funcionalidad básica cargada');
}

// ===================================
// CARRUSEL HERO - FUNCIÓN COMPLETAMENTE CORREGIDA
// ===================================
function initializeHeroCarousel() {
    console.log('🎠 Inicializando carrusel hero...');
    
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const heroSection = document.querySelector('.hero');
    
    let currentSlide = 0;
    let slideInterval = null;
    let isPaused = false;
    const autoplayDelay = 4000; // 4 segundos - más rápido para testing
    
    console.log(`📸 Slides encontradas: ${slides.length}`);
    console.log(`📍 Indicadores encontrados: ${indicators.length}`);
    console.log(`◀️ Botón anterior encontrado: ${prevBtn ? 'Sí' : 'No'}`);
    console.log(`▶️ Botón siguiente encontrado: ${nextBtn ? 'Sí' : 'No'}`);
    
    // Verificar si hay slides disponibles
    if (slides.length <= 1) {
        console.log('⚠️ Solo hay una slide o ninguna disponible');
        hideCarouselControls();
        return;
    }
    
    // INICIALIZAR: Asegurar que solo la primera slide esté activa
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === 0) {
            slide.classList.add('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === 0) {
            indicator.classList.add('active');
        }
    });

    // ===================================
    // FUNCIONES DEL CARRUSEL
    // ===================================
    
    // Función para ir a una slide específica
    function goToSlide(index) {
        if (index === currentSlide) return;
        
        console.log(`📍 Cambiando de slide ${currentSlide + 1} a ${index + 1}`);
        
        // Remover clase active de slide e indicador actual
        if (slides[currentSlide]) slides[currentSlide].classList.remove('active');
        if (indicators[currentSlide]) indicators[currentSlide].classList.remove('active');
        
        // Activar nueva slide e indicador
        currentSlide = index;
        if (slides[currentSlide]) slides[currentSlide].classList.add('active');
        if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
        
        // Log para debugging
        console.log(`✅ Slide activa: ${currentSlide + 1}`);
    }

    // Función para ir a la siguiente slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    // Función para ir a la slide anterior
    function prevSlide() {
        const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        goToSlide(prevIndex);
    }

    // Iniciar autoplay
    function startAutoplay() {
        if (slideInterval) return;
        
        slideInterval = setInterval(() => {
            if (!isPaused) {
                console.log('🔄 Auto-cambio de slide');
                nextSlide();
            }
        }, autoplayDelay);
        
        console.log(`▶️ Autoplay iniciado (cada ${autoplayDelay}ms)`);
    }

    // Pausar autoplay
    function pauseAutoplay() {
        isPaused = true;
        console.log('⏸️ Autoplay pausado');
    }

    // Reanudar autoplay (con delay)
    function resumeAutoplay() {
        setTimeout(() => {
            isPaused = false;
            console.log('▶️ Autoplay reanudado');
        }, 2000); // Esperar 2 segundos antes de reanudar
    }

    // Detener autoplay completamente
    function stopAutoplay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
        isPaused = false;
        console.log('⏹️ Autoplay detenido');
    }

    // Ocultar controles si solo hay una slide
    function hideCarouselControls() {
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        const prevButton = document.querySelector('.carousel-prev');
        const nextButton = document.querySelector('.carousel-next');
        
        if (indicatorsContainer) indicatorsContainer.style.display = 'none';
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
    }

    // ===================================
    // EVENT LISTENERS
    // ===================================
    
    // Controles de navegación (flechas)
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('👆 Click en flecha anterior');
            pauseAutoplay();
            prevSlide();
            resumeAutoplay();
        });
        console.log('✅ Event listener añadido a flecha anterior');
    } else {
        console.log('❌ No se encontró botón anterior');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('👆 Click en flecha siguiente');
            pauseAutoplay();
            nextSlide();
            resumeAutoplay();
        });
        console.log('✅ Event listener añadido a flecha siguiente');
    } else {
        console.log('❌ No se encontró botón siguiente');
    }

    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`👆 Click en indicador ${index + 1}`);
            pauseAutoplay();
            goToSlide(index);
            resumeAutoplay();
        });
    });
    console.log(`✅ Event listeners añadidos a ${indicators.length} indicadores`);

    // Pausar/reanudar en hover
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            console.log('🖱️ Mouse sobre hero - pausando autoplay');
            pauseAutoplay();
        });
        
        heroSection.addEventListener('mouseleave', () => {
            console.log('🖱️ Mouse fuera de hero - reanudando autoplay');
            resumeAutoplay();
        });
    }

    // Controles de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            console.log('⌨️ Tecla flecha izquierda');
            pauseAutoplay();
            prevSlide();
            resumeAutoplay();
        } else if (e.key === 'ArrowRight') {
            console.log('⌨️ Tecla flecha derecha');
            pauseAutoplay();
            nextSlide();
            resumeAutoplay();
        } else if (e.key === ' ') {
            e.preventDefault();
            if (isPaused) {
                resumeAutoplay();
            } else {
                pauseAutoplay();
            }
        }
    });

    // Touch/swipe para móviles
    setupTouchControls(heroSection);

    // Manejo de visibilidad de la página
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('📱 Página oculta - pausando autoplay');
            pauseAutoplay();
        } else {
            console.log('📱 Página visible - reanudando autoplay');
            resumeAutoplay();
        }
    });

    // Manejo de foco de ventana
    window.addEventListener('blur', () => {
        console.log('🪟 Ventana perdió foco - pausando autoplay');
        pauseAutoplay();
    });
    
    window.addEventListener('focus', () => {
        console.log('🪟 Ventana recuperó foco - reanudando autoplay');
        resumeAutoplay();
    });

    // ===================================
    // CONTROLES TÁCTILES
    // ===================================
    function setupTouchControls(element) {
        if (!element) return;
        
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        element.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            handleSwipe(startX, startY, endX, endY);
        }, { passive: true });

        function handleSwipe(startX, startY, endX, endY) {
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const minSwipeDistance = 50;

            // Solo procesar swipes horizontales
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                console.log(`📱 Swipe detectado: ${deltaX > 0 ? 'derecha' : 'izquierda'}`);
                pauseAutoplay();
                
                if (deltaX > 0) {
                    prevSlide(); // Swipe right
                } else {
                    nextSlide(); // Swipe left
                }
                
                resumeAutoplay();
            }
        }
    }

    // ===================================
    // INICIALIZAR EL CARRUSEL
    // ===================================
    
    // Iniciar autoplay
    startAutoplay();
    console.log('✅ Carrusel hero inicializado correctamente');
    
    // Hacer funciones disponibles globalmente para debugging
    window.carouselControls = {
        goToSlide,
        nextSlide,
        prevSlide,
        startAutoplay,
        stopAutoplay,
        pauseAutoplay,
        resumeAutoplay,
        getCurrentSlide: () => currentSlide,
        getSlidesCount: () => slides.length,
        getStatus: () => ({
            currentSlide: currentSlide + 1,
            totalSlides: slides.length,
            isPlaying: !isPaused && slideInterval !== null,
            isPaused: isPaused
        })
    };
    
    // Log de estado inicial
    console.log('📊 Estado inicial del carrusel:', window.carouselControls.getStatus());
}

// ===================================
// MENU MÓVIL BÁSICO - CORREGIDO
// ===================================
function setupBasicMobileMenu() {
    console.log('📱 Configurando menú móvil...');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) {
        console.log('❌ Elementos del menú móvil no encontrados');
        return;
    }

    console.log('✅ Elementos del menú móvil encontrados');

    // Toggle menú
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = navLinks.classList.contains('show');
        console.log(`📱 Toggle menú: ${isOpen ? 'cerrando' : 'abriendo'}`);
        
        navLinks.classList.toggle('show');
        
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Prevenir scroll del body cuando el menú está abierto
        if (navLinks.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer click en enlaces
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('📱 Click en enlace del menú - cerrando menú');
            navLinks.classList.remove('show');
            document.body.style.overflow = '';
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            if (navLinks.classList.contains('show')) {
                console.log('📱 Click fuera del menú - cerrando menú');
                navLinks.classList.remove('show');
                document.body.style.overflow = '';
                
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('show')) {
            console.log('📱 Tecla Escape - cerrando menú');
            navLinks.classList.remove('show');
            document.body.style.overflow = '';
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    console.log('✅ Menú móvil configurado correctamente');
}

// ===================================
// ANIMACIONES SCROLL BÁSICAS
// ===================================
function setupBasicScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-reveal, .scroll-animation, .fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    
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
function setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.style.height = '70px';
            header.style.backgroundColor = 'rgba(10, 37, 60, 0.98)';
            header.classList.add('scrolled');
        } else {
            header.style.height = '80px';
            header.style.backgroundColor = 'rgba(10, 37, 60, 0.95)';
            header.classList.remove('scrolled');
        }
    });
}

// ===================================
// EFECTOS HOVER BÁSICOS
// ===================================
function setupBasicHoverEffects() {
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
}

// ===================================
// MANEJO DE ERRORES
// ===================================
window.addEventListener('error', function(e) {
    console.error('❌ Error en Grupo SEAL Website:', e.error);
});

// ===================================
// UTILIDADES GLOBALES
// ===================================
window.GrupoSeal = {
    // Control manual del carrusel
    carousel: {
        next: function() {
            if (window.carouselControls) {
                console.log('🎮 Control manual: siguiente slide');
                window.carouselControls.nextSlide();
            }
        },
        prev: function() {
            if (window.carouselControls) {
                console.log('🎮 Control manual: slide anterior');
                window.carouselControls.prevSlide();
            }
        },
        goTo: function(index) {
            if (window.carouselControls) {
                console.log(`🎮 Control manual: ir a slide ${index + 1}`);
                window.carouselControls.goToSlide(index);
            }
        },
        play: function() {
            if (window.carouselControls) {
                console.log('🎮 Control manual: iniciar autoplay');
                window.carouselControls.startAutoplay();
            }
        },
        pause: function() {
            if (window.carouselControls) {
                console.log('🎮 Control manual: pausar autoplay');
                window.carouselControls.pauseAutoplay();
            }
        },
        status: function() {
            if (window.carouselControls) {
                console.log('🎮 Estado del carrusel:', window.carouselControls.getStatus());
                return window.carouselControls.getStatus();
            }
        }
    },
    
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
console.log('🎮 Controles disponibles: GrupoSeal.carousel.next(), GrupoSeal.carousel.prev(), GrupoSeal.carousel.status()');

// Debug: Mostrar estado cada 5 segundos
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setInterval(() => {
        if (window.carouselControls) {
            console.log('🔄 Estado carrusel:', window.carouselControls.getStatus());
        }
    }, 5000);
}