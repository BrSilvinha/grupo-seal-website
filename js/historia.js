// Script para animaciones basadas en scroll
document.addEventListener('DOMContentLoaded', function() {
    // Función para comprobar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Función para mostrar elementos cuando se hacen visibles
    function showOnScroll() {
        const animatedElements = document.querySelectorAll('.scroll-animation, .scroll-animation-left, .scroll-animation-right, .scale-up');
        
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('show');
            }
        });
        
        // Mostrar u ocultar el botón "back to top"
        const backToTop = document.getElementById('backToTop');
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
    
    // Mostrar elementos que ya están en el viewport al cargar
    showOnScroll();
    
    // Escuchar el evento scroll
    window.addEventListener('scroll', showOnScroll);
    
    // Back to top button functionality
    document.getElementById('backToTop').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
    
    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('show');
        });
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});