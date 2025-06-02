import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import { useNavigate } from "react-router-dom";

const RelatedContent = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const getCardsPerPage = () => {
    const w = window.innerWidth;
    if (w >= 992) return 4;   // escritorio
    if (w >= 768) return 2;   // tablet
    return 1;                  // móvil
  };

  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());
  const [currentIndices, setCurrentIndices] = useState({
    Belleza: 0,
    gastronomia: 0,
    viajes: 0,
  });

  useEffect(() => {
    const handleResize = () => setCardsPerPage(getCardsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    (async () => {
      if (!store.serviciosViajes.length) await actions.cargarServiciosViajes();
      if (!store.serviciosGastronomia.length) await actions.cargarServiciosGastronomia();
      if (!store.serviciosBelleza.length) await actions.cargarServiciosBelleza();
    })();
  }, []);

  const categories = [
    { id: "Belleza", name: "Belleza", deals: store.serviciosBelleza || [] },
  ];

  const handleNavigate = (deal, categoryId) => {
    const offer = {
      ...deal,
      title: deal.title || deal.nombre,
      image: deal.image || deal.imagen,
      price: deal.price || deal.precio,
      rating: deal.rating,
      reviews: deal.reviews,
      category: categoryId
    };
    navigate(`/product-detail`, { state: { offer, category: categoryId } });
  };

  const scroll = (categoryId, direction, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndices(prev => {
      const len = categories.find(c => c.id === categoryId).deals.length;
      const idx = prev[categoryId];
      const delta = direction === "left" ? -cardsPerPage : cardsPerPage;
      const next = Math.min(Math.max(idx + delta, 0), Math.max(len - cardsPerPage, 0));
      return { ...prev, [categoryId]: next };
    });
  };

  const hasAnyData = categories.some(c => c.deals.length > 0);

  return (
    <section className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
      <h4 className="fs-3 fw-bold mb-4">También te puede interesar</h4>

      {hasAnyData
        ? categories.map(category => {
            const currentIndex = currentIndices[category.id] || 0;
            const visibleDeals = category.deals.slice(currentIndex, currentIndex + cardsPerPage);
            return (
              <div key={category.id} className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="fs-4 fw-bold mb-0"></h3>
                  <button
                    onClick={() => navigate(`/category/${category.id.toLowerCase()}`)}
                    className="btn btn-link text-danger text-decoration-none p-0"
                  >
                    Ver más →
                  </button>
                </div>

                <div className="position-relative">
                  {/* Flecha izquierda */}
                  <button
                    className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y"
                    style={{ zIndex: 2 }}
                    onClick={e => scroll(category.id, "left", e)}
                    disabled={currentIndex === 0}
                  >
                    &#8592;
                  </button>

                  <div className="row gx-3">
                    {visibleDeals.map(deal => (
                      <div
                        key={`${category.id}-${deal.id}`}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <CategoryCard
                          offer={{
                            ...deal,
                            title: deal.title || deal.nombre,
                            image: deal.image || deal.imagen,
                            price: deal.price || deal.precio
                          }}
                          onViewService={() => handleNavigate(deal, category.id)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Flecha derecha */}
                  <button
                    className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y"
                    style={{ zIndex: 2 }}
                    onClick={e => scroll(category.id, "right", e)}
                    disabled={currentIndex + cardsPerPage >= category.deals.length}
                  >
                    &#8594;
                  </button>
                </div>
              </div>
            );
          })
        : <p>Cargando información...</p>
      }
    </section>
  );
};

export default RelatedContent;

