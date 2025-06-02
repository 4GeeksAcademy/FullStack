import React from 'react';
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection2 from "../component/CategoriesSection2.jsx";
import RelatedContent from "../component/RelatedContent.jsx";
import Footer from "../component/Footer.jsx";

export function Bodas2025Page() {
  return (
    <div className="bodas2025-root">
      <LayoutHeader />
      <CategoriesSection2 />

      {/* Scoped styled content only for this section */}
      <section className="bodas2025-content">
        <style>{`
          /* Scoped Styles for Bodas2025Page Content */
          .bodas2025-root .bodas2025-content {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 1rem;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .bodas2025-root .bodas2025-content h1 {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            color: #333;
            margin-bottom: 1.5rem;
          }
          .bodas2025-root .bodas2025-content h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: #222;
          }
          .bodas2025-root .bodas2025-content p {
            text-align: justify;
            line-height: 1.6;
            color: #555;
            margin-bottom: 1rem;
          }
          .bodas2025-root .bodas2025-content .cta-link {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: #e63946;
            color: #fff;
            font-weight: 600;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s;
          }
          .bodas2025-root .bodas2025-content .cta-link:hover {
            background-color: #c5303f;
          }
          @media (max-width: 768px) {
            .bodas2025-root .bodas2025-content {
              padding: 1rem;
            }
            .bodas2025-root .bodas2025-content h1 {
              font-size: 1.75rem;
            }
            .bodas2025-root .bodas2025-content h2 {
              font-size: 1.25rem;
            }
          }
        `}</style>

        <h1>Guia 2025: Paso a Paso con Nosotros</h1>

        {/* 1. Elección de la Fecha */}
        <h2>1. Elección de la Fecha</h2>
        <p>
          Te ayudamos a escoger la <strong>fecha ideal para tu boda</strong>, teniendo en cuenta temporada, disponibilidad de 
          <strong> fincas</strong> o <strong>bodas en la Costa</strong>. Creamos tu 
          <strong> checklist boda completa</strong> con hitos clave.
        </p>

        {/* 2. Definición del Tipo de Boda */}
        <h2>2. Definición del Tipo de Boda</h2>
        <p>
          ¿Ceremonia civil al aire libre o boda religiosa en iglesia? Te mostramos ejemplos de 
          <strong> boda simbólica</strong> y <strong>renovación de votos</strong>, adaptados a tu estilo.
        </p>

        {/* 3. Selección del Lugar */}
        <h2>3. Selección del Lugar</h2>
        <p>
          Visitamos <strong>masías para bodas</strong>, <strong>fincas cerca de mí</strong> y alojamientos únicos. 
          Gestionamos contratos para tu <strong>boda destino España</strong>.
        </p>

        {/* 4. Diseño del Banquete */}
        <h2>4. Diseño del Banquete</h2>
        <p>
          Creamos un <strong>menú de boda personalizado</strong>, incluyendo opciones locales y 
          <strong> menú vegano para boda</strong>. Coordinamos tu <strong>tarta de boda</strong> y 
          <strong> barra libre bodas</strong>.
        </p>

        {/* 5. Ceremonias y Rituales */}
        <h2>5. Ceremonias y Rituales</h2>
        <p>
          Redactamos el guión de tu <strong>ceremonia civil</strong> o <strong>ceremonia religiosa</strong> y 
          añadimos rituales personalizados (lecturas, lanzamiento de pétalos).
        </p>

        {/* 6. Música y Animación */}
        <h2>6. Música y Animación</h2>
        <p>
          Conectamos con los mejores <strong>DJ para bodas</strong> y bandas de 
          <strong> música en vivo boda</strong>. Incluimos <strong>animación infantil bodas</strong> si la deseas.
        </p>

        {/* 7. Coordinación del “Día B” */}
        <h2>7. Coordinación del “Día B”</h2>
        <p>
          Nuestro <strong>coordinador de bodas</strong> gestiona proveedores, timing y resuelve imprevistos 
          para que disfrutes sin estrés.
        </p>

        {/* 8. Transporte y Hospedaje */}
        <h2>8. Transporte y Hospedaje</h2>
        <p>
          Gestionamos <strong>alquiler coche nupcial</strong>, <strong>transporte invitados boda</strong> y 
          reservas en hoteles para tu comodidad.
        </p>

        {/* Final CTA */}
        <div className="text-center mt-6">
          <a href="#/contacto" className="cta-link">Solicita tu asesoría gratuita</a>
        </div>
      </section>

      <RelatedContent />
      <Footer />
    </div>
  );
}

export default Bodas2025Page;


