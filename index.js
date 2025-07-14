document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.about-us-short');
    
    if (aboutSection) {
        // Efecto hover para la imagen
        const buildingImage = aboutSection.querySelector('.building-image');
        
        if (buildingImage) {
            buildingImage.addEventListener('mouseenter', function() {
                this.style.filter = 'brightness(1.1) contrast(1.1)';
            });
            
            buildingImage.addEventListener('mouseleave', function() {
                this.style.filter = 'brightness(1) contrast(1)';
            });
        }

        // Animación para el badge de años
        const yearsBadge = aboutSection.querySelector('.years-badge');
        let isAnimating = false;
        
        if (yearsBadge) {
            yearsBadge.addEventListener('mouseenter', function() {
                if (!isAnimating) {
                    isAnimating = true;
                    this.style.transform = 'scale(1.1) rotate(5deg)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1) rotate(0deg)';
                        isAnimating = false;
                    }, 300);
                }
            });
        }

        // Observador para animaciones al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(aboutSection);
    }
});