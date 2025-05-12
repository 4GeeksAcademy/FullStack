from api.models import db, Viajes, Top, Belleza, Gastronomia, User, Ofertas
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()  # Asegúrate de haberlo inicializado con tu app Flask

def create_admin_user():
    user = User.query.filter_by(correo='admin@outlook.com').first()

    if user:
        print("El usuario admin ya existe.")
        return

    hashed_password = bcrypt.generate_password_hash('admin').decode('utf-8')

    user = User(
        correo='admin@outlook.com',
        password=hashed_password,
        role='admin'
    )
    db.session.add(user)
    db.session.commit()
    print("Usuario admin creado exitosamente.")


# Funciones para eliminar duplicados
def eliminar_duplicados_gastronomia():
    servicios_gastronomia = Gastronomia.query.all()
    seen = set()
    for servicio in servicios_gastronomia:
        if servicio.title in seen:
            db.session.delete(servicio)
        else:
            seen.add(servicio.title)
    db.session.commit()

def eliminar_duplicados_viajes():
    servicios_viajes = Viajes.query.all()
    seen = set()
    for servicio in servicios_viajes:
        if servicio.title in seen:
            db.session.delete(servicio)
        else:
            seen.add(servicio.title)
    db.session.commit()

def eliminar_duplicados_top():
    servicios_top = Top.query.all()
    seen = set()
    for servicio in servicios_top:
        if servicio.title in seen:
            db.session.delete(servicio)
        else:
            seen.add(servicio.title)
    db.session.commit()

def eliminar_duplicados_belleza():
    servicios_belleza = Belleza.query.all()
    seen = set()
    for servicio in servicios_belleza:
        if servicio.title in seen:
            db.session.delete(servicio)
        else:
            seen.add(servicio.title)
    db.session.commit()

def eliminar_duplicados_ofertas():
    servicios_ofertas = Ofertas.query.all()
    seen = set()
    for servicio in servicios_ofertas:
        if servicio.title in seen:
            db.session.delete(servicio)
        else:
            seen.add(servicio.title)
    db.session.commit()

def limpiar_tablas():
    eliminar_duplicados_gastronomia()
    eliminar_duplicados_viajes()
    eliminar_duplicados_top()
    eliminar_duplicados_belleza()
    eliminar_duplicados_ofertas()
    print("Tablas limpiadas exitosamente.")

def crear_servicios_ofertas(user_id, ofertas_category_id):
    if not Ofertas.query.filter_by(category_id=ofertas_category_id).first():
        ofertas = [
            # Ofertas originales
            Ofertas(
                title="Clase de yoga al amanecer en la playa",
                descripcion="Sesión de 90 minutos con instructores certificados frente al mar.",
                image="https://images.unsplash.com/photo-1646166624994-9bd6876e6520?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                image="https://img.freepik.com/free-photo/side-view-man-working-beer-factory_23-2150573925.jpg?t=st=1745849209~exp=1745852809~hmac=f6d89b6e1ea85ab4dfdb321b7fe43abf161fae386eb986b92d53a2e96ff47cbb&w=1380",
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
                image="https://img.freepik.com/free-photo/close-up-man-doing-pottery_23-2148986301.jpg?t=st=1745849325~exp=1745852925~hmac=393a269ff0ddbc3840330d67048d1a4048637271de554bcf10efcaf40f38084c&w=1380",
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
                image="https://img.freepik.com/free-photo/close-up-sideways-cyclist-holding-e-bike-with-green-wall-background_23-2148225875.jpg?t=st=1745849436~exp=1745853036~hmac=4da424763d09d35c7ca33f4286707c82765e8669440b33034704326831f2d25e&w=1380",
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
                image="https://img.freepik.com/free-photo/hands-holding-bowl-fajita-mexican-food_181624-45672.jpg?t=st=1745849512~exp=1745853112~hmac=f74a024bbcd3b513fe63ac672cddb60dba8a423b4348161222732d6ba3413372&w=1380",
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
                image="https://img.freepik.com/free-photo/couple-together-kayaking-river_1303-16041.jpg?t=st=1745849568~exp=1745853168~hmac=9a4de2de8e3bb042dc94aee0e40332b5549de342ca87884b9f8ceca824ba88e0&w=1380",
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
                image="https://img.freepik.com/free-photo/close-up-person-s-hand-holding-aerosol-bottle_23-2147827680.jpg?t=st=1745849677~exp=1745853277~hmac=c157ed6f2b68cb5d0fce33d551d6a4e2607015879b9b62f4bcd68cda1086fb9f&w=1380",
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
                image="https://img.freepik.com/free-photo/backpacker-relax-mountain-with-camera-adn-sunset_1150-7755.jpg?t=st=1745849720~exp=1745853320~hmac=0e3efd4f1092a765c62cd2d8f92f6a6ab8d9bb03027e9eb72b15da0eb28d2511&w=1380",
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
    # if not Viajes.query.filter_by(category_id=viajes_category_id).first():
        viajes_services = [
            Viajes(
                title="Aventura en la Patagonia",
                descripcion="Explora los glaciares y montañas del sur de Argentina.",
                image="https://img.freepik.com/free-photo/hooker-valley-track-with-view-mount-cook-new-zealand_181624-16247.jpg?t=st=1745850681~exp=1745854281~hmac=3f68283193865f129e53dd5ab64abd63472c24b7c2651aaed6fde4407943dd60&w=1380",
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
                image="https://img.freepik.com/free-photo/cropped-image-couple-toasting-wineglasses_107420-9699.jpg?t=st=1745850800~exp=1745854400~hmac=5c8ba981fbb0439a90ea66efdda3ad3c8018536307c23ff0b2b8af7870f888f6&w=1380",
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
                image="https://img.freepik.com/free-photo/crossroad-car-safari-scene_23-2151822304.jpg?t=st=1745850851~exp=1745854451~hmac=007502725f7271d42fb30bfbac779bf23a299949c7727e86d373107ebdf65a0d&w=1380",
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
                image="https://img.freepik.com/free-photo/woman-spiritual-peaceful-summer-beach-concept_53876-31219.jpg?t=st=1745850786~exp=1745854386~hmac=b769a19fa395d205a31cdaf5ccab2fd48ff4ad7793c23d0f0bb7b5bdc2a3efdc&w=900",
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
                image="https://img.freepik.com/free-photo/bird-s-eye-view-breathtaking-mountain-machu-picchu-peru_181624-10826.jpg?t=st=1745851018~exp=1745854618~hmac=162d2b0591718492c034a0236d42a0b9fbe213cc423e71df30f3b5b2a714cf69&w=1380",
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
                image="https://img.freepik.com/free-photo/delicious-customs-food-plate_52683-91618.jpg?t=st=1745851099~exp=1745854699~hmac=3d9a2202e67932861988dc26826dd6da683e8874d423b792eb6667649e461632&w=1060",
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
                image="https://img.freepik.com/free-photo/woman-having-some-quality-time-spa-hotel_23-2149037096.jpg?t=st=1745851161~exp=1745854761~hmac=28bf78938cfcd3e02c255dcac51a980152ba5def0fa00abe7ebeb4219ee4a96b&w=1380",
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
                image="https://img.freepik.com/free-photo/beautiful-shot-u-s-route-66-arizona-usa-with-clear-blue-sky-background_181624-53248.jpg?t=st=1745851202~exp=1745854802~hmac=953768f194e7bd539cf4885d8c9cc41ebdedd99977eff4143580cc91ae6dac77&w=1060",
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
        # Verificar cuáles ya existen para no duplicar
        existing_titles = {v.title for v in Viajes.query.filter_by(category_id=viajes_category_id).all()}
        new_services = [v for v in viajes_services if v.title not in existing_titles]
    
        if new_services:
            db.session.bulk_save_objects(new_services)
            db.session.commit()
        # db.session.bulk_save_objects(viajes_services)
        # db.session.commit()


def crear_servicios_top(user_id, top_category_id):
    # Verificar títulos existentes para evitar duplicados
    existing_titles = {t.title for t in Top.query.filter_by(category_id=top_category_id).all()}
    
    top_services = [
        Top(
            title="Crucero de lujo por el Mediterráneo",
            descripcion="Disfrutá 7 días de lujo en altamar visitando Italia, Grecia y España.",
            image="https://img.freepik.com/free-photo/luxury-cruise-ship-sailing-ocean-sunset_181624-24289.jpg",
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
            image="https://img.freepik.com/free-photo/elephants-savannah-africa-sunset_181624-24282.jpg",
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
            image="https://img.freepik.com/free-photo/3d-background-children-with-castle_23-2150499382.jpg",
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
            image="https://img.freepik.com/free-photo/luxury-camping-tent-mountains_181624-24285.jpg",
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
            image="https://img.freepik.com/free-photo/hot-air-balloons-flying-over-cappadocia_181624-24288.jpg",
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
            image="https://img.freepik.com/free-photo/machu-picchu-peru-sunrise_181624-24284.jpg",
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
            image="https://img.freepik.com/free-photo/beautiful-shot-banff-national-park-canada_181624-24283.jpg",
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
            image="https://img.freepik.com/free-photo/luxury-beach-resort-maldives_181624-24287.jpg",
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

    # MODIFICACIÓN TEMPORAL PARA ACTUALIZAR IMÁGENES
    # Comenta este bloque después de actualizar las imágenes
    # for service in top_services:
    #     existing_service = Top.query.filter_by(title=service.title).first()
    #     if existing_service:
    #         existing_service.image = service.image
    #         db.session.commit()
    #         print(f"Imagen actualizada para: {service.title}")
    # FIN DE MODIFICACIÓN TEMPORAL

    # Filtrar solo los servicios que no existen
    new_services = [t for t in top_services if t.title not in existing_titles]
    
    if new_services:
        db.session.bulk_save_objects(new_services)
        db.session.commit()
        print(f"Se agregaron {len(new_services)} nuevos servicios Top")
    else:
        print("No se agregaron nuevos servicios Top (ya existen)")

# Función para crear los servicios de Belleza
def crear_servicios_belleza(user_id, belleza_category_id):
    if not Belleza.query.filter_by(category_id=belleza_category_id).first():
        belleza_services = [
            Belleza(
                title="Masaje relajante con aromaterapia",
                descripcion="Masaje corporal completo con aceites esenciales.",
                image="https://img.freepik.com/free-photo/patient-getting-cbd-treatment_23-2151160290.jpg?t=st=1745851346~exp=1745854946~hmac=e36091486974fcf2804f91d5dedceca487f736fb02c5074362c2513893f395de&w=1380",
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
                image="https://img.freepik.com/free-photo/high-angle-woman-getting-massaged-spa_23-2149871240.jpg?t=st=1745851409~exp=1745855009~hmac=88913c6259aa5708cdf3a4bc37aa33f1eb47d7f6716b0c5a62b4efe0f883c96e&w=1380",
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
                image="https://img.freepik.com/free-photo/healthy-beautiful-manicure-manicurist_23-2148766558.jpg?t=st=1745851435~exp=1745855035~hmac=85013ea6b1d4ab4596ad13789a79ead0b2207a0739ac29e345e8b7f2e49e1c0f&w=1380",
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
                image="https://img.freepik.com/free-photo/female-hairdresser-making-hairstyle-blonde-woman-beauty-salon_176420-4455.jpg?t=st=1745851468~exp=1745855068~hmac=36b109d5b73abde72af36ac4f9f2d7ba6d1edd03bc4c852f015640e902981067&w=1380",
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
                image="https://img.freepik.com/free-photo/woman-getting-legs-waxed-spa_53876-13496.jpg?t=st=1745851495~exp=1745855095~hmac=b4b3fba8b63b9f1fc56a18bb97604ce199907a81ca6a300f03cdd28962d3d9d1&w=1380",
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
                image="https://img.freepik.com/free-photo/woman-getting-massage-back-by-hot-stones_329181-18804.jpg?t=st=1745851519~exp=1745855119~hmac=32572355032878cf7cb305c6c882fb1efd91e1301d9fa41c99d1f183e2bbde9c&w=1380",
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
                image="https://img.freepik.com/free-photo/eye-lashes-keratin-procedure-salon_1303-27759.jpg?t=st=1745851568~exp=1745855168~hmac=5b28493145307c5eb270a0de31d80ddb9990c65a63ac44c99bfda11e308b70de&w=1380",
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
                image="https://img.freepik.com/free-photo/woman-getting-her-hair-washed-beauty-salon_23-2149167381.jpg?t=st=1745851596~exp=1745855196~hmac=670b64dec00b2ee43944222c65ed3df759c70d3ddad4e6a67b68dec64039c5ed&w=1380",
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
                image="https://img.freepik.com/free-photo/tasty-pasta-plate-top-view_23-2149325263.jpg?t=st=1745851696~exp=1745855296~hmac=60b1c33764c652f6b14f4ae921f20b6621cbd55b477a0ea25c1acc1bcc1e6ea4&w=1380",
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
                image="https://img.freepik.com/free-photo/beautiful-girl-eating-sushi-studio_1157-18340.jpg?t=st=1745851739~exp=1745855339~hmac=b15b1870d2d80beddd0cf53c27b12298525ce5b8990919b883d3faba836b908b&w=1380",
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
                image="https://img.freepik.com/free-photo/man-smelling-wine_23-2147770845.jpg?t=st=1745851774~exp=1745855374~hmac=869bae6542d90a2462d7798a1ff8a97b1324434d29a5aa113833137d29f9e0b7&w=1380",
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
                image="https://img.freepik.com/free-photo/hotel-waitress-serving-food_53876-15221.jpg?t=st=1745851815~exp=1745855415~hmac=d91ceaea5a75875a5811039332bb4f7c9debf574418732ee7a6e700990b06937&w=1380",
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
                image="https://img.freepik.com/free-photo/medium-shot-friends-sitting-table_23-2149068564.jpg?t=st=1745851857~exp=1745855457~hmac=13c437e34179a91e0e1fb416dbaf1a7d3d2e779913958d5ca0b8843f59f13c68&w=1380",
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
                image="https://img.freepik.com/free-photo/young-person-enjoying-street-food_23-2151525864.jpg?t=st=1745851888~exp=1745855488~hmac=54ef7453f36b785f5336437bd71921750cebe9f0440ed12cbed64573ff4aef32&w=1380",
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
                image="https://img.freepik.com/free-photo/front-view-smiley-old-man-with-mexican-flag_23-2149522603.jpg?t=st=1745851920~exp=1745855520~hmac=5e6b5f996e9a1f5a2a09d504e3574cc379180b9402c323d4a5db10d27a70ff72&w=1380",
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
                image="https://img.freepik.com/free-photo/couple-lovers-having-romantic-dinner-home_171337-675.jpg?t=st=1745851946~exp=1745855546~hmac=f7e6092382240959022c437fdcc7f4938af6bb25dc9046bf09c54f37d8966499&w=1380",
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
