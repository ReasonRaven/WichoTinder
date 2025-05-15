function openModal() {
    document.getElementById("codeModal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("codeModal").style.display = "none";
  }
  
  function copyCode() {
    const code = document.querySelector("#codeModal code").innerText;
    navigator.clipboard.writeText(code).then(() => {
      alert("Código copiado al portapapeles!");
    });
  }
  
  // Cierra el modal si el usuario hace clic fuera del contenido
  window.onclick = function (event) {
    const modal = document.getElementById("codeModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }  
  }  

// Funcion para hacer que el boton de buscar amigo y busqueda recientes funcionen
  const searchStack = [];
// Buscar amigo 
function searchFriend() {
  const name = document.getElementById("friendName").value.trim().toLowerCase();
  // Lista donde se almacenaran los nombres de los amigos
  const students = [  
    "camila", "ximena", "daniel", "tomás", "emmanuel", "suyana", "aitana",
    "carlos andrés", "carlos", "rogelio", "maría renee", "jesús manuel",
    "oscar", "jonathan", "wicho"
  ];

  const resultDiv = document.getElementById("searchResults");

  if (students.includes(name)) {
    searchStack.push(name);
    resultDiv.innerHTML = `<p>✅ ${name} sí está en el campus.</p>`;
  } else {
    resultDiv.innerHTML = `<p>❌ Amigo no encontrado.</p>`;
  }
}

// Busquedas recientes 
function showRecentSearches() {
  const resultDiv = document.getElementById("searchResults");
  if (searchStack.length === 0) {
    resultDiv.innerHTML = "<p>No hay búsquedas recientes.</p>";
  } else {
    resultDiv.innerHTML = "<p><strong>Búsquedas recientes:</strong></p><ul>" +
      searchStack.slice().reverse().map(name => `<li>${name}</li>`).join("") +
      "</ul>";
  }
}

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