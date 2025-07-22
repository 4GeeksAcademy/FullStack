import React from 'react';
import planificacionImg from '../../../../public/invitacion2.jpeg';
import espaciosImg from '../../../../public/invitacion3.jpeg';
import serviciosImg from '../../../../public/invtacion1.jpeg';

export default function StyledInfoSectionInvitaciones() {
  // Secciones de invitaciones: Diseño, Lista e Invitación Digital
  const sections = [
    {
      title: 'Diseño y Estilo de la Invitación',
      text: `Las invitaciones de boda son el primer avance de vuestra celebración, por eso en Camino al “Sí” diseñamos propuestas 100 % digitales que reflejan vuestra esencia y facilitan la gestión: desde invitaciones clásicas con tipografías elegantes hasta estilos rústicos, minimalistas o florales, todas adaptables a vuestra paleta de color y temática. Creamos un moodboard inicial para seleccionar colores, fuentes y texturas, presentamos mockups interactivos y ajustamos cada detalle hasta lograr la invitación perfecta que recibirán vuestros invitados directamente en su correo o WhatsApp, con confirmación de asistencia integrada para que el proceso sea ágil y moderno.
`,
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

