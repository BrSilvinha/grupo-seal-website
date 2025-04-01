// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
    
    // Add active class to current page in navigation
    const currentPageUrl = window.location.pathname;
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    navLinksItems.forEach(item => {
        // Check if current URL contains the href value
        if (currentPageUrl.includes(item.getAttribute('href'))) {
            // Remove active class from all links
            navLinksItems.forEach(link => link.classList.remove('active'));
            // Add active class to current link
            item.classList.add('active');
        }
    });
    
    // If on homepage, make sure the home link is active
    if (currentPageUrl === '/' || currentPageUrl.endsWith('/index.html')) {
        navLinksItems.forEach(link => link.classList.remove('active'));
        document.querySelector('.nav-links a[href="index.html"]').classList.add('active');
    }
});