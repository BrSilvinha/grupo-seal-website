/**
 * GRUPO SEAL - COMPONENTES JAVASCRIPT CORREGIDOS
 * Funciones modulares y reutilizables (sin conflictos de carrusel)
 */

// Usar utilidades globales si están disponibles
const CONFIG = window.GRUPO_SEAL_CONFIG || {
    breakpoints: { mobile: 768, tablet: 992, desktop: 1200 },
    animations: { duration: 300, easing: 'ease-in-out' },
    carousel: { autoplaySpeed: 5000, transitionDuration: 1500 }
};

// Usar Utils global o crear versión básica
const ComponentUtils = window.Utils || {
    isInViewport(element, offset = 100) {
        const rect = element.getBoundingClientRect();
        return rect.top <= (window.innerHeight - offset) && rect.bottom >= 0;
    },
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    smoothScroll(target, duration = 800) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) return;
        
        window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
        });
    },
    log: {
        info: (msg, ...args) => console.log(`🔵 [GS] ${msg}`, ...args),
        success: (msg, ...args) => console.log(`✅ [GS] ${msg}`, ...args),
        warning: (msg, ...args) => console.warn(`⚠️ [GS] ${msg}`, ...args),
        error: (msg, ...args) => console.error(`❌ [GS] ${msg}`, ...args)
    }
};

// ===================================
// COMPONENTE: HEADER
// ===================================
const Header = {
    init() {
        ComponentUtils.log.info('Inicializando Header...');
        this.setupMobileMenu();
        this.setupScrollEffect();
        this.setupActiveLinks();
        this.setupAccessibility();
    },

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (!menuToggle || !navLinks) {
            ComponentUtils.log.warning('Elementos del menú móvil no encontrados');
            return;
        }

        // Toggle menú
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu(navLinks, menuToggle);
        });

        // Cerrar menú al hacer click en enlaces
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu(navLinks, menuToggle);
                
                // Track navigation
                if (window.GrupoSealHelpers) {
                    window.GrupoSealHelpers.analytics.trackEvent('navigation', {
                        link: link.textContent,
                        href: link.href
                    });
                }
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                this.closeMenu(navLinks, menuToggle);
            }
        });

        // Cerrar menú con escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('show')) {
                this.closeMenu(navLinks, menuToggle);
                menuToggle.focus();
            }
        });
    },

    toggleMenu(navLinks, menuToggle) {
        const isOpen = navLinks.classList.contains('show');
        
        if (isOpen) {
            this.closeMenu(navLinks, menuToggle);
        } else {
            this.openMenu(navLinks, menuToggle);
        }
    },

    openMenu(navLinks, menuToggle) {
        navLinks.classList.add('show');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
        
        // Accessibility
        menuToggle.setAttribute('aria-expanded', 'true');
        navLinks.setAttribute('aria-hidden', 'false');
        
        // Focus en primer enlace
        const firstLink = navLinks.querySelector('a');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    },

    closeMenu(navLinks, menuToggle) {
        navLinks.classList.remove('show');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // Accessibility
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
    },

    setupScrollEffect() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.pageYOffset;
            
            if (scrollY > 50) {
                header.style.height = '70px';
                header.style.backgroundColor = 'rgba(10, 37, 60, 0.98)';
                header.classList.add('scrolled');
            } else {
                header.style.height = '80px';
                header.style.backgroundColor = 'rgba(10, 37, 60, 0.95)';
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll direction
            if (Math.abs(scrollY - lastScrollY) > 10) {
                if (scrollY > lastScrollY && scrollY > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                lastScrollY = scrollY;
            }

            ticking = false;
        };

        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
    },

    setupActiveLinks() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkPath = link.getAttribute('href');
            
            // Verificar si es la página actual
            if (linkPath === currentPath || 
                (currentPath !== '/' && currentPath.includes(linkPath.replace('.html', '')))) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    },

    setupAccessibility() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle && navLinks) {
            // ARIA attributes
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-controls', 'navigation');
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            
            navLinks.setAttribute('id', 'navigation');
            navLinks.setAttribute('aria-hidden', 'true');
            
            // Role attributes
            navLinks.setAttribute('role', 'navigation');
            navLinks.querySelectorAll('a').forEach((link, index) => {
                link.setAttribute('role', 'menuitem');
                link.setAttribute('tabindex', index === 0 ? '0' : '-1');
            });
        }
    }
};

// ===================================
// COMPONENTE: ANIMACIONES SCROLL
// ===================================
const ScrollAnimations = {
    init() {
        ComponentUtils.log.info('Inicializando ScrollAnimations...');
        this.elements = this.getAnimatedElements();
        this.observedElements = new Set();

        if (this.elements.length === 0) {
            ComponentUtils.log.info('No hay elementos para animar');
            return;
        }

        this.setupObserver();
        this.checkInitiallyVisible();
    },

    getAnimatedElements() {
        return document.querySelectorAll(`
            .scroll-animation, .scroll-reveal, .scroll-animation-left, 
            .scroll-animation-right, .scroll-animation-up, .scale-up, 
            .fade-in, .fade-in-up, .fade-in-left, .fade-in-right
        `);
    },

    setupObserver() {
        const options = {
            threshold: [0.1, 0.25, 0.5],
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        this.elements.forEach(element => {
            this.observer.observe(element);
            this.observedElements.add(element);
        });
    },

    animateElement(element) {
        if (!element || element.classList.contains('animated')) return;

        // Añadir clase principal de animación
        element.classList.add('show', 'animated');
        
        // Animar elementos hijos con stagger
        this.animateChildren(element);
        
        // Track animation
        if (window.GrupoSealHelpers) {
            window.GrupoSealHelpers.analytics.trackEvent('element_animated', {
                element: element.tagName,
                classes: Array.from(element.classList).join(' ')
            });
        }

        // Dejar de observar el elemento para optimizar performance
        if (this.observer) {
            this.observer.unobserve(element);
            this.observedElements.delete(element);
        }
    },

    animateChildren(parent) {
        const children = parent.querySelectorAll('.fade-in, .fade-in-up, .stagger-item');
        
        children.forEach((child, index) => {
            const delay = index * 100; // 100ms stagger
            
            setTimeout(() => {
                child.classList.add('show');
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, delay);
        });
    },

    checkInitiallyVisible() {
        this.elements.forEach(element => {
            if (ComponentUtils.isInViewport(element, 0)) {
                this.animateElement(element);
            }
        });
    },

    // Método para añadir nuevos elementos dinámicamente
    addElement(element) {
        if (this.observer && !this.observedElements.has(element)) {
            this.observer.observe(element);
            this.observedElements.add(element);
        }
    },

    // Método para limpiar observer
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observedElements.clear();
        }
    }
};

// ===================================
// COMPONENTE: BACK TO TOP
// ===================================
const BackToTop = {
    init() {
        ComponentUtils.log.info('Inicializando BackToTop...');
        this.button = document.getElementById('backToTop');
        this.isVisible = false;
        this.scrollThreshold = 300;

        if (!this.button) {
            ComponentUtils.log.warning('Botón back-to-top no encontrado');
            return;
        }

        this.setupScrollListener();
        this.setupClickListener();
        this.setupAccessibility();
    },

    setupScrollListener() {
        const scrollHandler = ComponentUtils.throttle(() => {
            const scrollY = window.pageYOffset;
            
            if (scrollY > this.scrollThreshold && !this.isVisible) {
                this.show();
            } else if (scrollY <= this.scrollThreshold && this.isVisible) {
                this.hide();
            }
        }, 16);

        window.addEventListener('scroll', scrollHandler, { passive: true });
    },

    setupClickListener() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
            
            // Track click
            if (window.GrupoSealHelpers) {
                window.GrupoSealHelpers.analytics.trackEvent('back_to_top_click');
            }
        });
    },

    setupAccessibility() {
        this.button.setAttribute('aria-label', 'Volver al inicio de la página');
        this.button.setAttribute('title', 'Volver arriba');
    },

    show() {
        this.button.classList.add('show');
        this.button.setAttribute('aria-hidden', 'false');
        this.isVisible = true;
    },

    hide() {
        this.button.classList.remove('show');
        this.button.setAttribute('aria-hidden', 'true');
        this.isVisible = false;
    },

    scrollToTop() {
        // Usar smooth scroll nativo si está disponible
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback para navegadores antiguos
            ComponentUtils.smoothScroll('body', 600);
        }
    }
};

// ===================================
// COMPONENTE: SMOOTH SCROLL LINKS
// ===================================
const SmoothScrollLinks = {
    init() {
        ComponentUtils.log.info('Inicializando SmoothScrollLinks...');
        this.setupLinks();
    },

    setupLinks() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Ignorar enlaces vacíos o solo hash
                if (!href || href === '#' || href === '#!') return;

                e.preventDefault();
                this.handleLinkClick(href, link);
            });
        });
    },

    handleLinkClick(href, linkElement) {
        const targetElement = document.querySelector(href);
        
        if (!targetElement) {
            ComponentUtils.log.warning(`Elemento no encontrado: ${href}`);
            return;
        }

        // Cerrar menú móvil si está abierto
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navLinks && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }

        // Scroll suave
        ComponentUtils.smoothScroll(targetElement);

        // Track navigation
        if (window.GrupoSealHelpers) {
            window.GrupoSealHelpers.analytics.trackEvent('internal_link_click', {
                target: href,
                text: linkElement.textContent.trim()
            });
        }

        // Actualizar URL sin recargar página
        if (history.pushState) {
            history.pushState(null, null, href);
        }
    }
};

// ===================================
// COMPONENTE: INTERACTIVE CARDS
// ===================================
const InteractiveCards = {
    init() {
        ComponentUtils.log.info('Inicializando InteractiveCards...');
        this.setupServiceCards();
        this.setupIconHovers();
        this.setupClientLogos();
        this.setupFloatingElements();
    },

    setupServiceCards() {
        const cards = document.querySelectorAll('.service-card, .achievement-card, .pillar-box, .benefit-box');
        
        cards.forEach(card => {
            this.addCardInteractions(card);
        });
    },

    addCardInteractions(card) {
        const originalTransform = card.style.transform || '';
        const originalBoxShadow = card.style.boxShadow || '';

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(10, 37, 60, 0.15)';
            
            // Añadir clase para CSS adicional
            card.classList.add('card-hover');
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = originalTransform;
            card.style.boxShadow = originalBoxShadow;
            card.classList.remove('card-hover');
        });

        // Interacción con teclado
        if (card.tagName === 'A' || card.querySelector('a')) {
            card.addEventListener('focus', () => {
                card.style.transform = 'translateY(-5px) scale(1.01)';
                card.style.outline = '2px solid var(--primary)';
            });

            card.addEventListener('blur', () => {
                card.style.transform = originalTransform;
                card.style.outline = '';
            });
        }
    },

    setupIconHovers() {
        const icons = document.querySelectorAll('.icon-hover, .pillar-icon, .achievement-icon, .cert-icon');
        
        icons.forEach(icon => {
            const originalTransform = icon.style.transform || '';
            
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.15) rotate(8deg)';
                icon.classList.add('icon-active');
            });

            icon.addEventListener('mouseleave', () => {
                icon.style.transform = originalTransform;
                icon.classList.remove('icon-active');
            });

            // Animación random ocasional
            if (Math.random() < 0.3) { // 30% de chance
                this.addRandomAnimation(icon);
            }
        });
    },

    addRandomAnimation(element) {
        const animations = ['pulse', 'bounce', 'swing'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        
        setTimeout(() => {
            element.style.animation = `${randomAnimation} 1s ease-in-out`;
            setTimeout(() => {
                element.style.animation = '';
            }, 1000);
        }, Math.random() * 10000); // Entre 0-10 segundos
    },

    setupClientLogos() {
        const logos = document.querySelectorAll('.client-logo');
        
        logos.forEach((logo, index) => {
            // Stagger the initial load animation
            setTimeout(() => {
                logo.classList.add('loaded');
            }, index * 100);

            logo.addEventListener('mouseenter', () => {
                logo.style.transform = 'translateY(-15px) scale(1.08)';
                logo.style.filter = 'grayscale(0) brightness(1.1)';
            });

            logo.addEventListener('mouseleave', () => {
                logo.style.transform = 'translateY(0) scale(1)';
                logo.style.filter = 'grayscale(100%)';
            });
        });
    },

    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.pillar-box, .cert-box');
        
        if (floatingElements.length === 0) return;

        let animationId;
        let floatY = 0;
        let direction = 1;
        let isVisible = true;

        const animate = () => {
            if (!isVisible) return;

            floatY += 0.05 * direction;
            
            if (floatY > 2) direction = -1;
            else if (floatY < -2) direction = 1;

            floatingElements.forEach(el => {
                if (ComponentUtils.isInViewport(el)) {
                    el.style.transform = `translateY(${floatY}px)`;
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        // Controlar visibilidad para optimizar performance
        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
            if (isVisible) animate();
            else cancelAnimationFrame(animationId);
        });

        animate();
    }
};

// ===================================
// COMPONENTE: FORMULARIOS
// ===================================
const Forms = {
    init() {
        ComponentUtils.log.info('Inicializando Forms...');
        this.setupValidation();
        this.setupAnimations();
        this.setupAccessibility();
    },

    setupValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            this.setupFormValidation(form);
        });
    },

    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Validación en tiempo real
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Validación al enviar
        form.addEventListener('submit', (e) => {
            if (!this.validateForm(form)) {
                e.preventDefault();
                this.focusFirstError(form);
            } else {
                // Track form submission
                if (window.GrupoSealHelpers) {
                    window.GrupoSealHelpers.analytics.trackEvent('form_submit', {
                        form: form.id || form.className
                    });
                }
            }
        });
    },

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    },

    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        let message = '';

        // Campo requerido
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            message = 'Este campo es requerido';
        }
        // Validación de email
        else if (input.type === 'email' && value && !ComponentUtils.validateEmail ? !this.isValidEmail(value) : !ComponentUtils.validateEmail(value)) {
            isValid = false;
            message = 'Ingrese un email válido';
        }
        // Validación de teléfono
        else if (input.type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            message = 'Ingrese un teléfono válido';
        }
        // Longitud mínima
        else if (input.minLength && value.length < input.minLength) {
            isValid = false;
            message = `Mínimo ${input.minLength} caracteres`;
        }

        if (isValid) {
            this.clearFieldError(input);
        } else {
            this.showFieldError(input, message);
        }

        return isValid;
    },

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    isValidPhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length >= 7; // Mínimo 7 dígitos
    },

    showFieldError(input, message) {
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        
        let errorElement = input.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.setAttribute('role', 'alert');
            input.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.setAttribute('aria-describedby', errorElement.id || `error-${input.name}`);
    },

    clearFieldError(input) {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    },

    focusFirstError(form) {
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },

    setupAnimations() {
        const formGroups = document.querySelectorAll('.form-group, .input-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            if (!input) return;

            input.addEventListener('focus', () => {
                group.classList.add('focused');
                group.style.transform = 'scale(1.02)';
            });

            input.addEventListener('blur', () => {
                group.classList.remove('focused');
                group.style.transform = 'scale(1)';
                
                if (input.value) {
                    group.classList.add('has-value');
                } else {
                    group.classList.remove('has-value');
                }
            });
        });
    },

    setupAccessibility() {
        // Asociar labels con inputs
        const labels = document.querySelectorAll('label');
        labels.forEach(label => {
            const input = label.querySelector('input, textarea, select') || 
                         document.getElementById(label.getAttribute('for'));
            
            if (input && !input.getAttribute('aria-label')) {
                input.setAttribute('aria-label', label.textContent.trim());
            }
        });

        // Mejorar campos requeridos
        const requiredInputs = document.querySelectorAll('input[required], textarea[required], select[required]');
        requiredInputs.forEach(input => {
            input.setAttribute('aria-required', 'true');
        });
    }
};

// ===================================
// COMPONENTE: PERFORMANCE
// ===================================
const Performance = {
    init() {
        ComponentUtils.log.info('Inicializando Performance...');
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.preloadCriticalResources();
        this.setupResourceHints();
    },

    setupLazyLoading() {
        // Usar utilidad global si está disponible
        if (ComponentUtils.lazyLoadImages) {
            ComponentUtils.lazyLoadImages();
        } else {
            this.basicLazyLoading();
        }
    },

    basicLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '50px 0px' });

            images.forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        } else {
            // Fallback para navegadores sin soporte
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    },

    setupImageOptimization() {
        // Detectar soporte WebP y aplicar
        this.detectWebPSupport().then(supportsWebP => {
            if (supportsWebP) {
                const images = document.querySelectorAll('img[data-webp]');
                images.forEach(img => {
                    img.src = img.dataset.webp;
                });
            }
        });

        // Optimizar imágenes según densidad de pantalla
        this.optimizeForDevicePixelRatio();
    },

    detectWebPSupport() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => resolve(webP.height === 2);
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    },

    optimizeForDevicePixelRatio() {
        const pixelRatio = window.devicePixelRatio || 1;
        const highDPI = pixelRatio > 1;

        if (highDPI) {
            const images = document.querySelectorAll('img[data-src-2x]');
            images.forEach(img => {
                if (img.dataset.src2x) {
                    img.dataset.src = img.dataset.src2x;
                }
            });
        }
    },

    preloadCriticalResources() {
        const criticalResources = [
            '/assets/img/hero/GrupoSealLogoBig.webp',
            '/assets/img/hero/GrupoSealLogoBig2.webp',
            '/assets/img/icons/Logo-white.webp'
        ];

        criticalResources.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            link.onload = () => ComponentUtils.log.info(`Precargado: ${src}`);
            link.onerror = () => ComponentUtils.log.warning(`Error precargando: ${src}`);
            document.head.appendChild(link);
        });
    },

    setupResourceHints() {
        // Preconnect a dominios externos
        const externalDomains = [
            'https://fonts.googleapis.com',
            'https://cdnjs.cloudflare.com'
        ];

        externalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            document.head.appendChild(link);
        });
    },

    // Método para optimizar CSS crítico
    optimizeCriticalCSS() {
        // Cargar CSS no crítico de forma asíncrona
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"][data-non-critical]');
        
        nonCriticalCSS.forEach(link => {
            link.media = 'print';
            link.onload = () => {
                link.media = 'all';
            };
        });
    }
};

// ===================================
// INICIALIZACIÓN PRINCIPAL (SIN CARRUSEL)
// ===================================
class GrupoSealApp {
    constructor() {
        // NOTA: HeroCarousel REMOVIDO para evitar conflictos
        this.components = [
            Header,
            ScrollAnimations,
            BackToTop,
            SmoothScrollLinks,
            InteractiveCards,
            Forms,
            Performance
        ];
        
        this.initialized = false;
        this.startTime = performance.now();
    }

    init() {
        ComponentUtils.log.info('🚀 Inicializando Grupo SEAL Website...');
        
        // Verificar que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Inicializar componentes en orden de prioridad
            this.components.forEach((Component, index) => {
                try {
                    const startTime = performance.now();
                    Component.init();
                    const endTime = performance.now();
                    
                    ComponentUtils.log.success(
                        `✅ ${Component.name || `Component ${index + 1}`} inicializado en ${(endTime - startTime).toFixed(2)}ms`
                    );
                } catch (error) {
                    ComponentUtils.log.error(
                        `❌ Error inicializando ${Component.name || `Component ${index + 1}`}:`, 
                        error
                    );
                }
            });

            // Marcar como inicializada
            this.initialized = true;
            
            // Tiempo total de inicialización
            const totalTime = performance.now() - this.startTime;
            ComponentUtils.log.success(
                `✨ Grupo SEAL Website inicializado correctamente en ${totalTime.toFixed(2)}ms`
            );

            // Disparar evento personalizado
            this.dispatchReadyEvent();
            
            // Configurar manejo de errores global
            this.setupErrorHandling();
            
            // Analytics de inicialización
            if (window.GrupoSealHelpers) {
                window.GrupoSealHelpers.analytics.trackEvent('app_initialized', {
                    load_time: totalTime,
                    components_count: this.components.length
                });
            }

        } catch (error) {
            ComponentUtils.log.error('❌ Error crítico durante la inicialización:', error);
        }
    }

    dispatchReadyEvent() {
        const event = new CustomEvent('grupoSealReady', {
            detail: {
                app: this,
                loadTime: performance.now() - this.startTime,
                components: this.components.map(c => c.name)
            }
        });
        document.dispatchEvent(event);
    }

    setupErrorHandling() {
        // Manejo de errores JavaScript globales
        window.addEventListener('error', (e) => {
            ComponentUtils.log.error('Error JavaScript:', e.error);
            
            if (window.GrupoSealHelpers) {
                window.GrupoSealHelpers.analytics.trackEvent('javascript_error', {
                    message: e.message,
                    filename: e.filename,
                    lineno: e.lineno
                });
            }
        });

        // Manejo de promesas rechazadas
        window.addEventListener('unhandledrejection', (e) => {
            ComponentUtils.log.error('Promesa rechazada:', e.reason);
            
            if (window.GrupoSealHelpers) {
                window.GrupoSealHelpers.analytics.trackEvent('promise_rejection', {
                    reason: e.reason
                });
            }
        });
    }

    // Método para reinicializar un componente específico
    reinitializeComponent(componentName) {
        const component = this.components.find(c => c.name === componentName);
        if (component) {
            try {
                component.init();
                ComponentUtils.log.success(`🔄 ${componentName} reinicializado`);
                return true;
            } catch (error) {
                ComponentUtils.log.error(`❌ Error reinicializando ${componentName}:`, error);
                return false;
            }
        } else {
            ComponentUtils.log.warning(`⚠️ Componente ${componentName} no encontrado`);
            return false;
        }
    }

    // Método para destruir la aplicación
    destroy() {
        ComponentUtils.log.info('🔄 Destruyendo Grupo SEAL App...');
        
        this.components.forEach(component => {
            if (component.destroy && typeof component.destroy === 'function') {
                try {
                    component.destroy();
                } catch (error) {
                    ComponentUtils.log.error(`Error destruyendo ${component.name}:`, error);
                }
            }
        });

        this.initialized = false;
        ComponentUtils.log.success('✅ Aplicación destruida correctamente');
    }

    // Getter para verificar estado
    get isInitialized() {
        return this.initialized;
    }

    // Método para obtener información de debug
    getDebugInfo() {
        return {
            initialized: this.initialized,
            loadTime: performance.now() - this.startTime,
            components: this.components.map(c => ({
                name: c.name,
                methods: Object.getOwnPropertyNames(c).filter(prop => typeof c[prop] === 'function')
            })),
            performance: {
                memory: performance.memory ? {
                    usedJSHeapSize: performance.memory.usedJSHeapSize,
                    totalJSHeapSize: performance.memory.totalJSHeapSize
                } : 'No disponible',
                timing: performance.timing
            }
        };
    }
}

// ===================================
// EXPORTAR PARA USO GLOBAL
// ===================================
window.GrupoSealApp = GrupoSealApp;
window.GrupoSealComponents = {
    Header,
    ScrollAnimations,
    BackToTop,
    SmoothScrollLinks,
    InteractiveCards,
    Forms,
    Performance
};

// ===================================
// AUTO-INICIALIZACIÓN (CONDICIONAL)
// ===================================
// Solo auto-inicializar si no se está usando como módulo Y si main.js no ha inicializado ya
if (typeof module === 'undefined' && !window.mainJsLoaded) {
    ComponentUtils.log.info('📦 Components.js: Esperando a main.js...');
    
    // Dar prioridad a main.js
    setTimeout(() => {
        if (!window.mainJsLoaded) {
            ComponentUtils.log.info('📦 Components.js: Inicializando como fallback...');
            const app = new GrupoSealApp();
            app.init();
            
            // Hacer la instancia disponible globalmente
            window.grupoSealAppInstance = app;
        }
    }, 100);
}

// ===================================
// UTILIDADES DE DESARROLLO
// ===================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Funciones de debug solo en desarrollo
    window.debugGrupoSeal = () => {
        if (window.grupoSealAppInstance) {
            console.table(window.grupoSealAppInstance.getDebugInfo());
        }
    };
    
    window.reinitComponent = (name) => {
        if (window.grupoSealAppInstance) {
            return window.grupoSealAppInstance.reinitializeComponent(name);
        }
    };
    
    ComponentUtils.log.info('🛠️ Modo desarrollo: funciones debug disponibles');
    ComponentUtils.log.info('📝 Usa debugGrupoSeal() para ver información de debug');
}

ComponentUtils.log.success('📦 Components.js cargado correctamente (sin carrusel)');