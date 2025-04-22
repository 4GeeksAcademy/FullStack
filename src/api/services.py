# services.py
from api.models import db, Viajes, Top, Belleza, Gastronomia, User

def create_admin_user():
    user = User.query.filter_by(correo='admin@outlook.com').first()
    if not user:
        user = User(
            nombre='Admin',
            correo='admin@outlook.com',
            password='admin',
            role='Administrador'
            )
        db.session.add(user)
        db.session.commit()
    

# Función para crear los servicios de Viajes
# Función para crear los servicios de Viajes
def crear_servicios_viajes(user_id, viajes_category_id):
    # Verifica si ya existen servicios de viajes en la base de datos
    if not Viajes.query.filter_by(category_id=viajes_category_id).first():
        viajes_services = [
            Viajes(
                nombre="Aventura en la Patagonia",
                descripcion="Explora los glaciares y montañas del sur de Argentina.",
                precio=800,
                ubicacion="Patagonia, Argentina",
                horarios="08:00 AM - 6:00 PM",
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                nombre="Ruta del vino en Mendoza",
                descripcion="Visita las mejores bodegas y degusta vinos exquisitos.",
                precio=600,
                ubicacion="Mendoza, Argentina",
                horarios="10:00 AM - 4:00 PM",
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                nombre="Safari en Kenia",
                descripcion="Observa la fauna salvaje en su hábitat natural.",
                precio=1200,
                ubicacion="Reserva Maasai Mara, Kenia",
                horarios="06:00 AM - 7:00 PM",
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                nombre="Crucero por el Caribe",
                descripcion="Relájate en un crucero de lujo por las islas caribeñas.",
                precio=1500,
                ubicacion="Caribe",
                horarios="Todo el día",
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                nombre="Escapada a Machu Picchu",
                descripcion="Recorre la ciudadela inca más famosa del mundo.",
                precio=700,
                ubicacion="Cusco, Perú",
                horarios="05:00 AM - 5:00 PM",
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                nombre="Tour gastronómico por Italia",
                descripcion="Degustá lo mejor de la cocina italiana en Roma, Florencia y Nápoles.",
                precio=1000,
                ubicacion="Italia",
                horarios="10:00 AM - 8:00 PM",
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                nombre="Norte de Tailandia espiritual",
                descripcion="Conocé templos, monjes y paisajes de ensueño en Chiang Mai.",
                precio=850,
                ubicacion="Chiang Mai, Tailandia",
                horarios="08:00 AM - 4:00 PM",
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                nombre="Travesía en la Ruta 66",
                descripcion="Viaje por carretera desde Chicago hasta Los Ángeles.",
                precio=1300,
                ubicacion="Estados Unidos",
                horarios="Todo el día",
                user_id=user_id,
                category_id=viajes_category_id
            ),
        ]
        db.session.bulk_save_objects(viajes_services)
        db.session.commit()

# Función para crear los servicios de Top
def crear_servicios_top(user_id, top_category_id):
    # Verifica si ya existen servicios de Top en la base de datos
    if not Top.query.filter_by(category_id=top_category_id).first():
        top_services = [
            Top(
                nombre="Crucero de lujo por el Mediterráneo",
                descripcion="Disfrutá 7 días de lujo en altamar visitando Italia, Grecia y España.",
                precio=3500,
                ubicacion="Mar Mediterráneo",
                horarios="Todo el día",
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                nombre="Safari fotográfico en Kenia",
                descripcion="Capturá la vida salvaje en su hábitat natural con guías expertos.",
                precio=2800,
                ubicacion="Reserva Masái Mara",
                horarios="06:00 AM - 06:00 PM",
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                nombre="Tour VIP por Disney World",
                descripcion="Acceso prioritario, guías personalizados y experiencias exclusivas.",
                precio=2000,
                ubicacion="Orlando, Florida",
                horarios="08:00 AM - 10:00 PM",
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                nombre="Glamping en los Alpes suizos",
                descripcion="Hospedaje de lujo en medio de la naturaleza alpina.",
                precio=2200,
                ubicacion="Alpes, Suiza",
                horarios="Check-in: 02:00 PM - Check-out: 11:00 AM",
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                nombre="Travesía en globo aerostático por Capadocia",
                descripcion="Vuelos al amanecer con vistas impresionantes.",
                precio=450,
                ubicacion="Capadocia, Turquía",
                horarios="05:00 AM - 07:00 AM",
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                nombre="Expedición al Machu Picchu",
                descripcion="Trekking de 4 días con guía, todo incluido.",
                precio=1800,
                ubicacion="Cusco, Perú",
                horarios="Todo el día",
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                nombre="Tour por los parques nacionales de Canadá",
                descripcion="Recorrido en bus por Banff, Jasper y más.",
                precio=1600,
                ubicacion="Alberta, Canadá",
                horarios="08:00 AM - 06:00 PM",
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                nombre="Semana en resort 5 estrellas en Maldivas",
                descripcion="Bungalow sobre el agua con experiencias gastronómicas y acuáticas.",
                precio=5000,
                ubicacion="Islas Maldivas",
                horarios="Todo el día",
                user_id=user_id,
                category_id=top_category_id
            ),
        ]
        db.session.bulk_save_objects(top_services)
        db.session.commit()

# Función para crear los servicios de Belleza
def crear_servicios_belleza(user_id, belleza_category_id):
    # Verifica si ya existen servicios de Belleza en la base de datos
    if not Belleza.query.filter_by(category_id=belleza_category_id).first():
        belleza_services = [
            Belleza(
                nombre="Masaje relajante con aromaterapia",
                descripcion="Masaje corporal completo con aceites esenciales.",
                precio=60,
                ubicacion="Spa Serenity",
                horarios="10:00 AM - 5:00 PM",
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                nombre="Tratamiento facial hidratante",
                descripcion="Limpieza profunda e hidratación para todo tipo de piel.",
                precio=45,
                ubicacion="Glow Center",
                horarios="11:00 AM - 7:00 PM",
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                nombre="Spa de manos y uñas",
                descripcion="Manicura completa con esmaltado semipermanente.",
                precio=35,
                ubicacion="Nail Lounge",
                horarios="09:00 AM - 6:00 PM",
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                nombre="Peinado y brushing profesional",
                descripcion="Ideal para eventos y ocasiones especiales.",
                precio=50,
                ubicacion="Studio Look",
                horarios="10:00 AM - 8:00 PM",
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                nombre="Depilación con cera",
                descripcion="Cuerpo completo o zonas específicas, con cera tibia.",
                precio=40,
                ubicacion="Estética Venus",
                horarios="08:30 AM - 3:00 PM",
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                nombre="Masaje con piedras calientes",
                descripcion="Alivio muscular profundo con piedras volcánicas.",
                precio=70,
                ubicacion="Nature Spa",
                horarios="12:00 PM - 6:00 PM",
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                nombre="Extensión de pestañas",
                descripcion="Pestañas con efecto natural o volumen ruso.",
                precio=55,
                ubicacion="Lash & Love",
                horarios="10:00 AM - 4:00 PM",
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                nombre="Coloración capilar y nutrición",
                descripcion="Color personalizado con tratamiento nutritivo post-color.",
                precio=80,
                ubicacion="Color Room",
                horarios="11:00 AM - 7:00 PM",
                user_id=user_id,
                category_id=belleza_category_id
            ),
        ]
        db.session.bulk_save_objects(belleza_services)
        db.session.commit()

# Función para crear los servicios de Gastronomía
def crear_servicios_gastronomia(user_id, gastronomia_category_id):
    # Verifica si ya existen servicios de Gastronomía en la base de datos
    if not Gastronomia.query.filter_by(category_id=gastronomia_category_id).first():
        gastronomia_services = [
            Gastronomia(
                nombre="Cena gourmet italiana",
                descripcion="Experiencia de 4 tiempos con vinos italianos.",
                precio=150,
                ubicacion="Trattoria Bella Vita",
                horarios="07:00 PM - 11:00 PM",
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                nombre="Taller de sushi y cocina japonesa",
                descripcion="Aprendé a preparar sushi con un chef experto.",
                precio=100,
                ubicacion="Sakura Kitchen",
                horarios="05:00 PM - 08:00 PM",
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                nombre="Noche de tapas españolas",
                descripcion="Variedad de tapas, vino y música en vivo.",
                precio=80,
                ubicacion="Bar Celeste",
                horarios="08:00 PM - 12:00 AM",
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                nombre="Degustación de vinos y quesos",
                descripcion="Maridaje guiado con sommelier profesional.",
                precio=90,
                ubicacion="Bodega Urbana",
                horarios="06:30 PM - 09:30 PM",
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                nombre="Cena a la parrilla estilo argentino",
                descripcion="Cortes premium con guarniciones tradicionales.",
                precio=110,
                ubicacion="La Estancia Grill",
                horarios="07:00 PM - 11:00 PM",
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                nombre="Desayuno buffet saludable",
                descripcion="Opciones veganas, sin gluten y frescas.",
                precio=35,
                ubicacion="Green & Go",
                horarios="08:00 AM - 11:00 AM",
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                nombre="Clase de cocina mexicana tradicional",
                descripcion="Prepará tacos, guacamole y salsas desde cero.",
                precio=75,
                ubicacion="Casa Frida",
                horarios="04:00 PM - 07:00 PM",
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                nombre="Cena temática de cocina india",
                descripcion="Sabores intensos y especias auténticas.",
                precio=95,
                ubicacion="Masala House",
                horarios="07:00 PM - 10:30 PM",
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
        ]
        db.session.bulk_save_objects(gastronomia_services)
        db.session.commit()


# Función para inicializar todos los servicios
def inicializar_servicios(user_id, viajes_category_id, top_category_id, belleza_category_id, gastronomia_category_id):
    create_admin_user()
    # Crear los servicios para cada categoría
    crear_servicios_viajes(user_id, viajes_category_id)
    crear_servicios_top(user_id, top_category_id)
    crear_servicios_belleza(user_id, belleza_category_id)
    crear_servicios_gastronomia(user_id, gastronomia_category_id)
