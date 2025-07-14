document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselContainer = document.querySelector('.carousel-container');
    const serviceCards = Array.from(carouselTrack.children);
    const carouselDotsContainer = document.querySelector('.carousel-dots');

    const cardsToShow = 4;

    const clonedStart = [];
    const clonedEnd = [];

    for (let i = 0; i < cardsToShow; i++) {
        clonedEnd.push(serviceCards[i].cloneNode(true));
    }
    for (let i = serviceCards.length - cardsToShow; i < serviceCards.length; i++) {
        clonedStart.push(serviceCards[i].cloneNode(true));
    }

    clonedStart.reverse().forEach(card => carouselTrack.prepend(card));
    clonedEnd.forEach(card => carouselTrack.appendChild(card));

    let currentIndex = cardsToShow;
    let cardWidth = 0;
    let intervalId;

    serviceCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.index = index;
        carouselDotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
            stopAutoScroll();
            currentIndex = index + cardsToShow;
            updateCarousel(true);
            startAutoScroll();
        });
    });

    const dots = Array.from(carouselDotsContainer.children);

    const calculateCardWidth = () => {
        if (serviceCards.length > 0) {
            const cardStyle = getComputedStyle(serviceCards[0]);
            cardWidth = serviceCards[0].offsetWidth +
                        parseFloat(cardStyle.marginLeft) +
                        parseFloat(cardStyle.marginRight);
        } else {
            cardWidth = 0;
        }
    };

    const updateCarousel = (smoothTransition = true) => {
        if (!smoothTransition) {
            carouselTrack.style.transition = 'none';
        } else {
            carouselTrack.style.transition = 'transform 0.8s ease-in-out';
        }

        const offset = -currentIndex * cardWidth;
        carouselTrack.style.transform = `translateX(${offset}px)`;

        carouselTrack.offsetHeight;

        dots.forEach((dot, index) => {
            if (index === (currentIndex - cardsToShow) % serviceCards.length) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const nextCard = () => {
        currentIndex++;
        updateCarousel();

        if (currentIndex >= serviceCards.length + cardsToShow) {
            setTimeout(() => {
                carouselTrack.style.transition = 'none';
                currentIndex = cardsToShow;
                carouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
                carouselTrack.offsetHeight;
            }, 800);
        }
    };

    const startAutoScroll = () => {
        stopAutoScroll();
        intervalId = setInterval(nextCard, 3000);
    };

    const stopAutoScroll = () => {
        clearInterval(intervalId);
    };

    carouselContainer.addEventListener('mouseenter', stopAutoScroll);
    carouselContainer.addEventListener('mouseleave', startAutoScroll);

    calculateCardWidth();
    updateCarousel(false);

    startAutoScroll();

    window.addEventListener('resize', () => {
        calculateCardWidth();
        updateCarousel();
    });
});