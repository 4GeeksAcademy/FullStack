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
from api.models import Viajes, Top, Belleza, Gastronomia, Category, Reservation, Cart, CartService, Newsletter, Ofertas, Payment, PaymentItem
from api.services import inicializar_servicios
from dotenv import load_dotenv
from api.models import db
from datetime import datetime
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_bcrypt import Bcrypt
from api.payment import payment_bp
from flask_cors import CORS 
from api.politicas import crear_politicas, Politica
from sqlalchemy import or_, func
import traceback
from api.mail_service import MailService
from datetime import timedelta
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash
from itsdangerous import URLSafeTimedSerializer
from api.models import db, User, PasswordResetToken
from api.mail_service import MailService


stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

load_dotenv()

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "6Smc-TWCMZkUXJ5DN6ZUmOq5OHHzjZID8NGt7c1VxpxK0TJ7Nzv0bFJ3wD7lTGiYiNk1TUnRhjM"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

bcrypt = Bcrypt(app)
app.url_map.strict_slashes = False
CORS(app, origins=["*"])


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

app.register_blueprint(payment_bp)

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

@app.route('/search', methods=['GET'])
def search_all_services():
    query = request.args.get('query', '')
    if not query:
        return jsonify({"error": "Missing query"}), 400

    # Buscamos en todas las tablas relevantes
    ofertas = Ofertas.query.filter(
        or_(
            Ofertas.title.ilike(f"%{query}%"),
            Ofertas.descripcion.ilike(f"%{query}%")
        )
    ).all()

    viajes = Viajes.query.filter(
        or_(
            Viajes.title.ilike(f"%{query}%"),
            Viajes.descripcion.ilike(f"%{query}%")
        )
    ).all()

    tops = Top.query.filter(
        or_(
            Top.title.ilike(f"%{query}%"),
            Top.descripcion.ilike(f"%{query}%")
        )
    ).all()

    bellezas = Belleza.query.filter(
        or_(
            Belleza.title.ilike(f"%{query}%"),
            Belleza.descripcion.ilike(f"%{query}%")
        )
    ).all()

    gastronomias = Gastronomia.query.filter(
        or_(
            Gastronomia.title.ilike(f"%{query}%"),
            Gastronomia.descripcion.ilike(f"%{query}%")
        )
    ).all()

    politicas = Politica.query.filter(
        or_(
            Politica.titulo.ilike(f"%{query}%"),
            Politica.contenido.ilike(f"%{query}%")
        )
    ).all()

    # Combinamos todos los resultados
    all_results = []
    
    for oferta in ofertas:
        result = oferta.serialize()
        result["type"] = "oferta"
        all_results.append(result)

    for viaje in viajes:
        result = viaje.serialize()
        result["type"] = "viaje"
        all_results.append(result)

    for top in tops:
        result = top.serialize()
        result["type"] = "top"
        all_results.append(result)

    for belleza in bellezas:
        result = belleza.serialize()
        result["type"] = "belleza"
        all_results.append(result)

    for gastronomia in gastronomias:
        result = gastronomia.serialize()
        result["type"] = "gastronomia"
        all_results.append(result)

    for politica in politicas:
        result = politica.serialize()
        result["type"] = "politica"
        all_results.append(result)

    return jsonify(all_results), 200

@app.route('/registro', methods=['POST'])
def crear_usuario():
    try:
        # Imprimir información de depuración detallada
        print("\n==== DATOS DE LA SOLICITUD DE REGISTRO ====")
        print(f"Método: {request.method}")
        print(f"Content-Type: {request.headers.get('Content-Type')}")
        
        # Intentar obtener datos como JSON y mostrar versión segura (sin password)
        try:
            data = request.get_json(force=True)
            datos_seguros = {k: v if k != 'password' else '*****' for k, v in data.items()}
            print(f"Datos parseados como JSON: {datos_seguros}")
        except Exception as e:
            print(f"Error al parsear JSON: {e}")
            return jsonify({"error": f"Error al procesar datos: {str(e)}"}), 400
        
        # Extraer y validar campos obligatorios
        print("Procesando campos...")
        
        # Campos principales - validación exhaustiva
        campos_obligatorios = ['nombre', 'apellido', 'correo', 'password']
        for campo in campos_obligatorios:
            valor = data.get(campo)
            tipo = type(valor).__name__
            valor_mostrado = '*****' if campo == 'password' and valor else valor
            print(f"{campo}: '{valor_mostrado}' (tipo: {tipo})")
            
            if valor is None or valor == '':
                print(f"ERROR: El campo '{campo}' está vacío o no fue enviado")
                return jsonify({"error": f"El campo {campo} es obligatorio"}), 400
        
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        correo = data.get('correo')
        password = data.get('password')
            
        # Verificar si el usuario ya existe
        usuario_existente = User.query.filter_by(correo=correo).first()
        if usuario_existente:
            print(f"Usuario ya existe: {correo}")
            return jsonify({"error": "El usuario ya existe"}), 409

        # Extraer campos opcionales con valores por defecto
        telefono = data.get('telefono', '')
        direccion = data.get('direccion_line1', data.get('direccion', ''))
        ciudad = data.get('ciudad', '')
        role = data.get('role', 'cliente')

        print(f"Campos opcionales: telefono='{telefono}', direccion='{direccion}', ciudad='{ciudad}', role='{role}'")

        # Hash de contraseña
        pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        
        print("Creando nuevo usuario...")
        nuevo_usuario = User(
            nombre=nombre,
            apellido=apellido,
            correo=correo,
            password=pw_hash,
            telefono=telefono,
            direccion_line1=direccion,
            ciudad=ciudad,
            role=role,
            is_active=True
        )
        
        # Guardar en la base de datos
        db.session.add(nuevo_usuario)
        db.session.commit()
        print(f"Usuario creado con éxito: ID={nuevo_usuario.id}, correo={correo}")
        
        # Respuesta exitosa
        return jsonify({
            "mensaje": "Usuario creado correctamente",
            "user": {
                "id": nuevo_usuario.id,
                "nombre": nuevo_usuario.nombre,
                "apellido": nuevo_usuario.apellido,
                "correo": nuevo_usuario.correo,
                "role": nuevo_usuario.role
            }
        }), 201
        
    except Exception as e:
        print(f"ERROR CRÍTICO EN REGISTRO: {str(e)}")
        import traceback
        traceback.print_exc()
        db.session.rollback()
        return jsonify({"error": f"Error del servidor: {str(e)}"}), 500

@app.route('/gastronomiapag', methods=['GET'])
def paginated_gastronomia():
    sort_field = request.args.get('_sort', 'id')
    sort_order = request.args.get('_order', 'ASC')
    start = int(request.args.get('_start', 0))
    end = int(request.args.get('_end', 10))
    limit = end - start

    column = getattr(Gastronomia, sort_field, Gastronomia.id)
    if sort_order.upper() == 'DESC':
        column = column.desc()
    else:
        column = column.asc()
    
    total = db.session.query(Gastronomia).count()
    gastronomias = Gastronomia.query.order_by(column).offset(start).limit(limit).all()

    data = [{
        'id': g.id,
        'nombre': g.title,
        'descripcion': g.descripcion,
        'ciudad': g.city,
        'precio': g.price,
        'precio descuento': g.discountPrice,
        'imagen': g.image,
    } for g in gastronomias]

    response = jsonify({'data': data, 'total': total})
    response.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    response.headers['X-Total-Count'] = str(total)
    return response

@app.route('/gastronomia/<int:id>', methods=['PUT'])
def edit_gastronomia(id):
    gasronomia = Gastronomia.query.get(id)
    if not gasronomia:
        return jsonify({'error': 'Gastronomia no encontrado'}), 404 

    data = request.get_json()
    gasronomia.title = data['nombre']
    gasronomia.descripcion = data['descripcion']
    gasronomia.city = data['ciudad']
    gasronomia.price = data['precio']
    gasronomia.discountPrice = data['precio descuento']
    gasronomia.image = data['imagen']

    db.session.commit()

    return jsonify({'id': gasronomia.id,
        'nombre': gasronomia.title,
        'descripcion': gasronomia.descripcion,
        'ciudad': gasronomia.city,
        'precio': gasronomia.price,
        'precio descuento': gasronomia.discountPrice,
        'imagen': gasronomia.image}), 201

@app.route('/gastronomia/<int:id>', methods=['GET'])
def get_one_gastronomia(id):
    gastronomia = Gastronomia.query.get(id)

    if not gastronomia:
        return jsonify({'error': 'Gastronomia no encontrado'}), 404
    
    data = {
        'id': gastronomia.id,
        'nombre': gastronomia.title,
        'descripcion': gastronomia.descripcion,
        'ciudad': gastronomia.city,
        'precio': gastronomia.price,
        'precio descuento': gastronomia.discountPrice,
        'imagen': gastronomia.image
        }
    return jsonify(data)

@app.route('/dashboard/gastronomia', methods=['POST'])
def create_gastronomia_dashboard():
    data = request.get_json()

    categoria = Category.query.filter_by(nombre='Gastronomia').first()
    
    gastronomia = Gastronomia(
        title = data['nombre'],
        descripcion = data['descripcion'],
        image = data['url'],
        city = data['ciudad'],
        discountPrice = data['precio descuento'],
        price = data['precio'],
        user_id = data['usuario'],
        category_id = categoria.id,
        rating = 0,
        reviews = 0,
        buyers = 0
    )
    db.session.add(gastronomia)
    db.session.commit()

    data = {
        'id': gastronomia.id,
        'nombre': gastronomia.title,
        'descripcion': gastronomia.descripcion,
        'ciudad': gastronomia.city,
        'precio': gastronomia.price,
        'precio descuento': gastronomia.discountPrice,
        'imagen': gastronomia.image
    }
    return jsonify(data), 201

@app.route('/dashboard/gastronomia/<int:id>', methods=['DELETE'])
def delete_gastronomia_dashboard(id):
    gastronomia = Gastronomia.query.get(id)

    if not gastronomia:
        return jsonify({'error':'Gastronomia no encontrado'}), 404
    
    db.session.delete(gastronomia)
    db.session.commit()

    return jsonify({'message': 'Gastronomia eliminado exitosamente'}), 200

@app.route('/toppag', methods=['GET'])
def paginated_top():
    sort_field = request.args.get('_sort', 'id')
    sort_order = request.args.get('_order', 'ASC')
    start = int(request.args.get('_start', 0))
    end = int(request.args.get('_end', 10))
    limit = end - start

    column = getattr(Top, sort_field, Top.id)
    if sort_order.upper() == 'DESC':
        column = column.desc()
    else:
        column = column.asc()
    
    total = db.session.query(Top).count()
    tops = Top.query.order_by(column).offset(start).limit(limit).all()

    data = [{
        'id': t.id,
        'nombre': t.title,
        'descripcion': t.descripcion,
        'ciudad': t.city,
        'precio': t.price,
        'precio descuento': t.discountPrice,
        'imagen': t.image,
    } for t in tops]

    response = jsonify({'data': data, 'total': total})
    response.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    response.headers['X-Total-Count'] = str(total)
    return response

@app.route('/top/<int:id>', methods=['PUT'])
def edit_top(id):
    top = Top.query.get(id)
    if not top:
        return jsonify({'error': 'Top no encontrado'}), 404
    
    data = request.get_json()
    top.title = data['nombre']
    top.descripcion = data['descripcion']
    top.city = data['ciudad']
    top.price = data['precio']
    top.discountPrice = data['precio descuento']
    top.image = data['imagen']

    db.session.commit()

    return jsonify({'id': top.id,
        'nombre': top.title,
        'descripcion': top.descripcion,
        'ciudad': top.city,
        'precio': top.price,
        'precio descuento': top.discountPrice,
        'imagen': top.image}), 201

@app.route('/top/<int:id>', methods=['GET'])
def get_one_top(id):
    top = Top.query.get(id)
    if not top:
        return jsonify({'error': 'Top no encontrado'}), 404
    
    data = {
        'id': top.id,
        'nombre': top.title,
        'descripcion': top.descripcion,
        'ciudad': top.city,
        'precio': top.price,
        'precio descuento': top.discountPrice,
        'imagen': top.image
        }
    
    return jsonify(data)

@app.route('/dashboard/top', methods=['POST'])
def create_top_dashboard():
    data = request.get_json()

    categoria = Category.query.filter_by(nombre='Top').first()

    top = Top(
        title = data['nombre'],
        descripcion = data['descripcion'],
        image = data['url'],
        city = data['ciudad'],
        discountPrice = data['precio descuento'],
        price = data['precio'],
        user_id = data['usuario'],
        category_id = categoria.id,
        rating = 0,
        reviews = 0,
        buyers = 0
    )
    db.session.add(top)
    db.session.commit()

    data = {
        'id': top.id,
        'nombre': top.title,
        'descripcion': top.descripcion,
        'ciudad': top.city,
        'precio': top.price,
        'precio descuento': top.discountPrice,
        'imagen': top.image
    }
    return jsonify(data), 201

@app.route('/dashboard/top/<int:id>', methods=['DELETE'])
def delete_top_dashboard(id):
    top = Top.query.get(id)

    if not top:
        return jsonify({'error':'Top no encontrado'}), 404
    
    db.session.delete(top)
    db.session.commit()

    return jsonify({'message': 'Top eliminado exitosamente'}), 200

@app.route('/viajespag', methods=['GET'])
def paginated_viajes():
    sort_field = request.args.get('_sort', 'id')
    sort_order = request.args.get('_order', 'ASC')
    start = int(request.args.get('_start', 0))
    end = int(request.args.get('_end', 10))
    limit = end - start

    column = getattr(Viajes, sort_field, Viajes.id)
    if sort_order.upper() == 'DESC':
        column = column.desc()
    else:
        column = column.asc()
    
    total = db.session.query(Viajes).count()
    viajes = Viajes.query.order_by(column).offset(start).limit(limit).all()

    data = [{
        'id': v.id,
        'nombre': v.title,
        'descripcion': v.descripcion,
        'ciudad': v.city,
        'precio': v.price,
        'precio descuento': v.discountPrice,
        'imagen': v.image,
    } for v in viajes]

    response = jsonify({'data': data, 'total': total})
    response.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    response.headers['X-Total-Count'] = str(total)
    return response

@app.route('/viajes/<int:id>', methods=['PUT'])
def edit_viaje(id):
    viaje = Viajes.query.get(id);
    if not viaje:
        return jsonify({'error': 'Viaje no encontrada'}), 404
    
    data = request.get_json()
    viaje.title = data['nombre']
    viaje.descripcion = data['descripcion']
    viaje.city = data['ciudad']
    viaje.price = data['precio']
    viaje.discountPrice = data['precio descuento']
    viaje.image = data['imagen']

    db.session.commit()
    return jsonify({'id': viaje.id,
        'nombre': viaje.title,
        'descripcion': viaje.descripcion,
        'ciudad': viaje.city,
        'precio': viaje.price,
        'precio descuento': viaje.discountPrice,
        'imagen': viaje.image}), 201

@app.route('/viajes/<int:id>', methods=['GET'])
def get_one_viaje(id):
    viaje = Viajes.query.get(id)
    if not viaje:
        return jsonify({'error': 'Viaje no encontrada'}), 404
    
    data = {
        'id': viaje.id,
        'nombre': viaje.title,
        'descripcion': viaje.descripcion,
        'ciudad': viaje.city,
        'precio': viaje.price,
        'precio descuento': viaje.discountPrice,
        'imagen': viaje.image
        }
    return jsonify(data)

@app.route('/dashboard/viajes', methods=['POST'])
def create_viaje_dashboard():
    data = request.get_json();

    categoria = Category.query.filter_by(nombre='Viajes').first()

    viaje = Viajes(
        title = data['nombre'],
        descripcion = data['descripcion'],
        image = data['url'],
        city = data['ciudad'],
        discountPrice = data['precio descuento'],
        price = data['precio'],
        user_id = data['usuario'],
        category_id = categoria.id,
        rating = 0,
        reviews = 0,
        buyers = 0
    )

    db.session.add(viaje)
    db.session.commit()
    
    data = {
        'id': viaje.id,
        'nombre': viaje.title,
        'descripcion': viaje.descripcion,
        'ciudad': viaje.city,
        'precio': viaje.price,
        'precio descuento': viaje.discountPrice,
        'imagen': viaje.image
    }
    return jsonify(data), 201

@app.route('/dashboard/viajes/<int:id>', methods=['DELETE'])
def delete_viaje_dashboard(id):
    viaje = Viajes.query.get(id)

    if not viaje:
        return jsonify({'error': 'Viaje no encontrada'}), 404
    
    db.session.delete(viaje)
    db.session.commit()
    return jsonify({'message': 'Viaje eliminada exitosamente'}), 200

@app.route('/bellezapag', methods=['GET'])
def paginated_belleza():
    sort_field = request.args.get('_sort', 'id')
    sort_order = request.args.get('_order', 'ASC')
    start = int(request.args.get('_start', 0))
    end = int(request.args.get('_end', 10))
    limit = end - start

    column = getattr(Belleza, sort_field, Belleza.id)
    if sort_order.upper() == 'DESC':
        column = column.desc()
    else:
        column = column.asc()
    
    total = db.session.query(Belleza).count()
    bellezas = Belleza.query.order_by(column).offset(start).limit(limit).all()

    data = [{
        'id': b.id,
        'nombre': b.title,
        'descripcion': b.descripcion,
        'ciudad': b.city,
        'precio': b.price,
        'precio descuento': b.discountPrice,
        'categoria': b.category.nombre
    } for b in bellezas]
    
    response = jsonify({'data': data, 'total': total})
    response.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    response.headers['X-Total-Count'] = str(total)
    return response

@app.route('/belleza/<int:id>', methods=['PUT'])
def edit_belleza(id):
    belleza = Belleza.query.get(id)

    if not belleza:
        return jsonify({'error': 'Belleza no encontrada'}), 404

    data = request.get_json()
    belleza.title = data['nombre']
    belleza.descripcion = data['descripcion']
    belleza.city = data['ciudad']
    belleza.price = data['precio']
    belleza.discountPrice = data['precio descuento']
    belleza.image = data['imagen']

    db.session.commit()

    return jsonify({'id': belleza.id,
        'nombre': belleza.title,
        'descripcion': belleza.descripcion,
        'ciudad': belleza.city,
        'precio': belleza.price,
        'precio descuento': belleza.discountPrice,
        'imagen': belleza.image}), 201

@app.route('/belleza/<int:id>', methods=['GET'])
def get_one_belleza(id):
    belleza = Belleza.query.get(id)

    if not belleza:
        return jsonify({'error': 'Viaje no encontrada'}), 404
    
    data = {
        'id': belleza.id,
        'nombre': belleza.title,
        'descripcion': belleza.descripcion,
        'ciudad': belleza.city,
        'precio': belleza.price,
        'precio descuento': belleza.discountPrice,
        'imagen': belleza.image
        }
    return jsonify(data)

@app.route('/dashboard/belleza', methods=['POST'])
def create_belleza_dashboard():
    data = request.get_json()

    categoria = Category.query.filter_by(nombre='Belleza').first()

    belleza = Belleza(
        title = data['nombre'],
        descripcion = data['descripcion'],
        image = data['url'],
        city = data['ciudad'],
        discountPrice = data['precio descuento'],
        price = data['precio'],
        user_id = data['usuario'],
        category_id = categoria.id,
        rating = 0,
        reviews = 0,
        buyers = 0
    )
    db.session.add(belleza)
    db.session.commit()

    data = {
        'id': belleza.id,
        'nombre': belleza.title,
        'descripcion': belleza.descripcion,
        'ciudad': belleza.city,
        'precio': belleza.price,
        'precio descuento': belleza.discountPrice,
        'imagen': belleza.image
    }
    return jsonify(data), 201

@app.route('/dashboard/belleza/<int:id>', methods=['DELETE'])
def delete_belleza_dashboard(id):
    belleza = Belleza.query.get(id)

    if not belleza:
       return jsonify({'error': 'Belleza no encontrada'}), 404 
    
    db.session.delete(belleza)
    db.session.commit()

    return jsonify({'message': 'Belleza eliminada exitosamente'}), 200

@app.route('/ofertaspag', methods=['GET'])
def paginated_offrts():
    sort_field = request.args.get('_sort', 'id')
    sort_order = request.args.get('_order', 'ASC')
    start = int(request.args.get('_start', 0))
    end = int(request.args.get('_end', 10))
    limit = end - start

    column = getattr(Ofertas, sort_field, Ofertas.id)
    if sort_order.upper() == 'DESC':
        column = column.desc()
    else:
        column = column.asc()

    total = db.session.query(Ofertas).count()
    ofertas = Ofertas.query.order_by(column).offset(start).limit(limit).all()

    data = [{
        'id': o.id,
        'nombre': o.title,
        'descripcion': o.descripcion,
        'ciudad': o.city,
        'precio': o.price,
        'precio descuento': o.discountPrice,
        'categoria': o.category.nombre
    } for o in ofertas]

    response = jsonify({'data': data, 'total': total})
    response.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    response.headers['X-Total-Count'] = str(total)
    return response

@app.route('/oferta/<int:id>', methods=['PUT'])
def edit_ofert(id):

    oferta = Ofertas.query.get(id)
    if not oferta:
        return jsonify({'error': 'Oferta no encontrada'}), 404
    
    data = request.get_json()

    oferta.title = data['nombre']
    oferta.descripcion = data['descripcion']
    oferta.city = data['ciudad']
    oferta.price = data['precio']
    oferta.discountPrice = data['precio descuento']
    oferta.category_id = data['categoria']
    oferta.image = data['imagen']
    
    db.session.commit()

    return jsonify({'id': oferta.id, 'nombre': oferta.title, 'descripcion': oferta.descripcion, 'ciudad': oferta.city, 'precio': oferta.price, 'precio descuento': oferta.discountPrice, 'cateogria': oferta.category.nombre}), 200

@app.route('/oferta/<int:id>', methods=['GET'])
def get_one_ofert(id):
    oferta = Ofertas.query.get(id)
    if not oferta:
        return jsonify({'error': 'Oferta no encontrada'}), 404
    
    data = {
        'id': oferta.id, 
        'nombre': oferta.title, 
        'descripcion': oferta.descripcion, 
        'ciudad': oferta.city, 
        'precio': oferta.price, 
        'precio descuento': oferta.discountPrice, 
        'categoria': oferta.category.nombre,
        'imagen': oferta.image,
        'categoria_id': oferta.category_id
        }
    return jsonify(data)

@app.route('/dashboard/oferta', methods=['POST'])
def create_oferta_dashboard():
    data = request.get_json()

    oferta = Ofertas(
        title = data['nombre'],
        descripcion = data['descripcion'],
        image = data['url'],
        city = data['ciudad'],
        discountPrice = data['precio descuento'],
        price = data['precio'],
        category_id = data['categoria'],
        user_id = data['usuario'],
        rating = 0,
        reviews = 0,
        buyers = 0
    )

    db.session.add(oferta)
    db.session.commit()

    data = {
        'id': oferta.id, 
        'nombre': oferta.title, 
        'descripcion': oferta.descripcion, 
        'ciudad': oferta.city, 
        'precio': oferta.price, 
        'precio descuento': oferta.discountPrice, 
        'cateogria': oferta.category.nombre,
        'categoria_id': oferta.category_id
        }
    return jsonify(data), 201

@app.route('/dashboard/oferta/<int:id>', methods=['DELETE'])
def delete_oferta_dashboard(id):
    oferta = Ofertas.query.get(id)

    if not oferta:
        return jsonify({'error': 'Oferta no encontrada'}), 404
    
    db.session.delete(oferta)
    db.session.commit()
    return jsonify({'message': 'Oferta eliminada exitosamente'}), 200

@app.route('/usuarios', methods=['GET'])
def get_all_users():
    usuarios = User.query.filter(func.upper(User.role) != "ADMINISTRADOR").all()
    usrs = []
    for u in usuarios:
        usrs.append({'id': u.id, 'correo': u.correo})
    return jsonify({'usuarios': usrs}), 200

@app.route('/usuariospag', methods=['GET'])
def paged_users():
    sort_field = request.args.get('_sort', 'id')
    sort_order = request.args.get('_order', 'ASC')
    start = int(request.args.get('_start', 0))
    end = int(request.args.get('_end', 10))
    limit = end - start

    column = getattr(User, sort_field, User.id)
    if sort_order.upper() == 'DESC':
        column = column.desc()
    else:
        column = column.asc()
    
    total = db.session.query(User).count();

    users = User.query.order_by(column).offset(start).limit(limit).all()

    data = [{'id': u.id, 'correo': u.correo, 'telefono': u.telefono, 'direccion 1': u.direccion_line1, 'direccion 2': u.direccion_line2, 'ciudad': u.ciudad, 'pais': u.pais, 'rol': u.role, 'activo': u.is_active} for u in users]

    response = jsonify({'data': data, 'total': total})
    response.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    response.headers['X-Total-Count'] = total
    return response

@app.route('/usuario/<int:id>', methods=['PUT'])
def edit_user_info(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    data = request.get_json()

    if data.get('correo'): user.correo = data['correo']
    if data.get('telefono'): user.telefono = data['telefono']
    if data.get('direccion 1'): user.direccion_line1 = data['direccion 1']
    if data.get('direccion 2'): user.direccion_line2 = data['direccion 2']
    if data.get('ciudad'): user.ciudad = data['ciudad']
    if data.get('pais'): user.pais = data['pais']
    if data.get('rol'): user.role = data['rol']
    if 'activo' in data: user.is_active = data['activo'] 

    db.session.commit()

    return jsonify({
        'id': user.id,
        'correo': user.correo,
        'telefono': user.telefono,
        'direccion 1': user.direccion_line1,
        'direccion 2': user.direccion_line2,
        'ciudad': user.ciudad,
        'pais': user.pais,
        'rol': user.role,
        'activo': user.is_active
    }), 200

        
@app.route('/usuario/<int:id>', methods=['GET'])
def get_user_info(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    data = {
        'id': user.id,
        'correo': user.correo,
        'telefono': user.telefono,
        'direccion 1': user.direccion_line1,
        'direccion 2': user.direccion_line2,
        'ciudad': user.ciudad,
        'pais': user.pais,
        'rol': user.role,
        'activo': user.is_active
    }
    return jsonify(data)

@app.route('/dashboard/usuario', methods=['POST'])
def create_user_dashboard():
    data = request.get_json()
    user = User.query.filter_by(correo=data['correo']).first()
    if not user:
        pw_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(
            correo = data['correo'],
            password = pw_hash,
            telefono = data['telefono'],
            direccion_line1 = data['direccion 1'],
            direccion_line2 = data['direccion 2'],
            ciudad = data['ciudad'],
            pais = data['pais'],
            codigo_postal = data['codigo postal'],
            role = data['rol'],
            is_active = data['activo']
        )
        db.session.add(user)
        db.session.commit()
    
    return jsonify({
        'id': user.id,
        'correo': user.correo,
        'telefono': user.telefono,
        'direccion 1': user.direccion_line1,
        'direccion 2': user.direccion_line2,
        'ciudad': user.ciudad,
        'pais': user.pais,
        'rol': user.role,
        'activo': user.is_active
    }), 201


@app.route('/usuario/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    # Eliminar objetos relacionados
    for viaje in user.viajes_list:
        db.session.delete(viaje)
    
    for top in user.top_list:
        db.session.delete(top)
    
    for belleza in user.belleza_list:
        db.session.delete(belleza)
    
    for gastronomia in user.gastronomia_list:
        db.session.delete(gastronomia)
    
    for oferta in user.ofertas_list:
        db.session.delete(oferta)
    
    for payment in user.payments:
        db.session.delete(payment)
    
    for reservation in user.reservations:
        db.session.delete(reservation)

    # Verificar si el carrito (cart) existe antes de eliminarlo
    if user.cart:
        db.session.delete(user.cart)

    # Finalmente, eliminar al propio usuario
    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'Usuario eliminado exitosamente'}), 200

@app.route('/usuarios/me', methods=['GET'])
@jwt_required()
def obtener_usuario_logueado():
    user_email = get_jwt_identity()
    usuario = User.query.filter_by(correo=user_email).first()

    if usuario:
        return jsonify(usuario.serialize())
    else:
        return jsonify({"msg": "Usuario no encontrado"}), 404

# Ruta PUT: Actualizar perfil
@app.route('/usuarios/me', methods=['PUT'])
@jwt_required()
def actualizar_perfil():
    user_email = get_jwt_identity()
    data = request.get_json()

    usuario = User.query.filter_by(correo=user_email).first()
    if not usuario:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Actualiza solo los campos permitidos
    if 'telefono' in data:
        usuario.telefono = data['telefono']
    if 'direccion_line1' in data:
        usuario.direccion_line1 = data['direccion_line1']
    if 'ciudad' in data:
        usuario.ciudad = data['ciudad']

    try:
        db.session.commit()
        return jsonify({
            "msg": "Perfil actualizado correctamente",
            "user": usuario.serialize()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al actualizar el perfil", "error": str(e)}), 500
# Ruta para obtener todos los usuarios
@app.route('/usuarios', methods=['GET'])

def obtener_usuarios():
    try:
        # Obtener todos los usuarios de la base de datos
        usuarios = User.query.all()
        
        # Serializar cada usuario
        usuarios_serializados = [usuario.serialize() for usuario in usuarios]
        
        return jsonify({
            "total": len(usuarios_serializados),
            "usuarios": usuarios_serializados
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para actualizar el perfil del usuario
@app.route('/usuarios/<int:id>', methods=['PUT'])
@jwt_required()
def actualizar_usuario(id):
    usuario = User.query.get(id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    # Actualiza los campos del usuario
    data = request.get_json()
    usuario.nombre = data.get('nombre', usuario.nombre)
    usuario.email = data.get('email', usuario.email)
    usuario.ciudad = data.get('ciudad', usuario.ciudad)
    usuario.descripcion = data.get('descripcion', usuario.descripcion)

    db.session.commit()
    return jsonify(usuario.serialize()), 200


# Ruta para iniciar sesión
@app.route('/login', methods=['POST'])
def iniciar_sesion():
    try:
        print("\n==== INTENTO DE LOGIN ====")
        
        # Validar formato de los datos
        if not request.is_json:
            print("ERROR: No es JSON")
            return jsonify({"error": "Se esperaba formato JSON"}), 400
            
        data = request.get_json()
        print(f"Datos recibidos: {data}")
        
        # Validar campos requeridos
        correo = data.get('correo')
        contraseña = data.get('password')
        
        if not correo or not contraseña:
            print("ERROR: Faltan correo o contraseña")
            return jsonify({"error": "Correo y contraseña son obligatorios"}), 400
        
        # Buscar usuario
        print(f"Buscando usuario con correo: {correo}")
        usuario = User.query.filter_by(correo=correo).first()
        
        if not usuario:
            print(f"ERROR: Usuario no encontrado con correo {correo}")
            return jsonify({"error": "Correo o contraseña incorrectos"}), 401
        
        print(f"Usuario encontrado: ID={usuario.id}, Nombre={usuario.nombre}")
        
        # Verificar contraseña
        if not bcrypt.check_password_hash(usuario.password, contraseña):
            print("ERROR: Contraseña incorrecta")
            return jsonify({"error": "Correo o contraseña incorrectos"}), 401
        
        # Generar token
        print("Inicio de sesión exitoso - Generando token")
        access_token = create_access_token(identity=usuario.correo)
        
        print(f"Token generado para usuario {usuario.correo}")
        return jsonify({
            "mensaje": f"Bienvenido, {usuario.nombre} {usuario.apellido}",
            "access_token": access_token,
            "user_id": usuario.id
        }), 200
    
    except Exception as e:
        print(f"ERROR EN LOGIN: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Error del servidor: {str(e)}"}), 500

@app.route('/api/verify-token', methods=['GET'])
@jwt_required()
def verificar_token():
    usuario = get_jwt_identity()
    return jsonify({"user": usuario, "valid": True}), 200 

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

    pw_hash = bcrypt.generate_password_hash(nueva_contraseña).decode('utf-8')

    usuario.password = pw_hash
    db.session.commit()

    return jsonify({"mensaje": "Contraseña actualizada correctamente"}), 200

@app.route('/newsletteradd', methods=['POST'])
def create_newsletter():
    data = request.get_json()
    services = data['services']
    if not services:
        return jsonify({'Error al crear newsletter'}), 400
    print(services)
    return jsonify({'message': 'newsletter creado con exito'}), 201

@app.route('/newsletter', methods=['POST'])
def agregar_a_newsletter():
    data = request.get_json()
    email = data.get('correo')

    if not email:
        return jsonify({"error": "Correo es obligatorio"}), 400

    user = User.query.filter_by(correo=email).first()

    if not user:
        return jsonify({"error": "El correo no está registrado"}), 404


    if user and user.newsletter_subscription is True:
        return jsonify({"mensaje": "Este correo ya está suscrito"}), 200

    user.newsletter_subscription = True
    db.session.add(user)
    db.session.commit()

    subject = "¡Gracias por suscribirte a Groupponclon!"
    text_content = f"""Hola,\n\nTu suscripción a nuestro newsletter ha sido exitosa.
    \n\nA partir de ahora recibirás nuestras mejores ofertas y promociones exclusivas.\n\n¡Gracias por unirte a nuestra comunidad!\n\nEl equipo de Groupponclon"""

    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gracias por suscribirte</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 8px;
                overflow: hidden;
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 30px 20px;
                text-align: center;
            }
            .content {
                padding: 30px;
            }
            .footer {
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
            }
            .button {
                background-color: #4CAF50;
                color: white;
                padding: 12px 25px;
                text-decoration: none;
                border-radius: 4px;
                display: inline-block;
                margin: 20px 0;
                font-weight: bold;
            }
            .logo {
                max-width: 150px;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>¡Gracias por suscribirte!</h1>
            </div>
            
            <div class="content">
                <p>Hola,</p>
                <p>Tu suscripción a nuestro newsletter ha sido exitosa. A partir de ahora recibirás:</p>
                
                <ul>
                    <li>Las mejores ofertas exclusivas</li>
                    <li>Novedades de productos</li>
                    <li>Descuentos especiales para suscriptores</li>
                </ul>
                
                <p>¡Esperamos que disfrutes de nuestros contenidos!</p>
            </div>
        </div>
    </body>
    </html>
    """

    mail_service = MailService()  # Asegúrate de tener la instancia
    mail_service.send_mail(
        to_email=email,
        subject=subject,
        text_content=text_content,
        html_content=html_content
    )

    return jsonify({"mensaje": "Suscripción exitosa"}), 201


@app.route('/newsletter', methods=['GET'])
@jwt_required()
def obtener_newsletter():
    subs = Newsletter.query.all()
    return jsonify({"correos_suscritos": [s.correo for s in subs]}), 200


# Ruta para categoria 
@app.route('/categorias', methods=['POST'])
@jwt_required()
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

    if not any(c.nombre == 'Ofertas' for c in categorias):
        categoria_ofertas = Category(nombre='Ofertas')
        db.session.add(categoria_ofertas)

    db.session.commit()  # Confirmar los cambios en la base de datos



@app.before_request
def inicializar_politicas():
    crear_politicas()

# Crear una nueva política
@app.route('/politicas', methods=['POST'])
def crear_politica():
    # Obtener datos de la política desde el cuerpo de la solicitud
    data = request.get_json()

    # Validar los datos
    if not data or not data.get('titulo') or not data.get('contenido'):
        return jsonify({"message": "Datos incompletos"}), 400

    # Crear una nueva instancia de Politica con los datos recibidos
    nueva_politica = Politica(
        titulo=data['titulo'],
        contenido=data['contenido']
    )

    # Guardar la nueva política en la base de datos
    db.session.add(nueva_politica)
    db.session.commit()

    # Retornar la política recién creada con su ID
    return jsonify(nueva_politica.serialize()), 201

# Obtener todas las políticas
@app.route('/politicas', methods=['GET'])
def obtener_politicas():
    politicas = Politica.query.all()
    politicas_serializadas = [p.serialize() for p in politicas]
    return jsonify({"politicas": politicas_serializadas}), 200


# Obtener una política por ID
@app.route('/politicas/<int:id>', methods=['GET'])
def obtener_politica_por_id(id):
    politica = Politica.query.get(id)

    if not politica:
        return jsonify({"message": "Política no encontrada"}), 404

    return jsonify(politica.serialize()), 200

@app.before_request
def inicializar_db():
    # Aquí debes usar un ID de usuario válido y los IDs de las categorías correspondientes.
    user_id = 1  # Debes reemplazar con un ID de usuario válido
    viajes_category_id = 1  # Reemplaza con el ID válido para la categoría 'Viajes'
    top_category_id = 3     # Reemplaza con el ID válido para la categoría 'Top'
    belleza_category_id = 2 # Reemplaza con el ID válido para la categoría 'Belleza'
    gastronomia_category_id = 4  # Reemplaza con el ID válido para la categoría 'Gastronomía'
    ofertas_category_id = 5  # ID asignado a la nueva categoría 'Ofertas'

    # Inicializa los servicios en la base de datos (ahora incluyendo Ofertas)
    inicializar_servicios(
        user_id,
        viajes_category_id,
        top_category_id,
        belleza_category_id,
        gastronomia_category_id,
        ofertas_category_id
    )



# Ruta para obtener todas las categorías
@app.route('/categorias', methods=['GET'])
def obtener_categorias():
    categorias = Category.query.all()
    categorias_serializadas = [{
        "id": categoria.id,
        "nombre": categoria.nombre
    } for categoria in categorias]

    return jsonify({"categorias": categorias_serializadas}), 200

# RUTAS
@app.route('/ofertas', methods=['POST'])
@jwt_required()
def crear_oferta():
    data = request.get_json()

    nueva_oferta = Ofertas(
        title=data.get('title'),
        descripcion=data.get('descripcion'),
        price=data.get('price'),
        city=data.get('city'),
        image=data.get('image'),
        discountPrice=data.get('discountPrice'),
        rating=data.get('rating'),
        reviews=data.get('reviews'),
        buyers=data.get('buyers'),
        user_id=data.get('user_id'),
        category_id=data.get('category_id')
    )
    db.session.add(nueva_oferta)
    db.session.commit()

    return jsonify(nueva_oferta.serialize()), 201

@app.route('/ofertas', methods=['GET'])
def obtener_ofertas():
    ofertas = Ofertas.query.all()
    ofertas_serializadas = [oferta.serialize() for oferta in ofertas]

    return jsonify({"ofertas": ofertas_serializadas}), 200


@app.route('/ofertas/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_oferta(id):
    oferta = Ofertas.query.get(id)

    if not oferta:
        return jsonify({"message": "Oferta no encontrada"}), 404

    db.session.delete(oferta)
    db.session.commit()

    return jsonify({"message": f"Oferta con ID {id} eliminada correctamente"}), 200

@app.route('/viajes', methods=['POST'])
@jwt_required()
def crear_viaje():
    data = request.get_json()

    # Validación básica de campos requeridos
    if not data.get('title') or not data.get('descripcion') or not data.get('price'):
        return jsonify({"error": "Faltan campos requeridos"}), 400

    try:
        nuevo_viaje = Viajes(
            title=data.get('title'),
            descripcion=data.get('descripcion'),
            price=data.get('price'),
            city=data.get('city', ''),  # Valor por defecto si no se proporciona
            image=data.get('image', 'https://via.placeholder.com/300x200?text=Sin+imagen'),
            discountPrice=data.get('discountPrice'),
            rating=data.get('rating', 4.0),  # Valor por defecto
            reviews=data.get('reviews', 0),
            buyers=data.get('buyers', 0),
            user_id=data.get('user_id'),
            category_id=data.get('category_id', 1)  # Valor por defecto para viajes
        )

        db.session.add(nuevo_viaje)
        db.session.commit()

        # Devolver el viaje creado con su ID
        return jsonify({
            "message": "Viaje creado exitosamente",
            "viaje": nuevo_viaje.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/viajes', methods=['GET'])
def obtener_viajes():
    try:
       # Ordenar por ID ascendente para mantener el orden original (último al final)
        viajes_items = Viajes.query.order_by(Viajes.id.asc()).all()
        viajes_serializados = [viaje.serialize() for viaje in viajes_items]

        return jsonify({
            "success": True,
            "count": len(viajes_serializados),
            "viajes": viajes_serializados
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/top', methods=['POST'])
@jwt_required()
def crear_top():
    data = request.get_json()

    # Validación de campos requeridos
    required_fields = ['title', 'descripcion', 'price', 'user_id']
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"Campo requerido faltante: {field}"}), 400

    try:
        nuevo_top = Top(
            title=data['title'],
            descripcion=data['descripcion'],
            price=data['price'],
            city=data.get('city', ''),
            image=data.get('image', 'https://img.freepik.com/free-photo/beautiful-shot-u-s-route-66-arizona-usa-with-clear-blue-sky-background_181624-53248.jpg'),
            discountPrice=data.get('discountPrice'),
            rating=data.get('rating', 4.5),
            reviews=data.get('reviews', 0),
            buyers=data.get('buyers', 0),
            user_id=data['user_id'],
            category_id=data.get('category_id', 3)  # ID de categoría para Top
        )

        db.session.add(nuevo_top)
        db.session.commit()

        return jsonify({
            "message": "Top creado exitosamente",
            "top": nuevo_top.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/top', methods=['GET'])
def obtener_top():
    try:
        # Ordenar por ID descendente para mostrar los más recientes primero
        top_items = Top.query.order_by(Top.id.asc()).all()
        top_serializados = [top.serialize() for top in top_items]

        return jsonify({
            "success": True,
            "count": len(top_serializados),
            "top": top_serializados
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Función para crear servicios iniciales de Top
def crear_servicios_top(user_id, top_category_id):
    # Verificar cuáles ya existen para no duplicar
    existing_titles = {t.title for t in Top.query.filter_by(category_id=top_category_id).all()}
    
    top_services = [
        Top(
            title="Crucero de lujo por el Mediterráneo",
            descripcion="Disfrutá 7 días de lujo en altamar visitando Italia, Grecia y España.",
            image="https://img.freepik.com/free-photo/cruise-ship-sailing-ocean-sunset_181624-24289.jpg",
            city="Mar Mediterráneo",
            price=3500,
            discountPrice=4200,
            rating=4.8,
            reviews=300,
            buyers=450,
            user_id=user_id,
            category_id=top_category_id
        ),
        # ... (otros servicios con imágenes de Freepik como en viajes)
    ]

    # Filtrar solo los que no existen
    new_services = [t for t in top_services if t.title not in existing_titles]
    
    if new_services:
        db.session.bulk_save_objects(new_services)
        db.session.commit()

@app.route('/gastronomia', methods=['POST'])
@jwt_required()
def crear_gastronomia():
    data = request.get_json()

    # Validación básica de campos requeridos
    if not data.get('title') or not data.get('descripcion') or not data.get('price'):
        return jsonify({"error": "Faltan campos requeridos"}), 400

    try:
        nuevo_gastronomia = Gastronomia(
            title=data.get('title'),
            descripcion=data.get('descripcion'),
            price=data.get('price'),
            city=data.get('city', ''),  # Valor por defecto si no se proporciona
            image=data.get('image', 'https://via.placeholder.com/300x200?text=Sin+imagen'),
            discountPrice=data.get('discountPrice'),
            rating=data.get('rating', 4.0),  # Valor por defecto
            reviews=data.get('reviews', 0),
            buyers=data.get('buyers', 0),
            user_id=data.get('user_id'),
            category_id=data.get('category_id', 4)  # Valor por defecto para gastronomía
        )

        db.session.add(nuevo_gastronomia)
        db.session.commit()

        # Devolver el gastronomía creado con su ID
        return jsonify({
            "message": "Servicio de gastronomía creado exitosamente",
            "gastronomia": nuevo_gastronomia.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/gastronomia', methods=['GET'])
def obtener_gastronomia():
    try:
        # Ordenar por ID ascendente para mantener el orden original (último al final)
        gastronomia_items = Gastronomia.query.order_by(Gastronomia.id.asc()).all()
        gastronomia_serializados = [gastronomia.serialize() for gastronomia in gastronomia_items]

        return jsonify({
            "success": True,
            "count": len(gastronomia_serializados),
            "gastronomia": gastronomia_serializados
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/belleza', methods=['POST'])
@jwt_required()
def crear_belleza():
    data = request.get_json()

    nuevo_belleza = Belleza(
        title=data.get('title'),
        descripcion=data.get('descripcion'),
        price=data.get('price'),
        city=data.get('city'),
        image=data.get('image'),
        discountPrice=data.get('discountPrice'),
        rating=data.get('rating'),
        reviews=data.get('reviews'),
        buyers=data.get('buyers'),
        user_id=data.get('user_id'),
        category_id=data.get('category_id')
    )

    db.session.add(nuevo_belleza)
    db.session.commit()

    return jsonify(nuevo_belleza.serialize()), 201

@app.route('/belleza', methods=['GET'])
def obtener_belleza():
    belleza_items = Belleza.query.all()
    belleza_serializados = [belleza.serialize() for belleza in belleza_items]

    return jsonify({"belleza": belleza_serializados}), 200



# Ruta para manejar el webhook de Stripe
endpoint_secret ='whsec_toq2QoiSG9PJIRMmYPZubqAc8oRNuYIW'


@app.route('/webhook', methods=['POST'])
def stripe_webhook():
    print("Webhook recibido")  # Esto te ayudará a saber si la ruta está siendo llamada
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get('Stripe-Signature')

    event = None

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        print("Error al verificar la firma del webhook:", e)
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError as e:
        print("Error al verificar la firma del webhook:", e)
        return 'Invalid signature', 400

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        print('Pago completado:', session)
    elif event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        print('Pago exitoso:', payment_intent)

    return jsonify({'status': 'success'}), 200


# Ruta para obtener todas las reservas de un usuario
@app.route('/reservas/usuario/<int:id_usuario>', methods=['GET'])
@jwt_required()
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
@jwt_required()
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
@jwt_required()
def obtener_compras(user_id):
    compras = Payment.query.filter_by(user_id=user_id).all()
    compras_data = [compra.serialize() for compra in compras]
    return jsonify({'compras': compras_data}), 200

# Ruta para obtener todas las compras
""""@app.route('/compras', methods=['GET'])
def obtener_todas_las_compras():
    # 🔍 Consultamos todas las compras en la base de datos
    compras = Payment.query.all()

    if not compras:
        return jsonify({"mensaje": "No se encontraron compras"}), 404

    compras_serializadas = [compra.serialize() for compra in compras]

    return jsonify({
        "total": len(compras_serializadas),
        "compras": compras_serializadas
    }), 200"""

@app.route('/compras', methods=['GET'])
def obtener_todas_las_compras():
    # Consultamos todas las compras en la base de datos
    compras = Payment.query.all()

    if not compras:
        return jsonify({"mensaje": "No se encontraron compras"}), 404

    compras_serializadas = []
    
    for compra in compras:
        compra_dict = compra.serialize()  # Serializamos la compra
        # Verificamos si la compra tiene items
        if compra_dict.get("items"):
            # Si tiene items, los agregamos a la respuesta
            compras_serializadas.append(compra_dict)
        else:
            # Si no tiene items, la compra se omite o se agrega vacía
            compras_serializadas.append({
                "id": compra.id,
                "currency": compra.currency,
                "amount": compra.amount,
                "payment_date": compra.payment_date.isoformat(),
                "paypal_payment_id": compra.paypal_payment_id,
                "estado": compra.estado,
                "user_id": compra.user_id,
                "items": []  # No hay productos en esta compra
            })

    return jsonify({
        "total": len(compras_serializadas),
        "compras": compras_serializadas
    }), 200

@app.route('/compras', methods=['POST'])
@jwt_required()
def registrar_compra():
    data = request.get_json()
    user_id = get_jwt_identity()  # ID del usuario desde el token

    nueva_compra = Payment(
        user_id=user_id,
        servicio_id=data.get('servicio_id'),
        monto=data.get('monto'),
        fecha=datetime.utcnow()
    )

    db.session.add(nueva_compra)
    db.session.commit()

    return jsonify({"mensaje": "Compra registrada correctamente", "compra": nueva_compra.serialize()}), 201



""""@app.route('/pagos/proveedor', methods=['GET'])
@jwt_required()
def pagos_proveedor():
    # 1. Obtener el correo del proveedor autenticado desde el token
    correo_usuario = get_jwt_identity()
    if not correo_usuario:
        return jsonify({'mensaje': 'Token inválido o no proporcionado'}), 401

    # 2. Buscar al usuario por correo
    usuario = User.query.filter_by(correo=correo_usuario).first()
    if not usuario:
        return jsonify({'mensaje': 'Usuario no encontrado'}), 404

    id_proveedor = usuario.id

    # 3. Buscar los pagos asociados a ese proveedor
    pagos = PaymentItem.query.join(Payment)\
               .filter(PaymentItem.servicio_id == id_proveedor,
                       Payment.estado == 'pagado')\
               .all()
    if not pagos:
        return jsonify({'mensaje': 'No se encontraron pagos para este proveedor'}), 404

    # 4. Serializar los resultados
    resultado = []
    for item in pagos:
        resultado.append({
            'id': item.id,
            'servicio_id': item.servicio_id,
            'monto': item.monto,
            'fecha': item.fecha.isoformat(),
            # agrega más campos si quieres
        })

    return jsonify(resultado), 200"""

@app.route('/pagos', methods=['GET'])
@jwt_required()
def pagos_proveedor():
    try:
        correo_usuario = get_jwt_identity()
        if not correo_usuario:
            return jsonify({'mensaje': 'Token inválido o no proporcionado'}), 401

        usuario = User.query.filter_by(correo=correo_usuario).first()
        if not usuario:
            return jsonify({'mensaje': 'Usuario no encontrado'}), 404

        id_proveedor = usuario.id

        # Obtener los títulos de todos los servicios creados por este proveedor
        titulos_servicios = set()
        for modelo in [Top, Viajes, Ofertas, Belleza, Gastronomia]:
            servicios = modelo.query.filter_by(user_id=id_proveedor).all()
            titulos_servicios.update([s.title.strip().lower() for s in servicios if s.title])

        if not titulos_servicios:
            return jsonify({'mensaje': 'Este proveedor no tiene servicios creados'}), 404

        # Filtrar pagos por coincidencia de título
        payments = Payment.query.filter_by(estado='pagado').all()

        pagos_del_proveedor = []
        for pago in payments:
            for item in pago.items:
                if item.title and item.title.strip().lower() in titulos_servicios:
                    cliente = User.query.get(pago.user_id)
                    pagos_del_proveedor.append({
                        'id': pago.id,
                        'amount': item.unit_price * item.quantity,
                        'currency': pago.currency,
                        'estado': pago.estado,
                        'payment_date': pago.payment_date.isoformat() if pago.payment_date else None,
                        'paypal_payment_id': pago.paypal_payment_id,
                        'user_email': cliente.correo if cliente else 'Desconocido',
                        'title': item.title,
                        'quantity': item.quantity,
                        'image_url': item.image_url
                    })

        if not pagos_del_proveedor:
            return jsonify({'mensaje': 'No se encontraron pagos para este proveedor'}), 404

        return jsonify({'pagos': pagos_del_proveedor}), 200

    except Exception as e:
        return jsonify({'mensaje': 'Error al procesar la solicitud', 'error': str(e)}), 500


@app.route('/compras/test', methods=['POST'])
def crear_compra_test():
    data = request.get_json()  # Obtén los datos enviados por el cliente
    
    print("Datos recibidos:", data)  # Imprime los datos para revisar su contenido
    
    # Asegúrate de que 'currency' esté presente y no sea None
    currency = data.get('currency')
    if not currency:
        return jsonify({'error': 'El campo currency es requerido'}), 400
    
    # Procesar los datos y guardarlos en la base de datos
    nuevo_pago = Payment(
        currency=currency,
        amount=data.get('monto'),
        payment_date=datetime.utcnow(),
        paypal_payment_id=data.get('paypal_payment_id'),
        user_id=data.get('user_id'),
        servicio_id=data.get('servicio_id')
    )
    
    try:
        db.session.add(nuevo_pago)
        db.session.commit()
        return jsonify({'mensaje': 'Compra creada exitosamente'}), 201
    except Exception as e:
        db.session.rollback()
        print("Error al guardar en la base de datos:", e)
        return jsonify({'error': 'Error al crear la compra'}), 500


# Agrego producto al carrito
@app.route('/usuario/carrito', methods=['POST'])
@jwt_required()
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
@jwt_required()
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
            elif item.service_type == "ofertas":  # Asegúrate de que este tipo esté correctamente definido en tu base de datos.
                servicio = Ofertas.query.get(item.service_id)  # Asegúrate de que 'Ofertas' esté bien definido.
            
            if servicio:
                user_services.append({
                    "tipo": item.service_type,
                    "cantidad": item.quantity,
                    "detalle": servicio.descripcion,
                    "precio": servicio.precio
                })
    
    return jsonify(user_services), 200


@app.route('/usuario/carrito/servicios', methods=['DELETE'])
@jwt_required()
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
    
@app.route('/<categoria>/<int:id>', methods=['GET'])
def obtener_producto(categoria, id):
    modelos = {
        'viajes': Viajes,
        'belleza': Belleza,
        'gastronomia': Gastronomia,
        'top': Top,
        'ofertas': Ofertas
    }

    # Verificamos que la categoría sea válida
    modelo = modelos.get(categoria.lower())
    if not modelo:
        return jsonify({'message': f'Categoría "{categoria}" no válida'}), 400

    # Buscamos el producto por ID
    producto = modelo.query.get(id)
    if not producto:
        return jsonify({'message': f'{categoria.capitalize()} con ID {id} no encontrada'}), 404

    return jsonify(producto.serialize()), 200


def eliminar_duplicados_gastronomia():
    # Eliminar duplicados de la tabla Gastronomia
    servicios_gastronomia = Gastronomia.query.all()
    seen = set()
    for servicio in servicios_gastronomia:
        if servicio.title in seen:
            db.session.delete(servicio)
        else:
            seen.add(servicio.title)
    db.session.commit()

def eliminar_duplicados_viajes():
    # Eliminar duplicados de la tabla Viajes
    servicios_viajes = Viajes.query.all()
    seen = set()
    for servicio in servicios_viajes:
        if servicio.title in seen:
            db.session.delete(servicio)
        else:
            seen.add(servicio.title)
    db.session.commit()

def eliminar_duplicados_top():
    # Eliminar duplicados de la tabla Top
    servicios_top = Top.query.all()
    seen = set()
    for servicio in servicios_top:
        if servicio.title in seen:
            db.session.delete(servicio)
        else:
            seen.add(servicio.title)
    db.session.commit()

def eliminar_duplicados_belleza():
    # Eliminar duplicados de la tabla Belleza
    servicios_belleza = Belleza.query.all()
    seen = set()
    for servicio in servicios_belleza:
        if servicio.title in seen:
            db.session.delete(servicio)
        else:
            seen.add(servicio.title)
    db.session.commit()

def eliminar_duplicados_ofertas():
    # Eliminar duplicados de la tabla Ofertas
    servicios_ofertas = Ofertas.query.all()
    seen = set()
    for servicio in servicios_ofertas:
        if servicio.title in seen:
            db.session.delete(servicio)
        else:
            seen.add(servicio.title)
    db.session.commit()

# Función para limpiar todas las tablas
def limpiar_tablas():
    eliminar_duplicados_gastronomia()
    eliminar_duplicados_viajes()
    eliminar_duplicados_top()
    eliminar_duplicados_belleza()
    eliminar_duplicados_ofertas()
    print("Tablas limpiadas exitosamente.")

# Ruta para limpiar las tablas
@app.route('/limpiar_tablas', methods=['POST'])
def limpiar_tablas_api():
    limpiar_tablas()
    return jsonify({'message': 'Las tablas han sido limpiadas exitosamente.'}), 200

YOUR_DOMAIN = "https://orange-space-engine-q7pjgx55q54qcx7qx-3000.app.github.dev"  # Cambia esta URL si es otro entorno

""""@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        if not request.is_json:
            return jsonify({'error': 'Missing or invalid JSON'}), 400

        data = request.get_json()
        cart_items = data.get("items", [])
        total_price = data.get("total", 0)


        if not cart_items:
            return jsonify({'error': 'No items in cart'}), 400

        line_items = []
        for item in cart_items:
            if not item.get('title') or not item.get('discountPrice') or not item.get('quantity'):
                return jsonify({'error': 'Invalid item data'}), 400

            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': item['title'],
                    },
                    'unit_amount': int(item['discountPrice'] * 100),
                },
                'quantity': item['quantity'],
            })


        session = stripe.checkout.Session.create(
            line_items=line_items,
            mode='payment',
            ui_mode='embedded',
            return_url=f"https://vigilant-space-fishstick-g4jxxqgp94w3w659-3000.app.github.dev/return?session_id={{CHECKOUT_SESSION_ID}}"
        )

          # Guardar el pago en la base de datos con estado inicial 'pendiente'
        new_payment = Payment(
            currency='usd',
            amount=int(total_price * 100),  # Guardar el monto en centavos
            payment_date=datetime.utcnow(),
            paypal_payment_id=session.id,  # Usar el ID de sesión de Stripe
            user_id=user_id,
            estado='pendiente',  # Estado inicial como pendiente
        )

        db.session.add(new_payment)
        db.session.commit()

        return jsonify({
            'sessionId': session.id,
            'clientSecret': session.client_secret
        })

    except Exception as e:
        print("Error creating session:", e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500"""


""""@app.route('/create-checkout-session', methods=['POST'])
@jwt_required()
def create_checkout_session():
    try:
        if not request.is_json:
            return jsonify({'error': 'Missing or invalid JSON'}), 400

        data = request.get_json()
        cart_items = data.get("items", [])
        total_price = data.get("total", 0)

        if not cart_items:
            return jsonify({'error': 'No items in cart'}), 400

        # Obtener el usuario desde el token
        correo_usuario = get_jwt_identity()
        usuario = User.query.filter_by(correo=correo_usuario).first()
        if not usuario:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        line_items = []
        for item in cart_items:
            if not item.get('title') or not item.get('discountPrice') or not item.get('quantity'):
                return jsonify({'error': 'Invalid item data'}), 400

            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': item['title'],
                    },
                    'unit_amount': int(item['discountPrice'] * 100),
                },
                'quantity': item['quantity'],
            })

        session = stripe.checkout.Session.create(
            line_items=line_items,
            mode='payment',
            ui_mode='embedded',
            return_url=f"https://vigilant-space-fishstick-g4jxxqgp94w3w659-3000.app.github.dev/return?session_id={{CHECKOUT_SESSION_ID}}"
        )

        new_payment = Payment(
            currency='usd',
            amount=int(total_price * 100),
            payment_date=datetime.utcnow(),
            paypal_payment_id=session.id,
            user_id=usuario.id,
            estado='pendiente',
        )

        db.session.add(new_payment)
        db.session.commit()

        return jsonify({
            'sessionId': session.id,
            'clientSecret': session.client_secret
        })

    except Exception as e:
        print("Error creating session:", e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500"""

@app.route('/create-checkout-session', methods=['POST'])
@jwt_required()
def create_checkout_session():
    try:
        if not request.is_json:
            return jsonify({'error': 'Missing or invalid JSON'}), 400

        data = request.get_json()
        cart_items = data.get("items", [])
        total_price = data.get("total", 0)

        if not cart_items:
            return jsonify({'error': 'No items in cart'}), 400

        # Obtener el usuario desde el token
        correo_usuario = get_jwt_identity()
        usuario = User.query.filter_by(correo=correo_usuario).first()
        if not usuario:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        line_items = []
        for item in cart_items:
            if not item.get('title') or not item.get('discountPrice') or not item.get('quantity'):
                return jsonify({'error': 'Invalid item data'}), 400

            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': item['title'],
                    },
                    'unit_amount': int(item['discountPrice'] * 100),
                },
                'quantity': item['quantity'],
            })

        session = stripe.checkout.Session.create(
            line_items=line_items,
            mode='payment',
            ui_mode='embedded',
            return_url=f"https://orange-space-engine-q7pjgx55q54qcx7qx-3000.app.github.dev/return?session_id={{CHECKOUT_SESSION_ID}}"
        )

        # Crear el Payment
        new_payment = Payment(
            currency='usd',
            amount=int(total_price * 100),
            payment_date=datetime.utcnow(),
            paypal_payment_id=session.id,
            user_id=usuario.id,
            estado='pendiente',
        )
        db.session.add(new_payment)
        db.session.flush()  # Para obtener el ID antes de hacer commit

        # Crear los items
        for item in cart_items:
            payment_item = PaymentItem(
                title=item['title'],
                unit_price=int(item['discountPrice'] * 100),
                quantity=item['quantity'],
                payment_id=new_payment.id,
                image_url=item['image'],
                servicio_id=item.get('user_id')
            )
            db.session.add(payment_item)

        db.session.commit()

        return jsonify({
            'sessionId': session.id,
            'clientSecret': session.client_secret
        })

    except Exception as e:
        print("Error creating session:", e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500



""""@app.route('/session-status', methods=['GET'])
def session_status():
    session_id = request.args.get('session_id')

    # Aquí obtienes el estado de la sesión de Stripe o lo que sea necesario
    # Supón que obtienes el estado desde Stripe:
    session = stripe.checkout.Session.retrieve(session_id)

    if session:
        return jsonify({
            "status": session["payment_status"],  # O lo que sea relevante
            "customer_email": session.get("customer_email", "unknown")
        })
    else:
        return jsonify({"error": "Session not found"}), 404"""

@app.route('/session-status', methods=['GET'])
def session_status():
    session_id = request.args.get('session_id')
    if not session_id:
        return jsonify({'error': 'session_id faltante'}), 400

    try:
        # Consultar a Stripe por el estado de la sesión
        session = stripe.checkout.Session.retrieve(session_id)

        # Buscar el pago en tu base de datos
        payment = Payment.query.filter_by(paypal_payment_id=session_id).first()
        if not payment:
            return jsonify({'error': 'Pago no encontrado'}), 404

        # Actualizar estado si fue pagado
        if session.payment_status == 'paid' and payment.estado != 'pagado':
            payment.estado = 'pagado'
            db.session.commit()

        return jsonify({
            'status': session.payment_status,
            'customer_email': session.customer_email
        }), 200

    except Exception as e:
        print('Error en session-status:', e)
        return jsonify({'error': str(e)}), 500

    
@api.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    try:
        data = request.get_json()
        current_password = data.get("currentPassword")
        new_password = data.get("newPassword")

        # Obtener correo desde el token JWT
        correo = get_jwt_identity()
        user = User.query.filter_by(correo=correo).first()

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        # Verificar contraseña actual con Bcrypt
        if not bcrypt.check_password_hash(user.password, current_password):
            return jsonify({"msg": "Contraseña actual incorrecta"}), 401

        # Generar nuevo hash con Bcrypt
        user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        db.session.commit()

        return jsonify({"msg": "Contraseña actualizada exitosamente"}), 200

    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    
    # Ruta para crear un administrador
@app.route('/api/create-admin', methods=['POST'])
def crear_admin():
    # Obtener los datos de la solicitud (JSON)
    data = request.get_json()

    if not data:
        return jsonify({"error": "No se recibieron datos JSON"}), 400

    correo = data.get('correo')
    password = data.get('password')

    # Validación de datos obligatorios
    if not correo or not password:
        return jsonify({"error": "Correo y contraseña son obligatorios"}), 400

    # Verificar si el correo ya está registrado
    usuario_existente = User.query.filter_by(correo=correo).first()
    if usuario_existente:
        return jsonify({"error": "El correo ya está registrado"}), 409

    # Encriptar la contraseña
    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    # Crear el nuevo usuario con el rol 'Administrador'
    nuevo_admin = User(
        correo=correo,
        password=pw_hash,
        role='Administrador',  # El rol siempre será 'Administrador'
        is_active=True  # Asegúrate de que el admin esté activo
    )

    # Guardar en la base de datos
    db.session.add(nuevo_admin)
    db.session.commit()

    # Respuesta exitosa
    return jsonify({"message": "Administrador creado exitosamente"}), 201

mail_service = MailService()
serializer   = URLSafeTimedSerializer(app.config['SECRET_KEY'])

@app.route('/api/auth/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json(force=True)
    email = data.get('email')
    if not email:
        return jsonify({'message': 'Email requerido'}), 400

    # Busca usuario por su correo
    user = User.query.filter_by(correo=email).first()
    # Siempre devolvemos HTTP 200 para no revelar si existe o no
    if user:
        # Genera token seguro basado en el correo
        token = serializer.dumps(user.correo, salt='password-reset-salt')
        # Guarda el token en BD
        prt = PasswordResetToken(user_id=user.id, token=token)
        db.session.add(prt)
        db.session.commit()

        # Construye el enlace de reset
        frontend_url = os.getenv('FRONTEND_URL', 'https://orange-space-engine-q7pjgx55q54qcx7qx-3000.app.github.dev')
        reset_link = f"{frontend_url}/reset-password?token={token}"

        # Prepara y envía el email
        subject = 'Restablece tu contraseña'
        body = (
            f"Hola,\n\n"
            "Has solicitado cambiar tu contraseña. Haz clic en este enlace para hacerlo (válido 1 hora):\n\n"
            f"{reset_link}\n\n"
            "Si no solicitaste este cambio, puedes ignorar este mensaje."
        )
        mail_service.send_mail(
            to_email=user.correo,
            subject=subject,
            text_content=body,
            html_content=None
        )

    return jsonify({'message': 'Si existe esa cuenta, recibirás un email con instrucciones.'}), 200

@app.route('/api/auth/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json(force=True)
    token = data.get('token')
    new_password = data.get('newPassword')
    if not token or not new_password:
        return jsonify({'message': 'Token y nueva contraseña requeridos'}), 400

    # 1) Verifica y extrae el correo del token
    try:
        correo = serializer.loads(token, salt='password-reset-salt', max_age=3600)
    except Exception:
        return jsonify({'message': 'Token inválido o expirado'}), 400

    # 2) Comprueba que el token exista
    prt = PasswordResetToken.query.filter_by(token=token).first()
    if not prt:
        return jsonify({'message': 'Token no válido'}), 400

    # 3) Actualiza la contraseña usando Bcrypt
    user = User.query.get(prt.user_id)
    hashed_pw = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password = hashed_pw

    # 4) Elimina el token y commitea
    db.session.delete(prt)
    db.session.commit()

    return jsonify({'message': 'Contraseña restablecida correctamente.'}), 200
    
    # Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
