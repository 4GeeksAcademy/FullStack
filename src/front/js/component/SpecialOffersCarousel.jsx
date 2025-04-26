import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext"; // Asegúrate de importar tu contexto correctamente

const SpecialOffersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { store, actions } = useContext(Context); // usamos el Contexto
  const specialOffers = store.serviciosOfertas; // agarramos los datos que trae tu Flux

  useEffect(() => {
    // Llamamos a la acción para cargar las ofertas cuando el componente se monta
    actions.cargarServiciosOfertas();
  }, []); // <-- Solo al montar el componente

  const CARDS_PER_PAGE = 4;
  const totalPages = Math.ceil(specialOffers.length / CARDS_PER_PAGE);

  const nextSlide = () => {
    if (currentIndex + CARDS_PER_PAGE < specialOffers.length) {
      setCurrentIndex(currentIndex + CARDS_PER_PAGE);
    }
  };

  const prevSlide = () => {
    if (currentIndex - CARDS_PER_PAGE >= 0) {
      setCurrentIndex(currentIndex - CARDS_PER_PAGE);
    }
  };

  const visibleOffers = specialOffers.slice(
    currentIndex,
    currentIndex + CARDS_PER_PAGE
  );

  return (
    <section className="py-5 bg-white col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
      <div className="container">
        <h2 className="text-center mb-4">Ofertas Especiales</h2>

        <div className="position-relative">
          <div className="row">
            {visibleOffers.map((offer) => (
              <div key={offer.id} className="col-12 col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-img-top"
                    style={{
                      backgroundImage: `url(${offer.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                    }}
                  ></div>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">{offer.title}</h5>
                      <span className="badge bg-primary">{offer.city}</span>
                    </div>
                    <p className="card-text text-muted small flex-grow-1">
                      {offer.description}
                    </p>
                    <button className="btn btn-outline-danger btn-sm mt-3 w-100">
                      Más información
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
            disabled={currentIndex === 0}
          >
            &#8592;
          </button>

          <button
            onClick={nextSlide}
            className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
            disabled={currentIndex + CARDS_PER_PAGE >= specialOffers.length}
          >
            &#8594;
          </button>
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * CARDS_PER_PAGE)}
                className={`btn btn-sm rounded-circle mx-1 ${
                  currentIndex === index * CARDS_PER_PAGE
                    ? "btn-danger"
                    : "btn-secondary"
                }`}
                style={{ width: "12px", height: "12px", padding: 0 }}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SpecialOffersCarousel;
