// Archivo main.js optimizado
document.addEventListener('DOMContentLoaded', function() {
    // ----- VARIABLES GLOBALES -----
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksMenu = document.querySelector('.nav-links');
    const backToTopButton = document.getElementById('backToTop');
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero h1');
    
    // ----- FUNCIÓN PARA MARCAR ENLACES ACTIVOS -----
    // Esta función se ha modificado para no cambiar dinámicamente los enlaces activos durante el scroll
    function setActiveNavLinks() {
        const currentLocation = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');

        // Eliminar la clase active de todos los enlaces
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Función para verificar si estamos en la página principal
        const isHomePage = () => {
            return currentLocation === '/' || 
                currentLocation.endsWith('/index.html') || 
                currentLocation.endsWith('/');
        };

        // Para la página principal
        if (isHomePage()) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === 'index.html' || 
                    link.getAttribute('href') === '../index.html' || 
                    link.getAttribute('href') === './') {
                    link.classList.add('active');
                }
            });
        } else {
            // Para páginas en subdirectorios
            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href');
                if (currentLocation.includes(linkPath) && linkPath !== '../index.html') {
                    link.classList.add('active');
                }
            });
            
            // Marcar como activo el enlace principal cuando estamos en una subpágina
            const pathSegments = currentLocation.split('/');
            if (pathSegments.length > 2) {
                const currentSection = pathSegments[1]; // por ejemplo "servicios" en "/servicios/vigilancia.html"
                
                navLinks.forEach(link => {
                    const linkPath = link.getAttribute('href');
                    if (linkPath.includes(`${currentSection}/index.html`)) {
                        link.classList.add('active');
                    }
                });
            }
        }
        
        return isHomePage;
    }

    // ----- MANEJO DEL MENÚ MÓVIL -----
    function setupMobileMenu() {
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                navLinksMenu.classList.toggle('show');
                
                // Si el menú tiene ícono, alternar entre barras y X
                const menuIcon = menuToggle.querySelector('i');
                if (menuIcon) {
                    menuIcon.classList.toggle('fa-bars');
                    menuIcon.classList.toggle('fa-times');
                }
            });
        }
    }

    // ----- FUNCIÓN PARA SABER SI UN ELEMENTO ESTÁ EN VIEWPORT -----
    function isElementInViewport(el, offset = 100) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= 0
        );
    }

    // ----- ANIMACIONES DE SCROLL -----
    function handleScrollAnimations() {
        const scrollAnimations = document.querySelectorAll('.scroll-animation, .scroll-reveal, .scroll-animation-left, .scroll-animation-right, .scale-up');
        
        scrollAnimations.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('show');
                
                // Activar animaciones internas con delay
                const fadeElements = element.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
                fadeElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                    }, 100 * index);
                });
            } else {
                // Comentado para evitar que los elementos se oculten al salir del viewport
                // element.classList.remove('show');
            }
        });
    }

    // ----- MANEJO DEL SCROLL -----
    function setupScrollHandlers() {
        setActiveNavLinks();
        
        window.addEventListener('scroll', function() {
            // Back to top button
            if (backToTopButton) {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }
            }
            
            // Efecto de scroll para el encabezado
            if (header) {
                if (window.pageYOffset > 50) {
                    header.style.height = '70px';
                    header.style.backgroundColor = 'rgba(10, 37, 60, 0.98)';
                } else {
                    header.style.height = '80px';
                    header.style.backgroundColor = 'rgba(10, 37, 60, 0.95)';
                }
            }
            
            // Efecto parallax para el héroe
            if (hero) {
                const scrollPosition = window.pageYOffset;
                hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            }
            
            // Manejo de animaciones al scroll
            handleScrollAnimations();
            
            // Se ha eliminado el efecto de resaltado para enlaces del menú según la sección visible
            // para evitar la animación que indica dónde estás
        });
    }

    // ----- BOTÓN VOLVER ARRIBA -----
    function setupBackToTopButton() {
        if (backToTopButton) {
            backToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ----- ANIMACIÓN DE TARJETAS DE SERVICIOS -----
    function setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(10, 37, 60, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(10, 37, 60, 0.1)';
            });
        });
    }

    // ----- ANIMACIÓN DE ÍCONOS EN HOVER -----
    function setupIconHovers() {
        const iconHovers = document.querySelectorAll('.icon-hover');
        iconHovers.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    // ----- ANIMACIONES DE ENTRADA INICIALES -----
    function setupInitialAnimations() {
        setTimeout(() => {
            const initialAnimations = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
            initialAnimations.forEach(el => {
                el.style.opacity = '1';
            });
            
            handleScrollAnimations();
        }, 100);
    }

    // ----- SCROLL SUAVE PARA ENLACES INTERNOS -----
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Cerrar menú móvil si está abierto
                    if (navLinksMenu && navLinksMenu.classList.contains('show')) {
                        navLinksMenu.classList.remove('show');
                        
                        const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;
                        if (menuIcon) {
                            menuIcon.classList.remove('fa-times');
                            menuIcon.classList.add('fa-bars');
                        }
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ----- EFECTO TYPING PARA TÍTULO DEL HÉROE -----
    function setupHeroTyping() {
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            const typeSpeed = 50;
            
            function typeWriter() {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, typeSpeed);
                }
            }
            
            // Iniciar el efecto con un ligero retraso
            setTimeout(typeWriter, 500);
        }
    }

    // ----- EFECTOS DE FLOTACIÓN PARA ELEMENTOS DESTACADOS -----
    function setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.pillar-box, .cert-box');
        
        if (floatingElements.length === 0) return;
        
        let floating = true;
        let floatY = 0;
        let floatDirection = 1;
        
        function floatAnimation() {
            if (floating) {
                floatY += 0.1 * floatDirection;
                
                if (floatY > 5) {
                    floatDirection = -1;
                } else if (floatY < -5) {
                    floatDirection = 1;
                }
                
                floatingElements.forEach(el => {
                    el.style.transform = `translateY(${floatY}px)`;
                });
                
                requestAnimationFrame(floatAnimation);
            }
        }
        
        // Iniciar animación de flotación
        floatAnimation();
        
        // Detener animación cuando no es visible
        document.addEventListener('visibilitychange', function() {
            floating = !document.hidden;
            
            if (floating) {
                floatAnimation();
            }
        });
    }

    // ----- EFECTO DE PARTÍCULAS PARA CERTIFICACIONES -----
    function setupParticles() {
        const certSection = document.querySelector('.certifications-section');
        
        if (!certSection) return;
        
        // Crear contenedor de partículas
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.overflow = 'hidden';
        particlesContainer.style.zIndex = '1';
        
        certSection.style.position = 'relative';
        certSection.insertBefore(particlesContainer, certSection.firstChild);
        
        // Variable para controlar si las partículas están animando
        let particlesActive = true;
        
        // Crear partículas
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 5 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = '#0a253c';
            particle.style.opacity = Math.random() * 0.2 + 0.1;
            particle.style.borderRadius = '50%';
            
            // Posición inicial aleatoria
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = posX + '%';
            particle.style.top = posY + '%';
            
            // Velocidad aleatoria
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = (Math.random() - 0.5) * 0.5;
            
            particlesContainer.appendChild(particle);
            
            // Animación de la partícula
            setInterval(() => {
                if (particlesActive) {
                    const currentLeft = parseFloat(particle.style.left);
                    const currentTop = parseFloat(particle.style.top);
                    
                    particle.style.left = (currentLeft + speedX) + '%';
                    particle.style.top = (currentTop + speedY) + '%';
                    
                    // Límites del contenedor
                    if (currentLeft > 100) particle.style.left = '0%';
                    if (currentLeft < 0) particle.style.left = '100%';
                    if (currentTop > 100) particle.style.top = '0%';
                    if (currentTop < 0) particle.style.top = '100%';
                }
            }, 50);
        }
        
        // Pausar animaciones cuando la sección no es visible
        window.addEventListener('scroll', () => {
            if (isElementInViewport(certSection, 0)) {
                particlesActive = true;
            } else {
                particlesActive = false;
            }
        });
    }

    // ----- CONFIGURACIÓN DE SECTORES CON DELAYS -----
    function setupSectors() {
        const sectorBoxes = document.querySelectorAll('.sector-box');
        
        sectorBoxes.forEach(box => {
            const list = box.querySelector('ul');
            if (list) {
                const listItems = list.querySelectorAll('li');
                
                // Agregar delay a cada elemento de la lista para animación escalonada al hover
                listItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.05}s`;
                });
            }
        });
    }

    // ----- INICIALIZAR TODAS LAS FUNCIONES -----
    function init() {
        setupMobileMenu();
        setupScrollHandlers();
        setupBackToTopButton();
        setupServiceCards();
        setupIconHovers();
        setupInitialAnimations();
        setupSmoothScroll();
        setupHeroTyping();
        setupFloatingElements();
        setupParticles();
        setupSectors();
        
        // Manejar imágenes para que no se transformen
        const parallaxElements = document.querySelectorAll('.about-image, .service-image');
        parallaxElements.forEach(el => {
            // Eliminar el efecto parallax en las imágenes
            const imgs = el.querySelectorAll('img');
            imgs.forEach(img => {
                img.classList.add('no-transform');
                img.style.transform = 'none';
            });
        });
    }

    // Iniciar todo
    init();
});
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del carrusel
    const slides = document.querySelectorAll('.hero-slide');
    const transitionTime = 5000; // Tiempo entre transiciones (5 segundos)
    let currentSlide = 0;
    
    // Función para cambiar de slide
    function nextSlide() {
        // Quitar clase active de todas las slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Incrementar el índice de la slide actual
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Activar la nueva slide
        slides[currentSlide].classList.add('active');
    }
    
    // Iniciar el carrusel
    setInterval(nextSlide, transitionTime);
});