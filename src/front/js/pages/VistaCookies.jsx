import React, { useState } from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import Footer from "../component/Footer.jsx";
import Newsletter from "../component/Newsletter.jsx";
import WhatsAppButton from "../component/WhatsAppButton.jsx";

const VistaCookies = () => {
  const [acepto, setAcepto] = useState(false);

  const handleCheckbox = () => setAcepto(!acepto);
  const handleAccept = () => setAcepto(true);
  const handleDecline = () => {
    setAcepto(false);
    // opcional: podrías redirigir al usuario o desactivar scripts aquí
  };

  return (
    <div>
      <LayoutHeader />
      <WhatsAppButton />

      <div className="container my-5">
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
          <div className="card-body">
            <h3 className="fw-bold text-center mb-4">Política de Cookies</h3>

            <div
              className="text-muted mb-4"
              style={{ whiteSpace: "pre-wrap", textAlign: "justify" }}
            >
              <p>
                En <strong>De Camino al Sí</strong> utilizamos cookies para mejorar tu experiencia
                en nuestra web y ofrecerte contenidos personalizados. A continuación explicamos
                qué son las cookies, cómo las utilizamos y cómo puedes gestionarlas.
              </p>

              <h5 className="mt-4">1. ¿Qué son las cookies?</h5>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu navegador cuando
                visitas un sitio web. Su finalidad es recordar información sobre tu visita, como
                idioma preferido o ajustes de visualización, para que no tengas que configurarlos
                de nuevo cada vez que regreses.
              </p>

              <h5 className="mt-4">2. Tipos de cookies que utilizamos</h5>
              <p>
                a) <strong>Cookies estrictamente necesarias:</strong> indispensables para que la web
                funcione correctamente (por ejemplo, mantener tu sesión activa o recordar el contenido
                del carrito). <br />
                b) <strong>Cookies de rendimiento:</strong> recogen datos anónimos sobre cómo navegas
                por nuestro sitio (páginas visitadas, tiempo de permanencia). Nos ayudan a identificar
                posibles errores y optimizar la navegación. <br />
                c) <strong>Cookies de funcionalidad:</strong> permiten guardar tus preferencias (idioma,
                región, diseño de pantalla) y ofrecerte contenidos adaptados. <br />
                d) <strong>Cookies de publicidad y analíticas:</strong> usamos herramientas como
                Google Analytics para medir el rendimiento de nuestras campañas y mostrarte anuncios
                relevantes. Estas cookies no recopilan información personal, sino datos agregados.
              </p>

              <h5 className="mt-4">3. Gestión y Desactivación de cookies</h5>
              <p>
                Puedes aceptar o rechazar cookies mediante el banner que aparece en tu primera visita.
                También puedes configurar tu navegador para borrar automáticamente las cookies o
                desactivarlas, paso a paso:
              </p>
              <ul>
                <li>
                  <strong>Chrome:</strong> Menú → Configuración → Privacidad y seguridad → Cookies y otros
                  datos de sitios → Desactivar o eliminar.
                </li>
                <li>
                  <strong>Firefox:</strong> Menú → Opciones → Privacidad y seguridad → Cookies y datos de
                  sitios → Gestionar permisos o eliminar.
                </li>
                <li>
                  <strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos de sitios web →
                  Eliminar o bloquear.
                </li>
                <li>
                  <strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies y datos
                  de sitios → Ver y borrar cookies.
                </li>
              </ul>
              <p>
                Ten en cuenta que desactivar cookies estrictamente necesarias puede afectar la correcta
                visualización o funcionamiento de algunas secciones de nuestra web.
              </p>

              <h5 className="mt-4">4. Propósito de las cookies</h5>
              <p>
                a) Garantizar el correcto rendimiento de formularios, procesos de reserva y pasarelas de
                pago. <br />
                b) Analizar de forma anónima el comportamiento de los usuarios para optimizar contenido y diseño. <br />
                c) Personalizar la experiencia mostrando recomendaciones de paquetes, artículos y ofertas
                acordes a tus intereses. <br />
                d) Medir la eficacia de nuestras campañas publicitarias en redes sociales y Google Ads.
              </p>

              <h5 className="mt-4">5. Terceros que instalan cookies</h5>
              <p>
                En algunos apartados empleamos servicios externos que instalan sus propias cookies:
              </p>
              <ul>
                <li>
                  <strong>Google Analytics:</strong> para estadísticas de tráfico y comportamiento.
                </li>
                <li>
                  <strong>Facebook Pixel:</strong> para medir conversiones y mejorar anuncios en Facebook e Instagram.
                </li>
                <li>
                  <strong>Google Ads:</strong> para seguimiento de campañas y remarketing.
                </li>
                <li>
                  <strong>Plataformas de pago:</strong> pueden instalar cookies para asegurar transacciones
                  seguras.
                </li>
              </ul>
              <p>
                Si usas extensiones o herramientas de bloqueo de anuncios (ad blockers), esas cookies de terceros
                podrán ser bloqueadas.
              </p>

              <h5 className="mt-4">6. Consentimiento</h5>
              <p>
                Al navegar por <strong>De Camino al Sí</strong>, aceptas el uso de cookies según lo explicado
                aquí. Puedes modificar tu consentimiento en cualquier momento a través del banner de cookies o
                configurando tu navegador.
              </p>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="aceptoCookies"
                  checked={acepto}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label" htmlFor="aceptoCookies">
                  Acepto el uso de cookies según esta política
                </label>
              </div>

              <div className="d-flex gap-2 mb-3">
                <button
                  className="btn btn-success"
                  onClick={handleAccept}
                  disabled={acepto}
                >
                  Aceptar
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleDecline}
                  disabled={!acepto}
                >
                  Rechazar
                </button>
              </div>

              {!acepto && (
                <div className="alert alert-warning">
                  Has rechazado las cookies. Algunas funcionalidades pueden verse
                  limitadas.
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

export default VistaCookies;


