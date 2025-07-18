import React from 'react';
import planificacionImg from '../../img/thomas-william-OAVqa8hQvWI-unsplash.jpg';
import espaciosImg from '../../img/arshad-pooloo-GdwWrLHdwpw-unsplash.jpg';
import serviciosImg from '../../img/Diseño sin título (1).png';

export default function StyledInfoSectionFechaLugares() {
  const sections = [
    {
      title: 'Cómo Elegir la Fecha Perfecta',
      text: 'Selecciona una temporada que encaje con vuestro estilo y previsiones climatológicas: primavera para flores y luz natural, verano para días largos o invierno para un ambiente íntimo. Comprueba la disponibilidad de invitados clave y evita fechas señaladas (puentes o festivos locales) para maximizar la asistencia.',
      image: planificacionImg
    },
    {
      title: 'Criterios para Seleccionar el Lugar',
      text: 'Define primero el tipo de espacio: finca rural, palacio histórico, hotel con jardín o playa privada. Valora capacidad, accesibilidad, servicios incluidos (catering, alojamiento, parking) y proximidad a tu lugar de ceremonia para minimizar desplazamientos.',
      image: espaciosImg
    },
    {
      title: 'Top Destinos de Boda en España',
      text: 'Descubre las zonas mejores valoradas: Andalucía (Sevilla, Ronda) para ambiente soleado y tradición; La Rioja para un marco vitivinícola; Mallorca y Costa Brava para una boda mediterránea; o el norte verde (Asturias, Galicia) para paisajes idílicos y clima suave.',
      image: serviciosImg
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
          max-width: 400px;
        }
        .info-image img {
          width: 100%;
          height: auto;
          max-height: 500px;
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

      <h2>Elegir Fecha y Lugar para tu Boda en España</h2>
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
