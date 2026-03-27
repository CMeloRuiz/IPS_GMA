document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const slider = document.getElementById("slider");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    let current = 0;

    function showSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => {
            dot.classList.remove("active");
        });
        dots[index].classList.add("active");
        current = index;
    }

    function nextSlide() {
        let next = current + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }

    function prevSlide() {
        let prev = current - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
        });
    });

    setInterval(nextSlide, 5000);

});
