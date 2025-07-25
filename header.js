let menuNav = document.getElementById("menu-nav");
let headerButtons = document.getElementById("header-buttons");
menuNav.style.maxHeight = "0px";
headerButtons.style.height = "0px";

function toggleMenu() {
    if (window.innerWidth > 600) {
        if (menuNav.style.maxHeight == "0px") {
            menuNav.style.maxHeight = "200px";
        } else {
            menuNav.style.maxHeight = "0px";
        };
    } else {
        if (menuNav.style.maxHeight == "0px") {
            menuNav.style.maxHeight = "250px";
            headerButtons.style.height = "50px";
            headerButtons.style.transitionDelay = "0.2s";
        } else {
            menuNav.style.maxHeight = "0px";
            headerButtons.style.height = "0px";
            headerButtons.style.transitionDelay = "0.01s";
        };
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const mainHeader = document.querySelector('.main-header');
    const headerTopHeight = document.querySelector('.header-top').offsetHeight;

    window.addEventListener('scroll', function() {
        if (window.scrollY > headerTopHeight) {
            mainHeader.classList.add('scrolled');
            menuNav.style.top = "100px";
            headerButtons.style.top = "300px";
        } else {
            mainHeader.classList.remove('scrolled');
            menuNav.style.top = "130px";
            headerButtons.style.top = "330px";
        }
    });
});