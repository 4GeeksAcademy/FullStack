import React from 'react';
import planificacionImg from '../../img/Planesdebodas.png';
import espaciosImg from '../../img/SeleccioDeEspacios.png';
import serviciosImg from '../../img/ServiciosProfecionales.png';
import inspiracionImg from '../../img/planificacion.png';

export default function StyledInfoSection() {
  // Sections with title, text, and image
  const sections = [
    {
      title: 'Planificación Detallada',
      text: 'En nuestra plataforma encontrarás todo lo necesario para planificar la boda perfecta en España, cubriendo cada etapa del proceso con claridad y detalle. Comenzamos con la planificación de bodas y la coordinación del día B, ofreciéndote un completo checklist boda que incluye desde el presupuesto boda para 100 invitados hasta la gestión de permisos para ceremonia civil o ceremonia religiosa.',
      image: planificacionImg
    },
    {
      title: 'Selección de Espacios',
      text: 'Disponemos de una cuidada selección de fincas para bodas y lugares para bodas en Madrid, Barcelona y Valencia, así como opciones de boda en la playa, boda rural o bodas temáticas. Cada espacio puede personalizarse con decoración de bodas rústicas, iluminación decorativa boda, flores para boda y centros florales bodas. Para el banquete, te ofrecemos menús a medida con catering bodas y barra libre bodas, así como la opción de menú de boda personalizado.',
      image: espaciosImg
    },
    {
      title: 'Servicios Profesionales',
      text: 'En cuanto a servicios profesionales, colaboramos con expertos en fotografía de boda, vídeo boda profesional, DJ para bodas, música en vivo y sonorización boda para crear el ambiente ideal. También gestionamos el alquiler de coche nupcial, el diseño de invitaciones de boda personalizadas y el alojamiento para invitados boda. Si prefieres soluciones más económicas, contamos con paquetes de organización bodas low cost y consejos para una planificación de boda económica.',
      image: serviciosImg
    },
    {
      title: 'Inspiración y Blog',
      text: 'Además, ofrecemos inspiración en nuestro blog: ideas de vestido de novia, trajes de novio, alianzas de boda personalizadas, tarta de boda, candy bar, photobooth boda y recuerdos de boda. Y para las parejas tecnológicas, disponemos de un planner online que te ayudará a coordinar todos los detalles desde tu móvil o tablet. Con nosotros, tendrás una wedding planner de confianza que te acompañará paso a paso hacia el “sí, quiero”.',
      image: inspiracionImg
    }
  ];

  return (
    <section className="info-section">
      <style>{`  
        .info-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .info-section h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #333;
        }
        .info-row {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }
        .info-row:nth-child(even) {
          flex-direction: row-reverse;
        }
        .info-image {
          flex: 1;
          max-width: 400px;  /* Limita ancho máximo */
        }
        .info-image img {
          width: 100%;
          height: auto;
          max-height: 500px; /* Limita alto máximo */
          object-fit: cover;
          border-radius: 8px;
          display: block;
          margin: 0 auto;
        }
        .info-content {
          flex: 1;
        }
        .info-content h3 {
          margin-top: 0;
          font-size: 1.5rem;
          color: #222;
          text-align: left;
        }
        .info-content p {
          text-align: justify;
          line-height: 1.6;
          color: #555;
          margin: 0.5rem 0 0 0;
        }
        @media (max-width: 768px) {
          .info-row {
            flex-direction: column !important;
          }
        }
      `}</style>

      <h2>¿Qué tipo de boda es perfecto para ti?</h2>
      {sections.map((section, idx) => (
        <div className="info-row" key={idx}>
          <div className="info-image">
            <img src={section.image} alt={`Imagen de ${section.title}`} />
          </div>
          <div className="info-content">
            <h3>{section.title}</h3>
            <p>{section.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
