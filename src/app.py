"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db 
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models import User
from api.models import Viajes, Top, Belleza, Gastronomia
# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

datos = {
    "ofertas_destacadas": [{"id": i, "titulo": f"Oferta {i}"} for i in range(1, 21)],
    "belleza": [{"id": i, "titulo": f"Belleza {i}"} for i in range(1, 21)],
    "gastronomia": [{"id": i, "titulo": f"Gastronomía {i}"} for i in range(1, 21)],
    "viajes": [{"id": i, "titulo": f"Viaje {i}"} for i in range(1, 21)],
    "ofertas_especiales": [{"id": i, "titulo": f"Especial {i}"} for i in range(1, 21)],
    "newsletter": []
}

usuarios = {}
servicios = []
reservas = []
compras = []

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# Ruta para crear usuarios
@app.route('/registro', methods=['POST'])
def crear_usuario():
    data = request.get_json()
    correo = data.get('correo')
    password = data.get('password')
    nombre = data.get('nombre')
    role = data.get('role', 'cliente')  # por si no envían el role

    if not correo or not password or not nombre:
        return jsonify({"error": "Correo, contraseña y nombre son obligatorios"}), 400

    # Buscar si ya existe un usuario con ese correo
    usuario_existente = User.query.filter_by(correo=correo).first()
    if usuario_existente:
        return jsonify({"error": "El usuario ya existe"}), 409

    # Crear nuevo usuario
    nuevo_usuario = User(
        nombre=nombre,
        password=password,  # Aquí deberías cifrar la contraseña idealmente
        correo=correo,
        role=role,
        is_active=True
    )
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"mensaje": f"Usuario '{nombre}' creado correctamente"}), 201
    
# Ruta para obtener todos los usuarios
@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    usuarios = User.query.all()
    return jsonify([usuario.serialize() for usuario in usuarios]), 200

# Ruta para obtener un usuario por ID
@app.route('/usuarios/<int:id>', methods=['GET'])
def obtener_usuario_por_id(id):
    usuario = User.query.get(id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(usuario.serialize()), 200

# Ruta para iniciar sesión
@app.route('/login', methods=['POST'])
def iniciar_sesion():
    data = request.get_json()
    correo = data.get('correo')
    contraseña = data.get('password')

    if not correo or not contraseña:
        return jsonify({"error": "Correo y contraseña son obligatorios"}), 400

    usuario = User.query.filter_by(correo=correo).first()
    if not usuario or usuario.password != contraseña:
        return jsonify({"error": "Correo o contraseña incorrectos"}), 401

    return jsonify({"mensaje": f"Bienvenido, {correo}"}), 200

# Ruta para editar usuario (cambiar contraseña)
@app.route('/editar', methods=['PUT'])
def editar_usuario():
    data = request.get_json()
    correo = data.get('correo')
    nueva_contraseña = data.get('password')

    if not correo or not nueva_contraseña:
        return jsonify({"error": "Correo y nueva contraseña son obligatorios"}), 400

    usuario = User.query.filter_by(correo=correo).first()
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    usuario.password = nueva_contraseña
    db.session.commit()

    return jsonify({"mensaje": "Contraseña actualizada correctamente"}), 200


# Ruta para suscribirse al newsletter
@app.route('/newsletter', methods=['POST'])
def agregar_a_newsletter():
    data = request.get_json()
    correo = data.get('correo')

    if not correo:
        return jsonify({"error": "Correo es obligatorio"}), 400

    if correo in datos["newsletter"]:
        return jsonify({"mensaje": "Este correo ya está suscrito"}), 200

    datos["newsletter"].append(correo)
    return jsonify({"mensaje": "Suscripción exitosa"}), 201

# Ruta para obtener todos los correos del newsletter
@app.route('/newsletter', methods=['GET'])
def obtener_newsletter():
    return jsonify({"correos_suscritos": datos["newsletter"]}), 200

# Crear una reserva solo si ha comprado
@app.route('/reserva', methods=['POST'])
def crear_reserva():
    data = request.get_json()
    servicio_id = data.get('servicio_id')
    usuario = data.get('usuario')

    if not servicio_id or not usuario:
        return jsonify({"error": "Faltan datos"}), 400

    ha_comprado = any(
        c for c in compras if c["usuario"] == usuario and c["servicio_id"] == servicio_id
    )

    if not ha_comprado:
        return jsonify({"error": "El usuario no ha comprado este servicio"}), 403

    reservas.append({
        "servicio_id": servicio_id,
        "usuario": usuario
    })

    return jsonify({"mensaje": "Reserva creada con éxito"}), 201


# Consultar compras de un usuario

@app.route('/usuario/<nombre>/compras', methods=['GET'])
def ver_compras_por_nombre(nombre):
    # Buscar el correo del usuario por su nombre
    correo_usuario = None
    for correo, datos in usuarios.items():
        if datos["nombre"].lower() == nombre.lower():
            correo_usuario = correo
            break

    if not correo_usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # Buscar compras del usuario
    mis_compras = [c for c in compras if c["usuario"] == correo_usuario]

    if not mis_compras:
        return jsonify({"mensaje": "Este usuario no ha realizado compras aún"}), 200

    # Obtener detalles del servicio comprado
    resultado = []
    for compra in mis_compras:
        servicio = next((s for s in servicios if s["id"] == compra["servicio_id"]), None)
        if servicio:
            resultado.append({
                "nombre_servicio": servicio["nombre"],
                "precio": servicio["precio"],
                "descripcion": servicio["descripcion"]
            })

    return jsonify(resultado), 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
