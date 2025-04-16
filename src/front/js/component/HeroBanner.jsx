import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  const { store } = useContext(Context);
  const ofertas = store.ofertasDisponibles || 0;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-sm-10 col-md-9 col-lg-8 mx-auto px-3 px-sm-4">
          <div
            className="position-relative bg-danger bg-gradient overflow-hidden mb-4 mt-5"
            style={{
              background: "linear-gradient(to right, #ef4444, #dc2626)",
              borderRadius: "20px", // Esto fuerza los bordes redondeados independientemente de Bootstrap
            }}
          >
            <div className="container-fluid py-5 px-4">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <h2
                    className="text-white fw-bold mb-3"
                    style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)" }}
                  >
                    Descubre increíbles ofertas cerca de ti
                  </h2>
                  <p
                    className="text-light mb-4"
                    style={{
                      fontSize: "clamp(1rem, 3vw, 1.25rem)",
                      color: "#fecaca",
                    }}
                  >
                    Ahorra hasta un 70% en tus experiencias favoritas. ¡
                    {ofertas} ofertas disponibles!
                  </p>

                  <Link
                    to="/ofertas"
                    className="btn bg-white text-danger fw-semibold px-4 py-2 rounded-3 shadow-sm"
                  >
                    Explorar ofertas
                  </Link>
                </div>
              </div>
            </div>

            {/* Círculo dentro del banner */}
            <div
              className="position-absolute rounded-circle d-none d-md-block"
              style={{
                width: "16rem",
                height: "16rem",
                backgroundColor: "#f87171",
                opacity: 0.2,
                bottom: 0,
                right: 0,
                transform: "translate(5rem, 5rem)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
