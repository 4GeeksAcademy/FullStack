import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
// Importa la imagen
import bannerImage from "../../../../public/baner.png";

const HeroBanner = () => {
  const { store } = useContext(Context);

  return (
    <>
      <style>{`
        /* Contenedor con ancho máximo de 1440px */
        .hero-container {
          max-width: 1440px;
          margin: 0 auto;
        }

        .hero-split {
          display: flex;
          overflow: hidden;
          border-radius: 20px;
        }

        @media (min-width: 516px) and (max-width: 559.98px) {
  .hero-content .btn {
    display: none !important;
  }
}

        /* Ajustes generales... */

        /* ENTRE 516px y 850px: reducimos h1 y botón */
        @media (min-width: 516px) and (max-width: 850px) {
          .hero-content h1 {
            /* Un poco más pequeño que el clamp original */
            font-size: clamp(1.25rem, 4vw, 1.75rem) !important;
          }
          .hero-content .btn {
            /* Menor padding y tamaño de fuente */
            font-size: 0.875rem !important;
            padding: 0.5rem 1rem !important;
          }
        }

        /* MÓVIL (<516px): solo la imagen + título negro */
        @media (max-width: 515.98px) {
          .hero-left { display: none; }
          .hero-right {
            flex: 1 1 100%;
            min-height: 250px;
            margin: 0 1rem;
            border-radius: 20px;
            background-image: url(${bannerImage});
            background-size: cover;
            background-position: center;
          }
          .mobile-text {
            display: block;
            text-align: center;
            margin: 1rem;
          }
          .mobile-text h1 {
            font-size: clamp(1.75rem, 5vw, 2.5rem);
            color: black;
            margin: 0;
          }
        }

        /* ≥560px: dos columnas con márgenes y bordes redondeados */
        @media (min-width: 516px) {
          .hero-split {
            flex-direction: row;
          }
          .hero-right {
            flex: 0 0 39%;
            margin-right: 3rem;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            background-image: url(${bannerImage});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
          .hero-left {
            flex: 1 1 auto;
            margin-left: 3rem;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            background: linear-gradient(to right, #ef4444, #dc2626);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          .hero-left::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            opacity: 0.1;
            background-color: black;
            z-index: 1;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
          }
          .mobile-text {
            display: none;
          }
        }

        /* ≥992px: altura mínima */
        @media (min-width: 992px) {
          .hero-split {
            min-height: 300px;
          }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 2rem;
          text-align: center;
        }
      `}</style>

      <div className="container-fluid px-0 hero-container">
        <div className="row gx-0">
          <div className="col-12">
            <div className="hero-split mb-4 mt-5 position-relative">

              {/* BLOQUE ROJO (solo ≥560px) */}
              <div
                className="hero-left bg-danger bg-gradient overflow-hidden"
                style={{ background: "linear-gradient(to right, #ef4444, #dc2626)" }}
              >
                <div className="hero-content">
                  <h1 className="text-white fw-bold mb-3" style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)" }}>
                    Creamos la boda de tus sueños en cualquier rincón de España
                  </h1>
                  <Link
                    to="https://wa.me/34641363127?text=Hola%20buen%20dia%20quiero%20solicitar%20informacion%20sobre%20los%20paquetes%20de%20bodas"
                    className="btn bg-white text-danger fw-semibold px-4 py-2 rounded-3 shadow-sm"
                  >
                    Solicitar Presupuesto
                  </Link>
                </div>
              </div>

              {/* IMAGEN */}
              <div className="hero-right" />

            </div>

            {/* TÍTULO MÓVIL (solo <516px) */}
            <div className="mobile-text">
              <h1>Creamos la boda de tus sueños en cualquier rincón de España</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;












