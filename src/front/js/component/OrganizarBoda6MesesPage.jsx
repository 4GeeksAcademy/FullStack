import React from 'react';
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection2 from "../component/CategoriesSection2.jsx";
import RelatedContent from "../component/RelatedContent.jsx";
import Footer from "../component/Footer.jsx";

export function OrganizarBoda6MesesPage() {
  return (
    <div className="organizar6meses-root">
      <LayoutHeader />
      <CategoriesSection2 />

      {/* Scoped styled content only for this section */}
      <section className="organizar6meses-content">
        <style>{`
          /* Scoped Styles for OrganizarBoda6MesesPage Content */
          .organizar6meses-root .organizar6meses-content {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 1rem;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .organizar6meses-root .organizar6meses-content h1 {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            color: #333;
            margin-bottom: 1.5rem;
          }
          .organizar6meses-root .organizar6meses-content h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: #222;
          }
          .organizar6meses-root .organizar6meses-content h3 {
            font-size: 1.25rem;
            font-weight: 500;
            margin-top: 0.75rem;
            margin-bottom: 0.25rem;
            color: #444;
          }
          .organizar6meses-root .organizar6meses-content p {
            text-align: justify;
            line-height: 1.6;
            color: #555;
            margin-bottom: 1rem;
          }
          .organizar6meses-root .organizar6meses-content .cta-link {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: #e63946;
            color: #fff;
            font-weight: 600;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s;
          }
          .organizar6meses-root .organizar6meses-content .cta-link:hover {
            background-color: #c5303f;
          }
          @media (max-width: 768px) {
            .organizar6meses-root .organizar6meses-content {
              padding: 1rem;
            }
            .organizar6meses-root .organizar6meses-content h1 {
              font-size: 1.75rem;
            }
            .organizar6meses-root .organizar6meses-content h2 {
              font-size: 1.25rem;
            }
          }
        `}</style>

        <h1>Cómo Organizar una Boda en 6 Meses: Todo lo que Debéis Tener en Cuenta</h1>

        <h2>Calendario de 6 Meses</h2>

        <h3>Mes 6: Definición de fecha y presupuesto</h3>
        <p>
          Te ayudamos a definir la fecha ideal de tu boda, valorando temporadas, disponibilidad de espacios y fechas clave para tus invitados. Establecemos juntos un presupuesto detallado, asignando partidas para lugar, catering, fotografía y decoración, y gestionamos los depósitos iniciales.
        </p>

        <h3>Mes 5: Selección y reserva del lugar</h3>
        <p>
          Nuestro equipo se encarga de buscar fincas y salones que encajen con vuestro estilo y aforo. Coordinamos visitas, presentamos opciones con detalles completos y negociamos y formalizamos el contrato en tu nombre.
        </p>

        <h3>Mes 4: Contratación de proveedores clave</h3>
        <p>
          Contratamos catering, fotógrafo, videógrafo, música y floristería según vuestras preferencias. Organizamos degustaciones, definimos el estilo fotográfico y acordamos condiciones de pago y servicios, garantizando calidad y profesionalidad.
        </p>

        <h3>Mes 3: Diseño y detalles personalizados</h3>
        <p>
          Creamos la estética de tu boda: paleta de colores, tipografías y diseño de invitaciones. Gestionamos la producción de papelería personalizada y coordinamos los adelantos de diseño con cada proveedor.
        </p>

        <h3>Mes 2: Trámites y confirmaciones</h3>
        <p>
          Completamos todos los trámites legales necesarios (documentación, testigos y permisos). Enviamos invitaciones digitales o impresas y gestionamos las confirmaciones de asistencia (RSVP), ajustando listados y dietas.
        </p>

        <h3>Mes 1: Organización final y coordinación del día B</h3>
        <p>
          Elaboramos un cronograma hora a hora para el gran día y coordinamos pruebas de menú. Realizamos reuniones finales con cada proveedor y confirmamos horarios y logística para asegurar que todo fluya sin imprevistos.
        </p>

        <div className="text-center mt-4">
          <a href="https://wa.me/34641363127?text=Hola%20buen%20dia%20quiero%20organizar%20mi%20boda%20en%206%20meses" className="cta-link">
            Solicita tu asesoría gratuita
          </a>
        </div>
      </section>

      <RelatedContent />
      <Footer />
    </div>
  );
}

export default OrganizarBoda6MesesPage;

