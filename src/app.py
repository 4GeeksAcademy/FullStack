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
from api.models import Viajes, Top, Belleza, Gastronomia, Category
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

# Ruta para categoria 
@app.route('/categorias', methods=['POST'])
def crear_categoria():
    data = request.get_json()

    if not data.get('nombre'):
        return jsonify({"error": "El nombre es obligatorio"}), 400

    nueva_categoria = Category(nombre=data['nombre'])

    db.session.add(nueva_categoria)
    db.session.commit()

    return jsonify({
        "id": nueva_categoria.id,
        "nombre": nueva_categoria.nombre
    }), 201

# Ruta para crear un servicio
@app.route('/viajes', methods=['POST'])
def crear_viaje():
    data = request.get_json()

    # Puedes imprimir para debug
    print("Datos recibidos:", data)

    nuevo_viaje = Viajes(
        nombre=data.get('nombre'),
        descripcion=data.get('descripcion'),
        precio=data.get('precio'),
        ubicacion=data.get('ubicacion'),
        horarios=data.get('horarios'),
        user_id=data.get('user_id'),
        category_id=data.get('category_id')
    )

    db.session.add(nuevo_viaje)
    db.session.commit()

    return jsonify(nuevo_viaje.serialize()), 201

# Ruta para obtener todos los viajes
@app.route('/viajes', methods=['GET'])
def obtener_viajes():
    viajes = Viajes.query.all()
    viajes_serializados = [{
        "id": viaje.id,
        "nombre": viaje.nombre,
        "precio": viaje.precio,
        "descripcion": viaje.descripcion
    } for viaje in viajes]

    return jsonify({"viajes": viajes_serializados}), 200

@app.route('/viajes/<int:id>', methods=['GET'])
def obtener_viaje(id):
    # Buscar el viaje en la base de datos por su id
    viaje = Viajes.query.get(id)
    
    if viaje is None:
        # Si no se encuentra el viaje, devolver un error 404
        return {'message': 'Viaje no encontrado'}, 404
    
    # Si se encuentra el viaje, devolver los datos en formato JSON
    return {
        'id': viaje.id,
        'nombre': viaje.nombre,
        'descripcion': viaje.descripcion,
        'precio': viaje.precio,
        'ubicacion': viaje.ubicacion,
        'horarios': viaje.horarios,
        'user_id': viaje.user_id,
        'category_id': viaje.category_id
    }, 200

# RUTA PARA CREAR SERVICIO EN TOP

@app.route('/top', methods=['POST'])
def crear_top():
    data = request.get_json()

    # Puedes imprimir para debug
    print("Datos recibidos para Top:", data)

    nuevo_top = Top(
        nombre=data.get('nombre'),
        descripcion=data.get('descripcion'),
        precio=data.get('precio'),
        ubicacion=data.get('ubicacion'),
        horarios=data.get('horarios'),
        user_id=data.get('user_id'),
        category_id=data.get('category_id')
    )

    db.session.add(nuevo_top)
    db.session.commit()

    return jsonify(nuevo_top.serialize()), 201

# RUTA PARA OBTENER TOP (TODOS)

@app.route('/top', methods=['GET'])
def obtener_top():
    top_items = Top.query.all()
    top_serializados = [{
        "id": top.id,
        "nombre": top.nombre,
        "precio": top.precio,
        "descripcion": top.descripcion
    } for top in top_items]

    return jsonify({"top": top_serializados}), 200

# RUTA PARA OBTENER TOP POR ID
@app.route('/top/<int:id>', methods=['GET'])
def obtener_top_por_id(id):
    top = Top.query.get(id)
    
    if top is None:
        return {'message': 'Top no encontrado'}, 404
    
    return {
        'id': top.id,
        'nombre': top.nombre,
        'descripcion': top.descripcion,
        'precio': top.precio,
        'ubicacion': top.ubicacion,
        'horarios': top.horarios,
        'user_id': top.user_id,
        'category_id': top.category_id
    }, 200

# RUTA PARA CREAR GASTRONOMIA

@app.route('/gastronomia', methods=['POST'])
def crear_gastronomia():
    data = request.get_json()

    # Puedes imprimir para debug
    print("Datos recibidos para Gastronomía:", data)

    nueva_gastronomia = Gastronomia(
        nombre=data.get('nombre'),
        descripcion=data.get('descripcion'),
        precio=data.get('precio'),
        ubicacion=data.get('ubicacion'),
        horarios=data.get('horarios'),
        user_id=data.get('user_id'),
        category_id=data.get('category_id')
    )

    db.session.add(nueva_gastronomia)
    db.session.commit()

    return jsonify(nueva_gastronomia.serialize()), 201

# RUTA PARA OBTENER GASTRONOMIA (TODOS)

@app.route('/gastronomia', methods=['GET'])
def obtener_gastronomia():
    gastronomia_items = Gastronomia.query.all()
    gastronomia_serializados = [{
        "id": gastronomia.id,
        "nombre": gastronomia.nombre,
        "precio": gastronomia.precio,
        "descripcion": gastronomia.descripcion
    } for gastronomia in gastronomia_items]

    return jsonify({"gastronomia": gastronomia_serializados}), 200

# RUTA PARA OBTENER GASTRONOMIA POR ID

@app.route('/gastronomia/<int:id>', methods=['GET'])
def obtener_gastronomia_por_id(id):
    gastronomia = Gastronomia.query.get(id)
    
    if gastronomia is None:
        return {'message': 'Gastronomía no encontrada'}, 404
    
    return {
        'id': gastronomia.id,
        'nombre': gastronomia.nombre,
        'descripcion': gastronomia.descripcion,
        'precio': gastronomia.precio,
        'ubicacion': gastronomia.ubicacion,
        'horarios': gastronomia.horarios,
        'user_id': gastronomia.user_id,
        'category_id': gastronomia.category_id
    }, 200

# RUTA PARA CREAR BELLEZA
@app.route('/belleza', methods=['POST'])
def crear_belleza():
    data = request.get_json()

    # Puedes imprimir para debug
    print("Datos recibidos para Belleza:", data)

    nueva_belleza = Belleza(
        nombre=data.get('nombre'),
        descripcion=data.get('descripcion'),
        precio=data.get('precio'),
        ubicacion=data.get('ubicacion'),
        horarios=data.get('horarios'),
        user_id=data.get('user_id'),
        category_id=data.get('category_id')
    )

    db.session.add(nueva_belleza)
    db.session.commit()

    return jsonify(nueva_belleza.serialize()), 201

# RUTA PARA OBTENER BELLEZA (TODOS)
@app.route('/belleza', methods=['GET'])
def obtener_belleza():
    belleza_items = Belleza.query.all()
    belleza_serializados = [{
        "id": belleza.id,
        "nombre": belleza.nombre,
        "precio": belleza.precio,
        "descripcion": belleza.descripcion
    } for belleza in belleza_items]

    return jsonify({"belleza": belleza_serializados}), 200

# RUTA PARA OBTENER BELLEZA POR ID
@app.route('/belleza/<int:id>', methods=['GET'])
def obtener_belleza_por_id(id):
    belleza = Belleza.query.get(id)
    
    if belleza is None:
        return {'message': 'Belleza no encontrada'}, 404
    
    return {
        'id': belleza.id,
        'nombre': belleza.nombre,
        'descripcion': belleza.descripcion,
        'precio': belleza.precio,
        'ubicacion': belleza.ubicacion,
        'horarios': belleza.horarios,
        'user_id': belleza.user_id,
        'category_id': belleza.category_id
    }, 200


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
