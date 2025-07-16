import React, { useState } from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import Footer from "../component/Footer.jsx";
import WhatsAppButton from "../component/WhatsAppButton.jsx";

const VistaContacto = () => {
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías integrar tu lógica de envío, p.ej. llamada a API
    setEnviado(true);
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div>
      <LayoutHeader />
      <WhatsAppButton />

      <div className="container my-5">
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
          <div className="card-body">
            <h3 className="fw-bold text-center mb-4">Contacto</h3>

            <p className="text-muted mb-3" style={{ whiteSpace: "pre-wrap" }}>
              ¿Tienes alguna pregunta, sugerencia o simplemente quieres saludarnos?
              Nuestro equipo estará encantado de atenderte y ayudarte en todo lo que necesites.
              A continuación encontrarás varias formas de ponerte en contacto con nosotros:
            </p>

            <div className="mb-4">
              <h5 className="fw-semibold">WhatsApp</h5>
              <p>
                Escríbenos a: <strong>+34 641 363 127</strong>
                <br />
                Horario de atención: Lunes a Viernes, de 09:00 a 18:00 (hora local)
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fw-semibold">Dirección Física</h5>
              <p>
                Oficina Central: <br />
                Calle Estrella Polar, n.º 1<br />
                28983 Madrid, España
              </p>
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.1234567890123!2d-3.703790384607401!3d40.41677537936224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42288e1234567%3A0x1234567890abcdef!2sCalle%20Paseo%20de%20la%20Ilusi%C3%B3n%2C%2015%2C%2028003%20Madrid!5e0!3m2!1ses!2ses!4v1610000000000!5m2!1ses!2ses"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Mapa de nuestra oficina en Madrid"
                ></iframe>
              </div>
            </div>

            <hr />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VistaContacto;

