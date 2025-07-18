import React from 'react';
import planificacionImg from '../../../../public/Coche2.jpg';      // Coche clásico
import espaciosImg from '../../../../public/coche1.jpg';            // Coche vintage
import serviciosImg from '../../../../public/coches3.jpg'                        // Coche moderno
import inspiracionImg from '../../../../public/coche4.jpg'                         // Transporte invitados

export default function StyledInfoSectionCoches() {
  const sections = [
    {
      title: 'Tipos de Coches para Bodas',
      text: `Elige entre una flota variada:
✓ Clásicos (limusinas y sedanes vintage) para un aire elegante y atemporal.
✓ Vintage (escarabajos, furgonetas retro) ideales para bodas boho o rústicas.
✓ Modernos (coches eléctricos, deportivos) para un toque contemporáneo y eco-friendly.`,
      image: planificacionImg
    },
    {
      title: 'Selección y Personalización',
      text: `1. Escoge el modelo acorde a la temática de tu boda.
2. Define la ruta: ceremonia → sesión de fotos → banquete.
3. Decora con lazos, flores o rótulos "Recién Casados" para crear un momento inolvidable.`,
      image: espaciosImg
    },
    {
      title: 'Transporte para Invitados',
      text: `Organiza mini‑buses o vans para que tus invitados lleguen juntos y a tiempo:
✓ Puntos de recogida y horarios claros.
✓ Asientos cómodos y climatizados.
✓ Coordinación con el planning del día para máxima puntualidad.`,
      image: serviciosImg
    },
    {
      title: 'Detalles que Marcan la Diferencia',
      text: `• Alfombra roja o pétalos en la salida del coche.
• Ambientación musical a bordo.
• Botellas de agua o pequeños obsequios de bienvenida para los pasajeros.`,
      image: inspiracionImg
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
        .info-content p { text-align:justify; line-height:1.6; color:#555; white-space:pre-wrap; }
        @media (max-width:768px) { .info-row { flex-direction:column!important; } }
      `}</style>
      <h2>Coches y Transporte para Bodas</h2>
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
