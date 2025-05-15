import networkx as nx
import matplotlib.pyplot as plt

class Building:
    def __init__(self, name):
        self.name = name
        self.neighbors = [] # lista (building, distance)
        
    def add_neighbor(self, building, distance):
        self.neighbors.append((building, distance))
        
class Student:
    def __init__(self, name, career, hobbies, building, age):
        self.name = name
        self.career = career
        self.hobbies = hobbies
        self.building = building
        self.age = age
        self.friends = []
        
        def add_friends(self, student):
            self.friends.append(student)
            
campus_map = {}
students = []

def setup_campus():
    biblio = Building("Biblioteca")
    cafe = Building("Cafetería")
    iditLabs = Building("Idit: Laboratorios")
    iditRafa = Building("Idit: Salón de Rafa")
    iditSer = Building("Idit: Serendipia y Mesas de trabajo")
    iditMeca = Building("Idit: Salón de Oliver")
    iditM = Building("Idit: Maquinaria")
    voluntariado = Building("Voluntariado")
    gym = Building("Gym")
    edA = Building("Edificio A")
    edB = Building("Edificio B")
    edC = Building("Edificio C")
    edD = Building("Edificio D")
    edF = Building("Edificio F")
    edG = Building("Edificio G")
    edH = Building("Edificio H")
    auditorio = Building("Auditorio Ignacio Ellacuría")
    canchas = Building("Canchas")
    
    biblio.add_neighbor(edA, 1)
    edA.add_neighbor(edB, 1)
    edB.add_neighbor(edC, 1)
    edC.add_neighbor(edD, 1)
    edD.add_neighbor(cafe, 3)
    edD.add_neighbor(edF, 2)
    edF.add_neighbor(edG, 1)
    edG.add_neighbor(edH, 1)
    edH.add_neighbor(voluntariado, 1)
    auditorio.add_neighbor(biblio, 2)
    auditorio.add_neighbor(voluntariado, 2)
    edH.add_neighbor(iditLabs, 8)
    iditLabs.add_neighbor(iditM, 1)
    iditM.add_neighbor(iditSer, 1)
    iditSer.add_neighbor(iditRafa, 1) 
    iditRafa.add_neighbor(iditMeca, 1)
    iditMeca.add_neighbor(canchas, 3)
    iditRafa.add_neighbor(canchas, 4)
    canchas.add_neighbor(gym, 5)
    
    campus_map["Biblioteca"] = biblio
    campus_map["Cafetería"] = cafe
    campus_map["Idit: Laboratorios"] = iditLabs
    campus_map["Idit: Salón de Rafa"] = iditRafa
    campus_map["Idit: Serendipia y Mesas de trabajo"] = iditSer
    campus_map["Idit: Salón de Oliver"] = iditMeca
    campus_map["Idit: Maquinaria"] = iditM
    campus_map["Voluntariado"] = voluntariado
    campus_map["Gym"] = gym
    campus_map["Edificio A"] = edA
    campus_map["Edificio B"] = edB
    campus_map["Edificio C"] = edC
    campus_map["Edificio D"] = edD
    campus_map["Edificio F"] = edF
    campus_map["Edificio G"] = edG
    campus_map["Edificio H"] = edH
    campus_map["Auditorio Ignacio Ellacuría"] = auditorio
    campus_map["Canchas"] = canchas
    
def setup_students():
    camila = Student("Camila", "Ingeniería en Sistemas", "Leer", "Idit: Salón de Rafa", "18")
    ximena = Student("Ximena", "Animación", "Dibujar", "Idit: Serendipia y Mesas de trabajo", "20")
    peña = Student("Daniel", "Ingeniería en Sistemas", "Programar", "Idit: Salón de Rafa", "21")
    tomas = Student("Tomás", "Ingeniería en Sistemas", "Jugar", "Idit: Salón de Rafa", "18")
    emma = Student("Emmanuel", "Ingeniería en Sistemas", "Programar", "Canchas", "19")
    susu = Student("Suyana", "Psicología", "Dibujar", "Cafetería", "19")
    aitana = Student("Aitana", "Animación", "Dibujar", "Voluntariado", "20")
    carlosA = Student("Carlos Andrés", "Ingeniería en Sistemas", "Programar", "Edificio A", "18")
    carlosJ = Student("Carlos", "Ingeniería en Sistemas", "Jugar", "Gym", "19")
    roger = Student("Rogelio", "Ingeniería en Sistemas", "Jugar", "Edificio F", "18")
    maria = Student("María Renee", "Ingeniería en Biotec", "Leer", "Idit: Laboratorios", "20")
    chuy = Student("Jesús Manuel", "Ingeniería Mecatrónica", "Jugar", "Idit: Salón de Oliver", "20")
    oscar = Student("Oscar", "Ingeniería en Sistemas", "Jugar", "Edificio C", "18")
    jonathan = Student("Jonathan", "Ingeniería en Sistemas", "Jugar", "Edificio B", "18")
    
    camila.add_friend(ximena)
    camila.add_friend(aitana)
    camila.add_friend(susu)
    camila.add_friend(peña)
    camila.add_friend(carlosA)
    camila.add_friend(carlosJ)
    camila.add_friend(roger)
    camila.add_friend(chuy)
    camila.add_friend(tomas)
    camila.add_friend(emma)
    camila.add_friend(maria)
    ximena.add_friend(aitana)
    peña.add_friend(tomas)
    peña.add_friend(emma)
    peña.add_friend(carlosA)
    peña.add_friend(jonathan)
    tomas.add_friend(emma)
    tomas.add_friend(carlosA)
    tomas.add_friend(jonathan)
    emma.add_friend(jonathan)
    carlosA.add_friend(carlosJ)
    carlosA.add_friend(roger)
    carlosA.add_friend(maria)
    carlosA.add_friend(jonathan)
    carlosA.add_friend(oscar)
    carlosJ.add_friend(roger)
    maria.add_friend(chuy)
    oscar.add_friend(jonathan)
    
    students.extend([camila, ximena, peña, tomas, emma, susu, aitana, carlosA, carlosJ, roger, maria, chuy, oscar, jonathan])

def draw_combined_graph():
    G = nx.Graph()
    
    # Agrega nodos de edificios
    for building_name, building in campus_map.items():
        G.add_node(building_name, type='building')
        
        for neighbor, distance in building.neighbors:
            G.add_edge(building_name, neighbor.name, weight=distance, type='building_path')
            
    # Agrega nodos de estudiantes
    for student in students:
        G.add_node(student.name, type='student')
        # conecta estudiante con edificio
        G.add_edge(student.name, student.building, type='assigned')
        
        # agregar amistades
        for friend in student.friends:
            if not G.has_edge(student.name, friend.name): #evita duplicar amistades
                G.add_edge(student.name, friend.name, type='friendship')
    
    # prepara posiciones automáticas
    pos = nx.spring_layout(G, seed=42)
    
    # dibujar edificios
    building_nodes = [n for n, attr in G.nodes(data=True) if attr['type'] == 'building']
    nx.draw_networkx_nodes(G, pos, nodelist=building_nodes, node_color='lightgreen', node_size=500, label='Edificios')
    
    # dibujar estudiantes
    building_nodes = [n for n, attr in G.nodes(data=True) if attr['type'] == 'student']
    nx.draw_networkx_nodes(G, pos, nodelist=building_nodes, node_color='lightblue', node_size=500, label='Estudiantes')
    
    # dibujar caminos entre edificios
    building_edges = [(u,v) for u, v, d in G.edges(data=True) if d['type'] == 'building_path']
    nx.draw_networkx_nodes(G, pos, edgelist=building_edges, edge_color='green', style='solid')
    
    # dibujar amistades
    building_edges = [(u,v) for u, v, d in G.edges(data=True) if d['type'] == 'friendship']
    nx.draw_networkx_nodes(G, pos, edgelist=friendship_edges, edge_color='blue', style='dashed')
    
    # asignar edificio a estudiante
    building_edges = [(u,v) for u, v, d in G.edges(data=True) if d['type'] == 'assigned']
    nx.draw_networkx_nodes(G, pos, edgelist=assigned_edges, edge_color='gray', style='dotted')
    
    # agregar etiquetas
    nx.draw_networkx_labels(G, pos, fond_size=10)
    
    plt.title("WichoTinder")
    plt.axis('off')
    plt.legend(['Edificios', 'Estudiantes'])
    plt.show()
    
def main():
    setup_campus()
    setup_students()
    draw_combined_graph()
    
if __name__ == "__main__":
    main()