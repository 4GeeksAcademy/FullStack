"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import stripe
from flask import Flask, Blueprint, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db 
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models import User
from api.models import Viajes, Top, Belleza, Gastronomia, Category, Reservation, Cart, CartService
from api.services import inicializar_servicios
from dotenv import load_dotenv
from api.models import db, Payment
from datetime import datetime

# from models import Person
load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

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

# Crear categorías si no existen al iniciar la app
@app.before_request
def crear_categorias():
    # Verifica si las categorías existen al principio de cada solicitud
    categorias = Category.query.all()

    if not any(c.nombre == 'Viajes' for c in categorias):
        categoria_viajes = Category(nombre='Viajes')
        db.session.add(categoria_viajes)
    
    if not any(c.nombre == 'Top' for c in categorias):
        categoria_top = Category(nombre='Top')
        db.session.add(categoria_top)
    
    if not any(c.nombre == 'Belleza' for c in categorias):
        categoria_belleza = Category(nombre='Belleza')
        db.session.add(categoria_belleza)
    
    if not any(c.nombre == 'Gastronomia' for c in categorias):
        categoria_gastronomia = Category(nombre='Gastronomia')
        db.session.add(categoria_gastronomia)
    
    db.session.commit()  # Confirmar los cambios en la base de datos

# Ruta para obtener todas las categorías
@app.route('/categorias', methods=['GET'])
def obtener_categorias():
    categorias = Category.query.all()
    categorias_serializadas = [{
        "id": categoria.id,
        "nombre": categoria.nombre
    } for categoria in categorias]

    return jsonify({"categorias": categorias_serializadas}), 200


@app.before_request
def inicializar_db():
    # Aquí debes usar un ID de usuario válido y los IDs de las categorías correspondientes.
    user_id = 1  # Debes reemplazar con un ID de usuario válido
    viajes_category_id = 1  # Reemplaza con el ID válido para la categoría 'Viajes'
    top_category_id = 3  # Reemplaza con el ID válido para la categoría 'Top'
    belleza_category_id = 2  # Reemplaza con el ID válido para la categoría 'Belleza'
    gastronomia_category_id = 4  # Reemplaza con el ID válido para la categoría 'Gastronomía'

    # Inicializa los servicios en la base de datos
    inicializar_servicios(user_id, viajes_category_id, top_category_id, belleza_category_id, gastronomia_category_id)


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

# RUTA PARA CREAR UNA COMPRA

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': 2000,  # 20.00 USD
                    'product_data': {
                        'name': 'Ejemplo de Servicio',
                        'description': 'Este es un servicio de prueba conectado a Stripe.',
                    },
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='https://bug-free-dollop-jjqvwgpp59xg2q47w-3001.app.github.dev/success',
            cancel_url='https://bug-free-dollop-jjqvwgpp59xg2q47w-3001.app.github.dev/cancel',
        )
        return jsonify({'id': session.id})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# Ruta para manejar el webhook de Stripe

@app.route('/webhook', methods=['POST'])
def stripe_webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get('Stripe-Signature')
    endpoint_secret = "whsec_MMNDXmbt4VJAhPs0vCjAFmNvOWVMff64"

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        print(f"❌ Payload inválido: {str(e)}")
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError as e:
        print(f"❌ Firma inválida: {str(e)}")
        return 'Invalid signature', 400

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        session_id = session['id']
        print(f"✅ Pago completado para la sesión {session_id}")

        try:
            # Recuperamos la sesión con los line_items
            session_with_items = stripe.checkout.Session.retrieve(session_id, expand=['line_items'])
            line_items = session_with_items['line_items']['data']

            # ⚠️ Extraer información crítica desde metadata
            metadata = session.get('metadata', {})
            user_id = int(metadata.get('user_id'))
            service_id = int(metadata.get('service_id'))
            service_type = metadata.get('service_type')

            if not all([user_id, service_id, service_type]):
                raise ValueError("Faltan datos necesarios en metadata")

            # Guardar el pago
            payment = Payment(
                currency=session['currency'],
                amount=int(session['amount_total']),
                paypal_payment_id=session_id,
                user_id=user_id,
                payment_date=datetime.utcnow()
            )
            db.session.add(payment)
            db.session.flush()  # para obtener el ID del pago antes de hacer commit

            # Crear reserva y vincularla con el pago
            reservation = Reservation(
                user_id=user_id,
                service_id=service_id,
                service_type=service_type,
                payment_id=payment.id,
                date=datetime.utcnow()
            )
            db.session.add(reservation)
            db.session.commit()

            print(f"✅ Reserva y pago registrados: {reservation.serialize()}")

        except Exception as e:
            print(f"❌ Error al procesar webhook: {str(e)}")
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    return '', 200


# Ruta para obtener todas las reservas de un usuario
@app.route('/reservas/usuario/<int:id_usuario>', methods=['GET'])
def reservas_por_usuario(id_usuario):
    try:
        # Buscar las reservas en la base de datos
        reservas_db = Reservation.query.filter_by(user_id=id_usuario).all()

        # Serializar las reservas
        reservas_serializadas = [reserva.serialize() for reserva in reservas_db]
        
        return jsonify(reservas_serializadas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para obtener todas las reservas desde la base de datos
@app.route('/reservas', methods=['GET'])
def obtener_reservas():
    # 🔎 Consultamos todas las reservas en la tabla 'reservations'
    reservas = Reservation.query.all()
    
    # 🧾 Convertimos a formato JSON serializable
    reservas_serializadas = [reserva.serialize() for reserva in reservas]

    return jsonify({
        "total": len(reservas_serializadas),
        "reservas": reservas_serializadas
    }), 200

# Ruta para obtener todas las compras de un usuario desde la base de datos
@app.route('/compras/<int:user_id>', methods=['GET'])
def obtener_compras_usuario(user_id):
    # 🔍 Consultamos todas las compras asociadas al usuario
    compras = Payment.query.filter_by(user_id=user_id).all()

    if not compras:
        return jsonify({"mensaje": "No se encontraron compras para este usuario"}), 404

    compras_serializadas = [compra.serialize() for compra in compras]

    return jsonify({
        "total": len(compras_serializadas),
        "compras": compras_serializadas
    }), 200

# Ruta para obtener todas las compras
@app.route('/compras', methods=['GET'])
def obtener_todas_las_compras():
    # 🔍 Consultamos todas las compras en la base de datos
    compras = Payment.query.all()

    if not compras:
        return jsonify({"mensaje": "No se encontraron compras"}), 404

    compras_serializadas = [compra.serialize() for compra in compras]

    return jsonify({
        "total": len(compras_serializadas),
        "compras": compras_serializadas
    }), 200

@app.route('/reservas/proveedor/<int:proveedor_id>', methods=['GET'])
def reservas_por_proveedor(proveedor_id):
    # Consultar las reservas filtrando por `user_id`
    reservas = Reservation.query.filter_by(user_id=proveedor_id).all()

    if not reservas:
        return jsonify({"mensaje": "No hay reservas para los servicios de este proveedor"}), 404

    # Serializar las reservas
    reservas_serializadas = [reserva.serialize() for reserva in reservas]

    return jsonify({
        "reservas": reservas_serializadas,
        "total": len(reservas_serializadas)
    })


# Agrego producto al carrito
@app.route('/usuario/carrito', methods=['POST'])
def add_producto_to_cart():
    data = request.get_json();
    cart = Cart.query.filter_by(user_id=data['user_id']).first()
    if not cart:
        cart = Cart(user_id=data['user_id'])
        db.session.add(cart)
        db.session.commit()

    cart_service = CartService.query.filter_by(
        cart_id=cart.id,
        service_type=data['service_type'],
        service_id=data['service_id']
    ).first()

    if cart_service:
        cart_service.quantity += data['quantity']
    else:
        cart_service = CartService(
            cart_id=cart.id,
            service_type=data['service_type'],
            service_id=data['service_id'],
            quantity=data['quantity']
        )
        db.session.add(cart_service)

    db.session.commit()
    return jsonify(cart_service.serialize()), 200

# Obtengo los servicios reales del carrito
@app.route('/usuario/carrito/servicios/<int:user_id>', methods=['GET'])
def obtener_servicios_carrito(user_id):
    user = User.query.filter_by(id=user_id).first()
    cart_services = CartService.query.filter_by(cart_id=user.cart.id).all()
    
    user_services = []
   
    if not cart_services:
        return jsonify({}), 200
    else:
        for item in cart_services:
            servicio = None
           
            if item.service_type == "viajes":
                servicio = Viajes.query.get(item.service_id)
            elif item.service_type == "belleza":
                servicio = Belleza.query.get(item.service_id)
            elif item.service_type == "gastronomia":
                servicio = Gastronomia.query.get(item.service_id)
            elif item.service_type == "top":
                servicio = Top.query.get(item.service_id)
            
            if servicio:
                user_services.append({
                    "tipo": item.service_type,
                    "cantidad": item.quantity,
                    "detalle": servicio.descripcion,
                    "precio": servicio.precio
                })
    
    return jsonify(user_services), 200

@app.route('/usuario/carrito/servicios', methods=['DELETE'])
def delte_producto():
    data = request.get_json()
    user = User.query.get(data['user_id'])

    if user and user.cart:
        cart_service = CartService.query.filter_by(
            cart_id=user.cart.id,
            service_type=data['service_type'],
            service_id=data['service_id']
        ).first()

        if cart_service:
            db.session.delete(cart_service)
            db.session.commit()
            return jsonify({'message': 'Producto eliminado del carrito'}), 200
        else:
            return jsonify({'message': 'Producto no encontrado en el carrito'}), 404
    else:
        return jsonify({'message':'Usuario o carrito no encontrado'}), 404


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
