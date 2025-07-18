import React from 'react';
import planificacionImg from '../../../../public/invitacion2.jpeg';
import espaciosImg from '../../../../public/invitacion3.jpeg';
import serviciosImg from '../../../../public/invtacion1.jpeg';

export default function StyledInfoSectionInvitaciones() {
  // Secciones de invitaciones: Diseño, Lista e Invitación Digital
  const sections = [
    {
      title: 'Diseño y Estilo de la Invitación',
      text: `Las invitaciones de boda son la primera carta de presentación de vuestro gran día. En Camino al “Sí” creamos diseños a medida partiendo de un moodboard con paletas de color, tipografías y texturas que reflejen vuestra personalidad.  
- Clásico elegante con papel de alto gramaje y estampado en dorado.  
- Rústico-chic con papeles kraft y detalles en acuarela.  
- Minimalista moderno con abundante espacio en blanco.  
- Floral romántico con ilustraciones y acuarelas suaves.  
Validamos cada propuesta en mockup digital para que el resultado encaje al 100% con vuestra temática.`,
      image: planificacionImg
    },
    {
      title: 'Construcción de la Lista de Invitados',
      text: `Una lista de invitados bien organizada evita sorpresas de última hora.  
1. Comenzad con familiares directos y amigos íntimos.  
2. Segmentad en grupos A (imprescindibles), B (muy cercanos) y C (conocidos).  
3. Confirmad asistencia (RSVP) con antelación para ajustar catering, plazas y montaje de mesas.  
4. Reenviad recordatorios 2–3 semanas antes para asegurar el número final.  
Con este método, optimizamos costes y adaptamos cada detalle del banquete.`,
      image: espaciosImg
    },
    {
      title: 'Envío Digital y Seguimiento de RSVP',
      text: `El envío online combina elegancia y practicidad:  
- Invitaciones interactivas por email o landing page exclusiva.  
- Botón claro de “Confirmar Asistencia” con formulario integrado.  
- Recordatorios automáticos que garantizan un ratio de confirmación superior al 90%.  
- Reportes en tiempo real para monitorizar quién ha respondido y quién falta.  
Además, reducimos costes de impresión y aceleramos la comunicación con vuestros invitados.`,
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

      <h2>Invitaciones para Bodas</h2>
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

