import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const SpecialOffersCarousel = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    actions.cargarServiciosOfertas();
  }, []);

  const scrollByPage = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const pageWidth = container.clientWidth;
    container.scrollBy({ left: direction * pageWidth, behavior: "smooth" });
  };

  return (
    <>
      {/* estilos inline para responsive 4-3-2 */}
      <style>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .offer-card {
          flex: 0 0 25%;
          max-width: 25%;
          scroll-snap-align: start;
        }
        @media (max-width: 2092px) {
          /* entre tablet y escritorio: 3 por fila */
          .offer-card {
            flex: 0 0 33.3333%;
            max-width: 33.3333%;
          }
        }
        @media (max-width: 1168px) {
          /* tablet y móvil: 2 por fila */
          .offer-card {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
      `}</style>

      <section className="py-5 bg-white">
        <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
          <h2 className="text-center mb-4">Ofertas Especiales</h2>
          <div className="position-relative">
            {/* Flechas siempre visibles */}
            <button
              onClick={() => scrollByPage(-1)}
              className="btn btn-light position-absolute"
              style={{
                top: "100px",
                left: "10px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                zIndex: 10
              }}
            >
              ‹
            </button>
            <button
              onClick={() => scrollByPage(1)}
              className="btn btn-light position-absolute"
              style={{
                top: "100px",
                right: "10px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                zIndex: 10
              }}
            >
              ›
            </button>

            <div
              ref={containerRef}
              className="d-flex overflow-auto no-scrollbar"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollSnapType: "x mandatory"
              }}
            >
              {store.serviciosOfertas.map((offer) => (
                <div key={offer.id} className="offer-card p-3">
                  <div className="card h-100 shadow-sm">
                    <div
                      className="card-img-top"
                      style={{
                        backgroundImage: `url(${offer.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "200px"
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-0">{offer.title}</h5>
                        <span className="badge bg-primary">{offer.city}</span>
                      </div>
                      <p className="card-text text-muted small flex-grow-1">
                        {offer.descripcion}
                      </p>
                      <button
                        className="btn btn-outline-danger btn-sm mt-3 w-100"
                        onClick={() =>
                          navigate("/product-detail", { state: { offer } })
                        }
                      >
                        Más información
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialOffersCarousel;








