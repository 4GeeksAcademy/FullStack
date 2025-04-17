# services.py
from api.models import db, Viajes, Top, Belleza, Gastronomia

# Función para crear los servicios de Viajes
def crear_servicios_viajes(user_id, viajes_category_id):
    viajes_services = [
        Viajes(
            nombre=f"Tour a las pirámides de Egipto #{i+1}",
            descripcion="Una experiencia única en Egipto.",
            precio=500 + (i * 100),
            ubicacion="Egipto",
            horarios="09:00 AM - 5:00 PM",
            user_id=user_id,
            category_id=viajes_category_id
        ) for i in range(8)
    ]
    db.session.bulk_save_objects(viajes_services)
    db.session.commit()

# Función para crear los servicios de Top
def crear_servicios_top(user_id, top_category_id):
    top_services = [
        Top(
            nombre=f"Excursión al Himalaya #{i+1}",
            descripcion="Aventura extrema en el Himalaya.",
            precio=1000 + (i * 150),
            ubicacion="Nepal",
            horarios="07:00 AM - 3:00 PM",
            user_id=user_id,
            category_id=top_category_id
        ) for i in range(8)
    ]
    db.session.bulk_save_objects(top_services)
    db.session.commit()

# Función para crear los servicios de Belleza
def crear_servicios_belleza(user_id, belleza_category_id):
    belleza_services = [
        Belleza(
            nombre=f"Masaje relajante #{i+1}",
            descripcion="Relájate con nuestro masaje de cuerpo completo.",
            precio=50 + (i * 10),
            ubicacion="Spa X",
            horarios="10:00 AM - 6:00 PM",
            user_id=user_id,
            category_id=belleza_category_id
        ) for i in range(8)
    ]
    db.session.bulk_save_objects(belleza_services)
    db.session.commit()

# Función para crear los servicios de Gastronomía
def crear_servicios_gastronomia(user_id, gastronomia_category_id):
    gastronomia_services = [
        Gastronomia(
            nombre=f"Cena gourmet #{i+1}",
            descripcion="Disfruta de una cena de 5 estrellas.",
            precio=120 + (i * 20),
            ubicacion="Restaurante Y",
            horarios="07:00 PM - 11:00 PM",
            user_id=user_id,
            category_id=gastronomia_category_id
        ) for i in range(8)
    ]
    db.session.bulk_save_objects(gastronomia_services)
    db.session.commit()

# Función para inicializar todos los servicios
def inicializar_servicios(user_id, viajes_category_id, top_category_id, belleza_category_id, gastronomia_category_id):
    # Crear los servicios para cada categoría
    crear_servicios_viajes(user_id, viajes_category_id)
    crear_servicios_top(user_id, top_category_id)
    crear_servicios_belleza(user_id, belleza_category_id)
    crear_servicios_gastronomia(user_id, gastronomia_category_id)