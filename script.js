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
});