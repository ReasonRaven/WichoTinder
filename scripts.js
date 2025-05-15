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

document.addEventListener("DOMContentLoaded", () => {
    const stateStr = localStorage.getItem("friendAppState");
    if (stateStr) {
      const state = JSON.parse(stateStr);
      const container = document.getElementById("searchResults");
  
      const friendsList = state.addedFriends.map(name => <li>${name}</li>).join("");
  
      container.innerHTML = `
        <p><strong>Usuario:</strong> ${state.selectedUserName}</p>
        <p><strong>Amigos guardados:</strong></p>
        <ul>${friendsList}</ul>
      `;
    }
  });