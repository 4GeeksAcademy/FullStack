import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import { useNavigate } from "react-router-dom";

const RelatedContent = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [currentIndices, setCurrentIndices] = useState({
    Belleza: 0,
    gastronomia: 0,
    viajes: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (store.serviciosViajes.length === 0) await actions.cargarServiciosViajes();
      if (store.serviciosGastronomia.length === 0) await actions.cargarServiciosGastronomia();
      if (store.serviciosBelleza.length === 0) await actions.cargarServiciosBelleza();
    };

    fetchData();
  }, []);

  const categories = [
    { id: "Belleza", name: "Belleza", deals: store.serviciosBelleza || [] },
    { id: "gastronomia", name: "Gastronomía", deals: store.serviciosGastronomia || [] },
    { id: "viajes", name: "Viajes", deals: store.serviciosViajes || [] },
  ];

  const handleNavigate = (categoryId) => {
    navigate(`${categoryId.toLowerCase()}`);
  };

  const scroll = (categoryId, direction, e) => {
    // Prevenir comportamiento por defecto y propagación
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    setCurrentIndices((prev) => {
      const current = prev[categoryId] || 0;
      const totalDeals = categories.find(cat => cat.id === categoryId)?.deals.length || 0;
      const newIndex =
        direction === "left" ? Math.max(current - 4, 0) :
        direction === "right" ? Math.min(current + 4, totalDeals - 4) :
        current;

      return { ...prev, [categoryId]: newIndex };
    });
  };

  const hasAnyData = categories.some(cat => cat.deals.length > 0);

  return (
    <section className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
      <div>
        <h2 className="fs-3 fw-bold mb-4">También te puede interesar</h2>

        {hasAnyData ? (
          categories.map((category) => {
            const currentIndex = currentIndices[category.id] || 0;

            return (
              <div key={category.id} className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="fs-4 fw-bold mb-0">{category.name}</h3>
                  <button
                    onClick={() => handleNavigate(category.id)}
                    className="btn btn-link text-danger text-decoration-none p-0"
                  >
                    Explorar {category.name.toLowerCase()} →
                  </button>
                </div>

                <div className="position-relative">
                  {/* Flecha izquierda */}
                  <button
                    className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y z-1"
                    onClick={(e) => scroll(category.id, "left", e)}
                    disabled={currentIndex === 0}
                    style={{ pointerEvents: currentIndex === 0 ? 'none' : 'auto' }}
                  >
                    &#8592;
                  </button>

                  {/* Tarjetas */}
                  <div className="row gx-3">
                    {category.deals.slice(currentIndex, currentIndex + 4).map((deal, index) => {
                      const offer = {
                        title: deal.nombre || deal.title || "Sin título",
                        image: deal.imagen || deal.image || "https://via.placeholder.com/300x200?text=Sin+imagen",
                        rating: deal.rating || 4,
                        reviews: deal.reviews || 20,
                        discountPrice: deal.precio || deal.discountPrice || 0,
                        originalPrice: deal.originalPrice || Math.round((deal.precio || deal.discountPrice || 0) * 1.2),
                        buyers: deal.buyers || 5,
                      };

                      return (
                        <div key={`${category.id}-${index}`} className="col-12 col-sm-6 col-md-3">
                          <CategoryCard
                            offer={offer}
                            onViewService={() => {}} // Esto anula la navegación
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Flecha derecha */}
                  <button
                    className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y z-1"
                    onClick={(e) => scroll(category.id, "right", e)}
                    disabled={currentIndex + 4 >= category.deals.length}
                    style={{ pointerEvents: currentIndex + 4 >= category.deals.length ? 'none' : 'auto' }}
                  >
                    &#8594;
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>Cargando información...</p>
        )}
      </div>
    </section>
  );
};

export default RelatedContent;