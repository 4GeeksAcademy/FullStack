import React, { useState } from "react";
/* import "bootstrap/dist/css/bootstrap.min.css"; */

const SpecialOffersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const specialOffers = [
    {
      id: 1,
      title: "Escapada Romántica",
      description: "Fin de semana en hotel boutique con cena",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      city: "Barcelona",
    },
    {
      id: 2,
      title: "Aventura en Pirineos",
      description: "Rafting y senderismo con guía experto",
      image:
        "https://images.unsplash.com/photo-1532339142463-fd0a89797911?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      city: "Huesca",
    },
    {
      id: 3,
      title: "Tour Gastronómico",
      description: "5 paradas en restaurantes locales",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      city: "San Sebastián",
    },
    {
      id: 4,
      title: "Spa de Lujo",
      description: "Día completo con masajes y tratamientos",
      image:
        "https://images.unsplash.com/photo-1559599101-f09722fb4948?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      city: "Madrid",
    },
    {
      id: 5,
      title: "Tour Vinícola",
      description: "Visita a bodegas con catas incluidas",
      image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      city: "La Rioja",
    },
    {
      id: 6,
      title: "Parque de Aventuras",
      description: "Tirolinas y puentes colgantes en la naturaleza",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      city: "Guadalajara",
    },
    {
      id: 7,
      title: "Clase de Cocina",
      description: "Aprende de chefs profesionales",
      image:
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      city: "Valencia",
    },
    {
      id: 8,
      title: "Observación de Estrellas",
      description: "Tour astronómico con cena campestre",
      image:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      city: "Granada",
    },
  ];

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
