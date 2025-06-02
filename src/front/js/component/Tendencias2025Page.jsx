import React from 'react';
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection2 from "../component/CategoriesSection2.jsx";
import RelatedContent from "../component/RelatedContent.jsx";
import Footer from "../component/Footer.jsx";

export function Tendencias2025Page() {
  return (
    <div className="tendencias2025-root">
      <LayoutHeader />
      <CategoriesSection2 />

      <section className="tendencias2025-content">
        <style>{`
          /* Scoped Styles for Tendencias2025Page Content */
          .tendencias2025-root .tendencias2025-content {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 1rem;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .tendencias2025-root .tendencias2025-content h1 {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            color: #333;
            margin-bottom: 1.5rem;
          }
          .tendencias2025-root .tendencias2025-content h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: #222;
          }
          .tendencias2025-root .tendencias2025-content p {
            text-align: justify;
            line-height: 1.6;
            color: #555;
            margin-bottom: 1rem;
          }
          .tendencias2025-root .tendencias2025-content .cta-link {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: #e63946;
            color: #fff;
            font-weight: 600;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s;
            margin-top: 1rem;
          }
          .tendencias2025-root .tendencias2025-content .cta-link:hover {
            background-color: #c5303f;
          }
          @media (max-width: 768px) {
            .tendencias2025-root .tendencias2025-content {
              padding: 1rem;
            }
            .tendencias2025-root .tendencias2025-content h1 {
              font-size: 1.75rem;
            }
            .tendencias2025-root .tendencias2025-content h2 {
              font-size: 1.25rem;
            }
          }
        `}</style>

        <h1>Tendencias Bodas 2025: Inspírate y Asombra a tus Invitados</h1>

        <h2>1. Bodas Temáticas con Sentido</h2>
        <p><strong>Boda ecológica</strong>: reducción de residuos, menús km 0 y decoración con materiales reciclados.</p>
        <p><strong>Boda boho chic</strong> y <strong>boda vintage</strong>: combinan elementos rústicos con detalles de diseño modernos.</p>

        <h2>2. Entretenimiento Experiencial</h2>
        <p><strong>Animación infantil bodas</strong> con talleres creativos para los más pequeños.</p>
        <p><strong>Bailes nupciales</strong> coreografiados por profesionales y retransmitidos en <strong>vídeo de boda cinematográfico</strong>.</p>

        <h2>3. Decoración y Ambientación</h2>
        <p><strong>Centros florales para boda</strong> comestibles o plantables.</p>
        <p><strong>Iluminación boda exterior</strong> con drones luminosos o guirnaldas artesanales.</p>

        <h2>4. Fotografía y Recuerdos</h2>
        <p><strong>Reportaje preboda</strong> en localizaciones emblemáticas de tu ciudad (p.ej. Bodas en la Costa Brava).</p>
        <p><strong>Álbum de boda personalizado</strong> con realidad aumentada para revivir videos y fotos al inclinar la página.</p>

        <h2>5. Experiencias Gastronómicas</h2>
        <p><strong>Candy bar boda</strong> temática (viaje, cine, época histórica).</p>
        <p><strong>Tarta de boda interactiva</strong>: cortes personalizados y estaciones de degustación.</p>

        <div className="text-center">
          <a href="#/blog/tendencias-bodas-2025" className="cta-link">Solicita tu asesoría gratuita</a>
        </div>
      </section>

      <RelatedContent />
      <Footer />
    </div>
  );
}

export default Tendencias2025Page;
