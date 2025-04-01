// Script para manejar las animaciones de scroll
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los elementos con clases de animación de scroll
    const scrollElements = document.querySelectorAll('.scroll-animation, .scroll-animation-left, .scroll-animation-right, .scroll-animation-up');
    
    // Función para verificar si un elemento está en el viewport
    const elementInView = (el, scrollOffset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * 0.8)
        );
    };
    
    // Función para mostrar un elemento cuando está en el viewport
    const displayScrollElement = (element) => {
        element.classList.add('active');
    };
    
    // Función para ocultar un elemento cuando no está en el viewport
    const hideScrollElement = (element) => {
        // Opcional: si prefieres que las animaciones permanezcan después
        // de activarse, comenta la siguiente línea
        element.classList.remove('active');
    };
    
    // Función principal para manejar la animación
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        })
    }
    
    // Inicialmente comprobar elementos visibles
    handleScrollAnimation();
    
    // Agregar evento de scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});