import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import Footer from "../component/Footer.jsx";
import Newsletter from "../component/Newsletter.jsx";
import WhatsAppButton from "../component/WhatsAppButton.jsx";

const VistaSobreNosotros = () => {
  return (
    <div>
      {/* Navbar */}
      <LayoutHeader />
      <WhatsAppButton />

      {/* Contenedor principal */}
      <div className="container my-5">
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
          <div className="card-body">
            <h3 className="fw-bold text-center mb-4">
              Sobre De Camino al Sí
            </h3>
            {/* Contenido justificado */}
            <p
              className="text-muted mb-4"
              style={{ whiteSpace: "pre-wrap", textAlign: "justify" }}
            >
              En <strong>De Camino al Sí</strong> acompañamos a las parejas en cada paso
              de la planificación de su boda, ofreciéndoles asesoría gratuita y
              soluciones a medida. Nuestra misión es convertir el proceso de
              organizar el gran día en una experiencia sencilla, emocionante y libre de
              preocupaciones. 
              
              <br/><br/>

              Desde la elección de la fecha ideal hasta la coordinación del “Día B”, nos
              ocupamos de cada detalle: búsqueda y negociación de fincas o salones
              exclusivos, diseño de menús personalizados, gestión de proveedores y
              logística. Hacemos posible tanto bodas íntimas como celebraciones de gran
              escala, adaptando nuestros paquetes Gold, Platinum, Emerald o Diamond al
              estilo y presupuesto de cada pareja.
              
              <br/><br/>

              Nuestro equipo de profesionales se encarga de:
              <ul style={{ marginLeft: "1rem" }}>
                <li>Escoger la fecha perfecta, teniendo en cuenta temporada y disponibilidad.</li>
                <li>Definir el tipo de ceremonia (civil, religiosa o simbólica).</li>
                <li>Visitar y seleccionar la finca o salón ideal, negociando contratos.</li>
                <li>Diseñar el banquete: menús de 3 o 4 platos, opciones veganas y sin gluten.</li>
                <li>Coordinar música, animación y fotografía profesional.</li>
                <li>Gestionar transporte y hospedaje para novios e invitados.</li>
                <li>Planificar la decoración y ambientación según la temática elegida.</li>
              </ul>
              
              <br/>

              Creemos en la flexibilidad: aceptamos cambios hasta 15 días antes del evento
              y ofrecemos servicios adicionales como peluquería, maquillaje extra,
              transporte VIP y coordinación de luna de miel.  
              
              <br/><br/>

              En De Camino al Sí tu tranquilidad es nuestra prioridad. Contáctanos para
              recibir tu asesoría gratuita y dar el primer paso hacia el “sí, quiero”.
            </p>
          </div>
        </div>

        <Newsletter />
      </div>

      <Footer />
    </div>
  );
};

export default VistaSobreNosotros;

