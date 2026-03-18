// document.querySelectorAll(".event-card-container").forEach(card => {

//     const btnMore = card.querySelector(".btn-more")
//     const btnBack = card.querySelector(".btn-back")
//     const innerCard = card.querySelector(".event-card")

//     btnMore.addEventListener("click", () => {
//         innerCard.style.transform = "rotateY(180deg)"
//     })

//     btnBack.addEventListener("click", () => {
//         innerCard.style.transform = "rotateY(0deg)"
//     })

// })

document.querySelectorAll(".event-card-container").forEach(card => {

    const btnMore = card.querySelector(".btn-more")
    const btnBack = card.querySelector(".btn-back")
    const eventCard = card.querySelector(".event-card")

    btnMore.addEventListener("click", () => {
        eventCard.classList.add("active")
    })

    btnBack.addEventListener("click", () => {
        eventCard.classList.remove("active")
    })

})