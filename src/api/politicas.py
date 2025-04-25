from api.models import db, Politica

def crear_politicas():
    politicas_existentes = Politica.query.all()
    if not politicas_existentes:
        politicas = [
            Politica(
                titulo="Política de Privacidad",
                contenido="""
En GruponClone, tu privacidad es una prioridad. Recopilamos datos personales únicamente para mejorar tu experiencia en nuestra plataforma, facilitar las compras y reservas, y enviarte información relevante. Estos datos incluyen nombre, correo electrónico, preferencias de servicio, historial de compras y ubicación.
No compartimos tu información con terceros sin tu consentimiento, salvo cuando sea necesario para procesar un servicio o cumplir con requisitos legales.
Implementamos medidas de seguridad para proteger tus datos y garantizar que se manejen de forma responsable.
Al utilizar nuestros servicios, aceptás los términos de esta política.
"""
            ),
            Politica(
                titulo="Términos y Condiciones",
                contenido="""
El uso de GruponClone implica la aceptación de estos términos y condiciones. Nuestra plataforma permite comprar, vender y reservar servicios con descuentos exclusivos.
Los usuarios deben proporcionar información veraz y mantener la confidencialidad de sus credenciales.
GruponClone actúa como intermediario entre proveedores y compradores, y no se hace responsable por incumplimientos por parte de terceros.
Nos reservamos el derecho de modificar estos términos en cualquier momento, notificando a los usuarios por los medios adecuados.
El mal uso de la plataforma podrá conllevar la suspensión o eliminación de la cuenta.
"""
            ),
            Politica(
                titulo="Política de Cookies",
                contenido="""
GruponClone utiliza cookies y tecnologías similares para personalizar tu experiencia, analizar el tráfico y mostrarte promociones relevantes.
Estas cookies nos permiten recordar tus preferencias, mantener sesiones activas y mejorar el rendimiento del sitio.
Podés configurar tu navegador para bloquear o eliminar cookies, aunque esto puede afectar la funcionalidad del sitio.
Al continuar navegando en GruponClone, aceptás el uso de cookies conforme a esta política.
"""
            ),
            Politica(
                titulo="Sobre Nosotros",
                contenido="""
En GruponClone, creemos que los mejores momentos no tienen que ser costosos.
Somos una plataforma especializada en la compra, venta y reserva de experiencias y servicios con descuentos exclusivos.
Conectamos a usuarios con miles de opciones en gastronomía, belleza, viajes y más, en un solo lugar fácil y seguro.
Nuestro objetivo es ayudarte a descubrir y disfrutar lo mejor de tu ciudad y del mundo, ahorrando en cada paso.
"""
            ),
        ]
        db.session.bulk_save_objects(politicas)
        db.session.commit()
