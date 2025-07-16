import React from 'react';
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection2 from "../component/CategoriesSection2.jsx";
import RelatedContent from "../component/RelatedContent.jsx";
import Footer from "../component/Footer.jsx";

export function AllArticlesPage() {
  return (
    <div className="articulos-bodas-root">
      <LayoutHeader />
      <CategoriesSection2 />

      <section className="articulos-bodas-content">
        <style>{`
          .articulos-bodas-root .articulos-bodas-content {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 1rem;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .articulos-bodas-root .articulos-bodas-content h1 {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            color: #333;
            margin-bottom: 2rem;
          }
          .articulos-bodas-root .articulos-bodas-content h2 {
            font-size: 1.75rem;
            font-weight: 600;
            margin-top: 2rem;
            color: #222;
          }
          .articulos-bodas-root .articulos-bodas-content p {
            text-align: justify;
            line-height: 1.6;
            color: #555;
            margin-bottom: 1.5rem;
          }
          .articulos-bodas-root .articulos-bodas-content .cta-link {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: #e63946;
            color: #fff;
            font-weight: 600;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s;
            margin-top: 2rem;
          }
          .articulos-bodas-root .articulos-bodas-content .cta-link:hover {
            background-color: #c5303f;
          }
          @media (max-width: 768px) {
            .articulos-bodas-root .articulos-bodas-content {
              padding: 1rem;
            }
            .articulos-bodas-root .articulos-bodas-content h1 {
              font-size: 1.75rem;
            }
            .articulos-bodas-root .articulos-bodas-content h2 {
              font-size: 1.5rem;
            }
          }
        `}</style>

        <h1>Preguntas frecuentes: Cómo organizar una boda en 6 meses</h1>

        <h2>1. ¿Cómo definís la fecha y el presupuesto?</h2>
        <p>
          En Camino al Sí comenzamos analizando vuestras preferencias y fechas disponibles, considerando factores como temporada, clima y eventos locales. Basándonos en ese estudio, os presentamos paquetes cerrados que se adaptan a vuestro presupuesto global, sin detallar costes individuales. De esta forma, disfrutáis de máxima comodidad y claridad.
        </p>

        <h2>2. ¿Cómo seleccionáis y reserváis el lugar ideal?</h2>
        <p>
          Nuestro equipo investiga fincas, salones y espacios temáticos según vuestro estilo y número de invitados. Coordinamos visitas virtuales o presenciales, recopilamos información de aforo y servicios incluidos, y negociamos condiciones favorables para vuestra fecha, asegurando la reserva y confirmación sin complicaciones.
        </p>

        <h2>3. ¿Cómo contratáis a los proveedores clave?</h2>
        <p>
          Identificamos y seleccionamos catering, fotógrafos, videógrafos, floristas y música de nuestra red de profesionales de confianza. Organizamos sesiones de degustación y reuniones de briefing, establecemos cronogramas de entregas y pagos, y supervisamos cada fase para garantizar que todos los servicios cumplan los estándares de calidad acordados.
        </p>

        <h2>4. ¿Cómo diseñáis los detalles personalizados?</h2>
        <p>
          Creamos moodboards que reflejan vuestra personalidad y definimos paletas de color, tipografías y elementos gráficos. Diseñamos invitaciones, señalética y menús, y coordinamos revisiones hasta obtener un resultado final coherente con vuestra visión estética, asegurando que cada detalle trasmita la misma identidad.
        </p>

        <h2>5. ¿Cómo gestionáis los trámites legales?</h2>
        <p>
          Nos ocupamos de todos los trámites ante el registro civil o la parroquia, incluyendo obtención de certificados de nacimiento, empadronamientos y estado civil. Guiamos la elección de modalidad (civil o religiosa), preparamos la documentación de los testigos y creamos un calendario de entregas y recordatorios para que no haya retrasos.
        </p>

        <h2>6. ¿Cómo organizáis la lista de invitados?</h2>
        <p>
          Proporcionamos una plantilla interactiva para categorizar invitados (familia, amigos, plus-ones) y gestionar confirmaciones (RSVP). Ajustamos la lista según aforo y preferencias, integrando cambios de última hora y asegurando que cada invitado tenga asignado su lugar de manera óptima.
        </p>

        <h2>7. ¿Cómo elaboráis el seating plan?</h2>
        <p>
          Utilizamos herramientas digitales para distribuir invitados en mesas imperiales, redondas o sueltas según la dinámica del grupo. Creamos planos visuales que se actualizan con las confirmaciones, permitiendo ajustes inmediatos en caso de cambios de última hora y garantizando comodidad para todos.
        </p>

        <h2>8. ¿Cómo definís el estilo de la boda?</h2>
        <p>
          Analizamos vuestras referencias y tendencias actuales para proponer estilos que van desde el boho chic hasta el minimalismo contemporáneo. Creamos moodboards y seleccionamos materiales, texturas y accesorios, y coordinamos con los proveedores para mantener la coherencia estética en flores, mobiliario, iluminación y ambientación.
        </p>

        <h2>9. ¿Cómo escogéis el menú del banquete?</h2>
        <p>
          Organizamos degustaciones con caterings seleccionados y proponemos menús que combinan propuestas locales, opciones vegetarianas, veganas y sin alérgenos. Diseñamos presentaciones y maridajes y coordinamos el servicio para asegurar un flujo adecuado entre cóctel y banquete, brindando una experiencia culinaria memorable.
        </p>

        <h2>10. ¿Cómo sentáis a los invitados?</h2>
        <p>
          Planificamos el seating con criterios de relación y confort, utilizando software especializado para asignar asientos estratégicamente. Proporcionamos señalética y tarjetas de lugar claras, y desarrollamos un plan B para cambios de última hora, asegurando una experiencia fluida y cómoda.
        </p>

        <h2>11. ¿Cómo elegís a padrinos, testigos y damas de honor?</h2>
        <p>
          Os asesoramos sobre el número ideal y las funciones de cada acompañante, diseñamos kits de invitación personalizados y facilitamos recomendaciones de regalos y atuendos. Gestionamos la información logística para que cada padrino y dama de honor conozca sus responsabilidades y horarios.
        </p>

        <h2>12. ¿Cómo organizáis una boda civil?</h2>
        <p>
          Diseñamos ceremonias civiles personalizadas: seleccionamos al oficiante, coordinamos lecturas, música y rituales simbólicos. Gestionamos permisos en espacios públicos si es necesario, decoramos el espacio y preparamos guiones detallados para los participantes, garantizando una ceremonia emotiva y organizada.
        </p>

        <h2>13. ¿Cómo planificáis una boda en 3 meses?</h2>
        <p>
          Adaptamos nuestro método exprés a un calendario comprimido, priorizando reservas clave y proveedores esenciales desde el primer día. Utilizamos plantillas de gestión rápida y coordinamos reuniones semanales intensivas para revisar avances, asegurando calidad y detalle incluso con plazos reducidos.
        </p>

        <h2>Nota importante</h2>
        <p>
          En Camino al Sí ofrecemos asesoramiento experto para la elección de alianzas, trajes de novia y novio, así como recomendaciones de proveedores, pero no nos encargamos de la producción ni fabricación de estos elementos. Nuestro foco es guiarte para que elijas lo mejor.
        </p>

        <h2>14. ¿Cómo evitáis errores comunes en la planificación?</h2>
        <p>
          Identificamos los principales fallos—como falta de comunicación, gestión de tiempos o presupuesto—y aplicamos reuniones semanales, revisiones de hitos y checklists colaborativos. Además, establecemos protocolos de contingencia para imprevistos, manteniendo la planificación bajo control en todo momento.
        </p>

        <div className="text-center">
          <a href="https://wa.me/34641363127?text=Hola%20quiero%20resolver%20mis%20dudas%20sobre%20organizar%20mi%20boda%20en%206%20meses" className="cta-link">
            Resuelve tus dudas con nosotros
          </a>
        </div>
      </section>

      <RelatedContent />
      <Footer />
    </div>
  );
}

export default AllArticlesPage;
