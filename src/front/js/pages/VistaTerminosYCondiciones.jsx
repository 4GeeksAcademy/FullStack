import React, { useState } from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import Footer from "../component/Footer.jsx";
import Newsletter from "../component/Newsletter.jsx";
import WhatsAppButton from "../component/WhatsAppButton.jsx";

const VistaTerminosYCondiciones = () => {
  const [aceptado, setAceptado] = useState(false);

  const handleCheckbox = () => {
    setAceptado(!aceptado);
  };

  return (
    <div>
      <LayoutHeader />
      <WhatsAppButton />

      <div className="container my-5">
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
          <div className="card-body">
            <h3 className="fw-bold text-center mb-4">Términos y Condiciones</h3>

            <div
              className="text-muted mb-4"
              style={{ whiteSpace: "pre-wrap", textAlign: "justify" }}
            >
              <p>
                Bienvenido a “De Camino al Sí”. Estos Términos y Condiciones
                regulan el uso de nuestro sitio web y los servicios que ofrecemos.
                Al navegar o realizar cualquier compra en nuestra web, estás
                confirmando que aceptas estos términos en su totalidad. Si no estás
                de acuerdo con alguno de los puntos, por favor abstente de utilizar
                o adquirir nuestros servicios.
              </p>

              <h5 className="mt-4">1. Uso del Sitio</h5>
              <p>
                a) El contenido disponible en “De Camino al Sí” (textos,
                imágenes, videos, diseños, etc.) es propiedad de nuestra
                empresa o de terceros que nos han autorizado su uso. Queda
                prohibida la reproducción total o parcial sin permiso expreso.
                <br />
                b) Puedes navegar, consultar y compartir la información, siempre
                que se cite la fuente y no se altere el contenido original.
                <br />
                c) Queda prohibido el uso de bots, scrapers u otras herramientas
                automatizadas para extraer datos o sobrecargar nuestro servidor.
              </p>

              <h5 className="mt-4">2. Registro y Privacidad</h5>
              <p>
                a) Para acceder a ciertas secciones (por ejemplo, solicitar
                asesoría gratuita o enviar un mensaje), deberás registrarte con
                datos verídicos. <br />
                b) Tus datos personales se utilizarán exclusivamente para
                ofrecerte los servicios solicitados y mejorar tu experiencia.
                Nunca compartiremos tu información con terceros sin tu
                consentimiento. <br />
                c) Puedes consultar nuestra Política de Privacidad para más
                detalles sobre el tratamiento de datos.
              </p>

              <h5 className="mt-4">3. Servicios y Asesoría</h5>
              <p>
                a) Ofrecemos asesoría gratuita para la planificación integral
                de tu boda (elección de fecha, selección de finca, diseño de
                banquete, coordinación del “Día B”, transporte, hospedaje,
                paquetes Gold, Platinum, Emerald y Diamond, etc.).<br />
                b) Los paquetes detallan servicios cubiertos (catering, invitaciones,
                vehículo nupcial, hospedaje), precios aproximados y condiciones
                de reserva. <br />
                c) La asesoría gratuita incluye orientación telefónica, por
                WhatsApp o email, y visitas coordinadas a fincas o salones. Cualquier
                servicio adicional o modificación que exceda el alcance de la guía
                se cotizará por separado.
              </p>

              <h5 className="mt-4">4. Reservas y Pagos</h5>
              <p>
                a) Al elegir un paquete o servicio y acordar la elección con uno de
                nuestros asesores, se deberá cancelar el 100% del importe del
                paquete. <br />
                b) En caso de cancelación, reembolsaremos el 70% del importe
                total; el 30% restante quedará en concepto de gastos de
                reservas, movilidad y transporte de la empresa. <br />
                c) Aceptamos transferencias bancarias, tarjetas de crédito y
                plataformas de pago seguras.
              </p>

              <h5 className="mt-4">5. Cambios y Modificaciones</h5>
              <p>
                a) Aceptamos cambios de planificación hasta 15 días antes del
                evento sin coste adicional, siempre que no implique reservas
                nuevas o pagos extras. <br />
                b) Si necesitas ajustar número de invitados, menús o servicios
                de última hora, podemos gestionarlo en la medida de lo posible,
                sujeto a disponibilidad del proveedor y posibles recargos.
              </p>

              <h5 className="mt-4">6. Responsabilidades</h5>
              <p>
                a) Nosotros nos encargamos de coordinar proveedores, negociar
                tarifas, supervisar logística y asegurar que el evento se
                desarrolle conforme al plan acordado. <br />
                b) No nos hacemos responsables por imprevistos ajenos a nuestra
                gestión (desastres naturales, decisiones unilaterales de terceros,
                problemas de transporte público, etc.). <br />
                c) Cada finca o salón tiene sus propias pólizas de seguro y
                clausulados de responsabilidad civil. Te informaremos de ellos
                antes de firmar contrato.
              </p>

              <h5 className="mt-4">7. Propiedad Intelectual</h5>
              <p>
                a) Todo diseño, logo, marca y contenido original de “De Camino al
                Sí” está protegido por derechos de autor y marcas registradas.
                Queda prohibido su uso sin autorización escrita. <br />
                b) Las fotografías, vídeos y diseños que creamos para tu boda
                se te ceden en modalidad de uso personal. No puedes comercializarlos.
              </p>

              <h5 className="mt-4">8. Jurisdicción y Ley Aplicable</h5>
              <p>
                a) Estos Términos y Condiciones se rigen por la legislación
                española. <br />
                b) Cualquier controversia se someterá a los tribunales de Madrid,
                salvo que una normativa específica exija otro foro. <br />
                c) Si alguna cláusula se considera inválida o inaplicable, el
                resto permanecerá vigente.
              </p>

              <h5 className="mt-4">9. Aceptación</h5>
              <p>
                Al navegar o comprar en nuestro sitio web, confirmas que has leído
                y aceptas estos Términos y Condiciones en su totalidad.
              </p>
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="acepto"
                  checked={aceptado}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label" htmlFor="acepto">
                  He leído y acepto los Términos y Condiciones
                </label>
              </div>
              {!aceptado && (
                <div className="alert alert-warning">
                  Debes aceptar los Términos y Condiciones para continuar.
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

export default VistaTerminosYCondiciones;
