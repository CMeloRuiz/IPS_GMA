document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card-wrapper");

    cards.forEach(function (card) {
        const button = card.querySelector(".btn-flip");
        const buttonBack = card.querySelector(".btn-flip-back");

        button.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            card.classList.toggle("flipped");
        });

        buttonBack.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            card.classList.remove("flipped");
        });
    });
});