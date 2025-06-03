// src/components/TravelSections.jsx
import React from 'react';

export function TravelSections() {
  return (
    <div className="travel-sections-root">
      <style>{`
        /* Scoped Styles for TravelSections */
        .travel-sections-root .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem;
        }
        .travel-sections-root .bgcolor {
          background-color: #fff;
          padding: 2rem;
          margin: 2rem 0;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .travel-sections-root .section-title {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          position: relative;
          color: #222;
          text-align: center;
        }
        .travel-sections-root .section-title::after {
          content: '';
          display: block;
          width: 50px;
          height: 4px;
          background-color: #e63946;
          margin: 0.5rem auto;
        }
        .travel-sections-root .justify-text {
          text-align: justify;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .travel-sections-root .row {
          display: flex;
          flex-wrap: wrap;
          margin: -0.5rem;
        }
        .travel-sections-root .col-md-6 {
          width: 50%;
          padding: 0.5rem;
        }
        @media (max-width: 768px) {
          .travel-sections-root .col-md-6 {
            width: 100%;
          }
        }
      `}</style>

      <main className="container">
        {/* Servicios Section */}
        <div className="bgcolor">
          <h2 className="section-title">Nuestros Servicios de Wedding Planner</h2>
          <p className="justify-text">
            Ofrecemos un servicio integral de <strong>organizador de bodas</strong> y <strong>wedding planner en España</strong>, abarcando desde la <strong>planificación de bodas</strong> hasta la coordinación del “día B” como <strong>coordinador de bodas</strong>, para que disfrutéis sin estrés.
          </p>
          <p className="justify-text">
            Trabajamos con <strong>fincas para bodas "cerca de mí"</strong> y espacios exclusivos: gestionamos el <strong>alquiler mobiliario bodas</strong>, la <strong>decoración de bodas</strong> y la <strong>iluminación decorativa boda</strong> para adaptar cada finca a vuestro estilo.
          </p>
          <p className="justify-text">
            Nuestro <strong>catering bodas</strong> incluye menús personalizados, <strong>barra libre bodas</strong> y servicio de <strong>mesas y centros florales bodas</strong>.
          </p>
          <p className="justify-text">
            Coordinamos los <strong>servicios de DJ para bodas</strong>, <strong>música en vivo para boda</strong> y <strong>sonorización boda</strong>, garantizando ambiente desde el cóctel hasta el último baile.
          </p>
          <p className="justify-text">
            Gestionamos tanto la <strong>ceremonia civil bodas</strong> como la <strong>ceremonia religiosa bodas</strong>, incluyendo <strong>paquetes de boda todo incluido</strong> y permisos, decorando la iglesia o el espacio civil según convenga.
          </p>
          <p className="justify-text">
            Nos encargamos del <strong>coche nupcial alquiler</strong>, el diseño de <strong>invitaciones de boda personalizadas</strong> y el <strong>alojamiento para invitados boda</strong>, con tarifas competitivas y opciones de <strong>paquetes boda personalizados</strong>.
          </p>
        </div>

        {/* Recursos Section */}
        <div className="bgcolor">
          <h2 className="section-title">Recursos y Consejos para tu Boda</h2>
          <p className="justify-text">
            En nuestra guia de bodas 2025 tenemos la planificación y recomendaciones para una boda sostenible acorde a las tendencias. Te ayudamos a descubrir fincas y salones únicos en Madrid y Barcelona para tu ceremonia civil o religiosa. Si buscas organización de boda con presupuesto ajustado o de lujo, nos ajustamos a ti y ofrecemos ideas creativas para gestionar cada aspecto, desde la decoración hasta el catering. Además, ofrecemos inspiraciones sobre tarta nupcial y detalles personalizados para que cada elemento de vuestra boda sea inolvidable.
          </p>
        </div>
      </main>
    </div>
  );
}

export default TravelSections;


