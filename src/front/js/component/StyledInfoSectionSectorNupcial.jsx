import React from 'react';
import planificacionImg from '../../img/thomas-william-OAVqa8hQvWI-unsplash.jpg';
import espaciosImg from '../../img/arshad-pooloo-GdwWrLHdwpw-unsplash.jpg';
import serviciosImg from '../../img/Diseño sin título (1).png';

export default function StyledInfoSectionSectorNupcial() {
  const sections = [
    {
      title: 'Informe del Sector Nupcial 2025: Claves en España',
      text: `El Informe del Sector Nupcial 2025 revela datos de más de 6 700 parejas que se casaron en 2024. Con él descubrirás la edad media de los contrayentes (36 años), la inversión media por boda (€24 618) y la generación dominante (millennials 68 %). Además, una de cada cuatro parejas ya tiene hijos antes de decir “sí, quiero”.`,
      image: planificacionImg
    },
    {
      title: 'Planificación y Proveedores Más Demandados',
      text: `La organización de la boda dura en promedio 12 meses y contrata un promedio de 8–9 proveedores: fotografía, vestidos, música, floristería y catering encabezan la lista. El 45 % busca en webs especializadas y el 37 % confía en el boca a boda para elegir a sus profesionales. La tendencia 2025: más inversión en animación y experiencias personalizadas.`,
      image: espaciosImg
    },
    {
      title: 'Tendencias, Tradiciones y Ceremonias Favoritas',
      text: `Los métodos clásicos para conocerse siguen vigentes (amigos en común 24 %), mientras que las apps aportan un 14 %. El 51 % opta por ceremonia civil y el 38 % por religiosa. Tradiciones como los discursos del novio (34 %) y la novia (32 %) perduran, y crecen las bodas de fin de semana largo o “endless weddings” (38 % dos días, 28 % tres días).`,
      image: serviciosImg
    }
  ];

  return (
    <section className="info-section-sector">
      <style>{`
        .info-section-sector {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .info-section-sector h2 {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 1.5rem;
          color: #b22222;
        }
        .sector-row {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }
        .sector-row:nth-child(even) {
          flex-direction: row-reverse;
        }
        .sector-image {
          flex: 1;
          max-width: 350px;
        }
        .sector-image img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 8px;
        }
        .sector-content {
          flex: 2;
        }
        .sector-content h3 {
          font-size: 1.75rem;
          color: #333;
          margin-bottom: 0.5rem;
        }
        .sector-content p {
          text-align: justify;
          line-height: 1.6;
          color: #555;
        }
        @media (max-width: 768px) {
          .sector-row {
            flex-direction: column !important;
          }
          .sector-image {
            max-width: 100%;
          }
        }
      `}</style>

      <h2>Informe del Sector Nupcial 2025 en España</h2>
      {sections.map((section, idx) => (
        <div className="sector-row" key={idx}>
          <div className="sector-image">
            <img src={section.image} alt={section.title} />
          </div>
          <div className="sector-content">
            <h3>{section.title}</h3>
            <p>{section.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
