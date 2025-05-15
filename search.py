class Student:
    def __init__(self, name, career, hobbies, building, age):
        self.name = name
        self.career = career
        self.hobbies = hobbies  # lista de hobbies
        self.building = building
        self.age = age
        self.friends = []

    def add_friend(self, student):
        self.friends.append(student)

def calcular_compatibilidad(base_student, otro_student):
    score = 0

    if base_student.career == otro_student.career:
        score += 40

    hobbies_en_comun = set(base_student.hobbies).intersection(set(otro_student.hobbies))
    if hobbies_en_comun:
        score += 30

    if abs(base_student.age - otro_student.age) <= 1:
        score += 20

    if base_student.building == otro_student.building:
        score += 10

    return score

def buscar_compatibles(student, lista_estudiantes):
    resultados = []

    for otro in lista_estudiantes:
        if otro.name == student.name:
            continue
        compatibilidad = calcular_compatibilidad(student, otro)
        resultados.append((otro.name, compatibilidad, otro.career, otro.hobbies, otro.age, otro.building))

    resultados.sort(key=lambda x: x[1], reverse=True)  # descendente
    return resultados

def main():
    estudiantes = [
        Student("Camila", "Ingeniería en Sistemas", ["Leer"], "Idit: Salón de Rafa", 18),
        Student("Ximena", "Animación", ["Dibujar"], "Idit: Serendipia y Mesas de trabajo", 20),
        Student("Daniel", "Ingeniería en Sistemas", ["Programar"], "Idit: Salón de Rafa", 21),
        Student("Tomás", "Ingeniería en Sistemas", ["Jugar"], "Idit: Salón de Rafa", 18),
        Student("Emma", "Ingeniería en Sistemas", ["Programar"], "Canchas", 19),
        Student("Suyana", "Psicología", ["Dibujar"], "Cafetería", 19),
        Student("Aitana", "Animación", ["Dibujar"], "Voluntariado", 20),
        Student("Chuy", "Ingeniería Mecatrónica", ["Jugar"], "Idit: Salón de Oliver", 20),
        Student("María", "Ingeniería en Biotecnología", ["Leer"], "Idit: Laboratorios", 20),
        Student("Jesús", "Ingeniería Mecatrónica", ["Deportes"], "Idit: Salón de Oliver", 18),
    ]

    nombres_disponibles = [e.name for e in estudiantes]
    print("Estudiantes disponibles:")
    for name in nombres_disponibles:
        print("-", name)

    nombre_input = input("\nEscribe el nombre del estudiante para buscar compatibles: ").strip()

    base_estudiante = next((e for e in estudiantes if e.name.lower() == nombre_input.lower()), None)

    if not base_estudiante:
        print("Estudiante no encontrado.")
        return

    resultados = buscar_compatibles(base_estudiante, estudiantes)

    print(f"\n🔍 Resultados de compatibilidad para {base_estudiante.name}:\n")
    for nombre, puntaje, carrera, hobbies, edad, edificio in resultados:
        print(f"{nombre} - {puntaje}% compatible")
        print(f"  Carrera: {carrera}")
        print(f"  Hobbies: {', '.join(hobbies)}")
        print(f"  Edad: {edad}")
        print(f"  Ubicación: {edificio}\n")

if __name__ == "__main__":
    main()
