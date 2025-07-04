import React from 'react';
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection2 from "../component/CategoriesSection2.jsx";
import RelatedContent from "../component/RelatedContent.jsx";
import Footer from "../component/Footer.jsx";

export function EmpezarOrganizarBodaFechaPage() {
  return (
    <div className="fecha-boda-root">
      <LayoutHeader />
      <CategoriesSection2 />

      {/* Scoped styled content only for this section */}
      <section className="fecha-boda-content">
        <style>{`
          /* Scoped Styles for EmpezarOrganizarBodaFechaPage Content */
          .fecha-boda-root .fecha-boda-content {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 1rem;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .fecha-boda-root .fecha-boda-content h1 {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            color: #333;
            margin-bottom: 1.5rem;
          }
          .fecha-boda-root .fecha-boda-content h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: #222;
          }
          .fecha-boda-root .fecha-boda-content p {
            text-align: justify;
            line-height: 1.6;
            color: #555;
            margin-bottom: 1rem;
          }
          .fecha-boda-root .fecha-boda-content .cta-link {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: #e63946;
            color: #fff;
            font-weight: 600;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s;
          }
          .fecha-boda-root .fecha-boda-content .cta-link:hover {
            background-color: #c5303f;
          }
          @media (max-width: 768px) {
            .fecha-boda-root .fecha-boda-content {
              padding: 1rem;
            }
            .fecha-boda-root .fecha-boda-content h1 {
              font-size: 1.75rem;
            }
            .fecha-boda-root .fecha-boda-content h2 {
              font-size: 1.25rem;
            }
          }
        `}</style>

        <h1>Cómo empezar a organizar tu boda: conseguir la fecha perfecta</h1>

        <h2>1. Análisis de temporada y disponibilidad</h2>
        <p>
          En Camino al Sí revisamos contigo las ventajas de cada estación (primavera, verano, otoño, invierno), evaluamos fechas festivas y celebraciones locales, y analizamos la disponibilidad real de los espacios más solicitados para asegurar la fecha ideal.
        </p>

        <h2>2. Coordinación con espacios y proveedores</h2>
        <p>
          Nos encargamos de contactar fincas, salones y proveedores clave para comprobar disponibilidad en tus fechas favoritas. Negociamos condiciones, depósitos y políticas de cancelación para que no tengas que preocuparte por nada.
        </p>

        <h2>3. Elaboración de calendario provisional</h2>
        <p>
          Creamos un calendario provisional con hitos principales: reserva de espacio, apertura de invitaciones, pruebas y trámites. Te entregamos un planning claro y personalizado para que veas todas las etapas y plazos desde el primer día.
        </p>

        <h2>4. Reservas y confirmaciones</h2>
        <p>
          Gestionamos la formalización de pagos y contratos, enviamos confirmaciones a los proveedores y actualizamos tu planning en tiempo real para garantizar que todo esté bloqueado en tu fecha deseada.
        </p>

        <div className="text-center mt-4">
          <a href="https://wa.me/34641363127?text=Hola%20quiero%20definir%20la%20fecha%20de%20mi%20boda" className="cta-link">
            Define tu fecha con nosotros
          </a>
        </div>
      </section>

      <RelatedContent />
      <Footer />
    </div>
  );
}

export default EmpezarOrganizarBodaFechaPage;
