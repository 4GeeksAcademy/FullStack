import React from 'react';
import planificacionImg from '../../img/thomas-william-OAVqa8hQvWI-unsplash.jpg';
import espaciosImg from '../../img/arshad-pooloo-GdwWrLHdwpw-unsplash.jpg';
import serviciosImg from '../../img/Diseño sin título (1).png';
import inspiracionImg from '../../img/Diseño sin título.png';

export default function StyledInfoSection() {
  // Sections with title, text, and image
  const sections = [
    {
      title: 'Planificación Detallada',
      text: 'En nuestra plataforma encontrarás todo lo necesario para planificar la boda perfecta en España, cubriendo cada etapa del proceso con claridad y detalle. Comenzamos con la planificación de bodas y la coordinación del día B, ofreciéndote un completo checklist boda que incluye desde el presupuesto boda hasta la gestión de permisos para ceremonia civil o ceremonia religiosa.',
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
      title: 'Te acompañamos en cada etapa de tu boda, ofreciendo:',
      text: 'Te acompañamos en cada etapa de tu boda, ofreciéndote planificación integral para coordinar proveedores, cronograma y logística para que tú solo disfrutes; selección de la finca perfecta y diseño de ambientación con flores, iluminación y detalles a medida; catering y tartas personalizadas con menús adaptados a tus gustos (incluyendo opciones temáticas, veganas o sin gluten) y tartas únicas que sorprendan a tus invitados; montaje de candy bar y estaciones temáticas—como barras de dulces, cócteles y coffee bar—para que tus invitados vivan una experiencia inolvidable; gestión de entretenimiento y audiovisual con DJs, música en vivo, fotógrafos, videógrafos y pantallas para capturar los mejores momentos; atención a los detalles y recuerdos, encargándonos de las invitaciones, el seating plan, el photocall y los regalos personalizados; y, por último, coordinación del “Día B” supervisando horarios, montaje y desmontaje, para garantizar que todo fluya sin contratiempos. Con nuestro servicio tendrás una wedding planner de confianza que hará realidad tu visión y cuidará cada detalle para que tu gran día sea inolvidable.',
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
