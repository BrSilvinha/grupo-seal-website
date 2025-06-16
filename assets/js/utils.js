/**
 * GRUPO SEAL - UTILIDADES JAVASCRIPT
 * Funciones helper y utilidades reutilizables
 */

// ===================================
// CONFIGURACIÓN GLOBAL
// ===================================
window.GRUPO_SEAL_CONFIG = {
    breakpoints: {
        mobile: 768,
        tablet: 992,
        desktop: 1200
    },
    animations: {
        duration: 300,
        easing: 'ease-in-out'
    },
    carousel: {
        autoplaySpeed: 5000,
        transitionDuration: 1500
    },
    scroll: {
        offset: 80,
        duration: 800
    }
};

// ===================================
// UTILIDADES PRINCIPALES
// ===================================
const Utils = {
    /**
     * Verificar si un elemento está en el viewport
     * @param {Element} element - Elemento a verificar
     * @param {number} offset - Offset en píxeles
     * @returns {boolean}
     */
    isInViewport(element, offset = 100) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight - offset &&
            rect.bottom >= 0 &&
            rect.left >= 0 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Debounce para optimizar eventos
     * @param {Function} func - Función a ejecutar
     * @param {number} wait - Tiempo de espera en ms
     * @returns {Function}
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle para optimizar scroll
     * @param {Function} func - Función a ejecutar
     * @param {number} limit - Límite en ms
     * @returns {Function}
     */
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

    /**
     * Scroll suave a un elemento
     * @param {string|Element} target - Selector o elemento destino
     * @param {number} duration - Duración en ms
     * @param {number} offset - Offset en píxeles
     */
    smoothScroll(target, duration = 800, offset = 80) {
        const targetElement = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;
            
        if (!targetElement) {
            console.warn('Elemento no encontrado para scroll:', target);
            return;
        }

        const targetPosition = targetElement.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    },

    /**
     * Obtener información del dispositivo
     * @returns {Object}
     */
    getDeviceInfo() {
        const width = window.innerWidth;
        const config = window.GRUPO_SEAL_CONFIG.breakpoints;
        
        return {
            width,
            isMobile: width <= config.mobile,
            isTablet: width > config.mobile && width <= config.tablet,
            isDesktop: width > config.tablet,
            isLandscape: width > window.innerHeight,
            userAgent: navigator.userAgent,
            platform: navigator.platform
        };
    },

    /**
     * Lazy loading de imágenes
     * @param {string} selector - Selector de imágenes
     */
    lazyLoadImages(selector = 'img[data-src]') {
        const images = document.querySelectorAll(selector);
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;
                        
                        if (src) {
                            // Precargar imagen
                            const imageLoader = new Image();
                            imageLoader.onload = () => {
                                img.src = src;
                                img.classList.remove('lazy');
                                img.classList.add('loaded');
                            };
                            imageLoader.onerror = () => {
                                console.warn('Error cargando imagen:', src);
                                img.classList.add('error');
                            };
                            imageLoader.src = src;
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            images.forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        } else {
            // Fallback para navegadores sin IntersectionObserver
            images.forEach(img => {
                const src = img.dataset.src;
                if (src) img.src = src;
            });
        }
    },

    /**
     * Animar elemento con CSS classes
     * @param {Element} element - Elemento a animar
     * @param {string} animationClass - Clase de animación
     * @param {Function} callback - Callback al finalizar
     */
    animateElement(element, animationClass, callback) {
        if (!element) return;

        element.classList.add(animationClass);
        
        const handleAnimationEnd = () => {
            element.classList.remove(animationClass);
            element.removeEventListener('animationend', handleAnimationEnd);
            if (callback) callback();
        };
        
        element.addEventListener('animationend', handleAnimationEnd);
    },

    /**
     * Formatear número de teléfono
     * @param {string} phone - Número de teléfono
     * @returns {string}
     */
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 9) {
            return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
        }
        return phone;
    },

    /**
     * Validar email
     * @param {string} email - Email a validar
     * @returns {boolean}
     */
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    /**
     * Obtener parámetros URL
     * @param {string} param - Parámetro a obtener
     * @returns {string|null}
     */
    getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    /**
     * Copiar texto al portapapeles
     * @param {string} text - Texto a copiar
     * @returns {Promise}
     */
    async copyToClipboard(text) {
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (err) {
                console.error('Error copiando al portapapeles:', err);
                return false;
            }
        } else {
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (err) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    },

    /**
     * Generar ID único
     * @returns {string}
     */
    generateId() {
        return 'gs-' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Convertir cadena a slug
     * @param {string} text - Texto a convertir
     * @returns {string}
     */
    slugify(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    /**
     * Formatear fecha
     * @param {Date|string} date - Fecha
     * @param {string} locale - Locale (default: 'es-PE')
     * @returns {string}
     */
    formatDate(date, locale = 'es-PE') {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Detectar soporte WebP
     * @returns {Promise<boolean>}
     */
    supportsWebP() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    },

    /**
     * Logger personalizado
     */
    log: {
        info(message, ...args) {
            console.log(`🔵 [Grupo SEAL] ${message}`, ...args);
        },
        success(message, ...args) {
            console.log(`✅ [Grupo SEAL] ${message}`, ...args);
        },
        warning(message, ...args) {
            console.warn(`⚠️ [Grupo SEAL] ${message}`, ...args);
        },
        error(message, ...args) {
            console.error(`❌ [Grupo SEAL] ${message}`, ...args);
        }
    },

    /**
     * Storage helper
     */
    storage: {
        set(key, value, expiry = null) {
            const data = {
                value,
                expiry: expiry ? Date.now() + expiry : null
            };
            try {
                localStorage.setItem(`gs_${key}`, JSON.stringify(data));
            } catch (e) {
                Utils.log.warning('No se pudo guardar en localStorage:', e);
            }
        },

        get(key) {
            try {
                const data = JSON.parse(localStorage.getItem(`gs_${key}`));
                if (!data) return null;
                
                if (data.expiry && Date.now() > data.expiry) {
                    localStorage.removeItem(`gs_${key}`);
                    return null;
                }
                
                return data.value;
            } catch (e) {
                Utils.log.warning('Error leyendo localStorage:', e);
                return null;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(`gs_${key}`);
            } catch (e) {
                Utils.log.warning('Error eliminando de localStorage:', e);
            }
        }
    }
};

// ===================================
// HELPERS ESPECÍFICOS PARA GRUPO SEAL
// ===================================
const GrupoSealHelpers = {
    /**
     * Formatear información de contacto
     */
    contact: {
        formatPhone(phone) {
            return Utils.formatPhone(phone);
        },
        
        getWhatsAppLink(phone, message = '') {
            const cleanPhone = phone.replace(/\D/g, '');
            const encodedMessage = encodeURIComponent(message);
            return `https://wa.me/51${cleanPhone}?text=${encodedMessage}`;
        },
        
        getEmailLink(email, subject = '', body = '') {
            const params = new URLSearchParams();
            if (subject) params.append('subject', subject);
            if (body) params.append('body', body);
            
            const queryString = params.toString();
            return `mailto:${email}${queryString ? '?' + queryString : ''}`;
        }
    },

    /**
     * Gestión de servicios
     */
    services: {
        getServiceUrl(serviceSlug) {
            const serviceMap = {
                'vigilancia': '/servicios/vigilancia.html',
                'resguardo': '/servicios/resguardo.html',
                'sectores': '/servicios/sectores.html'
            };
            return serviceMap[serviceSlug] || '/servicios/';
        },
        
        getServiceIcon(serviceName) {
            const iconMap = {
                'Vigilancia Privada': 'fas fa-shield-alt',
                'Resguardo Personal': 'fas fa-user-shield',
                'Sectores': 'fas fa-building'
            };
            return iconMap[serviceName] || 'fas fa-shield-alt';
        }
    },

    /**
     * Analíticas básicas
     */
    analytics: {
        trackEvent(eventName, data = {}) {
            // Google Analytics 4
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, data);
            }
            
            // Log para desarrollo
            Utils.log.info(`📊 Evento: ${eventName}`, data);
        },
        
        trackPageView(path = window.location.pathname) {
            if (typeof gtag !== 'undefined') {
                gtag('config', 'GA_MEASUREMENT_ID', {
                    page_path: path
                });
            }
            
            Utils.log.info(`👁️ Página vista: ${path}`);
        },
        
        trackContact(method, details = {}) {
            this.trackEvent('contact', {
                method,
                ...details
            });
        }
    }
};

// ===================================
// EXPORTAR PARA USO GLOBAL
// ===================================
window.Utils = Utils;
window.GrupoSealHelpers = GrupoSealHelpers;

// Mensaje de confirmación
Utils.log.success('Utilidades cargadas correctamente');