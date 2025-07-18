import React from "react";
import playaImg from '/workspaces/FullStack/src/front/img/arshad-pooloo-GdwWrLHdwpw-unsplash.jpg';
import hotelImg from '../../../../public/hotel.png';
import fincaImg from '../../../../public/fincas.png';
import salonImg from '../../../../public/thomas-william-OAVqa8hQvWI-unsplash.jpg';
import jardinImg from '../../../../public/menus3.jpg';
import castilloImg from '../../../../public/bodacastillo.png';

export default function StyledInfoSectionEleccionDelLugar() {
  const venues = [
    {
      title: "Boda en la Playa",
      text: "Déjate llevar por la brisa marina y la puesta de sol: ideales para ceremonias al aire libre, decoración con tonos azules y arena natural como pasarela. Perfecto si buscáis un ambiente relajado y romántico.",
      image: playaImg
    },
    {
      title: "Hotel Boutique",
      text: "Espacios elegantes con servicio 5 estrellas, alojamiento integrado y catering personalizado. Ideal para parejas que quieren que sus invitados disfruten de máximo confort y comodidades a pie de ceremonia.",
      image: hotelImg
    },
    {
      title: "Finca Rústica",
      text: "Encanto campestre con vigas de madera, jardines y pérgolas. Ofrece versatilidad para carpas y zonas chill‑out, y se integra con menús de km 0. Perfecto para bodas íntimas y con un toque natural.",
      image: fincaImg
    },
    {
      title: "Salón Urbano",
      text: "Diseño contemporáneo, iluminación LED y pistas de baile integradas. Ideal si buscáis un escenario moderno en la ciudad, con fácil acceso y servicios tecnológicos de última generación.",
      image: salonImg
    },
    {
      title: "Jardín Botánico",
      text: "Un oasis de vegetación y colorido, con especies autóctonas y exóticas. Perfecto para ceremonias al aire libre rodeadas de flores, fotos inolvidables y un ambiente fresco y natural.",
      image: jardinImg
    },
    {
      title: "Castillo Histórico",
      text: "Palacios y fortalezas con siglos de historia, salones con candelabros y patios empedrados. Ideal para bodas con un toque de grandeza y glamour, rodeados de muros centenarios.",
      image: castilloImg
    },
  ];

  return (
    <section className="venue-selection py-5">
      <div className="container">
        <h2 className="fs-2 fw-bold mb-4 text-center">
          Opciones para el Lugar de tu Boda
        </h2>
        <p className="lead text-center mb-5">
          Elige el escenario perfecto según tu estilo, clima y número de invitados.
        </p>

        <div className="row gx-4 gy-5">
          {venues.map((v, idx) => (
            <article key={idx} className="col-md-4">
              <img
                src={v.image}
                alt={v.title}
                className="img-fluid rounded mb-3"
              />
              <h3 className="fs-5 fw-semibold">{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .venue-selection { background-color: #fafafa; }
        .venue-selection h2 { color: #D64550; }
        .venue-selection p.lead { color: #555; }
        .venue-selection img {
          border: 2px solid #D64550;
          height: 200px;
          width: 100%;
          object-fit: cover;
        }
        .venue-selection h3 {
          color: #333;
          margin-bottom: 0.5rem;
        }
        .venue-selection p {
          color: #555;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}


