import React, { useContext, useRef } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";

const RelatedContent = ({ onNavigate = () => {} }) => {
  const { store } = useContext(Context);

  const defaultOffer =
    store.producto && store.producto.length > 0 ? store.producto[0] : null;

  const categories = [
    {
      id: "beauty",
      name: "Belleza",
      deals:
        store.producto.filter((d) => d.category === "beauty").length > 0
          ? Array(4).fill(store.producto.find((d) => d.category === "beauty"))
          : defaultOffer
          ? Array(4).fill(defaultOffer)
          : [],
    },
    {
      id: "food",
      name: "Gastronomía",
      deals: defaultOffer
        ? Array(4).fill({ ...defaultOffer, category: "food" })
        : [],
    },
    {
      id: "travel",
      name: "Viajes",
      deals: defaultOffer
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
              {/* Flecha izquierda */}
              <button
                className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y z-1"
                onClick={() => scroll(category.id, "left")}
                style={{ zIndex: 2 }}
              >
                ◀
              </button>

              {/* Cards en scroll horizontal */}
              <div
                className="d-flex overflow-auto gap-3 px-4"
                style={{ scrollBehavior: "smooth" }}
                ref={(el) => (scrollContainerRef.current[category.id] = el)}
              >
                {category.deals.length > 0 ? (
                  category.deals.map((deal, index) => (
                    <div
                      key={`${category.id}-${index}`}
                      style={{ minWidth: "250px", flex: "0 0 auto" }}
                    >
                      <CategoryCard
                        offer={deal}
                        onViewService={() => onNavigate(category.id)}
                      />
                    </div>
                  ))
                ) : (
                  <p>No hay productos en esta categoría.</p>
                )}
              </div>

              {/* Flecha derecha */}
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
