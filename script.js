document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container'); 
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let autoSlideInterval;
    const slideDuration = 5000;

    if (!sliderContainer || slides.length === 0 || dots.length === 0) {
        console.warn("Elementos del slider no encontrados. Revisa tu HTML.");
        return;
    }

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, slideDuration);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideIndex = parseInt(event.target.dataset.slideIndex);
            showSlide(slideIndex);
            clearInterval(autoSlideInterval);
            startAutoSlide();
        });
    });

    showSlide(currentSlide);
    startAutoSlide();


    // --- Inicio del nuevo código para el desplazamiento a secciones ---

    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const mainHeader = document.querySelector('.main-header'); // Selecciona tu header por su clase

    console.log("llega la peticion");

    if (!mainHeader) {
        // Este mensaje aparecerá en la consola del navegador si no encuentra el header
        console.error("Error: Elemento '.main-header' no encontrado. Asegúrate de que la clase CSS sea correcta en tu HTML.");
        return;
    }

    internalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Detiene el salto instantáneo por defecto del navegador

            const targetId = this.getAttribute('href'); // Obtiene el valor del href, por ejemplo '#nutricion'
            const targetElement = document.querySelector(targetId); // Busca el elemento con ese ID

            if (targetElement) {
                // Obtiene la altura actual del header.
                // Esto es crucial porque tu header es dinámico (110px expandido, 80px contraído).
                const headerHeight = mainHeader.offsetHeight;

                // Calcula la posición de scroll
                // targetElement.getBoundingClientRect().top da la posición relativa a la ventana.
                // window.scrollY da la posición actual del scroll.
                // Sumando ambos obtenemos la posición absoluta del elemento en el documento.
                // Restamos headerHeight para que el elemento se detenga justo debajo del header.
                const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                // Realiza el scroll suave
                window.scrollTo({
                    top: topOffset,
                    behavior: 'smooth' // Hace que el desplazamiento sea suave
                });
            }
        });
    });

});