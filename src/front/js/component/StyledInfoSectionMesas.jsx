import React from 'react';
import planificacionImg from '../../img/thomas-william-OAVqa8hQvWI-unsplash.jpg';

export default function StyledInfoSectionMesas() {
  const sections = [
    {
      title: 'Planificación de Mesas',
      text: 'Antes de la boda, revisa el aforo de tu finca o salón y define cuántas mesas necesitarás. Agrupa las mesas por zonas (familia, amigos, invitados VIP…) para que el servicio de catering fluya con eficacia y tus invitados se sientan cómodos en su área asignada.'
    },
    {
      title: 'Asignación de Invitados',
      text: 'Crea un listado de tus invitados y clasifícalos según cercanía y afinidades: familia, parejas, amigos de infancia o compañeros de trabajo. Asigna a cada mesa personas con gustos o historias en común para fomentar la conversación y la conexión durante el banquete.'
    },
    {
      title: 'Consejos para tu Seating Plan',
      text: 'Utiliza un plano visual para colocar los nombres junto a los números de mesa y hazlo accesible: en el hall de entrada con un cartel bonito o en tarjetas individuales sobre cada asiento. Así evitarás confusiones y crearás una experiencia de bienvenida personalizada.'
    }
  ];

  return (
    <section className="info-section">
      <style>{`
        .info-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
          text-align: center;
        }
        .info-section h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #333;
        }
        .main-image {
          width: 100%;
          max-width: 400px;
          height: auto;
          border-radius: 8px;
          object-fit: cover;
          margin: 0 auto 2rem;
          display: block;
          border: 2px solid #D64550;
        }
        .section-item {
          margin-bottom: 1.5rem;
        }
        .section-item h3 {
          font-size: 1.5rem;
          color: #222;
          margin-bottom: 0.5rem;
        }
        .section-item p {
          text-align: justify;
          line-height: 1.6;
          color: #555;
          margin: 0;
        }
      `}</style>

      <h2>Cómo Organizar a tus Invitados por Mesas</h2>
      <img src={planificacionImg} alt="Organización de mesas" className="main-image" />

      {sections.map((section, idx) => (
        <div className="section-item" key={idx}>
          <h3>{section.title}</h3>
          <p>{section.text}</p>
        </div>
      ))}
    </section>
  );
}
