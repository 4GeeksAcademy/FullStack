import React from 'react';
import planificacionImg from '../../img/thomas-william-OAVqa8hQvWI-unsplash.jpg';

export default function StyledInfoSectionMesas() {
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
        .info-section p {
          text-align: justify;
          line-height: 1.6;
          color: #555;
          margin-bottom: 1.25rem;
        }
        .info-section a {
          color: #D64550;
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>

      <h2>Cómo Organizar a tus Invitados por Mesas: Deja que Camino al “Sí” lo Haga por Ti</h2>
      <img
        src={planificacionImg}
        alt="Organización de mesas"
        className="main-image"
      />

      <p>
        Organizar a los invitados en las mesas del banquete puede convertirse en un quebradero de cabeza: cerrar la lista de asistentes, agruparlos por afinidades y decidir el tipo de mesas más adecuado al espacio son solo algunos de los pasos fundamentales antes de la gran celebración. En <strong>Camino al “Sí”</strong>, nos ocupamos de todo el proceso: desde verificar y ultimar el listado de invitados, hasta confirmar las últimas asistencias y gestionar cualquier cambio de última hora.
      </p>

      <p>
        Nuestro equipo clasifica a vuestros familiares y amigos en grupos (familia, amigos de la pareja, compañeros de trabajo…) para garantizar que cada mesa reúna personas con intereses comunes, facilitando la conversación y creando un ambiente distendido. Además, analizamos el espacio disponible y proponemos la combinación ideal de mesas redondas, rectangulares o imperiales según la geometría y la capacidad del lugar, optimizando recorridos y zonas como el photocall o la pista de baile.
      </p>

      <p>
        Finalmente, diseñamos un seating plan claro y elegante: preparamos carteles de bienvenida, marcasitios personalizados y planos de mesa digitales o impresos para que vuestros invitados encuentren su sitio sin confusión. El día de la boda, supervisamos la colocación y nos aseguramos de que cada detalle esté al milímetro para que vosotros solo tengáis que disfrutar de la fiesta. Con <strong>Camino al “Sí”</strong>, la organización de las mesas se convierte en un servicio llave en mano que os brinda tranquilidad y perfección.
      </p>
    </section>
  );
}
