# services.py
from api.models import db, Viajes, Top, Belleza, Gastronomia, User, Ofertas

def create_admin_user():
    user = User.query.filter_by(correo='admin@outlook.com').first()
    if not user:
        user = User(
            correo='admin@outlook.com',
            password='admin',
            role='Administrador'
        )
        db.session.add(user)
        db.session.commit()
    
def crear_servicios_ofertas(user_id, ofertas_category_id):
        ofertas = [
            # Ofertas originales
            Ofertas(
                title="Clase de yoga al amanecer en la playa",
                descripcion="Sesión de 90 minutos con instructores certificados frente al mar.",
                image="https://source.unsplash.com/random/800x600/?yoga,beach",
                city="Tulum, México",
                price=35,
                discountPrice=60,
                rating=4.9,
                reviews=85,
                buyers=160,
                user_id=user_id,
                category_id=ofertas_category_id
            ),
            Ofertas(
                title="Experiencia de cata de cervezas artesanales",
                descripcion="Degustación de 6 variedades con maridaje incluido.",
                image="https://source.unsplash.com/random/800x600/?craftbeer,tasting",
                city="Valparaíso, Chile",
                price=22,
                discountPrice=40,
                rating=4.7,
                reviews=70,
                buyers=95,
                user_id=user_id,
                category_id=ofertas_category_id
            ),
            Ofertas(
                title="Taller de cerámica con materiales incluidos",
                descripcion="Creá tus propias piezas con ayuda de artistas locales.",
                image="https://source.unsplash.com/random/800x600/?pottery,workshop",
                city="Montevideo, Uruguay",
                price=45,
                discountPrice=80,
                rating=4.8,
                reviews=120,
                buyers=145,
                user_id=user_id,
                category_id=ofertas_category_id
            ),
            Ofertas(
                title="City tour nocturno en bicicleta eléctrica",
                descripcion="Descubrí los secretos de la ciudad iluminada con guía bilingüe.",
                image="https://source.unsplash.com/random/800x600/?biketour,citynight",
                city="Lima, Perú",
                price=30,
                discountPrice=50,
                rating=4.6,
                reviews=60,
                buyers=90,
                user_id=user_id,
                category_id=ofertas_category_id
            ),
            # Nuevas ofertas agregadas
            Ofertas(
                title="Clase de cocina peruana tradicional",
                descripcion="Aprendé a preparar ceviche y lomo saltado con chefs locales.",
                image="https://source.unsplash.com/random/800x600/?peruviancuisine,cookingclass",
                city="Cusco, Perú",
                price=40,
                discountPrice=70,
                rating=4.8,
                reviews=95,
                buyers=110,
                user_id=user_id,
                category_id=ofertas_category_id
            ),
            Ofertas(
                title="Paseo en kayak por lagunas escondidas",
                descripcion="Exploración guiada en kayak por reservas naturales secretas.",
                image="https://source.unsplash.com/random/800x600/?kayaking,adventure",
                city="Bariloche, Argentina",
                price=50,
                discountPrice=85,
                rating=4.7,
                reviews=88,
                buyers=130,
                user_id=user_id,
                category_id=ofertas_category_id
            ),
            Ofertas(
                title="Ruta de arte urbano y grafitis",
                descripcion="Recorrido por murales y arte callejero con un guía especializado.",
                image="https://source.unsplash.com/random/800x600/?streetart,graffiti",
                city="Bogotá, Colombia",
                price=20,
                discountPrice=35,
                rating=4.5,
                reviews=75,
                buyers=100,
                user_id=user_id,
                category_id=ofertas_category_id
            ),
            Ofertas(
                title="Workshop de fotografía al atardecer",
                descripcion="Clase práctica para capturar el atardecer con cámara o celular.",
                image="https://source.unsplash.com/random/800x600/?sunset,photography",
                city="Punta del Este, Uruguay",
                price=55,
                discountPrice=95,
                rating=4.9,
                reviews=110,
                buyers=140,
                user_id=user_id,
                category_id=ofertas_category_id
            ),
        ]
        db.session.bulk_save_objects(ofertas)
        db.session.commit()


# Función para crear los servicios de Viajes
def crear_servicios_viajes(user_id, viajes_category_id):
    if not Viajes.query.filter_by(category_id=viajes_category_id).first():
        viajes_services = [
            Viajes(
                title="Aventura en la Patagonia",
                descripcion="Explora los glaciares y montañas del sur de Argentina.",
                image="https://images.unsplash.com/photo-1526397751294-331021109fbd",
                city="El Calafate",
                price=800,
                discountPrice=1050,
                rating=4.6,
                reviews=245,
                buyers=320,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Ruta del vino en Mendoza",
                descripcion="Visita las mejores bodegas y degusta vinos exquisitos.",
                image="https://source.unsplash.com/random/800x600/?wine,vineyard",
                city="Mendoza",
                price=600,
                discountPrice=850,
                rating=4.3,
                reviews=190,
                buyers=270,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Safari en Kenia",
                descripcion="Observa la fauna salvaje en su hábitat natural.",
                image="https://source.unsplash.com/random/800x600/?safari,kenya",
                city="Nairobi",
                price=1200,
                discountPrice=1500,
                rating=4.9,
                reviews=305,
                buyers=410,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Crucero por el Caribe",
                descripcion="Relájate en un crucero de lujo por las islas caribeñas.",
                image="https://source.unsplash.com/random/800x600/?cruise,caribbean",
                city="San Juan",
                price=1500,
                discountPrice=1900,
                rating=4.7,
                reviews=410,
                buyers=520,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Escapada a Machu Picchu",
                descripcion="Recorre la ciudadela inca más famosa del mundo.",
                image="https://source.unsplash.com/random/800x600/?machupicchu,peru",
                city="Cusco",
                price=700,
                discountPrice=950,
                rating=4.8,
                reviews=360,
                buyers=430,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Tour gastronómico por Italia",
                descripcion="Degustá lo mejor de la cocina italiana en Roma, Florencia y Nápoles.",
                image="https://source.unsplash.com/random/800x600/?italy,food",
                city="Roma",
                price=1000,
                discountPrice=1400,
                rating=4.5,
                reviews=290,
                buyers=380,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Norte de Tailandia espiritual",
                descripcion="Conocé templos, monjes y paisajes de ensueño en Chiang Mai.",
                image="https://source.unsplash.com/random/800x600/?thailand,temple",
                city="Chiang Mai",
                price=850,
                discountPrice=1100,
                rating=4.6,
                reviews=230,
                buyers=310,
                user_id=user_id,
                category_id=viajes_category_id
            ),
            Viajes(
                title="Travesía en la Ruta 66",
                descripcion="Viaje por carretera desde Chicago hasta Los Ángeles.",
                image="https://source.unsplash.com/random/800x600/?route66,usa",
                city="Los Ángeles",
                price=1300,
                discountPrice=1650,
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
    if not Top.query.filter_by(category_id=top_category_id).first():
        top_services = [
            Top(
                title="Crucero de lujo por el Mediterráneo",
                descripcion="Disfrutá 7 días de lujo en altamar visitando Italia, Grecia y España.",
                image="https://source.unsplash.com/random/800x600/?mediterranean,cruise",
                city="Mar Mediterráneo",
                price=3500,
                discountPrice=4200,
                rating=4.8,
                reviews=300,
                buyers=450,
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                title="Safari fotográfico en Kenia",
                descripcion="Capturá la vida salvaje en su hábitat natural con guías expertos.",
                image="https://source.unsplash.com/random/800x600/?kenya,safari",
                city="Reserva Masái Mara",
                price=2800,
                discountPrice=3500,
                rating=4.7,
                reviews=275,
                buyers=320,
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                title="Tour VIP por Disney World",
                descripcion="Acceso prioritario, guías personalizados y experiencias exclusivas.",
                image="https://source.unsplash.com/random/800x600/?disneyworld,orlando",
                city="Orlando, Florida",
                price=2000,
                discountPrice=2500,
                rating=4.9,
                reviews=500,
                buyers=700,
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                title="Glamping en los Alpes suizos",
                descripcion="Hospedaje de lujo en medio de la naturaleza alpina.",
                image="https://source.unsplash.com/random/800x600/?swissalps,glamping",
                city="Alpes, Suiza",
                price=2200,
                discountPrice=2700,
                rating=4.6,
                reviews=200,
                buyers=250,
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                title="Travesía en globo aerostático por Capadocia",
                descripcion="Vuelos al amanecer con vistas impresionantes.",
                image="https://source.unsplash.com/random/800x600/?cappadocia,balloon",
                city="Capadocia, Turquía",
                price=450,
                discountPrice=600,
                rating=4.7,
                reviews=150,
                buyers=220,
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                title="Expedición al Machu Picchu",
                descripcion="Trekking de 4 días con guía, todo incluido.",
                image="https://source.unsplash.com/random/800x600/?machupicchu,peru",
                city="Cusco, Perú",
                price=1800,
                discountPrice=2300,
                rating=4.8,
                reviews=350,
                buyers=500,
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                title="Tour por los parques nacionales de Canadá",
                descripcion="Recorrido en bus por Banff, Jasper y más.",
                image="https://source.unsplash.com/random/800x600/?banff,canada",
                city="Alberta, Canadá",
                price=1600,
                discountPrice=2000,
                rating=4.5,
                reviews=180,
                buyers=230,
                user_id=user_id,
                category_id=top_category_id
            ),
            Top(
                title="Semana en resort 5 estrellas en Maldivas",
                descripcion="Bungalow sobre el agua con experiencias gastronómicas y acuáticas.",
                image="https://source.unsplash.com/random/800x600/?maldives,resort",
                city="Islas Maldivas",
                price=5000,
                discountPrice=6000,
                rating=4.9,
                reviews=400,
                buyers=600,
                user_id=user_id,
                category_id=top_category_id
            ),
        ]
        db.session.bulk_save_objects(top_services)
        db.session.commit()

# Función para crear los servicios de Belleza
def crear_servicios_belleza(user_id, belleza_category_id):
    if not Belleza.query.filter_by(category_id=belleza_category_id).first():
        belleza_services = [
            Belleza(
                title="Masaje relajante con aromaterapia",
                descripcion="Masaje corporal completo con aceites esenciales.",
                image="https://source.unsplash.com/random/800x600/?spa,massage",
                city="Spa Serenity",
                price=60,
                discountPrice=75,
                rating=4.7,
                reviews=150,
                buyers=220,
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                title="Tratamiento facial hidratante",
                descripcion="Limpieza profunda e hidratación para todo tipo de piel.",
                image="https://source.unsplash.com/random/800x600/?facial,spa",
                city="Glow Center",
                price=45,
                discountPrice=55,
                rating=4.6,
                reviews=120,
                buyers=180,
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                title="Spa de manos y uñas",
                descripcion="Manicura completa con esmaltado semipermanente.",
                image="https://source.unsplash.com/random/800x600/?manicure,spa",
                city="Nail Lounge",
                price=35,
                discountPrice=45,
                rating=4.8,
                reviews=200,
                buyers=250,
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                title="Peinado y brushing profesional",
                descripcion="Ideal para eventos y ocasiones especiales.",
                image="https://source.unsplash.com/random/800x600/?hairstyle,brushing",
                city="Studio Look",
                price=50,
                discountPrice=60,
                rating=4.7,
                reviews=140,
                buyers=190,
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                title="Depilación con cera",
                descripcion="Cuerpo completo o zonas específicas, con cera tibia.",
                image="https://source.unsplash.com/random/800x600/?waxing,spa",
                city="Estética Venus",
                price=40,
                discountPrice=50,
                rating=4.5,
                reviews=160,
                buyers=210,
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                title="Masaje con piedras calientes",
                descripcion="Alivio muscular profundo con piedras volcánicas.",
                image="https://source.unsplash.com/random/800x600/?hotstone,spa",
                city="Nature Spa",
                price=70,
                discountPrice=90,
                rating=4.8,
                reviews=175,
                buyers=230,
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                title="Extensión de pestañas",
                descripcion="Pestañas con efecto natural o volumen ruso.",
                image="https://source.unsplash.com/random/800x600/?eyelashes,beauty",
                city="Lash & Love",
                price=55,
                discountPrice=70,
                rating=4.6,
                reviews=140,
                buyers=190,
                user_id=user_id,
                category_id=belleza_category_id
            ),
            Belleza(
                title="Coloración capilar y nutrición",
                descripcion="Color personalizado con tratamiento nutritivo post-color.",
                image="https://source.unsplash.com/random/800x600/?haircolor,beauty",
                city="Color Room",
                price=80,
                discountPrice=100,
                rating=4.7,
                reviews=180,
                buyers=250,
                user_id=user_id,
                category_id=belleza_category_id
            ),
        ]
        db.session.bulk_save_objects(belleza_services)
        db.session.commit()

# Función para crear los servicios de Gastronomía
def crear_servicios_gastronomia(user_id, gastronomia_category_id):
    if not Gastronomia.query.filter_by(category_id=gastronomia_category_id).first():
        gastronomia_services = [
            Gastronomia(
                title="Cena gourmet italiana",
                descripcion="Experiencia de 4 tiempos con vinos italianos.",
                image="https://source.unsplash.com/random/800x600/?italianfood,dinner",
                city="Trattoria Bella Vita",
                price=150,
                discountPrice=180,
                rating=4.9,
                reviews=250,
                buyers=300,
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                title="Taller de sushi y cocina japonesa",
                descripcion="Aprendé a preparar sushi con un chef experto.",
                image="https://source.unsplash.com/random/800x600/?sushi,japanesefood",
                city="Sushi Masterclass",
                price=80,
                discountPrice=100,
                rating=4.8,
                reviews=180,
                buyers=220,
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                title="Cata de vinos argentinos",
                descripcion="Cata guiada con vinos de Mendoza y Patagonia.",
                image="https://source.unsplash.com/random/800x600/?wine,catavinos",
                city="Vino & Sabor",
                price=60,
                discountPrice=75,
                rating=4.7,
                reviews=200,
                buyers=250,
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                title="Desayuno de lujo en el centro",
                descripcion="Desayuno completo en el restaurante El Rincón.",
                image="https://source.unsplash.com/random/800x600/?breakfast,luxury",
                city="Café El Rincón",
                price=35,
                discountPrice=45,
                rating=4.6,
                reviews=160,
                buyers=210,
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                title="Brunch en la terraza del hotel",
                descripcion="Menú internacional de brunch con vistas al mar.",
                image="https://source.unsplash.com/random/800x600/?brunch,hotel",
                city="Terraza Del Mar",
                price=55,
                discountPrice=70,
                rating=4.7,
                reviews=220,
                buyers=270,
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                title="Comida callejera en Bangkok",
                descripcion="Recorrido gastronómico por los puestos de comida tailandesa.",
                image="https://source.unsplash.com/random/800x600/?streetfood,bangkok",
                city="Bangkok",
                price=25,
                discountPrice=35,
                rating=4.9,
                reviews=270,
                buyers=330,
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                title="Tour gastronómico por México",
                descripcion="Recorré las mejores taquerías de Ciudad de México.",
                image="https://source.unsplash.com/random/800x600/?mexicanfood,tacos",
                city="Ciudad de México",
                price=40,
                discountPrice=50,
                rating=4.8,
                reviews=210,
                buyers=280,
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
            Gastronomia(
                title="Cena a la luz de las velas en París",
                descripcion="Cena romántica en un restaurante con vistas a la Torre Eiffel.",
                image="https://source.unsplash.com/random/800x600/?paris,dinner",
                city="París",
                price=180,
                discountPrice=220,
                rating=5.0,
                reviews=300,
                buyers=400,
                user_id=user_id,
                category_id=gastronomia_category_id
            ),
        ]
        db.session.bulk_save_objects(gastronomia_services)
        db.session.commit()

# Función para inicializar todos los servicios
def inicializar_servicios(user_id, viajes_category_id, top_category_id, belleza_category_id, gastronomia_category_id, ofertas_category_id):
    create_admin_user()
    # Crear los servicios para cada categoría
    crear_servicios_viajes(user_id, viajes_category_id)
    crear_servicios_top(user_id, top_category_id)
    crear_servicios_belleza(user_id, belleza_category_id)
    crear_servicios_gastronomia(user_id, gastronomia_category_id)
    crear_servicios_ofertas(user_id, ofertas_category_id)  
