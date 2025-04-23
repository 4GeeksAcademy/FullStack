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
def crear_servicios_viajes(user_id, viajes_category_id):
    if not Viajes.query.filter_by(category_id=viajes_category_id).first():
        viajes_services = [
            Viajes(
                title="Aventura en la Patagonia",
                description="Explora los glaciares y montañas del sur de Argentina.",
                image="https://source.unsplash.com/random/800x600/?patagonia",
                city="El Calafate",
                category="viajes",
                discountPrice=800,
                originalPrice=1050,
                rating=4.6,
                reviews=245,
                buyers=320,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Ruta del vino en Mendoza",
                description="Visita las mejores bodegas y degusta vinos exquisitos.",
                image="https://source.unsplash.com/random/800x600/?wine,vineyard",
                city="Mendoza",
                category="viajes",
                discountPrice=600,
                originalPrice=850,
                rating=4.3,
                reviews=190,
                buyers=270,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Safari en Kenia",
                description="Observa la fauna salvaje en su hábitat natural.",
                image="https://source.unsplash.com/random/800x600/?safari,kenya",
                city="Nairobi",
                category="viajes",
                discountPrice=1200,
                originalPrice=1500,
                rating=4.9,
                reviews=305,
                buyers=410,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Crucero por el Caribe",
                description="Relájate en un crucero de lujo por las islas caribeñas.",
                image="https://source.unsplash.com/random/800x600/?cruise,caribbean",
                city="San Juan",
                category="viajes",
                discountPrice=1500,
                originalPrice=1900,
                rating=4.7,
                reviews=410,
                buyers=520,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Escapada a Machu Picchu",
                description="Recorre la ciudadela inca más famosa del mundo.",
                image="https://source.unsplash.com/random/800x600/?machupicchu,peru",
                city="Cusco",
                category="viajes",
                discountPrice=700,
                originalPrice=950,
                rating=4.8,
                reviews=360,
                buyers=430,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Tour gastronómico por Italia",
                description="Degustá lo mejor de la cocina italiana en Roma, Florencia y Nápoles.",
                image="https://source.unsplash.com/random/800x600/?italy,food",
                city="Roma",
                category="viajes",
                discountPrice=1000,
                originalPrice=1400,
                rating=4.5,
                reviews=290,
                buyers=380,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Norte de Tailandia espiritual",
                description="Conocé templos, monjes y paisajes de ensueño en Chiang Mai.",
                image="https://source.unsplash.com/random/800x600/?thailand,temple",
                city="Chiang Mai",
                category="viajes",
                discountPrice=850,
                originalPrice=1100,
                rating=4.6,
                reviews=230,
                buyers=310,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Travesía en la Ruta 66",
                description="Viaje por carretera desde Chicago hasta Los Ángeles.",
                image="https://source.unsplash.com/random/800x600/?route66,usa",
                city="Los Ángeles",
                category="viajes",
                discountPrice=1300,
                originalPrice=1650,
                rating=4.7,
                reviews=275,
                buyers=350,
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
