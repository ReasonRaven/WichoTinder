import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import networkx as nx

# Cargar imagen
img = mpimg.imread("mapaCampus.jpg")

# Crear grafo
G = nx.Graph()

# Coordenadas
nodes = {
    "Serendipia y Mesas de trabajo": (364, 725),
    "Salón de Oliver": (483, 636),
    "Salón de Rafa": (560, 733),
    "Maquinaria": (412, 811),
    "Lab": (440, 885),
    "Gym": (1421, 577),
    "A": (1253, 1441),
    "B": (992, 1497),
    "C": (703, 1530),
    "D": (469, 1567),
    "F": (420, 1450),
    "G": (689, 1409),
    "H": (1008, 1340),
    "V": (1174, 1240),
    "Biblioteca": (1457, 1430),
    "Auditorio Ignacio Ellacuría": (1374, 1141),
    "Cafetería": (400, 1812),
}

# Agregar nodos
for name, (x, y) in nodes.items():
    G.add_node(name, pos=(x, y))

# Agregar conexiones
edges = [
    ("Serendipia y Mesas de trabajo", "Salón de Rafa"),
    ("Salón de Rafa", "Salón de Oliver"),
    ("Salón de Rafa", "Maquinaria"),
    ("Maquinaria", "Lab"),
    ("Salón de Rafa", "Gym"),
    ("Gym", "Auditorio Ignacio Ellacuría"),
    ("Biblioteca", "A"),
    ("Lab", "G"),
    ("A", "B"),
    ("B", "C"),
    ("C", "D"),
    ("D", "Cafetería"),
    ("D", "F"),
    ("F", "G"),
    ("G", "H"),
    ("H", "V"),
    ("V", "Auditorio Ignacio Ellacuría"),
    ("Auditorio Ignacio Ellacuría", "Biblioteca"),
    ("V", "Biblioteca")
]

G.add_edges_from(edges)

# Posiciones
pos = nx.get_node_attributes(G, 'pos')

# Dibujar imagen de fondo
fig, ax = plt.subplots(figsize=(10, 12))
ax.imshow(img, extent=[0, img.shape[1], img.shape[0], 0])

# Dibujar grafo
nx.draw(G, pos, with_labels=True, node_color='lightblue', node_size=900, font_size=7,
        edge_color='gray', ax=ax)

plt.title("Mapa del Campus con Grafo", fontsize=12)
plt.axis('off')
plt.tight_layout()
plt.show()
