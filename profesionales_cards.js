document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".card-wrapper");

    cards.forEach(function (card) {

        const button = card.querySelector(".btn-flip");

        if (!button) return;

        button.addEventListener("click", function (e) {

            e.preventDefault();
            e.stopPropagation();

            // Solo en responsive
            if (window.innerWidth <= 1024) {

                card.classList.toggle("flipped");

            }

        });

    });

});