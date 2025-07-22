import React from 'react';
import planificacionImg from '../../../../public/Coche2.jpg';      // Coche clásico
import espaciosImg from '../../../../public/coche1.jpg';           // Coche vintage
import serviciosImg from '../../../../public/coches3.jpg';         // Coche moderno

export default function StyledInfoSectionCoches() {
  const sections = [
    {
      title: 'Introducción al Coche de Novios',
      text: `El coche de novios es mucho más que un simple medio de transporte: marca el inicio de vuestra historia nupcial y refuerza la estética de la boda. En Camino al “Sí” os ayudamos a elegir el vehículo perfecto, teniendo en cuenta el estilo general del enlace —ya sea una ceremonia formal, campestre o urbana— y garantizando que encaje con vuestra personalidad y temática.`,
      image: planificacionImg
    },
    {
      title: 'Variedad de Opciones',
      text: `Existen infinidad de opciones: desde coches de época para bodas clásicas, pasando por deportivos para parejas amantes de la velocidad, hasta modelos vintage o limusinas de lujo para un toque glamuroso. Nosotros preseleccionamos varias alternativas —coches retro, todoterreno para fincas rústicas o descapotables para sesiones fotográficas— y os presentamos un dossier con fotos, detalles de decoración y valoraciones para que solo tengáis que escoger la opción que más os enamore.`,
      image: espaciosImg
    },
    {
      title: 'Coordinación Integral',
      text: `Para que todo fluya con total tranquilidad, coordinamos el presupuesto, la reserva (recomendable entre 4 y 6 meses antes del “sí, quiero”), el tipo de contrato (con o sin chófer) y la decoración del vehículo (lazos, guirnaldas o placas personalizadas). El día de la boda supervisamos la entrega, la logística y el montaje, asegurando que vuestra llegada sea tan memorable como deseáis.`,
      image: serviciosImg
    }
  ];

  return (
    <section className="info-section">
      <style>{`
        .info-section { max-width:1200px; margin:0 auto; padding:2rem 1rem; }
        .info-section h2 { text-align:center; font-size:2rem; color:#333; margin-bottom:2rem; }
        .info-row { display:flex; align-items:center; gap:1rem; margin-bottom:2rem; }
        .info-row:nth-child(even) { flex-direction:row-reverse; }
        .info-image { flex:1; max-width:400px; }
        .info-image img { width:100%; height:auto; max-height:500px; object-fit:cover; border-radius:8px; }
        .info-content { flex:1; }
        .info-content h3 { font-size:1.5rem; color:#222; margin-top:0; }
        .info-content p { text-align:justify; line-height:1.6; color:#555; }
        @media (max-width:768px) { .info-row { flex-direction:column!important; } }
      `}</style>

      <h2>Coche de novios: todo lo que queréis saber</h2>

      {sections.map((section, idx) => (
        <div className="info-row" key={idx}>
          <div className="info-image">
            <img src={section.image} alt={section.title} />
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
