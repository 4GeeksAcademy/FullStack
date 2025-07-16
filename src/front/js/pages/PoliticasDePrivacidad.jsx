import React, { useState } from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import Footer from "../component/Footer.jsx";
import Newsletter from "../component/Newsletter.jsx";
import WhatsAppButton from "../component/WhatsAppButton.jsx";

const PoliticasDePrivacidad = () => {
  const [acepto, setAcepto] = useState(false);

  const handleCheckbox = () => setAcepto(!acepto);

  return (
    <div>
      <LayoutHeader />
      <WhatsAppButton />

      <div className="container my-5">
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
          <div className="card-body">
            <h3 className="fw-bold text-center mb-4">Política de Privacidad</h3>

            <div
              className="text-muted mb-4"
              style={{ whiteSpace: "pre-wrap", textAlign: "justify" }}
            >
              <p>
                En <strong>De Camino al Sí</strong>, nos tomamos muy en serio la protección
                de tus datos personales. A continuación describimos cómo recopilamos,
                usamos y protegemos tu información cuando visitas nuestra web o contratas
                cualquiera de nuestros servicios de planificación de bodas.
              </p>

              <h5 className="mt-4">1. Datos que Recopilamos</h5>
              <p>
                a) <strong>Datos de Contacto:</strong> Nombre, apellidos, dirección de correo
                electrónico y número de teléfono, cuando te registras para solicitar
                asesoría o suscribirte a nuestro boletín. <br />
                b) <strong>Información del Evento:</strong> Fecha de la boda, número de invitados,
                tipo de ceremonia y preferencias de estilo, para ofrecerte presupuestos y
                recomendaciones personalizadas. <br />
                c) <strong>Datos de Pago:</strong> Cuando reservas un paquete (Gold, Platinum,
                Emerald o Diamond), solicitamos información de tarjeta o cuenta bancaria,
                procesada siempre a través de pasarelas seguras y encriptadas. <br />
                d) <strong>Datos de Navegación:</strong> Cookies y tecnologías similares para
                mejorar tu experiencia: páginas visitadas, tiempo de permanencia, origen
                de tráfico y comportamiento dentro de la web.
              </p>

              <h5 className="mt-4">2. Finalidad del Tratamiento</h5>
              <p>
                a) <strong>Gestión de Solicitudes:</strong> Utilizamos tus datos de contacto
                y del evento para enviarte cotizaciones, coordinar visitas a fincas y
                responder tus dudas. <br />
                b) <strong>Mejora de Servicios:</strong> Analizamos el uso de la web y las
                preferencias para ofrecerte contenidos, paquetes y promociones más
                acordes a tus necesidades. <br />
                c) <strong>Envío de Boletines:</strong> Si te suscribes, recibirás consejos,
                tendencias de bodas 2025 y ofertas especiales. Puedes darte de baja en
                cualquier momento desde el enlace en el pie de cada email. <br />
                d) <strong>Facturación y Cobro:</strong> Tus datos de pago sólo se usan para
                procesar la compra de paquetes o servicios adicionales. Nunca almacenamos
                información completa de la tarjeta en nuestros servidores.
              </p>

              <h5 className="mt-4">3. Base Legal</h5>
              <p>
                a) El tratamiento de tus datos de contacto y del evento se basa en tu
                consentimiento al proporcionarlos para pedir asesoría o reservar un
                servicio. <br />
                b) El uso de cookies se basa en tu consentimiento explícito al navegar
                en nuestro sitio. <br />
                c) La información de pago se recoge para el cumplimiento de un contrato:
                los términos acordados para la planificación de tu boda.
              </p>

              <h5 className="mt-4">4. Destinatarios y Cesiones</h5>
              <p>
                a) <strong>Proveedores de Servicios:</strong> Podemos compartir tu información
                con fincas, catering, fotógrafos, floristas y otros proveedores,
                únicamente para coordinar tu evento. <br />
                b) <strong>Procesadores de Pago:</strong> Entidades bancarias y pasarelas
                seguras que facilitan la transacción. <br />
                c) <strong>Obligaciones Legales:</strong> Si la ley nos exige entregar datos
                a autoridades (por ejemplo, en caso de inspección fiscal), cumpliremos
                con lo requerido. <br />
                d) <strong>No cedemos tus datos a terceros con fines publicitarios ajenos a
                “De Camino al Sí”.</strong>
              </p>

              <h5 className="mt-4">5. Conservación de Datos</h5>
              <p>
                a) Los datos de contacto y del evento se conservan mientras exista interés
                mutuo (por ejemplo, hasta que finalice la prestación del servicio y por
                un plazo máximo de 3 años para atender posibles garantías o consultas). <br />
                b) Los datos de pago se conservan el tiempo necesario para cumplir con
                obligaciones fiscales (5 años). <br />
                c) Tus preferencias de comunicación (boletín) se guardan hasta que solicites
                baja o durante 2 años si no interactúas con nuestros correos.
              </p>

              <h5 className="mt-4">6. Tus Derechos</h5>
              <p>
                Tienes derecho a acceder, rectificar o suprimir tus datos, así como a
                limitar u oponerte a su tratamiento y a solicitar la portabilidad. Para
                ejercerlos, escríbenos a WhatsApp al +34 641 363 127. Te responderemos en un plazo de 1 mes.
              </p>

              <h5 className="mt-4">7. Seguridad</h5>
              <p>
                a) Implementamos medidas técnicas y organizativas (certificado SSL,
                cifrado de bases de datos, accesos restringidos) para proteger tus datos
                frente a accesos no autorizados, pérdida o alteración. <br />
                b) Todos nuestros proveedores de alojamiento y pagos cumplen con estándares
                internacionales de seguridad (PCI DSS para tarjetas, ISO 27001 para infra).
              </p>

              <h5 className="mt-4">8. Cookies</h5>
              <p>
                a) Usamos cookies estrictamente necesarias para el funcionamiento de la web
                (sesión, carrito). <br />
                b) También empleamos cookies analíticas para entender cómo utilizas el sitio
                (Google Analytics en modo anonimizado). <br />
                c) Al entrar por primera vez, mostramos un banner de cookies donde puedes
                aceptar o rechazar aquellas que no sean esenciales. <br />
                d) Puedes configurar o desactivar cookies desde tu navegador, aunque esto
                podría afectar la experiencia de navegación.
              </p>

              <h5 className="mt-4">9. Enlaces Externos</h5>
              <p>
                Nuestro sitio puede contener enlaces a páginas de terceros (por ejemplo,
                portales de finca o proveedores). No somos responsables de las políticas
                de privacidad de esos sitios; te recomendamos revisar sus propios Términos
                y Políticas antes de proporcionar datos.
              </p>

              <h5 className="mt-4">10. Cambios en la Política</h5>
              <p>
                Nos reservamos el derecho a actualizar esta Política de Privacidad. Cualquier
                cambio se publicará en esta página con fecha de última revisión. Recomendamos
                consultarla periódicamente para estar al tanto de modificaciones.
              </p>

              <h5 className="mt-4">11. Aceptación</h5>
              <p>
                Al navegar en <strong>De Camino al Sí</strong>, suscribirte a nuestro boletín
                o contratar un servicio, confirmas que has leído y aceptas esta Política de
                Privacidad en su totalidad.
              </p>
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="aceptoPrivacidad"
                  checked={acepto}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label" htmlFor="aceptoPrivacidad">
                  He leído y acepto la Política de Privacidad
                </label>
              </div>
              {!acepto && (
                <div className="alert alert-warning">
                  Debes aceptar la Política de Privacidad para continuar.
                </div>
              )}
            </div>
          </div>
        </div>

        <Newsletter />
      </div>

      <Footer />
    </div>
  );
};

export default PoliticasDePrivacidad;
