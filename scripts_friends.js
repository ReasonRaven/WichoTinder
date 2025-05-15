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
  students["Camila"] = new Student("Camila", "Ingeniería en Sistemas", "Leer", "Idit: Salón de Rafa", "18", "fotos/camila.jpg");
  students["Ximena"] = new Student("Ximena", "Animación", "Dibujar", "Idit: Serendipia y Mesas de trabajo", "20", "fotos/ximena.jpg");
  students["Daniel"] = new Student("Daniel", "Ingeniería en Sistemas", "Programar", "Idit: Salón de Rafa", "21", "fotos/pena.jpg");
  students["Tomás"] = new Student("Tomás", "Ingeniería en Sistemas", "Jugar", "Idit: Salón de Rafa", "18", "fotos/tomas.jpg");
  students["Emmanuel"] = new Student("Emmanuel", "Ingeniería en Sistemas", "Programar", "Canchas", "19", "fotos/emma.jpg");
  students["Suyana"] = new Student("Suyana", "Psicología", "Dibujar", "Cafetería", "19", "fotos/susu.jpg");
  students["Aitana"] = new Student("Aitana", "Animación", "Dibujar", "Voluntariado", "20", "fotos/aitana.jpg");
  students["Carlos Andrés"] = new Student("Carlos Andrés", "Ingeniería en Sistemas", "Programar", "Edificio A", "18", "fotos/carlosA.jpg");
  students["Carlos"] = new Student("Carlos", "Ingeniería en Sistemas", "Jugar", "Gym", "19", "fotos/carlosJ.jpg");
  students["Rogelio"] = new Student("Rogelio", "Ingeniería en Sistemas", "Jugar", "Edificio F", "19", "fotos/roger.jpg");
  students["María Renee"] = new Student("María Renee", "Ingeniería en Biotec", "Leer", "Idit: Laboratorios", "20", "fotos/maria.jpg");
  students["Jesús Manuel"] = new Student("Jesús Manuel", "Ingeniería Mecatrónica", "Jugar", "Idit: Salón de Oliver", "20", "fotos/chuy.jpg");
  students["Oscar"] = new Student("Oscar", "Ingeniería en Sistemas", "Jugar", "Edificio C", "18", "fotos/oscar.jpg");
  students["Jonathan"] = new Student("Jonathan", "Ingeniería en Sistemas", "Jugar", "Edificio B", "18", "fotos/jonathan.jpg");
  students["Wicho"] = new Student("Wicho", "Ingeniería Mecatrónica", "Programar", "Edificio G", "28", "fotos/wicho.jpg");

  // Agregar amigos por defecto
  students["Camila"].addFriend(students["Ximena"]);
  students["Camila"].addFriend(students["Aitana"]);
  students["Camila"].addFriend(students["Suyana"]);
  students["Camila"].addFriend(students["Daniel"]);
  students["Camila"].addFriend(students["Carlos Andrés"]);
  students["Camila"].addFriend(students["Carlos"]);
  students["Camila"].addFriend(students["Rogelio"]);
  students["Camila"].addFriend(students["Jesús Manuel"]);
  students["Camila"].addFriend(students["Tomás"]);
  students["Camila"].addFriend(students["Emmanuel"]);
  students["Camila"].addFriend(students["María Renee"]);
  students["Camila"].addFriend(students["Wicho"]);

  students["Daniel"].addFriend(students["Tomás"]);
  students["Daniel"].addFriend(students["Emmanuel"]);
  students["Daniel"].addFriend(students["Carlos Andrés"]);
  students["Daniel"].addFriend(students["Jonathan"]);
  students["Daniel"].addFriend(students["Wicho"]);

  students["Tomás"].addFriend(students["Emmanuel"]);
  students["Tomás"].addFriend(students["Carlos Andrés"]);
  students["Tomás"].addFriend(students["Jonathan"]);
  students["Tomás"].addFriend(students["Wicho"]);

  students["Emmanuel"].addFriend(students["Jonathan"]);
  students["Emmanuel"].addFriend(students["Wicho"]);

  students["Carlos Andrés"].addFriend(students["Carlos"]);
  students["Carlos Andrés"].addFriend(students["Rogelio"]);
  students["Carlos Andrés"].addFriend(students["María Renee"]);
  students["Carlos Andrés"].addFriend(students["Jonathan"]);
  students["Carlos Andrés"].addFriend(students["Wicho"]);
  students["Carlos Andrés"].addFriend(students["Oscar"]);

  students["Carlos"].addFriend(students["Rogelio"]);
  students["María Renee"].addFriend(students["Jesús Manuel"]);
  students["Oscar"].addFriend(students["Jonathan"]);
}
setupStudents();

let selectedUser = null;
const addedFriends = new Set();

function renderFriendCards(name) {
  const container = document.getElementById("suggestionsContainer");
  container.innerHTML = "";
  selectedUser = students[name];

  const userHobbies = selectedUser.hobbies.toLowerCase().split(/,\s*/); // Convierte hobbies en array

  Object.values(students).forEach((student) => {
    if (student.name !== name && !selectedUser.friends.includes(student) && !addedFriends.has(student.name)) {
      const card = document.createElement("div");
      card.className = "profile-card";

      const picture = document.createElement("div");
      picture.className = "profile-picture";
      picture.style.backgroundImage = `url('${student.image}')`;

      // Calcular compatibilidad
      const friendHobbies = student.hobbies.toLowerCase().split(/,\s*/);
      const matches = friendHobbies.filter(hobby => userHobbies.includes(hobby));
      
      let compatibility = "low"; // Por defecto
      compatibility = matches.length > 0 ? "high" : "low";

      

      // Crear el círculo de compatibilidad
      const circle = document.createElement("div");
      circle.className = `compatibility-circle ${compatibility}`;
      // Estilo visual lo haces con CSS

      card.appendChild(picture);
      card.appendChild(circle); // Agrega el círculo al card

      card.innerHTML += `
        <h2>${student.name}</h2>
        <p><strong>Edad:</strong> ${student.age}</p>
        <p><strong>Carrera:</strong> ${student.career}</p>
        <p><strong>Hobbies:</strong> ${student.hobbies}</p>
        <p><strong>Ubicación:</strong> ${student.building}</p>
        <button class="add-button" onclick="addFriend('${student.name}')">Agregar amigo</button>
      `;

      container.appendChild(card);
    }
  });
}


function addFriend(name) {
  const friend = students[name];
  if (!addedFriends.has(friend.name)) {
    selectedUser.addFriend(friend);
    addedFriends.add(friend.name);
    renderFriendCards(selectedUser.name);

    // Mostrar en lista de amigos seleccionados
    const list = document.getElementById("friendList");
    const item = document.createElement("li");
    item.textContent = friend.name;
    list.appendChild(item);
  }
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
} 

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const userSelect = document.getElementById("userSelect");

  Object.keys(students).forEach(name => {
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
    }
  });

  document.getElementById("finishButton").addEventListener("click", () => {
    if (selectedUser && selectedUser.friends.length > 0) {
      drawGraph();
    } else {
      alert("Por favor selecciona tu nombre y agrega al menos un amigo.");
    }
  });
});







/*PARA QUE SE MUESTREN ARISTAS*/ 
/* function drawGraph() {
  const canvas = document.getElementById("graphCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 200;

  const angleStep = (2 * Math.PI) / selectedUser.friends.length;

  // Dibuja el círculo del usuario seleccionado
  ctx.fillStyle = "#ba4b2f";
  ctx.beginPath();
  ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(selectedUser.name, centerX, centerY + 5);

  // Dibuja las conexiones entre el usuario seleccionado y sus amigos
  selectedUser.friends.forEach((friend, index) => {
    const angle = index * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Dibuja los círculos de los amigos
    ctx.fillStyle = "#4f9da6";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.fillText(friend.name, x, y + 5);
  });

  // Dibuja las conexiones entre los amigos
  for (let i = 0; i < selectedUser.friends.length; i++) {
    for (let j = i + 1; j < selectedUser.friends.length; j++) {
      const friendA = selectedUser.friends[i];
      const friendB = selectedUser.friends[j];

      // Si los dos amigos también son amigos entre sí, dibuja una línea entre ellos
      if (friendA.friends.includes(friendB)) {
        const angleA = i * angleStep;
        const angleB = j * angleStep;
        const xA = centerX + radius * Math.cos(angleA);
        const yA = centerY + radius * Math.sin(angleA);
        const xB = centerX + radius * Math.cos(angleB);
        const yB = centerY + radius * Math.sin(angleB);

        ctx.strokeStyle = "#f39c12";  // Color diferente para las conexiones entre amigos
        ctx.beginPath();
        ctx.moveTo(xA, yA);
        ctx.lineTo(xB, yB);
        ctx.stroke();
      }
    }
  }
} */

