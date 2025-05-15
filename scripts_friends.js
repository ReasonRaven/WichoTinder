// script for friends

class Student {
  constructor(name, career, hobbies, building, age, image) {
    this.name = name;
    this.career = career;
    this.hobbies = hobbies;
    this.building = building;
    this.age = age;
    this.image = image;
    this.friends = [];
  }

  addFriend(student) {
    this.friends.push(student);
  }
}

// Crear estudiantes
const students = {};

function setupStudents() {
  students["Camila"] = new Student(
    "Camila",
    "Ingeniería en Sistemas",
    "Leer",
    "Idit: Salón de Rafa",
    "18",
    "images/Aimep3.jpeg"
  );
  students["Ximena"] = new Student(
    "Ximena",
    "Animación",
    "Dibujar",
    "Idit: Serendipia y Mesas de trabajo",
    "20",
    "images/Gato.jpeg"
  );
  students["Peña"] = new Student(
    "Peña",
    "Ingeniería en Sistemas",
    "Programar",
    "Idit: Salón de Rafa",
    "21",
    "images/MilesMorales.jpeg"
  );
  students["Tomás"] = new Student(
    "Tomás",
    "Ingeniería en Sistemas",
    "Jugar",
    "Idit: Salón de Rafa",
    "18",
    "images/NegroWhatsapp.jpeg"
  );
  students["Emmanuel"] = new Student(
    "Emmanuel",
    "Ingeniería en Sistemas",
    "Programar",
    "Canchas",
    "19",
    "images/Shaq.jpeg"
  );
  students["Suyana"] = new Student(
    "Suyana",
    "Psicología",
    "Dibujar",
    "Cafetería",
    "19",
    "images/Mamacoco.jpeg"
  );
  students["Aitana"] = new Student(
    "Aitana",
    "Animación",
    "Dibujar",
    "Voluntariado",
    "20",
    "images/Hamster.jpeg"
  );
  students["Carlos Andrés"] = new Student(
    "Carlos Andrés",
    "Ingeniería en Sistemas",
    "Programar",
    "Edificio A",
    "18",
    "images/William.jpeg"
  );
  students["Carlos"] = new Student(
    "Carlos",
    "Ingeniería en Sistemas",
    "Jugar",
    "Gym",
    "19",
    "images/Mclovin.jpeg"
  );
  students["Rogelio"] = new Student(
    "Rogelio",
    "Ingeniería en Sistemas",
    "Jugar",
    "Edificio F",
    "19",
    "images/Negropensando.jpeg"
  );
  students["María Renee"] = new Student(
    "María Renee",
    "Ingeniería en Biotec",
    "Leer",
    "Idit: Laboratorios",
    "20",
    "images/RanaRene.jpeg"
  );
  students["Jesús Manuel"] = new Student(
    "Jesús Manuel",
    "Ingeniería Mecatrónica",
    "Jugar",
    "Idit: Salón de Oliver",
    "20",
    "images/Sherk.jpeg"
  );
  students["Oscar"] = new Student(
    "Oscar",
    "Ingeniería en Sistemas",
    "Jugar",
    "Edificio C",
    "18",
    "images/NovioAimep3.jpeg"
  );
  students["Jonathan"] = new Student(
    "Jonathan",
    "Ingeniería en Sistemas",
    "Jugar",
    "Edificio B",
    "18",
    "images/Gigachat.jpeg"
  );
  students["Wicho"] = new Student(
    "Wicho",
    "Ingeniería Mecatrónica",
    "Programar",
    "Edificio G",
    "28",
    "images/Curly.jpeg"
  );
}
setupStudents();

let selectedUser = null;
const addedFriends = new Set();

function renderFriendCards(name, mode = "add") {
  const container = document.getElementById("suggestionsContainer");
  container.innerHTML = "";
  selectedUser = students[name];

  const userHobbies = selectedUser.hobbies.toLowerCase().split(/,\s*/);

  Object.values(students).forEach((student) => {
    if (student.name === name) return;

    const isFriend = selectedUser.friends.includes(student);

    if (
      (mode === "add" && !isFriend && !addedFriends.has(student.name)) ||
      (mode === "remove" && isFriend)
    ) {
      const card = document.createElement("div");
      card.className = "profile-card";

      // Verificar compatibilidad
      const studentHobbies = student.hobbies.toLowerCase().split(/,\s*/);
      const compatible = studentHobbies.some((hobby) =>
        userHobbies.includes(hobby)
      );

      // Crear el círculo de compatibilidad
      const indicator = document.createElement("div");
      indicator.classList.add("compatibility-circle");
      indicator.classList.add(compatible ? "high" : "low");
      card.appendChild(indicator);

      const picture = document.createElement("div");
      picture.className = "profile-picture";
      picture.style.backgroundImage = `url('${student.image}')`;

      card.appendChild(picture);
      card.innerHTML += `
        <h2>${student.name}</h2>
        <p><strong>Edad:</strong> ${student.age}</p>
        <p><strong>Carrera:</strong> ${student.career}</p>
        <p><strong>Hobbies:</strong> ${student.hobbies}</p>
        <p><strong>Ubicación:</strong> ${student.building}</p>
      `;

      const button = document.createElement("button");
      button.className = mode === "add" ? "add-button" : "remove-button";
      button.textContent = mode === "add" ? "Agregar amigo" : "Eliminar amigo";

      button.onclick = () => {
        if (mode === "add") {
          addFriend(student.name);
        } else {
          removeFriend(student.name);
        }
      };

      card.appendChild(button);
      container.appendChild(card);
    }
  });
}

function addFriend(name) {
  const friend = students[name];

  if (!addedFriends.has(friend.name)) {
    // Agregar amigo al usuario seleccionado si no existe
    if (!selectedUser.friends.includes(friend)) {
      selectedUser.addFriend(friend);
    }

    // Agregar usuario seleccionado como amigo del otro estudiante si no existe
    if (!friend.friends.includes(selectedUser)) {
      friend.addFriend(selectedUser);
    }

    addedFriends.add(friend.name);
    renderFriendCards(selectedUser.name);

    // Mostrar en lista de amigos seleccionados
    const list = document.getElementById("friendList");
    const item = document.createElement("li");
    item.textContent = friend.name;
    list.appendChild(item);

    saveState(); // Guardar el estado actualizado
  }
}

function removeFriend(name) {
  const friend = students[name];

  // Remover del array de amigos
  selectedUser.friends = selectedUser.friends.filter((f) => f.name !== name);
  friend.friends = friend.friends.filter((f) => f.name !== selectedUser.name);
  addedFriends.delete(friend.name);

  // Volver a renderizar cards y lista
  renderFriendCards(selectedUser.name);

  const list = document.getElementById("friendList");
  list.innerHTML = "";
  selectedUser.friends.forEach((f) => {
    const item = document.createElement("li");
    item.textContent = f.name;
    list.appendChild(item);
  });

  saveState(); // Guardar el estado actualizado
}

function drawGraph() {
  const canvas = document.getElementById("graphCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 200;

  const angleStep = (2 * Math.PI) / selectedUser.friends.length;

  ctx.fillStyle = "#ba4b2f";
  ctx.beginPath();
  ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(selectedUser.name, centerX, centerY + 5);

  selectedUser.friends.forEach((friend, index) => {
    const angle = index * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.fillStyle = "#4f9da6";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.fillText(friend.name, x, y + 5);
  });
  saveState();
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const userSelect = document.getElementById("userSelect");

  Object.keys(students).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    userSelect.appendChild(option);
  });

  userSelect.addEventListener("change", (e) => {
    if (e.target.value && !selectedUser) {
      selectedUser = students[e.target.value];
      renderFriendCards(selectedUser.name);
      userSelect.disabled = true;
      saveState(); // Guardar también en este punto
    }
  });

  document.getElementById("finishButton").addEventListener("click", () => {
    if (selectedUser && selectedUser.friends.length > 0) {
      drawGraph();
      saveState();
    } else {
      alert("Por favor selecciona tu nombre y agrega al menos un amigo.");
    }
  });

  document.getElementById("resetButton").addEventListener("click", resetApp);

  // 🔁 Siempre intentar cargar estado al final
  loadState();

  document.getElementById("showAddFriends").addEventListener("click", () => {
    if (selectedUser) {
      renderFriendCards(selectedUser.name, "add");
    } else {
      alert("Primero selecciona tu nombre.");
    }
  });

  document.getElementById("showRemoveFriends").addEventListener("click", () => {
    if (selectedUser) {
      renderFriendCards(selectedUser.name, "remove");
    } else {
      alert("Primero selecciona tu nombre.");
    }
  });
});

function resetApp() {
  // Limpiar estado en memoria
  selectedUser = null;
  addedFriends.clear();

  // Limpiar interfaz
  document.getElementById("userSelect").value = "";
  document.getElementById("userSelect").disabled = false;
  document.getElementById("suggestionsContainer").innerHTML = "";
  document.getElementById("friendList").innerHTML = "";

  // Limpiar canvas
  const canvas = document.getElementById("graphCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Limpiar localStorage
  localStorage.removeItem("friendAppState");
}

function saveState() {
  if (selectedUser) {
    const state = {
      selectedUserName: selectedUser.name,
      addedFriends: Array.from(addedFriends),
    };
    localStorage.setItem("friendAppState", JSON.stringify(state));
  }
}

function loadState() {
  const stateStr = localStorage.getItem("friendAppState");
  if (stateStr) {
    const state = JSON.parse(stateStr);
    selectedUser = students[state.selectedUserName];
    addedFriends.clear();

    state.addedFriends.forEach((name) => {
      const friend = students[name];
      if (friend && !selectedUser.friends.includes(friend)) {
        selectedUser.addFriend(friend);
        if (!friend.friends.includes(selectedUser)) {
          friend.addFriend(selectedUser);
        }
        addedFriends.add(name);
      }
    });

    // Mostrar selección
    const userSelect = document.getElementById("userSelect");
    userSelect.value = selectedUser.name;
    userSelect.disabled = true;

    // Mostrar cards y lista
    renderFriendCards(selectedUser.name);
    const list = document.getElementById("friendList");
    list.innerHTML = "";
    selectedUser.friends.forEach((friend) => {
      const item = document.createElement("li");
      item.textContent = friend.name;
      list.appendChild(item);
    });
  }
}
