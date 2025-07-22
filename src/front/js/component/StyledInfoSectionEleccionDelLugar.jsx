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
      title: "Fincas",
      text: "Entornos con jardines y pérgolas perfectos para celebrar bajo el cielo. Versátiles para instalar carpas y zonas chill‑out, y cuentan con salones climatizados para asegurar comodidad en cualquier estación.",
      image: fincaImg
    },
    {
      title: "Salón Urbano",
      text: "Diseño contemporáneo, iluminación LED y pistas de baile integradas. Ideal si buscáis un escenario moderno en la ciudad, con fácil acceso y servicios tecnológicos de última generación.",
      image: salonImg
    },
    {
      title: "Celebraciones en Espacios Naturales",
      text: "Oasis de vegetación y color, con rincones florales únicos que crean una atmósfera fresca y romántica. Perfecto para fotos inolvidables y ceremonias rodeadas de naturaleza.",
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
          Cómo Elegir el Lugar de la Boda
        </h2>
        <p className="lead mb-5">
          En <strong>Camino al “Sí”</strong> sabemos que elegir el lugar de celebración es tan decisivo como el “sí, quiero” mismo, por eso acompañamos a las parejas en cada paso para encontrar el espacio perfecto según su estilo y necesidades. Analizamos la capacidad y distribución (ceremonia, banquete, zona de baile y rincón para el photocall), la ubicación y accesibilidad para facilitar el traslado de invitados, y los servicios adicionales (iluminación, montaje, aparcamiento y seguros). Nuestro equipo selecciona fincas campestres, masías con salones, hoteles con vistas al mar o espacios urbanos de diseño, coordina visitas guiadas y negocia las mejores condiciones para que vosotros solo tengáis que escoger la opción que os enamore. Así, el día B todo fluye con total tranquilidad y vosotros disfrutáis de un escenario hecho a vuestra medida.
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
        .venue-selection p.lead { 
          color: #555; 
          text-align: justify; 
        }
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
          text-align: justify;
        }
      `}</style>
    </section>
  );
}
