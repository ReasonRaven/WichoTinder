// Select the logo and link
const logo = document.getElementById("game-logo");
const logoLink = document.getElementById("logo-link");

// Click to the logo link
logoLink.addEventListener("click", (event) => {
    event.preventDefault();

    // Clicked to trigger the animation
    logo.classList.add("clicked");

    // Wait for animation, navigate
    setTimeout(() => {
        window.location.href = logoLink.href; // Redirect
    }, 500); // Match the animation (0.5s)
});