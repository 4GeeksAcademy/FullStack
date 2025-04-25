import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";

const RelatedContent = ({ onNavigate = () => { } }) => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.serviciosViajes.length === 0) {
      actions.cargarServiciosViajes();
    }
    if (store.serviciosGastronomia.length === 0) {
      actions.cargarServiciosGastronomia();
    }
    if (store.serviciosBelleza.length === 0) {
      actions.cargarServiciosBelleza();
    }
    console.log("servicios viajes desde componente:", store.serviciosViajes);
    console.log("servicios gastronomia desde componente:", store.serviciosGastronomia);
    console.log("servicios belleza desde componente:", store.serviciosBelleza);
  }, [store.serviciosViajes, store.serviciosGastronomia, store.serviciosBelleza, actions]);

  const defaultOffer =
    store.producto && store.producto.length > 0 ? store.producto[0] : null;

  const categories = [
    {
      id: "beauty",
      name: "Belleza",
      deals: store.serviciosBelleza && store.serviciosBelleza.length > 0
        ? store.serviciosBelleza
        : defaultOffer
          ? Array(4).fill(defaultOffer)
          : [],
    },
    {
      id: "food",
      name: "Gastronomía",
      deals: store.serviciosGastronomia && store.serviciosGastronomia.length > 0
        ? store.serviciosGastronomia
        : defaultOffer
          ? Array(4).fill({ ...defaultOffer, category: "food" })
          : [],
    },
    {
      id: "travel",
      name: "Viajes",
      deals: store.serviciosViajes && store.serviciosViajes.length > 0
        ? store.serviciosViajes
        : defaultOffer
          ? Array(4).fill({ ...defaultOffer, category: "travel" })
          : [],
    },
  ];

  const scrollContainerRef = useRef({});

  const scroll = (categoryId, direction) => {
    const container = scrollContainerRef.current[categoryId];
    if (container) {
      const scrollAmount = container.offsetWidth / 1.2;
      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
      <div>
        <h2 className="fs-3 fw-bold mb-4">También te puede interesar</h2>

        {categories.map((category) => (
          <div key={category.id} className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fs-4 fw-bold mb-0">{category.name}</h3>
              <button
                onClick={() => onNavigate(category.id)}
                className="btn btn-link text-danger text-decoration-none p-0"
              >
                Explorar {category.name.toLowerCase()} →
              </button>
            </div>

            <div className="position-relative">
              <button
                className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y z-1"
                onClick={() => scroll(category.id, "left")}
                style={{ zIndex: 2 }}
              >
                ◀
              </button>

              <div
                className="d-flex overflow-auto gap-3 px-4"
                style={{ scrollBehavior: "smooth" }}
                ref={(el) => (scrollContainerRef.current[category.id] = el)}
              >
                {category.deals.length > 0 ? (
                  category.deals.map((deal, index) => {
                    const offer = {
                      title: deal.nombre || deal.title || "Sin título",
                      image:
                        deal.imagen ||
                        deal.image ||
                        "https://via.placeholder.com/300x200?text=Sin+imagen",
                      rating: deal.rating || 4,
                      reviews: deal.reviews || 20,
                      discountPrice:
                        deal.precio || deal.discountPrice || 0,
                      originalPrice:
                        deal.originalPrice ||
                        (deal.precio
                          ? Math.round(deal.precio * 1.2)
                          : deal.discountPrice
                            ? Math.round(deal.discountPrice * 1.2)
                            : 0),
                      buyers: deal.buyers || 5,
                    };

                    return (
                      <div
                        key={`${category.id}-${index}`}
                        style={{ minWidth: "250px", flex: "0 0 auto" }}
                      >
                        <CategoryCard
                          offer={offer}
                          onViewService={() => onNavigate(category.id)}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p>No hay datos</p>
                )}
              </div>

              <button
                className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y z-1"
                onClick={() => scroll(category.id, "right")}
                style={{ zIndex: 2 }}
              >
                ▶
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedContent;
