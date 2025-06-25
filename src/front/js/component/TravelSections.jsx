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
            Ofrecemos un servicio integral de <strong>wedding planner en España</strong> y <strong>organizador de bodas</strong>, abarcando desde la <strong>planificación de bodas</strong> hasta la <strong>coordinación del “DIA B”</strong> con tu propio <strong>coordinador de bodas</strong>, para que disfruts sin estrés.
          </p>
          <p className="justify-text">
            Trabajamos con <strong>locaciones especiales para bodas "cerca de tí"</strong> (fincas, hoteles, restaurantes, etc.) y espacios exclusivos: gestionamos el <strong>alquiler del mobiliario para bodas</strong>, la <strong>decoración de bodas</strong> y la <strong>iluminación decorativa de boda</strong> para adaptar cada opción a tu estilo personal.
          </p>
          <p className="justify-text">
            Nuestro <strong>catering para bodas</strong> incluye menús personalizados, <strong>barra libre</strong> y <strong>servicio de mesas y centros florales para bodas</strong>.
          </p>
          <p className="justify-text">
            Coordinamos los <strong>servicios de DJ para bodas</strong>, <strong>música en vivo para tu boda</strong> y la <strong>sonorización de tu boda</strong>, garantizándote el ambiente ideal, desde el cóctel hasta el último baile.
          </p>
          <p className="justify-text">
            Gestionamos tanto la <strong>ceremonia civil como la ceremonia religiosa de tu boda</strong>, incluyendo <strong>paquetes de boda todo incluido</strong>, la decoración de la iglesia y del espacio civil, según convenga, así como la gestión de los permisos necesarios.
          </p>
          <p className="justify-text">
            Nos encargamos del <strong>alquiler del coche nupcial</strong>, el diseño de <strong>invitaciones de boda personalizadas</strong> y el <strong>alojamiento para los novios e invitados especiales de tu boda</strong>, con tarifas competitivas y opciones de <strong>paquetes de boda personalizados</strong>.
          </p>
        </div>

        {/* Recursos Section */}
        <div className="bgcolor">
          <h2 className="section-title">Recursos y Consejos para tu Boda</h2>
          <p className="justify-text">
          En nuestra Guía de Bodas tenemos la planificación y recomendaciones para una boda acorde a las tendencias eco-friendly que prefieras. Te ayudamos a descubrir fincas y salones únicos en Madrid, Barcelona y Valencia, para tu ceremonia civil o religiosa. Si buscas organización de boda con presupuesto ajustado o de lujo, nos adaptamos a ti, ofreciéndote ideas creativas para gestionar cada aspecto, desde la decoración hasta el catering. Además, ofrecemos inspiraciones sobre tarta nupcial y detalles personalizados para que cada elemento de tu boda sea inolvidable.
          </p>
        </div>
      </main>
    </div>
  );
}

export default TravelSections;


