// Animaciones de desplazamiento
document.addEventListener('DOMContentLoaded', function() {
    // Marcar enlace activo según la URL actual
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
    
    // Manejo del menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksMenu = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinksMenu.classList.toggle('show');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Botón "Volver arriba"
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
        
        // Efecto de scroll para el encabezado
        const header = document.querySelector('.header');
        if (window.pageYOffset > 50) {
            header.style.height = '70px';
            header.style.backgroundColor = 'rgba(10, 37, 60, 0.98)';
        } else {
            header.style.height = '80px';
            header.style.backgroundColor = 'rgba(10, 37, 60, 0.95)';
        }
        
        // Animaciones de elementos al hacer scroll
        const scrollAnimations = document.querySelectorAll('.scroll-animation');
        scrollAnimations.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // Si el elemento es visible en la ventana
            if (position.top < window.innerHeight - 100) {
                element.classList.add('show');
                
                // Activar animaciones internas con delay
                const fadeElements = element.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
                fadeElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                    }, 100 * index);
                });
            }
        });
        
        // Efecto de resaltado para enlaces del menú según la sección visible
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        if (current && isHomePage()) {
            navLinks.forEach(item => {
                item.classList.remove('active');
                const href = item.getAttribute('href');
                
                if (href && href.includes(current)) {
                    item.classList.add('active');
                } else if (current === 'inicio' && (href === 'index.html' || href === '../index.html' || href === './')) {
                    item.classList.add('active');
                }
            });
        }
    });
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animación para las tarjetas de servicios
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
    
    // Efecto parallax para el héroe
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Animación para los íconos en hover
    const iconHovers = document.querySelectorAll('.icon-hover');
    iconHovers.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Iniciar animaciones de entrada para elementos visibles al cargar
    setTimeout(() => {
        const initialAnimations = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
        initialAnimations.forEach(el => {
            el.style.opacity = '1';
        });
        
        const scrollAnimations = document.querySelectorAll('.scroll-animation');
        scrollAnimations.forEach(element => {
            const position = element.getBoundingClientRect();
            
            if (position.top < window.innerHeight - 100) {
                element.classList.add('show');
            }
        });
    }, 100);
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                if (navLinksMenu.classList.contains('show')) {
                    navLinksMenu.classList.remove('show');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de tipo typing para el título del héroe
    const heroTitle = document.querySelector('.hero h1');
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
    
    // Detección de desplazamiento para efectos paralaje
    const parallaxElements = document.querySelectorAll('.about-image, .service-image');
    
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(el => {
            const scrollPosition = window.pageYOffset;
            const elementPosition = el.offsetTop;
            const distance = scrollPosition - elementPosition;
            
            if (Math.abs(distance) < window.innerHeight) {
                // Efecto sutil de paralaje en imágenes
                const img = el.querySelector('img');
                if (img) {
                    const translateY = distance * 0.05;
                    img.style.transform = `translateY(${translateY}px)`;
                }
            }
        });
    });
    
    // Efecto de "flotación" para elementos destacados
    const floatingElements = document.querySelectorAll('.pillar-box, .cert-box');
    
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
    
    // Efecto de partículas para la sección de certificaciones
    const certSection = document.querySelector('.certifications-section');
    
    if (certSection) {
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
                if (floating) {
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
    }
});