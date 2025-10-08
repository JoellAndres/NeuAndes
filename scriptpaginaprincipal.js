document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navbarLinks = document.getElementById("navbar-links");

    
    hamburger.addEventListener("click", () => {
        navbarLinks.classList.toggle("show");
    });
});